// package: bluzelle.curium.crud
// file: crud/tx.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as crud_lease_pb from "../crud/lease_pb";

export class MsgRead extends jspb.Message { 
    getCreator(): string;
    setCreator(value: string): MsgRead;
    getUuid(): string;
    setUuid(value: string): MsgRead;
    getKey(): string;
    setKey(value: string): MsgRead;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgRead.AsObject;
    static toObject(includeInstance: boolean, msg: MsgRead): MsgRead.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgRead, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgRead;
    static deserializeBinaryFromReader(message: MsgRead, reader: jspb.BinaryReader): MsgRead;
}

export namespace MsgRead {
    export type AsObject = {
        creator: string,
        uuid: string,
        key: string,
    }
}

export class MsgReadResponse extends jspb.Message { 
    getValue(): Uint8Array | string;
    getValue_asU8(): Uint8Array;
    getValue_asB64(): string;
    setValue(value: Uint8Array | string): MsgReadResponse;
    getKey(): string;
    setKey(value: string): MsgReadResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgReadResponse.AsObject;
    static toObject(includeInstance: boolean, msg: MsgReadResponse): MsgReadResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgReadResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgReadResponse;
    static deserializeBinaryFromReader(message: MsgReadResponse, reader: jspb.BinaryReader): MsgReadResponse;
}

export namespace MsgReadResponse {
    export type AsObject = {
        value: Uint8Array | string,
        key: string,
    }
}

export class MsgUpsert extends jspb.Message { 
    getCreator(): string;
    setCreator(value: string): MsgUpsert;
    getUuid(): string;
    setUuid(value: string): MsgUpsert;
    getKey(): string;
    setKey(value: string): MsgUpsert;
    getValue(): Uint8Array | string;
    getValue_asU8(): Uint8Array;
    getValue_asB64(): string;
    setValue(value: Uint8Array | string): MsgUpsert;

    hasLease(): boolean;
    clearLease(): void;
    getLease(): crud_lease_pb.Lease | undefined;
    setLease(value?: crud_lease_pb.Lease): MsgUpsert;
    getMetadata(): Uint8Array | string;
    getMetadata_asU8(): Uint8Array;
    getMetadata_asB64(): string;
    setMetadata(value: Uint8Array | string): MsgUpsert;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgUpsert.AsObject;
    static toObject(includeInstance: boolean, msg: MsgUpsert): MsgUpsert.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgUpsert, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgUpsert;
    static deserializeBinaryFromReader(message: MsgUpsert, reader: jspb.BinaryReader): MsgUpsert;
}

export namespace MsgUpsert {
    export type AsObject = {
        creator: string,
        uuid: string,
        key: string,
        value: Uint8Array | string,
        lease?: crud_lease_pb.Lease.AsObject,
        metadata: Uint8Array | string,
    }
}

export class MsgUpsertResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgUpsertResponse.AsObject;
    static toObject(includeInstance: boolean, msg: MsgUpsertResponse): MsgUpsertResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgUpsertResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgUpsertResponse;
    static deserializeBinaryFromReader(message: MsgUpsertResponse, reader: jspb.BinaryReader): MsgUpsertResponse;
}

export namespace MsgUpsertResponse {
    export type AsObject = {
    }
}

export class MsgCreate extends jspb.Message { 
    getCreator(): string;
    setCreator(value: string): MsgCreate;
    getUuid(): string;
    setUuid(value: string): MsgCreate;
    getKey(): string;
    setKey(value: string): MsgCreate;
    getValue(): Uint8Array | string;
    getValue_asU8(): Uint8Array;
    getValue_asB64(): string;
    setValue(value: Uint8Array | string): MsgCreate;

