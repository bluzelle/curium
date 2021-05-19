import Long from "long";
import _m0 from "protobufjs/minimal";
import { PagingRequest, PagingResponse } from "../crud/Paging";
export declare const protobufPackage = "bluzelle.curium.crud";
/** this line is used by starport scaffolding # 3 */
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
    address: string;
    uuid: string;
}
export interface QueryCountResponse {
    uuid: string;
    count: Long;
}
export interface QueryHasRequest {
    uuid: string;
    key: string;
}
export interface QueryHasResponse {
    has: boolean;
}
export interface QuerySearchResponse {
    searchString: string;
}
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
export declare const QuerySearchResponse: {
    encode(message: QuerySearchResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QuerySearchResponse;
    fromJSON(object: any): QuerySearchResponse;
    toJSON(message: QuerySearchResponse): unknown;
    fromPartial(object: DeepPartial<QuerySearchResponse>): QuerySearchResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** this line is used by starport scaffolding # 2 */
    Read(request: QueryReadRequest): Promise<QueryReadResponse>;
    Keys(request: QueryKeysRequest): Promise<QueryKeysResponse>;
    MyKeys(request: QueryMyKeysRequest): Promise<QueryMyKeysResponse>;
    Count(request: QueryCountRequest): Promise<QueryCountResponse>;
    Has(request: QueryHasRequest): Promise<QueryHasResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    Read(request: QueryReadRequest): Promise<QueryReadResponse>;
    Keys(request: QueryKeysRequest): Promise<QueryKeysResponse>;
    MyKeys(request: QueryMyKeysRequest): Promise<QueryMyKeysResponse>;
    Count(request: QueryCountRequest): Promise<QueryCountResponse>;
    Has(request: QueryHasRequest): Promise<QueryHasResponse>;
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