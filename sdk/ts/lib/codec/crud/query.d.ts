import Long from "long";
import _m0 from "protobufjs/minimal";
import { PagingRequest, PagingResponse } from "../crud/Paging";
import { KeyValue, KeyLease } from "../crud/KeyValue";
export declare const protobufPackage = "bluzelle.curium.crud";
export interface QueryKeyValuesRequest {
    uuid: string;
    pagination?: PagingRequest;
}
export interface QueryKeyValuesResponse {
    keyValues: KeyValue[];
    pagination?: PagingResponse;
}
export interface QueryReadRequest {
    uuid: string;
    key: string;
}
export interface QueryReadResponse {
    value: Uint8Array;
}
export interface QueryKeysRequest {
    uuid: string;
    pagination?: PagingRequest;
}
export interface QueryKeysResponse {
    keys: string[];
    pagination?: PagingResponse;
}
export interface QueryMyKeysRequest {
    address: string;
    uuid: string;
    pagination?: PagingRequest;
}
export interface QueryMyKeysResponse {
    keys: string[];
    pagination?: PagingResponse;
}
export interface QueryCountRequest {
    uuid: string;
}
export interface QueryCountResponse {
    uuid: string;
    count: number;
}
export interface QueryHasRequest {
    uuid: string;
    key: string;
}
export interface QueryHasResponse {
    has: boolean;
}
export interface QuerySearchRequest {
    uuid: string;
    searchString: string;
    pagination?: PagingRequest;
}
export interface QuerySearchResponse {
    keyValues: KeyValue[];
    pagination?: PagingResponse;
}
export interface QueryGetLeaseRequest {
    uuid: string;
    key: string;
}
export interface QueryGetLeaseResponse {
    uuid: string;
    key: string;
    leaseBlocks: Long;
}
export interface QueryGetNShortestLeasesRequest {
    uuid: string;
    num: number;
}
export interface QueryGetNShortestLeasesResponse {
    uuid: string;
    keyLeases: KeyLease[];
}
export declare const QueryKeyValuesRequest: {
    encode(message: QueryKeyValuesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryKeyValuesRequest;
    fromJSON(object: any): QueryKeyValuesRequest;
    toJSON(message: QueryKeyValuesRequest): unknown;
    fromPartial(object: DeepPartial<QueryKeyValuesRequest>): QueryKeyValuesRequest;
};
export declare const QueryKeyValuesResponse: {
    encode(message: QueryKeyValuesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryKeyValuesResponse;
    fromJSON(object: any): QueryKeyValuesResponse;
    toJSON(message: QueryKeyValuesResponse): unknown;
    fromPartial(object: DeepPartial<QueryKeyValuesResponse>): QueryKeyValuesResponse;
};
export declare const QueryReadRequest: {
    encode(message: QueryReadRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryReadRequest;
    fromJSON(object: any): QueryReadRequest;
    toJSON(message: QueryReadRequest): unknown;
    fromPartial(object: DeepPartial<QueryReadRequest>): QueryReadRequest;
};
export declare const QueryReadResponse: {
    encode(message: QueryReadResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryReadResponse;
    fromJSON(object: any): QueryReadResponse;
    toJSON(message: QueryReadResponse): unknown;
    fromPartial(object: DeepPartial<QueryReadResponse>): QueryReadResponse;
};
export declare const QueryKeysRequest: {
    encode(message: QueryKeysRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryKeysRequest;
    fromJSON(object: any): QueryKeysRequest;
    toJSON(message: QueryKeysRequest): unknown;
    fromPartial(object: DeepPartial<QueryKeysRequest>): QueryKeysRequest;
};
export declare const QueryKeysResponse: {
    encode(message: QueryKeysResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryKeysResponse;
    fromJSON(object: any): QueryKeysResponse;
    toJSON(message: QueryKeysResponse): unknown;
    fromPartial(object: DeepPartial<QueryKeysResponse>): QueryKeysResponse;
};
export declare const QueryMyKeysRequest: {
    encode(message: QueryMyKeysRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryMyKeysRequest;
    fromJSON(object: any): QueryMyKeysRequest;
    toJSON(message: QueryMyKeysRequest): unknown;
    fromPartial(object: DeepPartial<QueryMyKeysRequest>): QueryMyKeysRequest;
};
export declare const QueryMyKeysResponse: {
    encode(message: QueryMyKeysResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryMyKeysResponse;
    fromJSON(object: any): QueryMyKeysResponse;
    toJSON(message: QueryMyKeysResponse): unknown;
    fromPartial(object: DeepPartial<QueryMyKeysResponse>): QueryMyKeysResponse;
};
export declare const QueryCountRequest: {
    encode(message: QueryCountRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryCountRequest;
    fromJSON(object: any): QueryCountRequest;
    toJSON(message: QueryCountRequest): unknown;
    fromPartial(object: DeepPartial<QueryCountRequest>): QueryCountRequest;
};
export declare const QueryCountResponse: {
    encode(message: QueryCountResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryCountResponse;
    fromJSON(object: any): QueryCountResponse;
    toJSON(message: QueryCountResponse): unknown;
    fromPartial(object: DeepPartial<QueryCountResponse>): QueryCountResponse;
};
export declare const QueryHasRequest: {
    encode(message: QueryHasRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryHasRequest;
    fromJSON(object: any): QueryHasRequest;
    toJSON(message: QueryHasRequest): unknown;
    fromPartial(object: DeepPartial<QueryHasRequest>): QueryHasRequest;
};
export declare const QueryHasResponse: {
    encode(message: QueryHasResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryHasResponse;
    fromJSON(object: any): QueryHasResponse;
    toJSON(message: QueryHasResponse): unknown;
    fromPartial(object: DeepPartial<QueryHasResponse>): QueryHasResponse;
};
export declare const QuerySearchRequest: {
    encode(message: QuerySearchRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QuerySearchRequest;
    fromJSON(object: any): QuerySearchRequest;
    toJSON(message: QuerySearchRequest): unknown;
    fromPartial(object: DeepPartial<QuerySearchRequest>): QuerySearchRequest;
};
export declare const QuerySearchResponse: {
    encode(message: QuerySearchResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QuerySearchResponse;
    fromJSON(object: any): QuerySearchResponse;
    toJSON(message: QuerySearchResponse): unknown;
    fromPartial(object: DeepPartial<QuerySearchResponse>): QuerySearchResponse;
};
export declare const QueryGetLeaseRequest: {
    encode(message: QueryGetLeaseRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryGetLeaseRequest;
    fromJSON(object: any): QueryGetLeaseRequest;
    toJSON(message: QueryGetLeaseRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetLeaseRequest>): QueryGetLeaseRequest;
};
export declare const QueryGetLeaseResponse: {
    encode(message: QueryGetLeaseResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryGetLeaseResponse;
    fromJSON(object: any): QueryGetLeaseResponse;
    toJSON(message: QueryGetLeaseResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetLeaseResponse>): QueryGetLeaseResponse;
};
export declare const QueryGetNShortestLeasesRequest: {
    encode(message: QueryGetNShortestLeasesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryGetNShortestLeasesRequest;
    fromJSON(object: any): QueryGetNShortestLeasesRequest;
    toJSON(message: QueryGetNShortestLeasesRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetNShortestLeasesRequest>): QueryGetNShortestLeasesRequest;
};
export declare const QueryGetNShortestLeasesResponse: {
    encode(message: QueryGetNShortestLeasesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryGetNShortestLeasesResponse;
    fromJSON(object: any): QueryGetNShortestLeasesResponse;
    toJSON(message: QueryGetNShortestLeasesResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetNShortestLeasesResponse>): QueryGetNShortestLeasesResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** this line is used by starport scaffolding # 2 */
    Read(request: QueryReadRequest): Promise<QueryReadResponse>;
    Keys(request: QueryKeysRequest): Promise<QueryKeysResponse>;
    MyKeys(request: QueryMyKeysRequest): Promise<QueryMyKeysResponse>;
    Count(request: QueryCountRequest): Promise<QueryCountResponse>;
    Has(request: QueryHasRequest): Promise<QueryHasResponse>;
    Search(request: QuerySearchRequest): Promise<QuerySearchResponse>;
    GetNShortestLeases(request: QueryGetNShortestLeasesRequest): Promise<QueryGetNShortestLeasesResponse>;
    GetLease(request: QueryGetLeaseRequest): Promise<QueryGetLeaseResponse>;
    KeyValues(request: QueryKeyValuesRequest): Promise<QueryKeyValuesResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    Read(request: QueryReadRequest): Promise<QueryReadResponse>;
    Keys(request: QueryKeysRequest): Promise<QueryKeysResponse>;
    MyKeys(request: QueryMyKeysRequest): Promise<QueryMyKeysResponse>;
    Count(request: QueryCountRequest): Promise<QueryCountResponse>;
    Has(request: QueryHasRequest): Promise<QueryHasResponse>;
    Search(request: QuerySearchRequest): Promise<QuerySearchResponse>;
    GetNShortestLeases(request: QueryGetNShortestLeasesRequest): Promise<QueryGetNShortestLeasesResponse>;
    GetLease(request: QueryGetLeaseRequest): Promise<QueryGetLeaseResponse>;
    KeyValues(request: QueryKeyValuesRequest): Promise<QueryKeyValuesResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined | Long;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
//# sourceMappingURL=query.d.ts.map