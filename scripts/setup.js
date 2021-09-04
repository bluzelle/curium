#!/usr/bin/env zx
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zx_1 = require("zx");
const promise_passthrough_1 = require("promise-passthrough");
const child_process_1 = require("child_process");
const delay_1 = require("delay");
const bip39_1 = require("bip39");
const { toPairs, reduce } = require("lodash/fp");
const { times } = require('lodash');
const COUNT = 4;
initBlzd(COUNT)
    .then((0, promise_passthrough_1.passThroughAwait)(updateConfigToml))
    .then((0, promise_passthrough_1.passThroughAwait)(updateGenesisJson))
    .then((0, promise_passthrough_1.passThroughAwait)(updateAppToml))
    .then((0, promise_passthrough_1.passThroughAwait)(updateBlzcli))
    .then((0, promise_passthrough_1.passThroughAwait)(addVuser))
    .then((0, promise_passthrough_1.passThroughAwait)(addGenesisAccount))
    .then((0, promise_passthrough_1.passThroughAwait)(genTx))
    .then((0, promise_passthrough_1.passThroughAwait)(collectGenTx))
    .then((0, promise_passthrough_1.passThroughAwait)(copyGenesisJson))
    .then((0, promise_passthrough_1.passThroughAwait)(updatePersistentPeers))
    .then((0, promise_passthrough_1.passThroughAwait)(startValidator))
    .then((0, promise_passthrough_1.passThroughAwait)(waitForValidatorUp))
    .then((0, promise_passthrough_1.passThroughAwait)(() => (0, delay_1.default)(5000)))
    .then((0, promise_passthrough_1.passThroughAwait)(createNftUsers))
    .then((0, promise_passthrough_1.passThroughAwait)(createTestUsers))
    .then((0, promise_passthrough_1.passThroughAwait)(ctx => ctx.blzd.kill()))
    .then(ctx => console.log('\n\n*********************\n', JSON.stringify({
    vuser: ctx.vuser,
    nodes: ctx.nodes,
    testUsers: ctx.testUsers
}, null, '    ')));
function waitForValidatorUp() {
    return (0, zx_1.$) `${getBlzcli()} status`
        .catch(e => (0, delay_1.default)(1000).then(waitForValidatorUp));
}
function createNftUsers(ctx) {
    return times(COUNT).reduce((p, n) => p.then(() => createUser(`nft-${n}`, (0, bip39_1.entropyToMnemonic)((n + 1).toString().repeat(32)))
        .then(user => ctx.nodes[n].nftUser = user)
        .then(fundUser)), Promise.resolve());
}
function createTestUsers(ctx) {
    return times(4).reduce((p, n) => p.then(() => createUser(`test-${n}`, (0, bip39_1.entropyToMnemonic)((n + 1).toString().repeat(30) + 'aa'))
        .then((0, promise_passthrough_1.passThroughAwait)(user => ctx.testUsers = (ctx.testUsers || []).concat([user])))
        .then(fundUser)), Promise.resolve());
}
function fundUser(user) {
    return (0, zx_1.$) `${getBlzcli()} tx send vuser ${user.address} ${10_000_000_000_000}ubnt --from vuser --gas auto --gas-adjustment 3 --gas-prices 0.002ubnt --broadcast-mode block -y`;
}
function copyGenesisJson(ctx) {
    return Promise.all(ctx.nodes.slice(1).map(n => zx_1.fs.copy(`${ctx.nodes[0].home}/config/genesis.json`, `${n.home}/config/genesis.json`, { overwrite: true })));
}
function getBlzd() {
    return `${process.env.GOPATH}/bin/blzd`;
}
function getBlzcli() {
    return `${process.env.GOPATH}/bin/blzcli`;
}
function startValidator(ctx) {
    return (0, zx_1.$) `killall blzd`
        .catch(e => e)
        .then(() => zx_1.fs.rm('blzd.log'))
        .catch(e => e)
        .then(() => cd(ctx.nodes[0].home))
        .then(() => ctx.blzd = (0, child_process_1.spawn)(getBlzd(), ['start', '--home', ctx.nodes[0].home]))
        .then(cp => {
        const logStream = zx_1.fs.createWriteStream('blzd.log', { flags: 'a' });
        cp.stdout.pipe(logStream);
        cp.stderr.pipe(logStream);
    });
}
function collectGenTx(ctx) {
    return (0, zx_1.$) `${getBlzd()} collect-gentxs --home ${ctx.nodes[0].home}`;
}
function genTx(ctx) {
    return exec(() => (0, zx_1.$) `${getBlzd()} gentx --name vuser --amount ${100_000_000_000_000_000}ubnt --keyring-backend test --home ${ctx.nodes[0].home}`)
        .then(x => x.replace(/.*"(.*)"/, '$1').trim())
        .then(filename => zx_1.fs.readFile(filename))
        .then(buf => buf.toString())
        .then(x => x.replace(/.*"(bluzellevaloper[^"]*).*/, '$1'))
        .then(valoper => ctx.nodes[0].valoper = valoper.trim());
}
function addGenesisAccount(ctx) {
    return (0, zx_1.$) `${getBlzd()} add-genesis-account ${ctx.vuser.address} ${5_000_000_000_000_000_000}ubnt --home ${ctx.nodes[0].home}`;
}
function addVuser(ctx) {
    return createUser('vuser', 'claim public hen differ neither disease toe size banner bargain flip snow write obey gravity weather ginger brick order drive syrup anchor owner pig')
        .then(vuser => ctx.vuser = vuser);
}
function createUser(name, mnemonic) {
    return exec(() => (0, zx_1.$) `${getBlzcli()} keys delete ${name}`)
        .catch(e => e)
        .then(() => exec(() => (0, zx_1.$) `echo ${mnemonic} | ${getBlzcli()} keys add ${name} --recover`))
        .then(user => ({ ...user, mnemonic }));
}
function updateBlzcli() {
    return Promise.resolve({
        'chain-id': 'bluzelle',
        output: 'json',
        indent: true,
        'trust-node': true,
        'keyring-backend': 'test'
    })
        .then(toPairs)
        .then(reduce((p, [key, val]) => p.then(() => (0, zx_1.$) `${getBlzcli()} config ${key} ${val}`), Promise.resolve()));
}
function updateGenesisJson(ctx) {
    editFile(ctx.nodes[0], 'genesis.json', text => text.replace(/"stake"/g, '"ubnt"'));
}
function updateAppToml(ctx) {
    return Promise.all(ctx.nodes.map((n, idx) => editFile(n, 'app.toml', text => text
        .replace('minimum-gas-prices = ""', 'minimum-gas-prices = "0.002ubnt"')
        .concat(`\nnft-user-name = "nft-${idx}"\n`)
        .concat(`\nnft-base-dir = "${n.nftBaseDir}"\n`)
        .concat(`nft-p2p-port = "${n.btPort}"\n`))));
}
function updatePersistentPeers(ctx) {
    return Promise.all(ctx.nodes.map((n, idx) => editFile(n, 'config.toml', (text) => text
        .replace('persistent_peers = ""', `persistent_peers="${formatPersistentPeers(ctx)}"`))));
}
function updateConfigToml(ctx) {
    return Promise.all(ctx.nodes.map((n, idx) => editFile(n, 'config.toml', (text) => text
        .replace('persistent_peers = ""', `persistent_peers="${formatPersistentPeers(ctx)}"`)
        .replace(/(advanced configuration options[^\n]*\n)/, `$1output = "json"\n`)
        .replace('laddr = "tcp://127.0.0.1:26657', `laddr = "tcp://127.0.0.1:${26657 + (10 * idx)}`)
        .replace('laddr = "tcp://0.0.0.0:26656', `laddr = "tcp://127.0.0.1:${26656 + (10 * idx)}`)
        .replace('prometheus_listen_addr = ":26660', `prometheus_listen_addr = ":${26660 + (10 * idx)}`)
        .replace('proxy_app = "tcp://127.0.0.1:26658', `proxy_app = "tcp://127.0.0.1:${26658 + (10 * idx)}`)
        .replace('prof_laddr = "localhost:6060', `prof_laddr = "localhost:${6060 + (10 * idx)}`)
        .replace('addr_book_strict = true', 'addr_book_strict = false'))));
}
function formatPersistentPeers(ctx) {
    return ctx.nodes.reduce((peers, node, idx) => peers.concat([`${node.nodeId}@127.0.0.1:${26656 + (10 * idx)}`]), []).join(',');
}
function editFile(node, filename, fn) {
    zx_1.fs.readFile(`${node.home}/config/${filename}`)
        .then(buf => buf.toString())
        .then(text => fn(text))
        .then(text => zx_1.fs.writeFile(`${node.home}/config/${filename}`, text));
}
function initBlzd(count) {
    return Promise.all(times(count).map((n) => zx_1.fs.rm(getHomeDir(n), { recursive: true, force: true })
        .then(() => exec(() => (0, zx_1.$) `${getBlzd()} init curium00 --chain-id bluzelle --home ${getHomeDir(n)}`)
        .then(x => ({
        nodeId: x.node_id,
        home: getHomeDir(n),
        btPort: 5500 + n,
        nftBaseDir: getHomeDir(n)
    })))))
        .then(nodes => ({ nodes }));
    function getHomeDir(idx) {
        return `${os.homedir()}/.blzd-${idx}`;
    }
}
function exec(fn) {
    return fn()
        .then((0, promise_passthrough_1.passThrough)((x) => {
        if (x.exitCode) {
            throw ('error');
        }
    }))
        .then(x => x.stdout || x.stderr)
        .then(x => {
        try {
            return JSON.parse(x);
        }
        catch (e) {
            return x;
        }
    });
}
