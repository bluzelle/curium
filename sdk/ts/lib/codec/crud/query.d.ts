import Long from "long";
import _m0 from "protobufjs/minimal";
import { CrudValue } from "../crud/CrudValue";
import { PageRequest, PageResponse } from "../cosmos/base/query/v1beta1/pagination";
export declare const protobufPackage = "bluzelle.curium.crud";
/** this line is used by starport scaffolding # 3 */
export interface QueryGetCrudValueRequest {
    uuid: string;
    key: string;
}
export interface QueryGetCrudValueResponse {
    CrudValue?: CrudValue;
}
export interface QueryAllCrudValueRequest {
    uuid: string;
    pagination?: PageRequest;
}
export interface QueryAllCrudValueResponse {
    CrudValue: CrudValue[];
    pagination?: PageResponse;
}
export declare const QueryGetCrudValueRequest: {
    encode(message: QueryGetCrudValueRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryGetCrudValueRequest;
    fromJSON(object: any): QueryGetCrudValueRequest;
    toJSON(message: QueryGetCrudValueRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetCrudValueRequest>): QueryGetCrudValueRequest;
};
export declare const QueryGetCrudValueResponse: {
    encode(message: QueryGetCrudValueResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryGetCrudValueResponse;
    fromJSON(object: any): QueryGetCrudValueResponse;
    toJSON(message: QueryGetCrudValueResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetCrudValueResponse>): QueryGetCrudValueResponse;
};
export declare const QueryAllCrudValueRequest: {
    encode(message: QueryAllCrudValueRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryAllCrudValueRequest;
    fromJSON(object: any): QueryAllCrudValueRequest;
    toJSON(message: QueryAllCrudValueRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllCrudValueRequest>): QueryAllCrudValueRequest;
};
export declare const QueryAllCrudValueResponse: {
    encode(message: QueryAllCrudValueResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): QueryAllCrudValueResponse;
    fromJSON(object: any): QueryAllCrudValueResponse;
    toJSON(message: QueryAllCrudValueResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllCrudValueResponse>): QueryAllCrudValueResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** this line is used by starport scaffolding # 2 */
    CrudValue(request: QueryGetCrudValueRequest): Promise<QueryGetCrudValueResponse>;
    CrudValueAll(request: QueryAllCrudValueRequest): Promise<QueryAllCrudValueResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    CrudValue(request: QueryGetCrudValueRequest): Promise<QueryGetCrudValueResponse>;
    CrudValueAll(request: QueryAllCrudValueRequest): Promise<QueryAllCrudValueResponse>;
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