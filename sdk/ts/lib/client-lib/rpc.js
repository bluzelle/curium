"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mnemonicToAddress = exports.sdk = void 0;
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const stargate_1 = require("@cosmjs/stargate");
const CommunicationService_1 = require("./CommunicationService");
const Registry_1 = require("./Registry");
const proto_signing_1 = require("@cosmjs/proto-signing");
const lodash_1 = require("lodash");
;
const sdk = (options, qImpl, mImpl, msgTypes, cs) => {
    return Promise.all([
        queryRpc(options),
        txRpc(options, cs, msgTypes),
        exports.mnemonicToAddress(options.mnemonic || '')
    ])
        .then(([queryRpc, txRpc, address]) => ({
        q: new qImpl(queryRpc),
        tx: new mImpl(txRpc),
        address,
        url: options.url,
        withTransaction: (fn, options) => CommunicationService_1.withTransaction(cs, fn, options),
    }));
};
exports.sdk = sdk;
const queryRpc = (options) => tendermint_rpc_1.Tendermint34Client.connect(options.url)
    .then(tendermintClient => new stargate_1.QueryClient(tendermintClient))
    .then(stargate_1.createProtobufRpcClient);
const txRpc = (options, communicationService, msgTypes) => {
    return Promise.resolve({
        request: (service, method, data) => {
            Registry_1.addMessageType(`/${service}${method}`, (msgTypes)[`Msg${method}`]);
            return CommunicationService_1.sendMessage(communicationService, {
                typeUrl: `/${service}${method}`,
                value: (msgTypes)[`Msg${method}`].decode(data)
            }, { gas_price: options.gasPrice, max_gas: options.maxGas });
        }
    });
};
exports.mnemonicToAddress = lodash_1.memoize((mnemonic) => proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(mnemonic, undefined, 'bluzelle')
    .then(wallet => wallet.getAccounts())
    .then(x => x[0].address));
//# sourceMappingURL=rpc.js.map