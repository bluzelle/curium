import { SDKOptions } from '../client-lib/rpc';
import { BluzelleSdk } from "../bz-sdk/bz-sdk";
import { Lease } from "../codec/crud/lease";
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
    create(key: string, value: string, lease?: Lease): Promise<unknown>;
    delete(key: string): Promise<unknown>;
    generateBIP39Account: (entropy?: string) => string;
    convertLeaseToSeconds: (lease: any) => number;
    read(key: string): Promise<string>;
    update(key: string, value: string, leaseInfo?: Lease): Promise<unknown>;
    upsert(key: string, value: string, leaseInfo?: Lease): Promise<unknown>;
}
//# sourceMappingURL=API.d.ts.map