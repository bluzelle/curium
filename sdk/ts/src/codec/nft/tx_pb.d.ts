// package: bluzelle.curium.nft
// file: nft/tx.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class MsgChunk extends jspb.Message { 
    getCreator(): string;
    setCreator(value: string): MsgChunk;
    getId(): number;
    setId(value: number): MsgChunk;
    getChunk(): number;
    setChunk(value: number): MsgChunk;
    getData(): Uint8Array | string;
    getData_asU8(): Uint8Array;
    getData_asB64(): string;
    setData(value: Uint8Array | string): MsgChunk;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgChunk.AsObject;
    static toObject(includeInstance: boolean, msg: MsgChunk): MsgChunk.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgChunk, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgChunk;
    static deserializeBinaryFromReader(message: MsgChunk, reader: jspb.BinaryReader): MsgChunk;
}

export namespace MsgChunk {
    export type AsObject = {
        creator: string,
        id: number,
        chunk: number,
        data: Uint8Array | string,
    }
}

export class MsgChunkResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgChunkResponse.AsObject;
    static toObject(includeInstance: boolean, msg: MsgChunkResponse): MsgChunkResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgChunkResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgChunkResponse;
    static deserializeBinaryFromReader(message: MsgChunkResponse, reader: jspb.BinaryReader): MsgChunkResponse;
}

export namespace MsgChunkResponse {
    export type AsObject = {
    }
}

export class MsgCreateNft extends jspb.Message { 
    getCreator(): string;
    setCreator(value: string): MsgCreateNft;
    getMime(): string;
    setMime(value: string): MsgCreateNft;
    getMeta(): string;
    setMeta(value: string): MsgCreateNft;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgCreateNft.AsObject;
    static toObject(includeInstance: boolean, msg: MsgCreateNft): MsgCreateNft.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgCreateNft, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgCreateNft;
    static deserializeBinaryFromReader(message: MsgCreateNft, reader: jspb.BinaryReader): MsgCreateNft;
}

export namespace MsgCreateNft {
    export type AsObject = {
        creator: string,
        mime: string,
        meta: string,
    }
}

export class MsgCreateNftResponse extends jspb.Message { 
    getId(): number;
    setId(value: number): MsgCreateNftResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgCreateNftResponse.AsObject;
    static toObject(includeInstance: boolean, msg: MsgCreateNftResponse): MsgCreateNftResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgCreateNftResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgCreateNftResponse;
    static deserializeBinaryFromReader(message: MsgCreateNftResponse, reader: jspb.BinaryReader): MsgCreateNftResponse;
}

export namespace MsgCreateNftResponse {
    export type AsObject = {
        id: number,
    }
}

export class MsgUpdateNft extends jspb.Message { 
    getCreator(): string;
    setCreator(value: string): MsgUpdateNft;
    getId(): number;
    setId(value: number): MsgUpdateNft;
    getMime(): string;
    setMime(value: string): MsgUpdateNft;
    getMeta(): string;
    setMeta(value: string): MsgUpdateNft;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgUpdateNft.AsObject;
    static toObject(includeInstance: boolean, msg: MsgUpdateNft): MsgUpdateNft.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgUpdateNft, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgUpdateNft;
    static deserializeBinaryFromReader(message: MsgUpdateNft, reader: jspb.BinaryReader): MsgUpdateNft;
}

export namespace MsgUpdateNft {
    export type AsObject = {
        creator: string,
        id: number,
        mime: string,
        meta: string,
    }
}

export class MsgUpdateNftResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgUpdateNftResponse.AsObject;
    static toObject(includeInstance: boolean, msg: MsgUpdateNftResponse): MsgUpdateNftResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgUpdateNftResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgUpdateNftResponse;
    static deserializeBinaryFromReader(message: MsgUpdateNftResponse, reader: jspb.BinaryReader): MsgUpdateNftResponse;
}

export namespace MsgUpdateNftResponse {
    export type AsObject = {
    }
}

export class MsgDeleteNft extends jspb.Message { 
    getCreator(): string;
    setCreator(value: string): MsgDeleteNft;
    getId(): number;
    setId(value: number): MsgDeleteNft;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgDeleteNft.AsObject;
    static toObject(includeInstance: boolean, msg: MsgDeleteNft): MsgDeleteNft.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgDeleteNft, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgDeleteNft;
    static deserializeBinaryFromReader(message: MsgDeleteNft, reader: jspb.BinaryReader): MsgDeleteNft;
}

export namespace MsgDeleteNft {
    export type AsObject = {
        creator: string,
        id: number,
    }
}

export class MsgDeleteNftResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgDeleteNftResponse.AsObject;
    static toObject(includeInstance: boolean, msg: MsgDeleteNftResponse): MsgDeleteNftResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgDeleteNftResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgDeleteNftResponse;
    static deserializeBinaryFromReader(message: MsgDeleteNftResponse, reader: jspb.BinaryReader): MsgDeleteNftResponse;
}

export namespace MsgDeleteNftResponse {
    export type AsObject = {
    }
}
