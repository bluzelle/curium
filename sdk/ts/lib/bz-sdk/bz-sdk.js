"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bluzelle = void 0;
const rpc_1 = require("../client-lib/rpc");
const query_1 = require("../codec/crud/query");
const tx_1 = require("../codec/crud/tx");
const CrudMsgTypes = __importStar(require("../codec/crud/tx"));
const query_2 = require("../codec/nft/query");
const tx_2 = require("../codec/nft/tx");
const NftMsgTypes = __importStar(require("../codec/nft/tx"));
const query_3 = require("../codec/cosmos/bank/v1beta1/query");
const tx_3 = require("../codec/cosmos/bank/v1beta1/tx");
const BankMsgTypes = __importStar(require("../codec/cosmos/bank/v1beta1/tx"));
const query_4 = require("../codec/cosmos/staking/v1beta1/query");
const tx_4 = require("../codec/cosmos/staking/v1beta1/tx");
const StakingMsgTypes = __importStar(require("../codec/cosmos/staking/v1beta1/tx"));
const CommunicationService_1 = require("../client-lib/CommunicationService");
const bluzelle = (options) => Promise.resolve(CommunicationService_1.newCommunicationService(options.url, options.mnemonic || ''))
    .then(cs => Promise.all([
    rpc_1.sdk(options, query_1.QueryClientImpl, tx_1.MsgClientImpl, CrudMsgTypes, cs),
    rpc_1.sdk(options, query_2.QueryClientImpl, tx_2.MsgClientImpl, NftMsgTypes, cs),
    rpc_1.sdk(options, query_3.QueryClientImpl, tx_3.MsgClientImpl, BankMsgTypes, cs),
    rpc_1.sdk(options, query_4.QueryClientImpl, tx_4.MsgClientImpl, StakingMsgTypes, cs),
]))
    .then(([db, nft, bank, staking]) => ({
    db, nft, bank, staking
}));
exports.bluzelle = bluzelle;
Promise.resolve(exports.bluzelle({
    mnemonic: "focus ill drift swift blood bitter move grace ensure diamond year tongue hint weekend bulb rebel avoid gas dose print remove receive yellow shoot",
    url: "http://localhost:26657",
    gasPrice: 0.002,
    maxGas: 1000000
}))
    .then(sdk => sdk.bank.q.Balance({ address: "bluzelle13cpvky4s7e825ddwme4xh9g7ynxa4yes5uca7e", denom: "ubnt" }))
    .then(x => x);
//     .then(passThroughAwait(sdk => sdk.db.tx.Create({
//         uuid: 'uuid2',
//         key: 'foo',
//         value: new TextEncoder().encode('bar'),
//         creator: sdk.db.address,
//         lease: Long.fromInt(10),
//         metadata: new Uint8Array()
//     })))
//     .then(sdk => sdk.db.q.CrudValue({
//         uuid: 'uuid2',
//         key: 'foo'
//     }))
//     .then(x => x);
//# sourceMappingURL=bz-sdk.js.map