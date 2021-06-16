
import {MessageResponse} from "./types/MessageResponse";
import {pullAt} from 'lodash'
import {TxResult} from "./types/TxResult";
import {assert} from "./Assert";
import {entropyToMnemonic, generateMnemonic} from "bip39";
import {SDKOptions} from '../client-lib/rpc'
import {bluzelle, BluzelleSdk} from "../bz-sdk/bz-sdk";
import {Lease} from "../codec/hackathon-crud/lease";
import {AccountResult} from "./types/cosmos/AccountResult";


// TEMP STUB
const BLOCK_TIME_IN_SECONDS = 5.5;
const DEFAULT_LEASE = {seconds: 0, minutes: 0, hours: 0, days: 0, years: 0}


interface QueryError {
    status: number
    error: string
}

interface ABCIResponse<T> {
    height: number,
    result: T
}

export interface SearchOptions {
    page?: number
    limit?: number
    reverse?: boolean
}

interface TransactionResponse {
    height: string
    txhash: string,
    raw_log: string
    logs: unknown[],
    gas_wanted: string,
    gas_used: string,
    tx: {
        type: string,
        value: {
            msg: [
                {
                    type: string,
                    value: unknown
                }
            ],
            fee: {
                amount: [
                    {
                        denom: string,
                        amount: string
                    }
                ],
                gas: string
            },
            signatures: [
                {
                    pub_key: {
                        type: string,
                        value: string
                    },
                    signature: string
                }
            ],
            memo: string
        }
    },
    timestamp: string
}

export const legacyAdapter = (options: APIOptions): API => new API(options)


export type APIOptions = SDKOptions & {uuid: string}

export class API {
    config: APIOptions;
    client?: BluzelleSdk;

    constructor(config: APIOptions) {
        this.config = config;
    }


    getClient(): Promise<BluzelleSdk> {
        return this.client ? Promise.resolve(this.client) : bluzelle(this.config)
    }



