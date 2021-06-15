import {GasInfo} from "../legacyAdapter/types/GasInfo";
import {Left, Right, Some} from "monet";
import {MessageResponse} from "../legacyAdapter/types/MessageResponse";
import {Message} from "../legacyAdapter/types/Message";
import {memoize} from 'lodash'
import delay from "delay";
import {DirectSecp256k1HdWallet, EncodeObject} from "@cosmjs/proto-signing";

import {TxRaw} from "@cosmjs/proto-signing/build/codec/cosmos/tx/v1beta1/tx";
import {myRegistry} from "./Registry";
import {BroadcastTxFailure, BroadcastTxResponse, SigningStargateClient} from "@cosmjs/stargate";
import {BroadcastTxCommitResponse, broadcastTxCommitSuccess, Client, Tendermint34Client} from "@cosmjs/tendermint-rpc";
import {passThroughAwait} from "promise-passthrough";

const TOKEN_NAME = 'ubnt';
globalThis.btoa
interface MessageQueueItem<T> {
    message: Message<T>
    gasInfo: GasInfo
}

const dummyMessageResponse = new Uint8Array()

export interface CommunicationService {
    mnemonic: string
    url: string
    seq: number
    account: number
    accountRequested?: Promise<unknown>
    transactionMessageQueue?: TransactionMessageQueue
}

interface TransactionMessageQueue {
    memo: string
    items: MessageQueueItem<unknown>[]
}

export interface WithTransactionsOptions {
    memo: string
}

export const mnemonicToAddress = (mnemonic: string): Promise<string> =>
    DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {prefix: 'bluzelle'})
        .then(wallet => wallet.getAccounts())
        .then(x => x[0].address)


const newTransactionMessageQueue = (items: MessageQueueItem<unknown>[], memo: string): TransactionMessageQueue => ({
    memo,
    items
})


export const newCommunicationService = (url: string, mnemonic: string) => ({
    url,
    mnemonic,
    seq: 0,
    account: 0
})

export const withTransaction = <T>(service: CommunicationService, fn: () => T, {memo}: WithTransactionsOptions): Promise<Uint8Array> => {
    if (service.transactionMessageQueue) {
        throw new Error('withTransaction() can not be nested')
    }
    service.transactionMessageQueue = newTransactionMessageQueue([], memo);
    fn();
    const result = sendMessages(service, service.transactionMessageQueue)
    service.transactionMessageQueue = undefined;
    return result;
}


export const sendMessage = <T, R>(ctx: CommunicationService, message: Message<T>, gasInfo: GasInfo): Promise<Uint8Array> => {
    return ctx.transactionMessageQueue ? Promise.resolve(ctx.transactionMessageQueue?.items.push({
            message, gasInfo
        }))
            .then(() => (dummyMessageResponse))
        : sendMessages(ctx, newTransactionMessageQueue([{
            message,
            gasInfo
        }], ''))
}


const sendMessages = (service: CommunicationService, queue: TransactionMessageQueue, retrans: boolean = false): Promise<Uint8Array> =>
    new Promise((resolve, reject) => {
        msgChain = msgChain
            .then(() => {
                    transmitTransaction(service, queue.items, {memo: queue.memo})
                        .then(resolve)
                        .catch(e =>
                            Some(retrans)
                                .filter(retrans => retrans === false)
                                .filter(() => /account sequence mismatch/.test(e))
                                .map(() => service.seq = 0)
                                .map(() => service.account = 0)
                                .map(() => delete service.accountRequested)
                                .map(() => sendMessages(service, queue, true))
                                .map(p => p.then(resolve).catch(reject))
                                .cata(() => reject(e), () => {
                                })
                        );
                }
            )
            // hacky way to make sure that connections arrive at server in order
            .then(() => delay(getDelayBetweenRequests(JSON.stringify(queue.items).length, service.url)))
    });

const getDelayBetweenRequests = (length: number, url: string): number =>
    Right<number, number>(length)
        .flatMap(length => length < 500 ? Left(3000) : Right(length))
        .flatMap(length => /localhost/.test(url) ? Left(500) : Left(500))
        .cata(t => t, () => 5000)


