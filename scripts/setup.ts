#!/usr/bin/env zx
import {$, fs, ProcessPromise} from 'zx'
import {passThrough, passThroughAwait} from "promise-passthrough";
import {ChildProcess, spawn} from "child_process";
import delay from "delay";

const {times} = require('lodash');

interface Node {
    nodeId: string
    valoper: string
    home: string
}

interface User {
    name: string,
    address: string,
    pubkey: string,
    mnemonic: string
}

interface Context {
    nodes: Node[]
    vuser: User
    blzd: ChildProcess
    nftUser: User
}


initBlzd(4)
    .then(passThroughAwait(updateConfigToml))
    .then(passThroughAwait(updateGenesisJson))
    .then(passThroughAwait(updateAppToml))
    .then(passThroughAwait(updateBlzcli))
    .then(passThroughAwait(addVuser))
    .then(passThroughAwait(addGenesisAccount))
    .then(passThroughAwait(genTx))
    .then(passThroughAwait(collectGenTx))
    .then(passThroughAwait(copyGenesisJson))
    .then(passThroughAwait(updatePersistentPeers))
    .then(passThroughAwait(startValidator))
    .then(passThroughAwait(waitForValidatorUp))
    .then(passThroughAwait(() => delay(5000)))
    .then(passThroughAwait(createNftUser))
    .then(ctx =>
        console.log('\n\n*********************\n', JSON.stringify(
            {
                vuser: ctx.vuser,
                nftUser: ctx.nftUser,
                nodes: ctx.nodes
            },
            null,
            '    '
        ))
    )


function waitForValidatorUp(): Promise<unknown> {
    return $`blzcli status`
        .catch(e => delay(1000).then(waitForValidatorUp))
}

function createNftUser(ctx: Context): Promise<unknown> {
    return createUser(`nft`)
        .then(user => ctx.nftUser = user)
        .then(fundUser)
}

function fundUser(user: User): Promise<unknown> {
    return $`blzcli tx send vuser ${user.address} 10000000ubnt --from vuser --gas auto --gas-adjustment 3 --gas-prices 0.002ubnt --broadcast-mode block -y`
}

function copyGenesisJson(ctx: Context): Promise<unknown> {
    return Promise.all(ctx.nodes.slice(1).map(n =>
        fs.copy(`${ctx.nodes[0].home}/config/genesis.json`, `${n.home}/config/genesis.json`, {overwrite: true})
    ))

}

function startValidator(ctx: Context): Promise<unknown> {
    return $`killall blzd`
        .catch(e => e)
        .then(() => cd(ctx.nodes[0].home))
        .then(() => ctx.blzd = spawn('blzd', ['start', '--home', ctx.nodes[0].home]))
}

function collectGenTx(ctx: Context): Promise<unknown> {
    return $`blzd collect-gentxs --home ${ctx.nodes[0].home}`
}

function genTx(ctx: Context): Promise<unknown> {
    return exec<string>(() => $`blzd gentx --name vuser --amount 10000000000000ubnt --keyring-backend test --home ${ctx.nodes[0].home}`)
        .then(x => x.replace(/.*"(.*)"/, '$1').trim())
        .then(filename => fs.readFile(filename))
        .then(buf => buf.toString())
        .then(x => x.replace(/.*"(bluzellevaloper[^"]*).*/, '$1'))
        .then(valoper => ctx.nodes[0].valoper = valoper.trim())
}

function addGenesisAccount(ctx: Context): Promise<unknown> {
    return $`blzd add-genesis-account ${ctx.vuser.address} 500000000000000ubnt --home ${ctx.nodes[0].home}`
}

function addVuser(ctx: Context): Promise<User> {
    return createUser('vuser')
        .then(vuser => ctx.vuser = vuser)
}

function createUser(name: string): Promise<User> {
    return exec(() => $`blzcli keys delete ${name}`)
        .catch(e => e)
        .then(() => exec<User>(() => $`blzcli keys add ${name}`))
}