    // withTransaction<T>(fn: () => any, {memo}: WithTransactionsOptions = {memo: ''}): Promise<MessageResponse<T>> {
    //     return withTransaction<T>(this.communicationService, fn, {memo});
    // }
    //
    // setMaxMessagesPerTransaction(count: number) {
    //     // This is here for backward compatibility - delete later
    // }
    //
    // account(address: string = this.address): Promise<AccountResult> {
    //     return getCosmos(this)
    //         .then(cosmos => cosmos.getAccounts(address))
    //         .then((x: AccountsResult) => x.result.value);
    // }
    //
    // isExistingAccount(): Promise<boolean> {
    //     return this.account()
    //         .then(x => !!x.coins.length)
    // }
    //
    // count(): Promise<number> {
    //     return this.#abciQuery<QueryCountResult>(`/custom/crud/count/${this.uuid}`)
    //         .then(x => x.result)
    //         .then((res: QueryCountResult) => parseInt(res.count || '0'));
    // }
    //
    //
    async create(key: string, value: string, lease: Lease = DEFAULT_LEASE): Promise<unknown> {

        return this.getClient()
            .then(client => client.db.tx.Create({
                key: key,
                value: new TextEncoder().encode(value),
                uuid: this.config.uuid,
                creator: client.db.address,
                lease: lease,
                metadata: new Uint8Array()
            }))
            .then(x => x)

    }
    //
    // createProposal(amount: number, title: string, description: string, gasInfo: GasInfo) {
    //     return this.sendMessage({
    //             "type": "cosmos-sdk/MsgSubmitProposal",
    //             "value": {
    //                 "content": {
    //                     "type": "cosmos-sdk/TextProposal",
    //                     "value": {
    //                         "title": title,
    //                         "description": description
    //                     }
    //                 },
    //                 "initial_deposit": [
    //                     {
    //                         "denom": "ubnt",
    //                         "amount": `${amount}000000`
    //                     }
    //                 ],
    //                 "proposer": this.address
    //             }
    //         }, gasInfo
    //     )
    //         .then((x: any) => ({id: x.logs[0].events[2].attributes[0].value}))
    // }
    //
    // depositToProposal(id: string, amount: number, title: string, description: string, gasInfo: GasInfo) {
    //     return this.sendMessage({
    //             "type": "cosmos-sdk/MsgDeposit",
    //             "value": {
    //                 "proposal_id": id,
    //                 "depositor": this.address,
    //                 "amount": [
    //                     {
    //                         "denom": "ubnt",
    //                         "amount": `${amount}000000`
    //                     }
    //                 ]
    //             }
    //         }, gasInfo
    //     );
    // }
    //
    //
    // delegate(valoper: string, amount: number, gasInfo: GasInfo) {
    //     return this.sendMessage({
    //         "type": "cosmos-sdk/MsgDelegate",
    //         "value": {
    //             "delegator_address": this.address,
    //             "validator_address": valoper,
    //             "amount": {
    //                 "denom": "ubnt",
    //                 "amount": `${amount}000000`
    //             }
    //         }
    //     }, gasInfo)
    // }
    //
    //
    delete(key: string): Promise<unknown> {
        return this.getClient()
            .then(client => client.db.tx.Delete({
                key: key,
                uuid: this.config.uuid,
                creator: client.db.address,
                }))
            //.then(standardTxResult)
    }
    //
    // deleteAll(gasInfo: GasInfo): Promise<TxResult> {
    //     return sendMessage<DeleteAllMessage, void>(this.communicationService, {
    //         type: 'crud/deleteall',
    //         value: {
    //             UUID: this.uuid,
    //             Owner: this.address
    //         }
    //     }, gasInfo)
    //         .then(standardTxResult)
    // }
    //
    // getAddress(): Promise<string> {
    //     return mnemonicToAddress(this.mnemonic);
    // }
    //
    // getLease(key: string): Promise<number> {
    //     return this.getClient()
    //         .then(client => client.db.tx.GetLease({
    //             creator: client.db.address,
    //             uuid: this.config.uuid,
    //             key
    //         }))
    //         .then(resp => resp.seconds)
    //         // .catch(res => {
    //         //     throw res.error === 'Not Found' ? `key "${key}" not found` : res.error
    //         // })
    // }
    //
    generateBIP39Account = (entropy: string = ''): string => {
        assert(entropy.length === 0 || entropy.length === 64, 'Entropy must be 64 char hex');
        return entropy ? entropyToMnemonic(entropy) : generateMnemonic(256);
    }

    convertLeaseToSeconds = (lease: Lease): number => {
        return lease.years * 365 * 24 * 60 * 60 + lease.days * 24 * 60 * 60 + lease.hours * 60 * 60 + lease.minutes * 60 + lease.seconds
    }

