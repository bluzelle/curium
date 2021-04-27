// package: bluzelle.curium.nft
// file: nft/query.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as cosmos_base_query_v1beta1_pagination_pb from "../cosmos/base/query/v1beta1/pagination_pb";
import * as nft_nft_pb from "../nft/nft_pb";

export class QueryGetNftRequest extends jspb.Message { 
    getId(): number;
    setId(value: number): QueryGetNftRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryGetNftRequest.AsObject;
    static toObject(includeInstance: boolean, msg: QueryGetNftRequest): QueryGetNftRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryGetNftRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryGetNftRequest;
    static deserializeBinaryFromReader(message: QueryGetNftRequest, reader: jspb.BinaryReader): QueryGetNftRequest;
}

export namespace QueryGetNftRequest {
    export type AsObject = {
        id: number,
    }
}

export class QueryGetNftResponse extends jspb.Message { 

    hasNft(): boolean;
    clearNft(): void;
    getNft(): nft_nft_pb.Nft | undefined;
    setNft(value?: nft_nft_pb.Nft): QueryGetNftResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryGetNftResponse.AsObject;
    static toObject(includeInstance: boolean, msg: QueryGetNftResponse): QueryGetNftResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryGetNftResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryGetNftResponse;
    static deserializeBinaryFromReader(message: QueryGetNftResponse, reader: jspb.BinaryReader): QueryGetNftResponse;
}

export namespace QueryGetNftResponse {
    export type AsObject = {
        nft?: nft_nft_pb.Nft.AsObject,
    }
}

export class QueryAllNftRequest extends jspb.Message { 

    hasPagination(): boolean;
    clearPagination(): void;
    getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageRequest | undefined;
    setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageRequest): QueryAllNftRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryAllNftRequest.AsObject;
    static toObject(includeInstance: boolean, msg: QueryAllNftRequest): QueryAllNftRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryAllNftRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryAllNftRequest;
    static deserializeBinaryFromReader(message: QueryAllNftRequest, reader: jspb.BinaryReader): QueryAllNftRequest;
}

export namespace QueryAllNftRequest {
    export type AsObject = {
        pagination?: cosmos_base_query_v1beta1_pagination_pb.PageRequest.AsObject,
    }
}

export class QueryAllNftResponse extends jspb.Message { 
    clearNftList(): void;
    getNftList(): Array<nft_nft_pb.Nft>;
    setNftList(value: Array<nft_nft_pb.Nft>): QueryAllNftResponse;
    addNft(value?: nft_nft_pb.Nft, index?: number): nft_nft_pb.Nft;

    hasPagination(): boolean;
    clearPagination(): void;
    getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageResponse | undefined;
    setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageResponse): QueryAllNftResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryAllNftResponse.AsObject;
    static toObject(includeInstance: boolean, msg: QueryAllNftResponse): QueryAllNftResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryAllNftResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryAllNftResponse;
    static deserializeBinaryFromReader(message: QueryAllNftResponse, reader: jspb.BinaryReader): QueryAllNftResponse;
}

export namespace QueryAllNftResponse {
    export type AsObject = {
        nftList: Array<nft_nft_pb.Nft.AsObject>,
        pagination?: cosmos_base_query_v1beta1_pagination_pb.PageResponse.AsObject,
    }
}