let chainId: string
const transmitTransaction = (service: CommunicationService, messages: MessageQueueItem<any>[], {memo}: { memo: string }): Promise<any> => {
    let cosmos: SigningStargateClient;
    let tendermint: Tendermint34Client
    return Tendermint34Client.connect('http://localhost:26657')
        .then(tender => tendermint = tender)
        .then(() => getClient(service))
        .then(c => cosmos = c)
        .then(client => getChainId(client).then(cId => chainId = cId))
        .then(() => getSequence(service, cosmos))
        .then((account) =>
            mnemonicToAddress(service.mnemonic)
                .then(address => cosmos.sign(address, messages.map(x => x.message) as EncodeObject[], getFeeInfo(combineGas(messages)), 'memo', {
                        accountNumber: account.account,
                        chainId: chainId,
                        sequence: account.seq
                    })
                )
                .then((txRaw: TxRaw) => Uint8Array.from(TxRaw.encode(txRaw).finish()))
                .then((signedTx: Uint8Array) => tendermint.broadcastTxCommit({tx: signedTx}))
                .then(x => x)
                .then(resp => broadcastTxCommitSuccess(resp) ? resp : function () {throw ({checkTx: resp.checkTx, deliverTx: resp.deliverTx})} ())
                //.then((signedTx: Uint8Array) => cosmos.broadcastTx(signedTx, cosmos.broadcastTimeoutMs, 0))
                //.then(passThroughAwait(resp => delay(3000)))
                //.then(successCom => tendermint.txSearchAll({query: `tx.hash='${Buffer.from(successCom.hash).toString('hex').toUpperCase()}'`}))
                //.then(successCom => tendermint.tx({hash: successCom.hash}))
                //.then(txResult => txResult.result.data)
                //.then(txSearch => txSearch.txs[0].result.data)
                .then(resp => resp.deliverTx?.data || new Uint8Array())
                .catch((e) => {
                    if (/account sequence mismatch/.test(e)) {
                        (service.accountRequested = undefined)
                    } else {
                        throw e
                    }
                })
        )

}

const pollForSuccess = async (resp: BroadcastTxCommitResponse): Promise<void> => {
    return new Promise((resolve) => {
        return broadcastTxCommitSuccess(resp) ? resolve() :
            pollForSuccess(resp)
    })
}

let msgChain = Promise.resolve()


interface State {
    seq: number
    account: number
}

const getSequence = (service: CommunicationService, cosmos: SigningStargateClient): Promise<State> =>
    (service.accountRequested ? (
        service.accountRequested = service.accountRequested
            .then(() =>
                service.seq = service.seq + 1
            )
    ) : (
        mnemonicToAddress(service.mnemonic)
            .then(address => service.accountRequested = cosmos.getSequence(address)
                .then(({accountNumber, sequence}) => {
                    service.seq = sequence
                    service.account = accountNumber
                }))))
        // .then(address =>
        //     service.accountRequested = cosmos.getAccount(address)
        //     .then((data: any) => {
        //         if (!data) {
        //             throw 'Invalid account: check your mnemonic'
        //         }
        //         service.seq = data.sequence
        //         service.account = data.accountNumber
        //     }))

        .then(() => ({
            seq: service.seq,
            account: service.account
        }));


const checkErrors = (res: BroadcastTxFailure): BroadcastTxResponse => {
    if (!res.data) {
        throw res.rawLog
    }
    return res

}

const getFeeInfo = ({max_fee, gas_price = 0.002, max_gas = 10000000}: GasInfo) => ({
    amount: [{
        denom: TOKEN_NAME,
        amount: (max_fee ? max_fee : max_gas * gas_price).toString()
    }],
    gas: max_gas.toString()
});

const combineGas = (transactions: MessageQueueItem<any>[]): GasInfo =>
    transactions.reduce((gasInfo: GasInfo, transaction: MessageQueueItem<any>) => {
        return {
            max_gas: (gasInfo.max_gas || 0) + (transaction.gasInfo.max_gas || 200000),
            max_fee: (gasInfo.max_fee || 0) + (transaction.gasInfo.max_fee || 0),
            gas_price: Math.max(gasInfo.gas_price || 0, transaction.gasInfo.gas_price || 0)
        } as GasInfo
    }, {});


// Inside an async function...
const getSigner = (mnemonic: string) => DirectSecp256k1HdWallet.fromMnemonic(
    mnemonic,
    {prefix: 'bluzelle'});


export const getClient = (service: CommunicationService) =>
    getSigner(service.mnemonic)
        .then(signer => SigningStargateClient.connectWithSigner(
            service.url,
            signer,
            {
                registry: myRegistry,
                broadcastTimeoutMs: 120000,
            }
        ));

const getChainId = memoize<(client: SigningStargateClient) => Promise<string>>((client) => client.getChainId())


export const testHook = {
    getDelayBetweenRequests
}