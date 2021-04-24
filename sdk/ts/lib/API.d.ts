import { BluzelleConfig } from "./types/BluzelleConfig";
import { GasInfo } from "./types/GasInfo";
import { AccountResult } from "./types/cosmos/AccountResult";
import { CommunicationService, WithTransactionsOptions } from "./services/CommunicationService";
import { Message } from "./types/Message";
import { MessageResponse } from "./types/MessageResponse";
import { LeaseInfo } from "./types/LeaseInfo";
import { TxCountResult, TxGetLeaseResult, TxGetNShortestLeasesResult, TxHasResult, TxKeysResult, TxReadResult, TxResult } from "./types/TxResult";
export { mnemonicToAddress } from './services/CommunicationService';
interface ABCIResponse<T> {
    height: number;
    result: T;
}
export interface SearchOptions {
    page?: number;
    limit?: number;
    reverse?: boolean;
}
interface TransactionResponse {
    height: string;
    txhash: string;
    raw_log: string;
    logs: unknown[];
    gas_wanted: string;
    gas_used: string;
    tx: {
        type: string;
        value: {
            msg: [
                {
                    type: string;
                    value: unknown;
                }
            ];
            fee: {
                amount: [
                    {
                        denom: string;
                        amount: string;
                    }
                ];
                gas: string;
            };
            signatures: [
                {
                    pub_key: {
                        type: string;
                        value: string;
                    };
                    signature: string;
                }
            ];
            memo: string;
        };
    };
    timestamp: string;
}
export declare class API {
    #private;
    cosmos: any;
    address: string;
    mnemonic: string;
    chainId: string;
    uuid: string;
    url: string;
    config: BluzelleConfig;
    communicationService: CommunicationService;
    constructor(config: BluzelleConfig);
    withTransaction<T>(fn: () => any, { memo }?: WithTransactionsOptions): Promise<MessageResponse<T>>;
    setMaxMessagesPerTransaction(count: number): void;
    account(address?: string): Promise<AccountResult>;
    isExistingAccount(): Promise<boolean>;
    count(): Promise<number>;
    create(key: string, value: string, gasInfo: GasInfo, leaseInfo?: LeaseInfo): Promise<TxResult>;
    createProposal(amount: number, title: string, description: string, gasInfo: GasInfo): Promise<{
        id: any;
    }>;
    depositToProposal(id: string, amount: number, title: string, description: string, gasInfo: GasInfo): Promise<MessageResponse<unknown>>;
    delegate(valoper: string, amount: number, gasInfo: GasInfo): Promise<MessageResponse<unknown>>;
    delete(key: string, gasInfo: GasInfo): Promise<TxResult>;
    deleteAll(gasInfo: GasInfo): Promise<TxResult>;
    getAddress(): Promise<string>;
    getLease(key: string): Promise<number>;
    generateBIP39Account: (entropy?: string) => string;
    getNShortestLeases(count: number): Promise<{
        key: string;
        lease: number;
    }[]>;
    getTx(txhash: string): Promise<TransactionResponse>;
    getBNT({ ubnt, address }?: {
        ubnt?: boolean;
        address?: string;
    }): Promise<number>;
    has(key: string): Promise<boolean>;
    keys(): Promise<string[]>;
    keyValues(): Promise<{
        key: string;
        value: string;
    }[]>;
    mint(address: string, gasInfo: GasInfo): Promise<TxResult>;
    multiUpdate(keyValues: {
        key: string;
        value: string;
    }[], gasInfo: GasInfo): Promise<TxResult>;
    myKeys(): Promise<string[]>;
    query<T>(queryString: string): Promise<T>;
    abciQuery<T>(method: string, data?: unknown): Promise<ABCIResponse<T>>;
    owner(key: string): Promise<string>;
    read(key: string, prove?: boolean): Promise<string>;
    rename(key: string, newKey: string, gasInfo: GasInfo): Promise<TxResult>;
    renewLease(key: string, gasInfo: GasInfo, leaseInfo: LeaseInfo): Promise<TxResult>;
    renewLeaseAll(gasInfo: GasInfo, leaseInfo?: LeaseInfo): Promise<TxResult>;
    search(searchString: string, options?: SearchOptions): Promise<{
        key: string;
        value: string;
    }[]>;
    sendMessage<T>(message: Message<T>, gasInfo: GasInfo): Promise<MessageResponse<unknown>>;
    taxInfo(): Promise<any>;
    txCount(gasInfo: GasInfo): Promise<TxCountResult>;
    txGetLease(key: string, gasInfo: GasInfo): Promise<TxGetLeaseResult>;
    txGetNShortestLeases(n: number, gasInfo: GasInfo): Promise<TxGetNShortestLeasesResult>;
    txHas(key: string, gasInfo: GasInfo): Promise<TxHasResult>;
    txKeys(gasInfo: GasInfo): Promise<TxKeysResult>;
    txKeyValues(gasInfo: GasInfo): Promise<any>;
    txRead(key: string, gasInfo: GasInfo): Promise<TxReadResult | undefined>;
    undelegate(valoper: string, amount: number, gasInfo: GasInfo): Promise<MessageResponse<unknown>>;
    update(key: string, value: string, gasInfo: GasInfo, leaseInfo?: LeaseInfo): Promise<TxResult>;
    upsert(key: string, value: string, gasInfo: GasInfo, leaseInfo?: LeaseInfo): Promise<TxResult>;
    version(): Promise<string>;
    withdrawRewards(valoper: string, gasInfo: GasInfo): Promise<number>;
    transferTokensTo(toAddress: string, amount: number, gasInfo: GasInfo, { ubnt, memo }?: {
        ubnt?: boolean;
        memo?: string;
    }): Promise<TxResult>;
}
//# sourceMappingURL=API.d.ts.map