import {GasInfo} from "../legacyAdapter/types/GasInfo";
import {Some} from "monet";
import {Message} from "../legacyAdapter/types/Message";
import {memoize} from 'lodash'
import delay from "delay";
import {DirectSecp256k1HdWallet, DirectSecp256k1HdWalletOptions, EncodeObject, Registry} from "@cosmjs/proto-signing";
import {stringToPath} from "@cosmjs/crypto";

import {TxRaw} from "@cosmjs/proto-signing/build/codec/cosmos/tx/v1beta1/tx";
import {getMyRegistry, myRegistry} from "./Registry";
import {BroadcastTxResponse, isBroadcastTxFailure, SigningStargateClient} from "@cosmjs/stargate";
import {getHdPaths} from "./rpc";

const TOKEN_NAME = 'ubnt';

interface MessageQueueItem<T> {
    message: Message<T>
    gasInfo: GasInfo
}

const dummyMessageResponse = new Uint8Array(0)

export interface CommunicationService {
    mnemonic: string
    url: string
    seq: number
    account: number
    accountRequested?: Promise<unknown>
    transactionMessageQueue?: TransactionMessageQueue
    legacyCoin: boolean
}

interface TransactionMessageQueue {
    memo: string
    items: MessageQueueItem<unknown>[]
}

export interface WithTransactionsOptions {
    memo: string
}

export const mnemonicToAddress = (mnemonic: string, legacyCoin: boolean): Promise<string> =>
        Promise.resolve(getHdPaths(legacyCoin))
        .then(hdPath =>
            DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {prefix: 'bluzelle', hdPaths: [hdPath]})
                .then(wallet => wallet.getAccounts())
                .then(x => x[0].address)
        )


const newTransactionMessageQueue = (items: MessageQueueItem<unknown>[], memo: string): TransactionMessageQueue => ({
    memo,
    items
})


export const newCommunicationService = (url: string, mnemonic: string, hdPath: string) => ({
    url,
    mnemonic,
    hdPath,
    seq: 0,
    account: 0,
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
            // hacky way to make sure that connections arrive at server in order for https connections
            .then(() => delay(getDelayHttpDelay(service)))
    });

const getDelayHttpDelay = (cs: CommunicationService): number =>
    cs.url.match(/ws/) ? 0 : 3000


let chainId: string
const transmitTransaction = (service: CommunicationService, messages: MessageQueueItem<any>[], {memo}: { memo: string }): Promise<any> => {
    let cosmos: SigningStargateClient;
    return getClient(service)
        .then(c => cosmos = c)
        .then(client => getChainId(client).then(cId => chainId = cId))
        .then(() => getSequence(service, cosmos))
        .then((account) =>
            mnemonicToAddress(service.mnemonic, service.legacyCoin)
                .then(address => cosmos.sign(address, messages.map(x => x.message) as EncodeObject[], getFeeInfo(combineGas(messages)), 'memo', {
                        accountNumber: account.account,
                        chainId: chainId,
                        sequence: account.seq
                    })
                )
                .then((txRaw: TxRaw) => Uint8Array.from(TxRaw.encode(txRaw).finish()))
                .then((signedTx: Uint8Array) => cosmos.broadcastTx(signedTx, 30000, 1000))
                .then(checkInternalErrors)
                .then(() => new Uint8Array(0))
                .catch((e) => {
                    if (/account sequence mismatch/.test(e)) {
                        (service.accountRequested = undefined)
                    } else {
                        throw e
                    }
                })
        )

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
        service.accountRequested = mnemonicToAddress(service.mnemonic, service.legacyCoin)
            .then(address =>
                service.accountRequested = cosmos.getAccount(address)
                    .then((data: any) => {
                        if (!data) {
                            throw 'Invalid account: check your mnemonic'
                        }
                        service.seq = data.sequence
                        service.account = data.accountNumber
                    }))))
        .then(() => ({
            seq: service.seq,
            account: service.account
        }));


const checkInternalErrors = (res: BroadcastTxResponse): BroadcastTxResponse => {
    if (isBroadcastTxFailure(res) || res.rawLog?.match(/fail/)) {
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
const getSigner = (mnemonic: string, legacyCoin: boolean) =>
    Promise.resolve(legacyCoin)
        .then(getHdPaths)
        .then(hdPath =>
            DirectSecp256k1HdWallet.fromMnemonic(
                mnemonic, {
                    prefix: 'bluzelle',
                    hdPaths: [hdPath]
                } as Partial<DirectSecp256k1HdWalletOptions>
            ));

const getMemoizedClient = memoize((service: CommunicationService) =>
    getSigner(service.mnemonic, service.legacyCoin)
        .then(signer => SigningStargateClient.connectWithSigner(
            service.url,
            signer,
            {
                registry: myRegistry,
                broadcastTimeoutMs: 300000,
            }
        ))
);


export const getClient = (service: CommunicationService) => {

    return getMemoizedClient(service)
        .then(updateRegistry.bind(null, getMyRegistry()));


    function updateRegistry(registry: Registry, client: SigningStargateClient) {
        // @ts-ignore
        client.registry = registry;
        return client;
    };
};

const getChainId = memoize<(client: SigningStargateClient) => Promise<string>>((client) => client.getChainId())


