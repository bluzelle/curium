#!/usr/bin/env zx
import {$, fs, ProcessPromise} from 'zx'
import {passThrough, passThroughAwait} from "promise-passthrough";
import {ChildProcess, spawn} from "child_process";
import delay from "delay";
import {entropyToMnemonic} from 'bip39'
const {toPairs, reduce} = require("lodash/fp");

const {times} = require('lodash');

interface Node {
    nodeId: string
    valoper: string
    home: string
    nftBaseDir: string,
    btPort: number
    nftUser: User
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
    testUsers: User[]
    blzd: ChildProcess
}

const COUNT = 4

initBlzd(COUNT)
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
    .then(passThroughAwait(createNftUsers))
    .then(passThroughAwait(createTestUsers))
    .then(passThroughAwait(ctx => ctx.blzd.kill()))
    .then(ctx =>
        console.log('\n\n*********************\n', JSON.stringify(
            {
                vuser: ctx.vuser,
                nodes: ctx.nodes,
                testUsers: ctx.testUsers
            },
            null,
            '    '
        ))
    )


function waitForValidatorUp(): Promise<unknown> {
    return $`${getBlzcli()} status`
        .catch(e => delay(1000).then(waitForValidatorUp))
}

function createNftUsers(ctx: Context): Promise<unknown> {
    return times(COUNT).reduce((p: Promise<User>, n: number) =>
            p.then(() =>
                createUser(`nft-${n}`, entropyToMnemonic((n + 1).toString().repeat(32)))
                    .then(user => ctx.nodes[n].nftUser = user)
                    .then(fundUser)
            )
        , Promise.resolve())
}

function createTestUsers(ctx: Context): Promise<unknown> {
    return times(4).reduce((p: Promise<User>, n: number) =>
        p.then(() =>
            createUser(`test-${n}`, entropyToMnemonic((n + 1).toString().repeat(30) + 'aa'))
                .then(passThroughAwait(user => ctx.testUsers = (ctx.testUsers || []).concat([user])))
                .then(fundUser)
        ), Promise.resolve())

}

function fundUser(user: User): Promise<unknown> {
    return $`${getBlzcli()} tx send vuser ${user.address} 10000000000ubnt --from vuser --gas auto --gas-adjustment 3 --gas-prices 0.002ubnt --broadcast-mode block -y`
}

function copyGenesisJson(ctx: Context): Promise<unknown> {
    return Promise.all(ctx.nodes.slice(1).map(n =>
        fs.copy(`${ctx.nodes[0].home}/config/genesis.json`, `${n.home}/config/genesis.json`, {overwrite: true})
    ))
}

function getBlzd() {
    return `${process.env.GOPATH}/bin/blzd`;
}

function getBlzcli() {
    return `${process.env.GOPATH}/bin/blzcli`;
}

function startValidator(ctx: Context): Promise<unknown> {
    return $`killall blzd`
        .catch(e => e)
        .then(() => cd(ctx.nodes[0].home))
        .then(() => ctx.blzd = spawn(getBlzd(), ['start', '--home', ctx.nodes[0].home]))
}

function collectGenTx(ctx: Context): Promise<unknown> {
    return $`${getBlzd()} collect-gentxs --home ${ctx.nodes[0].home}`
}

function genTx(ctx: Context): Promise<unknown> {
    return exec<string>(() => $`${getBlzd()} gentx --name vuser --amount 10000000000000ubnt --keyring-backend test --home ${ctx.nodes[0].home}`)
        .then(x => x.replace(/.*"(.*)"/, '$1').trim())
        .then(filename => fs.readFile(filename))
        .then(buf => buf.toString())
        .then(x => x.replace(/.*"(bluzellevaloper[^"]*).*/, '$1'))
        .then(valoper => ctx.nodes[0].valoper = valoper.trim())
}

function addGenesisAccount(ctx: Context): Promise<unknown> {
    return $`${getBlzd()} add-genesis-account ${ctx.vuser.address} 500000000000000ubnt --home ${ctx.nodes[0].home}`
}

function addVuser(ctx: Context): Promise<User> {
    return createUser('vuser', 'claim public hen differ neither disease toe size banner bargain flip snow write obey gravity weather ginger brick order drive syrup anchor owner pig')
        .then(vuser => ctx.vuser = vuser)
}

function createUser(name: string, mnemonic: string): Promise<User> {
    return exec(() => $`${getBlzcli()} keys delete ${name}`)
        .catch(e => e)
        .then(() => exec<User>(() => $`echo ${mnemonic} | ${getBlzcli()} keys add ${name} --recover`))
        .then(user => ({...user, mnemonic}))
}


function updateBlzcli(): Promise<unknown> {
    return Promise.resolve({
        'chain-id': 'bluzelle',
        output: 'json',
        indent: true,
        'trust-node': true,
        'keyring-backend': 'test'
    })
        .then(toPairs)
        .then(reduce((p, [key, val]) =>
            p.then(() => $`${getBlzcli()} config ${key} ${val}`)
        , Promise.resolve() as Promise<unknown>))
}

function updateGenesisJson(ctx: Context) {
    editFile(ctx.nodes[0], 'genesis.json', text => text.replace(/"stake"/g, '"ubnt"'))
}

function updateAppToml(ctx: Context): Promise<unknown> {
    return Promise.all(ctx.nodes.map((n, idx) =>
        editFile(n, 'app.toml', text =>
            text
                .replace('minimum-gas-prices = ""', 'minimum-gas-prices = "0.002ubnt"')
                .concat(`\nnft-user-name = "nft-${idx}"\n`)
                .concat(`\nnft-base-dir = "${n.nftBaseDir}"\n`)
                .concat(`nft-p2p-port = "${n.btPort}"\n`)
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
                exec<any>(() => $`${getBlzd()} init curium00 --chain-id bluzelle --home ${getHomeDir(n)}`)
                    .then(x => ({
                        nodeId: x.node_id,
                        home: getHomeDir(n),
                        btPort: 5500 + n,
                        nftBaseDir: getHomeDir(n)
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

