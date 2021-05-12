"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.account = void 0;
const rpc_1 = require("./rpc");
const lodash_1 = require("lodash");
const promise_passthrough_1 = require("promise-passthrough");
const cosmosjs = require('@cosmostation/cosmosjs');
const account = (ctx) => Promise.all([
    rpc_1.mnemonicToAddress(ctx.mnemonic || ''),
    getCosmos(ctx.url)
])
    .then(([address, cosmos]) => ({
    getBNT: getBNT(address, cosmos),
    getAccount: getAccount(address, cosmos),
    isExistingAccount: isExistingAccount(address, cosmos)
}));
exports.account = account;
const getBNT = (userAddress, cosmos) => ({ ubnt, address = userAddress }) => {
    return getAccount(address, cosmos)(address)
        .then(a => { var _a; return ((_a = a.coins[0]) === null || _a === void 0 ? void 0 : _a.amount) || '0'; })
        .then(a => ubnt ? a : a.slice(0, -6) || '0')
        .then(parseInt);
};
const getAccount = (userAddress, cosmos) => (address = userAddress) => {
    return cosmos.getAccounts(address)
        .then((x) => x.result.value);
};
const isExistingAccount = (address, cosmos) => () => {
    return getAccount(address, cosmos)(address)
        .then(x => !!x.coins.length);
};
const getCosmos = lodash_1.memoize((url) => 
// url input temporary
fetch(`http://localhost:1317/node_info`)
    .then(x => x.json())
    .then(x => x.node_info.network)
    .then(chainId => cosmosjs.network(url, chainId))
    .then(promise_passthrough_1.passThrough(cosmos => cosmos.setPath("m/44\'/118\'/0\'/0/0")))
    .then(promise_passthrough_1.passThrough(cosmos => cosmos.bech32MainPrefix = 'bluzelle')));
//# sourceMappingURL=cosmos.js.map