    //
    // async getNShortestLeases(count: number) {
    //     assert(count >= 0, ClientErrors.INVALID_VALUE_SPECIFIED);
    //     return this.#abciQuery<QueryGetNShortestLeasesResult>(`/custom/crud/getnshortestleases/${this.uuid}/${count}`)
    //         .then(x => x.result)
    //         .then(res => res.keyleases.map(({key, lease}) => ({
    //             key,
    //             lease: Math.round(parseInt(lease) * BLOCK_TIME_IN_SECONDS)
    //         })));
    // }
    //
    // getTx(txhash: string): Promise<TransactionResponse> {
    //     return this.#query<TransactionResponse>(`txs/${txhash}`)
    // }
    //
    // getBNT({ubnt, address}: { ubnt?: boolean, address?: string } = {
    //     ubnt: false,
    //     address: this.address
    // }): Promise<number> {
    //     return this.account(address)
    //         .then(a => a.coins[0]?.amount || '0')
    //         .then(a => ubnt ? a : a.slice(0, -6) || '0')
    //         .then(parseInt)
    // }
    //
    // has(key: string): Promise<boolean> {
    //     return this.#abciQuery<QueryHasResult>(`/custom/crud/has/${this.uuid}/${key}`)
    //         .then(x => x.result.has)
    // }
    //
    // keys(): Promise<string[]> {
    //     return getRpcClient(this.url)
    //         .then(client => client.CrudValueAll({uuid: this.uuid}))
    //         .then(x => x.CrudValue)
    //         .then(values => values.map((v: any) => v.key))
    // }
    //
    // keyValues(): Promise<{ key: string, value: string }[]> {
    //     return this.#abciQuery<QueryKeyValuesResult>(`/custom/crud/keyvalues/${this.uuid}`)
    //         .then(x => x.result)
    //         .then(res => res.keyvalues)
    //         .then(keyvalues => keyvalues.map(({key, value}) => ({key, value: value})))
    // }
    //
    // async mint(address: string, gasInfo: GasInfo): Promise<TxResult> {
    //     assert(!!address, ClientErrors.ADDRESS_MUST_BE_A_STRING);
    //     assert(typeof address === 'string', ClientErrors.ADDRESS_MUST_BE_A_STRING);
    //
    //     return sendMessage<MintMessage, void>(this.communicationService, {
    //         type: "faucet/Mint",
    //         value: {
    //             Minter: address,
    //             Sender: this.address,
    //             Time: Date.now().toString()
    //         }
    //     }, gasInfo)
    //         .then(standardTxResult);
    // }
    //
    // async multiUpdate(keyValues: { key: string, value: string }[], gasInfo: GasInfo): Promise<TxResult> {
    //     assert(Array.isArray(keyValues), 'keyValues must be an array');
    //
    //     keyValues.forEach(({key, value}, index, array) => {
    //         assert(typeof key === 'string', ClientErrors.ALL_KEYS_MUST_BE_STRINGS);
    //         assert(typeof value === 'string', ClientErrors.ALL_VALUES_MUST_BE_STRINGS);
    //     });
    //
    //     return sendMessage<MultiUpdateMessage, void>(this.communicationService, {
    //         type: 'crud/multiupdate',
    //         value: {
    //             KeyValues: keyValues,
    //             UUID: this.uuid,
    //             Owner: this.address
    //         }
    //     }, gasInfo)
    //         .then(standardTxResult)
    // }
    //
    // myKeys(): Promise<string[]> {
    //     return this.#abciQuery<QueryKeysResult>(`/custom/crud/mykeys/${this.address}/${this.uuid}`)
    //         .then(x => x.result)
    //         .then(res => res.keys)
    //         .catch((x) => {
    //             throw x
    //         });
    // }
    //
    // query<T>(queryString: string): Promise<T> {
    //     return this.#query<T>(queryString);
    // }
    //
    // abciQuery<T>(method: string, data: unknown = {}): Promise<ABCIResponse<T>> {
    //     return this.#abciQuery<T>(method, data);
    // }
    //
    // owner(key: string): Promise<string> {
    //     return this.#abciQuery<QueryOwnerResult>(`/custom/crud/owner/${this.uuid}/${key}`)
    //         .then(x => x.result)
    //         .then(res => res.owner)
    //         .catch((x) => {
    //             if (x instanceof Error) {
    //                 throw x;
    //             }
    //             throw(new Error(x.error === 'Not Found' ? `key "${key}" not found` : x.error))
    //         });
    // }
    //
    read(key: string): Promise<string> {
        return this.getClient()
            .then(client => client.db.q.Read({
                uuid: this.config.uuid,
                key
            }))
            .then(resp => resp.value)
            .then(x => new TextDecoder().decode(x))
    }
    //
    // async rename(key: string, newKey: string, gasInfo: GasInfo): Promise<TxResult> {
    //     assert(typeof key === 'string', ClientErrors.KEY_MUST_BE_A_STRING);
    //     assert(typeof newKey === 'string', ClientErrors.NEW_KEY_MUST_BE_A_STRING);
    //
    //     return sendMessage<RenameMessage, void>(this.communicationService, {
    //         type: 'crud/rename',
    //         value: {
    //             Key: key,
    //             NewKey: newKey,
    //             UUID: this.uuid,
    //             Owner: this.address
    //         }
    //     }, gasInfo)
    //         .then(standardTxResult)
    //
    // }
    //
    //
    // async renewLease(key: string, gasInfo: GasInfo, leaseInfo: LeaseInfo): Promise<TxResult> {
    //     assert(typeof key === 'string', ClientErrors.KEY_MUST_BE_A_STRING);
    //
    //     const blocks = convertLease(leaseInfo);
    //
    //     assert(blocks >= 0, ClientErrors.INVALID_LEASE_TIME)
    //
    //     return sendMessage<RenewLeaseMessage, void>(this.communicationService, {
    //         type: 'crud/renewlease',
    //         value: {
    //             Key: key,
    //             Lease: blocks.toString(),
    //             UUID: this.uuid,
    //             Owner: this.address
    //         }
    //     }, gasInfo)
    //         .then(standardTxResult)
    // }
    //
    //
    // async renewLeaseAll(gasInfo: GasInfo, leaseInfo: LeaseInfo = {}): Promise<TxResult> {
    //     const blocks = convertLease(leaseInfo);
    //     assert(blocks >= 0, ClientErrors.INVALID_LEASE_TIME);
    //
    //     return sendMessage<RenewLeaseAllMessage, void>(this.communicationService, {
    //         type: 'crud/renewleaseall',
    //         value: {
    //             Lease: blocks.toString(),
    //             UUID: this.uuid,
    //             Owner: this.address
    //         }
    //     }, gasInfo)
    //         .then(standardTxResult)
    // }
    //
    // search(searchString: string, options: SearchOptions = {
    //     page: 1,
    //     limit: Number.MAX_SAFE_INTEGER,
    //     reverse: false
    // }): Promise<{ key: string, value: string }[]> {
    //     return this.#abciQuery<QueryKeyValuesResult>(`/custom/crud/search/${this.uuid}/${searchString}/${options.page || 1}/${options.limit || Number.MAX_SAFE_INTEGER}/${options.reverse ? 'desc' : 'asc'}`)
    //         .then(x => x.result)
    //         .then(res => res.keyvalues)
    //         .then(keyvalues => keyvalues.map(({key, value}) => ({key, value: value})))
    // }
    //
    //
    // sendMessage<T>(message: Message<T>, gasInfo: GasInfo) {
    //     return sendMessage(this.communicationService, message, gasInfo);
    // }
    //
    // taxInfo() {
    //     return this.#abciQuery<any>('/custom/tax/info')
    //         .then(x => x.result);
    // }
    //
    // async txCount(gasInfo: GasInfo): Promise<TxCountResult> {
    //     return sendMessage<CountMessage, TxCountResponse>(this.communicationService, {
    //         type: 'crud/count',
    //         value: {
    //             UUID: this.uuid,
    //             Owner: this.address
    //         }
    //     }, gasInfo)
    //         .then(res => findMine<TxCountResponse>(res, it => it.count !== undefined))
    //         .then(({res, data}) => ({...standardTxResult(res), count: parseInt(data?.count || '0')}))
    // }
    //
    // async txGetLease(key: string, gasInfo: GasInfo): Promise<TxGetLeaseResult> {
    //     return sendMessage<GetLeaseMessage, TxGetLeaseResponse>(this.communicationService, {
    //         type: 'crud/getlease',
    //         value: {
    //             Key: key,
    //             UUID: this.uuid,
    //             Owner: this.address
    //         }
    //     }, gasInfo)
    //         .then(res => findMine<TxGetLeaseResponse>(res, it => it.key === key && it.lease !== undefined))
    //         .then(({res, data}) => ({
    //             ...standardTxResult(res),
    //             lease: Math.round(parseInt(data?.lease || '0') * BLOCK_TIME_IN_SECONDS)
    //         }))
    // }
    //
    // async txGetNShortestLeases(n: number, gasInfo: GasInfo): Promise<TxGetNShortestLeasesResult> {
    //     return {
    //         txhash: 'xxx',
    //         height: 1,
    //         leases: []
    //     }
    // }
    //
    // async txHas(key: string, gasInfo: GasInfo): Promise<TxHasResult> {
    //     assert(typeof key === 'string', ClientErrors.KEY_MUST_BE_A_STRING);
    //
    //     return sendMessage<HasMessage, TxHasResponse>(this.communicationService, {
    //         type: 'crud/has',
    //         value: {
    //             Key: key,
    //             UUID: this.uuid,
    //             Owner: this.address,
    //         }
    //     }, gasInfo)
    //         .then(res => findMine<TxHasResponse>(res, it => it.key === key && it.has !== undefined))
    //         .then(({res, data}) => ({
    //             ...standardTxResult(res),
    //             key: data?.key || '',
    //             has: data?.has || false
    //         }))
    //
    // }
    //
    // async txKeys(gasInfo: GasInfo): Promise<TxKeysResult> {
    //     return sendMessage<KeysMessage, TxKeysResponse>(this.communicationService, {
    //         type: 'crud/keys',
    //         value: {
    //             UUID: this.uuid,
    //             Owner: this.address
    //         }
    //     }, gasInfo)
    //         .then(res => findMine<TxKeysResponse>(res, it => it.keys !== undefined))
    //         .then(({res, data}) => ({
    //             ...standardTxResult(res),
    //             keys: data?.keys || []
    //         }))
    // }
    //
    // async txKeyValues(gasInfo: GasInfo): Promise<any> {
    //     return sendMessage<KeyValuesMessage, TxKeyValuesResponse>(this.communicationService, {
    //         type: 'crud/keyvalues',
    //         value: {
    //             Owner: this.address,
    //             UUID: this.uuid
    //         }
    //     }, gasInfo)
    //         .then(res => findMine<TxKeyValuesResponse>(res, it => {
    //             return Array.isArray(it.keyvalues) &&
    //                 !!(it.keyvalues.length === 0 || (it.keyvalues[0].key && it.keyvalues[0].value))
    //         }))
    //         .then(({res, data}) => ({height: res.height, txhash: res.txhash, keyvalues: data?.keyvalues}))
    //         .then(({height, txhash, keyvalues}) => ({
    //             height,
    //             txhash,
    //             keyvalues: keyvalues?.map(({key, value}) => ({key, value: value}))
    //         }))
    // }
    //
    //
    // txRead(key: string, gasInfo: GasInfo): Promise<TxReadResult | undefined> {
    //     return mnemonicToAddress(this.mnemonic)
    //         .then(address => sendMessage<MsgRead, MsgReadResponse>(this.communicationService, {
    //             typeUrl: "/bluzelle.curium.crud.MsgRead",
    //             value: {
    //                 key,
    //                 uuid: this.uuid,
    //                 creator: address
    //             }
    //         }, gasInfo))
    //         .then(x => x)
    //         .then(res => findMine<MsgReadResponse>(res, it => it != undefined && it?.key == key))
    //         .then(({res, data}) => ({
    //             ...standardTxResult(res),
    //             value: new TextDecoder().decode(data?.value)
    //         }))
    // }
    //
    //
    // txReadTemp(key: string, gasInfo: GasInfo): Promise<Uint8Array> {
    //     return mnemonicToAddress(this.mnemonic)
    //         .then(address => sendMessage<MsgRead, {msgType: string, data: Uint8Array} >(this.communicationService, {
    //             typeUrl: "/bluzelle.curium.crud.MsgRead",
    //             value: {
    //                 key,
    //                 uuid: this.uuid,
    //                 creator: address
    //             }
    //         }, gasInfo))
    //         .then(res => res.data[0].data)
    //
    // }
    //
    // undelegate(valoper: string, amount: number, gasInfo: GasInfo) {
    //     return this.sendMessage({
    //         "type": "cosmos-sdk/MsgUndelegate",
    //         "value": {
    //             "delegator_address": this.address,
    //             "validator_address": valoper,
    //             "amount": {
    //                 "denom": "ubnt",
    //                 "amount": `${amount}000000`
    //             }
    //         }
    //     }, gasInfo)
    // }
    //
    async update(key: string, value: string, leaseInfo: Lease = DEFAULT_LEASE): Promise<unknown> {

        return this.getClient()
            .then(client => client.db.tx.Update({
                creator: client.db.address,
                uuid: this.config.uuid,
                key: key,
                value: new TextEncoder().encode(value),
                lease: leaseInfo,
                metadata: new Uint8Array()
            }))
    }

