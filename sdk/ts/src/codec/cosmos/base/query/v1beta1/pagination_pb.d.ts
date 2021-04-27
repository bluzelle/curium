// package: cosmos.base.query.v1beta1
// file: cosmos/base/query/v1beta1/pagination.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class PageRequest extends jspb.Message { 
    getKey(): Uint8Array | string;
    getKey_asU8(): Uint8Array;
    getKey_asB64(): string;
    setKey(value: Uint8Array | string): PageRequest;
    getOffset(): number;
    setOffset(value: number): PageRequest;
    getLimit(): number;
    setLimit(value: number): PageRequest;
    getCountTotal(): boolean;
    setCountTotal(value: boolean): PageRequest;
    getReverse(): boolean;
    setReverse(value: boolean): PageRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PageRequest): PageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PageRequest;
    static deserializeBinaryFromReader(message: PageRequest, reader: jspb.BinaryReader): PageRequest;
}

export namespace PageRequest {
    export type AsObject = {
        key: Uint8Array | string,
        offset: number,
        limit: number,
        countTotal: boolean,
        reverse: boolean,
    }
}

export class PageResponse extends jspb.Message { 
    getNextKey(): Uint8Array | string;
    getNextKey_asU8(): Uint8Array;
    getNextKey_asB64(): string;
    setNextKey(value: Uint8Array | string): PageResponse;
    getTotal(): number;
    setTotal(value: number): PageResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: PageResponse): PageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PageResponse;
    static deserializeBinaryFromReader(message: PageResponse, reader: jspb.BinaryReader): PageResponse;
}

export namespace PageResponse {
    export type AsObject = {
        nextKey: Uint8Array | string,
        total: number,
    }
}
