import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "bluzelle.curium.crud";
export interface PagingRequest {
    startKey: string;
    limit: Long;
}
export interface PagingResponse {
    nextKey: string;
    total: Long;
}
export declare const PagingRequest: {
    encode(message: PagingRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PagingRequest;
    fromJSON(object: any): PagingRequest;
    toJSON(message: PagingRequest): unknown;
    fromPartial(object: DeepPartial<PagingRequest>): PagingRequest;
};
export declare const PagingResponse: {
    encode(message: PagingResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): PagingResponse;
    fromJSON(object: any): PagingResponse;
    toJSON(message: PagingResponse): unknown;
    fromPartial(object: DeepPartial<PagingResponse>): PagingResponse;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined | Long;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
//# sourceMappingURL=Paging.d.ts.map