    async upsert(key: string, value: string, leaseInfo: Lease = DEFAULT_LEASE): Promise<unknown> {

        return this.getClient()
            .then(client => client.db.tx.Upsert({
                        key: key,
                        value: new TextEncoder().encode(value),
                        uuid: this.config.uuid,
                        creator: client.db.address,
                        lease: leaseInfo,
                        metadata: new Uint8Array()
                    }))
    }
    //
    //
    // version(): Promise<string> {
    //     return this.#query<any>('node_info').then(res => res.application_version.version);
    // }
    //
    // withdrawRewards(valoper: string, gasInfo: GasInfo) {
    //     return this.sendMessage({
    //             "type": "cosmos-sdk/MsgWithdrawDelegationReward",
    //             "value": {
    //                 "delegator_address": this.address,
    //                 "validator_address": valoper
    //             }
    //         },
    //         gasInfo
    //     )
    //         .then((x: any) => x.logs[0].events[2].attributes[0].value)
    //         .then(x => x.replace('ubnt', ''))
    //         .then(parseInt)
    // }
    //
    // transferTokensTo(toAddress: string, amount: number, gasInfo: GasInfo, {
    //     ubnt,
    //     memo
    // }: { ubnt?: boolean, memo?: string } = {
    //     ubnt: false,
    //     memo: 'transfer'
    // }): Promise<TxResult> {
    //     return sendMessage<TransferTokensMessage, void>(this.communicationService, {
    //         type: "cosmos-sdk/MsgSend",
    //         value: {
    //             amount: [
    //                 {
    //                     amount: String(ubnt ? amount.toString() : `${amount}000000`),
    //                     denom: "ubnt"
    //                 }
    //             ],
    //             from_address: this.address,
    //             to_address: toAddress
    //         }
    //     }, gasInfo)
    //         .then(standardTxResult)
    // }
    //
    // #abciQuery = <T>(path: string, data: unknown = {}): Promise<ABCIResponse<T>> =>
    //     Promise.resolve(JSON.stringify(data))
    //         .then(Buffer.from)
    //         .then(b => b.toString('hex'))
    //         .then(data => ({
    //             Path: path,
    //             Data: data
    //         }))
    //         .then(JSON.stringify)
    //         .then(body => fetch(`${this.url}/abci-query`, {
    //             method: 'POST',
    //             body
    //         }))
    //         .then(async res => {
    //             let bodyText = await res.text();
    //             bodyText = bodyText.replace('}{', ',');
    //             const json = JSON.parse(bodyText);
    //             if (json.error) {
    //                 throw {
    //                     status: res.status,
    //                     error: json.error
    //                 }
    //             }
    //             return json
    //         })
    //
    //
    // #query = <T>(path: string): Promise<T> =>
    //     fetch(`${this.url}/${path}`)
    //         .then((res: any) => {
    //             if (res.status !== 200) {
    //                 throw {
    //                     status: res.status,
    //                     error: res.statusText
    //                 } as QueryError
    //             }
    //             return res.json().then((obj: any) => obj.result ?? obj)
    //         })
}


const MINUTE = 60
const HOUR = MINUTE * 60

const findMine = <T>(res: { data: T[] }, condition: (x: T) => boolean): { res: any, data: T | undefined } => {
    for (let i: number = 0; i < res.data.length; i++) {
        if (condition(res.data[i])) {
            const found = res.data[i];
            pullAt(res.data, i)
            return {res, data: found}
        }
    }
    return {res, data: undefined}
}

const standardTxResult = (res: MessageResponse<void>): TxResult => ({
    txhash: res.txhash,
    height: res.height,
})

