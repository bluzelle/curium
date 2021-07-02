import {Tendermint34Client} from "@cosmjs/tendermint-rpc";
import {createProtobufRpcClient, ProtobufRpcClient, QueryClient} from "@cosmjs/stargate";
import {CommunicationService, sendMessage, withTransaction} from "./CommunicationService"
import {addMessageType} from "./Registry";
import {DirectSecp256k1HdWallet, DirectSecp256k1HdWalletOptions} from "@cosmjs/proto-signing";
import {Slip10RawIndex, HdPath} from "@cosmjs/crypto";
import {memoize} from 'lodash'

export interface SDKOptions {
    mnemonic?: string,
    url: string,
    gasPrice: number,
    maxGas: number,
    legacyCoin?: boolean
}

export interface SDK<Q, M> {
    q: Q,
    tx: M,
    address: string,
    url: string,
    withTransaction: (fn: () => unknown, options: {memo: string}) => unknown
};

export const sdk = <Q, M>(options: SDKOptions, qImpl: any, mImpl: any, msgTypes: Record<string, any>, cs: CommunicationService): Promise<SDK<Q, M>> => {

    return Promise.all([
        queryRpc(options),
        txRpc(options, cs, msgTypes),
        mnemonicToAddress(options.mnemonic || '', options.legacyCoin ?? false)
    ])
        .then(([queryRpc, txRpc, address]) => ({
            q: new qImpl(queryRpc),
            tx: new mImpl(txRpc),
            address,
            url: options.url,
            withTransaction: (fn: () => unknown, options: { memo: string }) => withTransaction(cs, fn, options),
        } as SDK<Q, M>))
};


const queryRpc = (options: SDKOptions): Promise<ProtobufRpcClient> =>
    Tendermint34Client.connect(options.url)
        .then(tendermintClient => new QueryClient(tendermintClient))
        .then(createProtobufRpcClient)



const txRpc = (options: SDKOptions, communicationService: CommunicationService, msgTypes: Record<string, any>): Promise<ProtobufRpcClient> => {
    return Promise.resolve({
        request: (service, method, data): Promise<Uint8Array> => {
            addMessageType(`/${service}${method}`, (msgTypes)[`Msg${method}`]);
            return sendMessage<any, Uint8Array>(communicationService, {
                typeUrl: `/${service}${method}`,
                value: (msgTypes)[`Msg${method}`].decode(data)
            }, {gas_price: options.gasPrice, max_gas: options.maxGas})
        }
    } as ProtobufRpcClient);
};

export const mnemonicToAddress = memoize<(mnemonic: string, legacyCoin: boolean) => Promise<string>>((mnemonic, legacyCoin): Promise<string> =>
    DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
        prefix: 'bluzelle',
        hdPaths: [getHdPaths(legacyCoin)]
    } as Partial<DirectSecp256k1HdWalletOptions>)
        .then(wallet => wallet.getAccounts())
        .then(x => x[0].address));


export const getHdPaths = (legacyCoin: boolean, index: number = 0) : HdPath => [
    Slip10RawIndex.hardened(44),
    Slip10RawIndex.hardened(legacyCoin ? 118 : 483),
    Slip10RawIndex.hardened(0),
    Slip10RawIndex.normal(0),
    Slip10RawIndex.normal(index)
];