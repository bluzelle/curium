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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sdk = void 0;
const query_1 = require("./codec/crud/query");
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const stargate_1 = require("@cosmjs/stargate");
const tx_1 = require("./codec/crud/tx");
const long_1 = __importDefault(require("long"));
const CommunicationService_1 = require("./CommunicationService");
const MsgTypes = __importStar(require("./codec/crud/tx"));
const Registry_1 = require("./Registry");
const proto_signing_1 = require("@cosmjs/proto-signing");
const lodash_1 = require("lodash");
const sdk = (options) => {
    const cs = CommunicationService_1.newCommunicationService(options.url, options.mnemonic || '');
    return Promise.all([
        queryRpc(options),
        txRpc(options, cs),
        mnemonicToAddress(options.mnemonic || '')
    ])
        .then(([queryRpc, txRpc, address]) => ({
        q: new query_1.QueryClientImpl(queryRpc),
        tx: new tx_1.MsgClientImpl(txRpc),
        address,
        withTransaction: (fn, options) => CommunicationService_1.withTransaction(cs, fn, options)
    }));
};
exports.sdk = sdk;
const queryRpc = (options) => tendermint_rpc_1.Tendermint34Client.connect(options.url)
    .then(tendermintClient => new stargate_1.QueryClient(tendermintClient))
    .then(stargate_1.createProtobufRpcClient);
const txRpc = (options, communicationService) => {
    return Promise.resolve({
        request: (service, method, data) => {
            Registry_1.addMessageType(`/${service}${method}`, MsgTypes[`Msg${method}`]);
            return CommunicationService_1.sendMessage(communicationService, {
                typeUrl: `/${service}${method}`,
                value: MsgTypes[`Msg${method}`].decode(data)
            }, { gas_price: options.gasPrice, max_gas: options.maxGas })
                .then(messageResponse => { var _a, _b, _c; return (_c = (_b = (_a = messageResponse === null || messageResponse === void 0 ? void 0 : messageResponse.data) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.data) !== null && _c !== void 0 ? _c : new Uint8Array(); });
        }
    });
};
const mnemonicToAddress = lodash_1.memoize((mnemonic) => proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(mnemonic, undefined, 'bluzelle')
    .then(wallet => wallet.getAccounts())
    .then(x => x[0].address));
exports.sdk({
    mnemonic: "loan arrow prison cloud rain diamond parrot culture marriage forget win brief kingdom response try image auto rather rare tone chef can shallow bus",
    url: "http://localhost:26657",
    gasPrice: 0.002,
    maxGas: 100000
})
    .then(client => client.withTransaction(() => {
    client.tx.Create({
        creator: client.address,
        uuid: 'uuid',
        key: 'nick2',
        value: new TextEncoder().encode('HELLO'),
        lease: long_1.default.fromInt(3000),
        metadata: new Uint8Array()
    });
    client.tx.Read({
        creator: client.address,
        uuid: 'uuid',
        key: 'nick2',
    });
}, { memo: '' }))
    // .then(passThroughAwait((client) => client.tx.Create({
    //     creator: client.address,
    //     uuid: 'uuid',
    //     key: 'nick',
    //     value: new TextEncoder().encode('HELLO'),
    //     lease: Long.fromInt(3000),
    //     metadata: new Uint8Array()
    // })))
    // .then((client) => client.tx.Create({
    //     creator: client.address,
    //     uuid: 'uuid',
    //     key: 'john',
    //     value: new TextEncoder().encode('HELLO'),
    //     lease: Long.fromInt(3000),
    //     metadata: new Uint8Array()
    // }))
    // .then(client => client.tx.Read({
    //     creator: client.address,
    //     uuid: 'uuid',
    //     key: 'nick',
    // }))
    .then(x => x)
    // .then(sdkClient => sdkClient.q.CrudValue({
    //     key: "value",
    //     uuid: "uuid"
    // }))
    .then(console.log);
//# sourceMappingURL=rpc.js.map