function updateBlzcli(): Promise<unknown> {
    return $`blzcli config chain-id bluzelle`
        .then(() => $`blzcli config output json`)
        .then(() => $`blzcli config indent true`)
        .then(() => $`blzcli config trust-node true`)
        .then(() => $`blzcli config keyring-backend test`)
}

function updateGenesisJson(ctx: Context) {
    editFile(ctx.nodes[0], 'genesis.json', text => text.replace(/"stake"/g, '"ubnt"'))
}

function updateAppToml(ctx: Context): Promise<unknown> {
    return Promise.all(ctx.nodes.map(n =>
        editFile(n, 'app.toml', text =>
            text
                .replace('minimum-gas-prices = ""', 'minimum-gas-prices = "0.002ubnt"')
        )
    ))
}

function updatePersistentPeers(ctx: Context): Promise<unknown> {
    return Promise.all(ctx.nodes.map((n: Node, idx: number) =>
        editFile(n, 'config.toml',
            (text) =>
                text
                    .replace('persistent_peers = ""', `persistent_peers="${formatPersistentPeers(ctx)}"`)
        )
    ))
}

function updateConfigToml(ctx: Context): Promise<unknown> {
    return Promise.all(ctx.nodes.map((n: Node, idx: number) =>
        editFile(n, 'config.toml',
            (text) =>
                text
                    .replace('persistent_peers = ""', `persistent_peers="${formatPersistentPeers(ctx)}"`)
                    .replace(/(advanced configuration options[^\n]*\n)/, `$1output = "json"\n`)
                    .replace('laddr = "tcp://127.0.0.1:26657', `laddr = "tcp://127.0.0.1:${26657 + (10 * idx)}`)
                    .replace('laddr = "tcp://0.0.0.0:26656', `laddr = "tcp://127.0.0.1:${26656 + (10 * idx)}`)
                    .replace('prometheus_listen_addr = ":26660', `prometheus_listen_addr = ":${26660 + (10 * idx)}`)
                    .replace('proxy_app = "tcp://127.0.0.1:26658', `proxy_app = "tcp://127.0.0.1:${26658 + (10 * idx)}`)
                    .replace('prof_laddr = "localhost:6060', `prof_laddr = "localhost:${6060 + (10 * idx)}`)
                    .replace('addr_book_strict = true', 'addr_book_strict = false')
        )
    ))
}

function formatPersistentPeers(ctx: Context): string {
    return ctx.nodes.reduce((peers, node, idx) =>
       peers.concat([`${node.nodeId}@127.0.0.1:${26656 + (10 * idx)}`])
    , [] as string[]).join(',')
}

function editFile(node: Node, filename: string, fn: (f: string) => string): void {
    fs.readFile(`${node.home}/config/${filename}`)
        .then(buf => buf.toString())
        .then(text => fn(text))
        .then(text => fs.writeFile(`${node.home}/config/${filename}`, text))
}


function initBlzd(count: number): Promise<Context> {
    return Promise.all<Node>(times(count).map((n: number) =>
        fs.rm(getHomeDir(n), {recursive: true, force: true})
            .then(() =>
                exec<any>(() => $`blzd init curium00 --chain-id bluzelle --home ${getHomeDir(n)}`)
                    .then(x => ({
                        nodeId: x.node_id,
                        home: getHomeDir(n)
                    }))
            )
    ))
        .then(nodes => ({nodes} as Context))

    function getHomeDir(idx: number): string {
        return `${os.homedir()}/.blzd-${idx}`
    }

}

function exec<T>(fn: () => ProcessPromise<any>): Promise<T> {
    return fn()
        .then(passThrough((x: ProcessPromise<any>) => {
            if (x.exitCode) {
                throw('error')
            }
        }))
        .then(x => x.stdout || x.stderr)
        .then(x => {
            try {
                return JSON.parse(x)
            } catch (e) {
                return x
            }
        })
}