    hasLease(): boolean;
    clearLease(): void;
    getLease(): crud_lease_pb.Lease | undefined;
    setLease(value?: crud_lease_pb.Lease): MsgCreate;
    getMetadata(): Uint8Array | string;
    getMetadata_asU8(): Uint8Array;
    getMetadata_asB64(): string;
    setMetadata(value: Uint8Array | string): MsgCreate;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgCreate.AsObject;
    static toObject(includeInstance: boolean, msg: MsgCreate): MsgCreate.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgCreate, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgCreate;
    static deserializeBinaryFromReader(message: MsgCreate, reader: jspb.BinaryReader): MsgCreate;
}

export namespace MsgCreate {
    export type AsObject = {
        creator: string,
        uuid: string,
        key: string,
        value: Uint8Array | string,
        lease?: crud_lease_pb.Lease.AsObject,
        metadata: Uint8Array | string,
    }
}

export class MsgCreateResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgCreateResponse.AsObject;
    static toObject(includeInstance: boolean, msg: MsgCreateResponse): MsgCreateResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgCreateResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgCreateResponse;
    static deserializeBinaryFromReader(message: MsgCreateResponse, reader: jspb.BinaryReader): MsgCreateResponse;
}

export namespace MsgCreateResponse {
    export type AsObject = {
    }
}

export class MsgUpdate extends jspb.Message { 
    getCreator(): string;
    setCreator(value: string): MsgUpdate;
    getUuid(): string;
    setUuid(value: string): MsgUpdate;
    getKey(): string;
    setKey(value: string): MsgUpdate;
    getValue(): Uint8Array | string;
    getValue_asU8(): Uint8Array;
    getValue_asB64(): string;
    setValue(value: Uint8Array | string): MsgUpdate;

    hasLease(): boolean;
    clearLease(): void;
    getLease(): crud_lease_pb.Lease | undefined;
    setLease(value?: crud_lease_pb.Lease): MsgUpdate;
    getMetadata(): Uint8Array | string;
    getMetadata_asU8(): Uint8Array;
    getMetadata_asB64(): string;
    setMetadata(value: Uint8Array | string): MsgUpdate;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgUpdate.AsObject;
    static toObject(includeInstance: boolean, msg: MsgUpdate): MsgUpdate.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgUpdate, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgUpdate;
    static deserializeBinaryFromReader(message: MsgUpdate, reader: jspb.BinaryReader): MsgUpdate;
}

export namespace MsgUpdate {
    export type AsObject = {
        creator: string,
        uuid: string,
        key: string,
        value: Uint8Array | string,
        lease?: crud_lease_pb.Lease.AsObject,
        metadata: Uint8Array | string,
    }
}

export class MsgUpdateResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgUpdateResponse.AsObject;
    static toObject(includeInstance: boolean, msg: MsgUpdateResponse): MsgUpdateResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgUpdateResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgUpdateResponse;
    static deserializeBinaryFromReader(message: MsgUpdateResponse, reader: jspb.BinaryReader): MsgUpdateResponse;
}

export namespace MsgUpdateResponse {
    export type AsObject = {
    }
}

export class MsgDelete extends jspb.Message { 
    getCreator(): string;
    setCreator(value: string): MsgDelete;
    getUuid(): string;
    setUuid(value: string): MsgDelete;
    getKey(): string;
    setKey(value: string): MsgDelete;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgDelete.AsObject;
    static toObject(includeInstance: boolean, msg: MsgDelete): MsgDelete.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgDelete, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgDelete;
    static deserializeBinaryFromReader(message: MsgDelete, reader: jspb.BinaryReader): MsgDelete;
}

export namespace MsgDelete {
    export type AsObject = {
        creator: string,
        uuid: string,
        key: string,
    }
}

export class MsgDeleteResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgDeleteResponse.AsObject;
    static toObject(includeInstance: boolean, msg: MsgDeleteResponse): MsgDeleteResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgDeleteResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgDeleteResponse;
    static deserializeBinaryFromReader(message: MsgDeleteResponse, reader: jspb.BinaryReader): MsgDeleteResponse;
}

export namespace MsgDeleteResponse {
    export type AsObject = {
    }
}
