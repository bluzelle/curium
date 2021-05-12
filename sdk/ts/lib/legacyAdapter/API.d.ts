import { SDKOptions } from '../client-lib/rpc';
import { BluzelleSdk } from "../bz-sdk/bz-sdk";
import { Lease } from "../codec/crud/lease";
import { AccountResult } from "./types/cosmos/AccountResult";
export interface SearchOptions {
    page?: number;
    limit?: number;
    reverse?: boolean;
}
export declare const legacyAdapter: (options: APIOptions) => API;
export declare type APIOptions = SDKOptions & {
    uuid: string;
};
export declare class API {
    config: APIOptions;
    client?: BluzelleSdk;
    constructor(config: APIOptions);
    getClient(): Promise<BluzelleSdk>;
    account(address?: string): Promise<AccountResult>;
    create(key: string, value: string, lease?: Lease): Promise<unknown>;
    delete(key: string): Promise<unknown>;
    getLease(key: string): Promise<number>;
    generateBIP39Account: (entropy?: string) => string;
    convertLeaseToSeconds: (lease: Lease) => number;
    read(key: string): Promise<string>;
    update(key: string, value: string, leaseInfo?: Lease): Promise<unknown>;
    upsert(key: string, value: string, leaseInfo?: Lease): Promise<unknown>;
}
//# sourceMappingURL=API.d.ts.map