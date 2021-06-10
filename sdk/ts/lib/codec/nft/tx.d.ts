import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "bluzelle.curium.nft";
/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgRegisterPeer {
    creator: string;
    id: string;
    address: string;
    port: Long;
}
export interface MsgRegisterPeerResponse {
}
export interface MsgPublishFile {
    creator: string;
    id: string;
    hash: string;
    metainfo: Uint8Array;
}
export interface MsgPublishFileResponse {
}
export interface MsgFileReceived {
    creator: string;
    id: string;
    nodeId: string;
}
export interface MsgFileReceivedResponse {
}
export interface MsgCreateNft {
    id: string;
    hash: string;
    creator: string;
    mime: string;
    meta: string;
}
export interface MsgCreateNftResponse {
    id: string;
}
export interface MsgUpdateNft {
    id: string;
    creator: string;
    mime: string;
    meta: string;
}
export interface MsgUpdateNftResponse {
}
export interface MsgDeleteNft {
    creator: string;
    id: string;
}
export interface MsgDeleteNftResponse {
}
export declare const MsgRegisterPeer: {
    encode(message: MsgRegisterPeer, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgRegisterPeer;
    fromJSON(object: any): MsgRegisterPeer;
    toJSON(message: MsgRegisterPeer): unknown;
    fromPartial(object: DeepPartial<MsgRegisterPeer>): MsgRegisterPeer;
};
export declare const MsgRegisterPeerResponse: {
    encode(_: MsgRegisterPeerResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgRegisterPeerResponse;
    fromJSON(_: any): MsgRegisterPeerResponse;
    toJSON(_: MsgRegisterPeerResponse): unknown;
    fromPartial(_: DeepPartial<MsgRegisterPeerResponse>): MsgRegisterPeerResponse;
};
export declare const MsgPublishFile: {
    encode(message: MsgPublishFile, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgPublishFile;
    fromJSON(object: any): MsgPublishFile;
    toJSON(message: MsgPublishFile): unknown;
    fromPartial(object: DeepPartial<MsgPublishFile>): MsgPublishFile;
};
export declare const MsgPublishFileResponse: {
    encode(_: MsgPublishFileResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgPublishFileResponse;
    fromJSON(_: any): MsgPublishFileResponse;
    toJSON(_: MsgPublishFileResponse): unknown;
    fromPartial(_: DeepPartial<MsgPublishFileResponse>): MsgPublishFileResponse;
};
export declare const MsgFileReceived: {
    encode(message: MsgFileReceived, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgFileReceived;
    fromJSON(object: any): MsgFileReceived;
    toJSON(message: MsgFileReceived): unknown;
    fromPartial(object: DeepPartial<MsgFileReceived>): MsgFileReceived;
};
export declare const MsgFileReceivedResponse: {
    encode(_: MsgFileReceivedResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgFileReceivedResponse;
    fromJSON(_: any): MsgFileReceivedResponse;
    toJSON(_: MsgFileReceivedResponse): unknown;
    fromPartial(_: DeepPartial<MsgFileReceivedResponse>): MsgFileReceivedResponse;
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
    RegisterPeer(request: MsgRegisterPeer): Promise<MsgRegisterPeerResponse>;
    PublishFile(request: MsgPublishFile): Promise<MsgPublishFileResponse>;
    FileReceived(request: MsgFileReceived): Promise<MsgFileReceivedResponse>;
    CreateNft(request: MsgCreateNft): Promise<MsgCreateNftResponse>;
    UpdateNft(request: MsgUpdateNft): Promise<MsgUpdateNftResponse>;
    DeleteNft(request: MsgDeleteNft): Promise<MsgDeleteNftResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    RegisterPeer(request: MsgRegisterPeer): Promise<MsgRegisterPeerResponse>;
    PublishFile(request: MsgPublishFile): Promise<MsgPublishFileResponse>;
    FileReceived(request: MsgFileReceived): Promise<MsgFileReceivedResponse>;
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