import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "bluzelle.curium.nft";
/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgChunk {
    creator: string;
    id: Long;
    chunk: Long;
    data: Uint8Array;
}
export interface MsgChunkResponse {
}
export interface MsgCreateNft {
    creator: string;
    mime: string;
    meta: string;
}
export interface MsgCreateNftResponse {
    id: Long;
}
export interface MsgUpdateNft {
    creator: string;
    id: Long;
    mime: string;
    meta: string;
}
export interface MsgUpdateNftResponse {
}
export interface MsgDeleteNft {
    creator: string;
    id: Long;
}
export interface MsgDeleteNftResponse {
}
export declare const MsgChunk: {
    encode(message: MsgChunk, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgChunk;
    fromJSON(object: any): MsgChunk;
    toJSON(message: MsgChunk): unknown;
    fromPartial(object: DeepPartial<MsgChunk>): MsgChunk;
};
export declare const MsgChunkResponse: {
    encode(_: MsgChunkResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgChunkResponse;
    fromJSON(_: any): MsgChunkResponse;
    toJSON(_: MsgChunkResponse): unknown;
    fromPartial(_: DeepPartial<MsgChunkResponse>): MsgChunkResponse;
};
export declare const MsgCreateNft: {
    encode(message: MsgCreateNft, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgCreateNft;
    fromJSON(object: any): MsgCreateNft;
    toJSON(message: MsgCreateNft): unknown;
    fromPartial(object: DeepPartial<MsgCreateNft>): MsgCreateNft;
};
export declare const MsgCreateNftResponse: {
    encode(message: MsgCreateNftResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgCreateNftResponse;
    fromJSON(object: any): MsgCreateNftResponse;
    toJSON(message: MsgCreateNftResponse): unknown;
    fromPartial(object: DeepPartial<MsgCreateNftResponse>): MsgCreateNftResponse;
};
export declare const MsgUpdateNft: {
    encode(message: MsgUpdateNft, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgUpdateNft;
    fromJSON(object: any): MsgUpdateNft;
    toJSON(message: MsgUpdateNft): unknown;
    fromPartial(object: DeepPartial<MsgUpdateNft>): MsgUpdateNft;
};
export declare const MsgUpdateNftResponse: {
    encode(_: MsgUpdateNftResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgUpdateNftResponse;
    fromJSON(_: any): MsgUpdateNftResponse;
    toJSON(_: MsgUpdateNftResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateNftResponse>): MsgUpdateNftResponse;
};
export declare const MsgDeleteNft: {
    encode(message: MsgDeleteNft, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgDeleteNft;
    fromJSON(object: any): MsgDeleteNft;
    toJSON(message: MsgDeleteNft): unknown;
    fromPartial(object: DeepPartial<MsgDeleteNft>): MsgDeleteNft;
};
export declare const MsgDeleteNftResponse: {
    encode(_: MsgDeleteNftResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgDeleteNftResponse;
    fromJSON(_: any): MsgDeleteNftResponse;
    toJSON(_: MsgDeleteNftResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeleteNftResponse>): MsgDeleteNftResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /** this line is used by starport scaffolding # proto/tx/rpc */
    Chunk(request: MsgChunk): Promise<MsgChunkResponse>;
    CreateNft(request: MsgCreateNft): Promise<MsgCreateNftResponse>;
    UpdateNft(request: MsgUpdateNft): Promise<MsgUpdateNftResponse>;
    DeleteNft(request: MsgDeleteNft): Promise<MsgDeleteNftResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    Chunk(request: MsgChunk): Promise<MsgChunkResponse>;
    CreateNft(request: MsgCreateNft): Promise<MsgCreateNftResponse>;
    UpdateNft(request: MsgUpdateNft): Promise<MsgUpdateNftResponse>;
    DeleteNft(request: MsgDeleteNft): Promise<MsgDeleteNftResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined | Long;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
//# sourceMappingURL=tx.d.ts.map