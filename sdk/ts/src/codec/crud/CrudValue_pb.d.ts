// package: bluzelle.curium.crud
// file: crud/CrudValue.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as crud_lease_pb from "../crud/lease_pb";

export class CrudValue extends jspb.Message { 
    getCreator(): string;
    setCreator(value: string): CrudValue;
    getUuid(): string;
    setUuid(value: string): CrudValue;
    getKey(): string;
    setKey(value: string): CrudValue;
    getValue(): Uint8Array | string;
    getValue_asU8(): Uint8Array;
    getValue_asB64(): string;
    setValue(value: Uint8Array | string): CrudValue;

    hasLease(): boolean;
    clearLease(): void;
    getLease(): crud_lease_pb.Lease | undefined;
    setLease(value?: crud_lease_pb.Lease): CrudValue;
    getHeight(): number;
    setHeight(value: number): CrudValue;
    getMetadata(): Uint8Array | string;
    getMetadata_asU8(): Uint8Array;
    getMetadata_asB64(): string;
    setMetadata(value: Uint8Array | string): CrudValue;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CrudValue.AsObject;
    static toObject(includeInstance: boolean, msg: CrudValue): CrudValue.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CrudValue, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CrudValue;
    static deserializeBinaryFromReader(message: CrudValue, reader: jspb.BinaryReader): CrudValue;
}

export namespace CrudValue {
    export type AsObject = {
        creator: string,
        uuid: string,
        key: string,
        value: Uint8Array | string,
        lease?: crud_lease_pb.Lease.AsObject,
        height: number,
        metadata: Uint8Array | string,
    }
}
