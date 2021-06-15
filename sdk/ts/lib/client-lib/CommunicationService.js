"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testHook = exports.getClient = exports.sendMessage = exports.withTransaction = exports.newCommunicationService = exports.mnemonicToAddress = void 0;
const monet_1 = require("monet");
const lodash_1 = require("lodash");
const delay_1 = __importDefault(require("delay"));
const proto_signing_1 = require("@cosmjs/proto-signing");
const tx_1 = require("@cosmjs/proto-signing/build/codec/cosmos/tx/v1beta1/tx");
const Registry_1 = require("./Registry");
const stargate_1 = require("@cosmjs/stargate");
const TOKEN_NAME = 'ubnt';
const dummyMessageResponse = new Uint8Array();
const mnemonicToAddress = (mnemonic) => proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: 'bluzelle' })
    .then(wallet => wallet.getAccounts())
    .then(x => x[0].address);
exports.mnemonicToAddress = mnemonicToAddress;
const newTransactionMessageQueue = (items, memo) => ({
    memo,
    items
});
const newCommunicationService = (url, mnemonic) => ({
    url,
    mnemonic,
    seq: 0,
    account: 0
});
exports.newCommunicationService = newCommunicationService;
const withTransaction = (service, fn, { memo }) => {
    if (service.transactionMessageQueue) {
        throw new Error('withTransaction() can not be nested');
    }
    service.transactionMessageQueue = newTransactionMessageQueue([], memo);
    fn();
    const result = sendMessages(service, service.transactionMessageQueue);
    service.transactionMessageQueue = undefined;
    return result;
};
exports.withTransaction = withTransaction;
const sendMessage = (ctx, message, gasInfo) => {
    var _a;
    return ctx.transactionMessageQueue ? Promise.resolve((_a = ctx.transactionMessageQueue) === null || _a === void 0 ? void 0 : _a.items.push({
        message, gasInfo
    }))
        .then(() => (dummyMessageResponse))
        : sendMessages(ctx, newTransactionMessageQueue([{
                message,
                gasInfo
            }], ''));
};
exports.sendMessage = sendMessage;
const sendMessages = (service, queue, retrans = false) => new Promise((resolve, reject) => {
    msgChain = msgChain
        .then(() => {
        transmitTransaction(service, queue.items, { memo: queue.memo })
            .then(resolve)
            .catch(e => monet_1.Some(retrans)
            .filter(retrans => retrans === false)
            .filter(() => /account sequence mismatch/.test(e))
            .map(() => service.seq = 0)
            .map(() => service.account = 0)
            .map(() => delete service.accountRequested)
            .map(() => sendMessages(service, queue, true))
            .map(p => p.then(resolve).catch(reject))
            .cata(() => reject(e), () => {
        }));
    })
        // hacky way to make sure that connections arrive at server in order
        .then(() => delay_1.default(getDelayBetweenRequests(JSON.stringify(queue.items).length, service.url)));
});
const getDelayBetweenRequests = (length, url) => monet_1.Right(length)
    .flatMap(length => length < 500 ? monet_1.Left(3000) : monet_1.Right(length))
    .flatMap(length => /localhost/.test(url) ? monet_1.Left(500) : monet_1.Left(500))
    .cata(t => t, () => 5000);
let chainId;
const transmitTransaction = (service, messages, { memo }) => {
    let cosmos;
    return exports.getClient(service)
        .then(c => cosmos = c)
        .then(client => getChainId(client).then(cId => chainId = cId))
        .then(() => getSequence(service, cosmos))
        .then((account) => exports.mnemonicToAddress(service.mnemonic)
        .then(address => cosmos.sign(address, messages.map(x => x.message), getFeeInfo(combineGas(messages)), 'memo', {
        accountNumber: account.account,
        chainId: chainId,
        sequence: account.seq
    }))
        .then((txRaw) => Uint8Array.from(tx_1.TxRaw.encode(txRaw).finish()))
        .then((signedTx) => cosmos.broadcastTx(signedTx, 30000, 1000))
        .then(resp => stargate_1.isBroadcastTxFailure(resp) ? function () { throw resp.rawLog; }() : resp)
        .then(() => new Uint8Array())
        .catch((e) => {
        if (/account sequence mismatch/.test(e)) {
            (service.accountRequested = undefined);
        }
        else {
            throw e;
        }
    }));
};
let msgChain = Promise.resolve();
const getSequence = (service, cosmos) => (service.accountRequested ? (service.accountRequested = service.accountRequested
    .then(() => service.seq = service.seq + 1)) : (exports.mnemonicToAddress(service.mnemonic)
    .then(address => service.accountRequested = cosmos.getAccount(address)
    .then((data) => {
    if (!data) {
        throw 'Invalid account: check your mnemonic';
    }
    service.seq = data.sequence;
    service.account = data.accountNumber;
}))))
    .then(() => ({
    seq: service.seq,
    account: service.account
}));
const checkErrors = (res) => {
    if (!res.data) {
        throw res.rawLog;
    }
    return res;
};
const getFeeInfo = ({ max_fee, gas_price = 0.002, max_gas = 10000000 }) => ({
    amount: [{
            denom: TOKEN_NAME,
            amount: (max_fee ? max_fee : max_gas * gas_price).toString()
        }],
    gas: max_gas.toString()
});
const combineGas = (transactions) => transactions.reduce((gasInfo, transaction) => {
    return {
        max_gas: (gasInfo.max_gas || 0) + (transaction.gasInfo.max_gas || 200000),
        max_fee: (gasInfo.max_fee || 0) + (transaction.gasInfo.max_fee || 0),
        gas_price: Math.max(gasInfo.gas_price || 0, transaction.gasInfo.gas_price || 0)
    };
}, {});
// Inside an async function...
const getSigner = (mnemonic) => proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: 'bluzelle' });
const getClient = (service) => getSigner(service.mnemonic)
    .then(signer => stargate_1.SigningStargateClient.connectWithSigner(service.url, signer, {
    registry: Registry_1.myRegistry,
    broadcastTimeoutMs: 300000,
}));
exports.getClient = getClient;
const getChainId = lodash_1.memoize((client) => client.getChainId());
exports.testHook = {
    getDelayBetweenRequests
};
//# sourceMappingURL=CommunicationService.js.map