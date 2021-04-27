// package: bluzelle.curium.crud
// file: crud/query.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as cosmos_base_query_v1beta1_pagination_pb from "../cosmos/base/query/v1beta1/pagination_pb";
import * as crud_CrudValue_pb from "../crud/CrudValue_pb";

export class QueryGetCrudValueRequest extends jspb.Message { 
    getUuid(): string;
    setUuid(value: string): QueryGetCrudValueRequest;
    getKey(): string;
    setKey(value: string): QueryGetCrudValueRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryGetCrudValueRequest.AsObject;
    static toObject(includeInstance: boolean, msg: QueryGetCrudValueRequest): QueryGetCrudValueRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryGetCrudValueRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryGetCrudValueRequest;
    static deserializeBinaryFromReader(message: QueryGetCrudValueRequest, reader: jspb.BinaryReader): QueryGetCrudValueRequest;
}

export namespace QueryGetCrudValueRequest {
    export type AsObject = {
        uuid: string,
        key: string,
    }
}

export class QueryGetCrudValueResponse extends jspb.Message { 

    hasCrudvalue(): boolean;
    clearCrudvalue(): void;
    getCrudvalue(): crud_CrudValue_pb.CrudValue | undefined;
    setCrudvalue(value?: crud_CrudValue_pb.CrudValue): QueryGetCrudValueResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryGetCrudValueResponse.AsObject;
    static toObject(includeInstance: boolean, msg: QueryGetCrudValueResponse): QueryGetCrudValueResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryGetCrudValueResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryGetCrudValueResponse;
    static deserializeBinaryFromReader(message: QueryGetCrudValueResponse, reader: jspb.BinaryReader): QueryGetCrudValueResponse;
}

export namespace QueryGetCrudValueResponse {
    export type AsObject = {
        crudvalue?: crud_CrudValue_pb.CrudValue.AsObject,
    }
}

export class QueryAllCrudValueRequest extends jspb.Message { 
    getUuid(): string;
    setUuid(value: string): QueryAllCrudValueRequest;

    hasPagination(): boolean;
    clearPagination(): void;
    getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageRequest | undefined;
    setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageRequest): QueryAllCrudValueRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryAllCrudValueRequest.AsObject;
    static toObject(includeInstance: boolean, msg: QueryAllCrudValueRequest): QueryAllCrudValueRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryAllCrudValueRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryAllCrudValueRequest;
    static deserializeBinaryFromReader(message: QueryAllCrudValueRequest, reader: jspb.BinaryReader): QueryAllCrudValueRequest;
}

export namespace QueryAllCrudValueRequest {
    export type AsObject = {
        uuid: string,
        pagination?: cosmos_base_query_v1beta1_pagination_pb.PageRequest.AsObject,
    }
}

export class QueryAllCrudValueResponse extends jspb.Message { 
    clearCrudvalueList(): void;
    getCrudvalueList(): Array<crud_CrudValue_pb.CrudValue>;
    setCrudvalueList(value: Array<crud_CrudValue_pb.CrudValue>): QueryAllCrudValueResponse;
    addCrudvalue(value?: crud_CrudValue_pb.CrudValue, index?: number): crud_CrudValue_pb.CrudValue;

    hasPagination(): boolean;
    clearPagination(): void;
    getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageResponse | undefined;
    setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageResponse): QueryAllCrudValueResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryAllCrudValueResponse.AsObject;
    static toObject(includeInstance: boolean, msg: QueryAllCrudValueResponse): QueryAllCrudValueResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryAllCrudValueResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryAllCrudValueResponse;
    static deserializeBinaryFromReader(message: QueryAllCrudValueResponse, reader: jspb.BinaryReader): QueryAllCrudValueResponse;
}

export namespace QueryAllCrudValueResponse {
    export type AsObject = {
        crudvalueList: Array<crud_CrudValue_pb.CrudValue.AsObject>,
        pagination?: cosmos_base_query_v1beta1_pagination_pb.PageResponse.AsObject,
    }
}
