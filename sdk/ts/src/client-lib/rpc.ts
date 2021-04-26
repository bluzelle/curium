import {Tendermint34Client} from "@cosmjs/tendermint-rpc";
import {createProtobufRpcClient, ProtobufRpcClient, QueryClient} from "@cosmjs/stargate";
import Long from "long";
import {newCommunicationService, sendMessage, withTransaction, CommunicationService} from "./CommunicationService"
import {addMessageType} from "./Registry";
import {DirectSecp256k1HdWallet} from "@cosmjs/proto-signing";
import {memoize} from 'lodash'
import {MessageResponse} from "../legacyAdapter/types/MessageResponse";

export interface SDKOptions {
    mnemonic?: string,
    url: string,
    gasPrice: number,
    maxGas: number
}

export interface SDK<Q, M> {
    q: Q,
    tx: M,
    address: string,
    withTransaction: (fn: () => unknown, options: {memo: string}) => unknown
};

export const sdk = <Q, M>(options: SDKOptions, qImpl: any, mImpl: any, msgTypes: Record<string, any>, cs: CommunicationService): Promise<SDK<Q, M>> => {

    return Promise.all([
        queryRpc(options),
        txRpc(options, cs, msgTypes),
        mnemonicToAddress(options.mnemonic || '')
    ])
        .then(([queryRpc, txRpc, address]) => ({
            q: new qImpl(queryRpc),
            tx: new mImpl(txRpc),
            address,
            withTransaction: (fn: () => unknown, options: { memo: string }) => withTransaction(cs, fn, options)
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

export const mnemonicToAddress = memoize<(mnemonic: string) => Promise<string>>((mnemonic: string): Promise<string> =>
    DirectSecp256k1HdWallet.fromMnemonic(mnemonic, undefined, 'bluzelle')
        .then(wallet => wallet.getAccounts())
        .then(x => x[0].address))


