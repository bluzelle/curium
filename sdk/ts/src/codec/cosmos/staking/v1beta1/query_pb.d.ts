// package: cosmos.staking.v1beta1
// file: cosmos/staking/v1beta1/query.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as cosmos_base_query_v1beta1_pagination_pb from "../../../cosmos/base/query/v1beta1/pagination_pb";
import * as gogoproto_gogo_pb from "../../../gogoproto/gogo_pb";
import * as cosmos_staking_v1beta1_staking_pb from "../../../cosmos/staking/v1beta1/staking_pb";

export class QueryValidatorsRequest extends jspb.Message { 
    getStatus(): string;
    setStatus(value: string): QueryValidatorsRequest;

    hasPagination(): boolean;
    clearPagination(): void;
    getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageRequest | undefined;
    setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageRequest): QueryValidatorsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryValidatorsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: QueryValidatorsRequest): QueryValidatorsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryValidatorsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryValidatorsRequest;
    static deserializeBinaryFromReader(message: QueryValidatorsRequest, reader: jspb.BinaryReader): QueryValidatorsRequest;
}

export namespace QueryValidatorsRequest {
    export type AsObject = {
        status: string,
        pagination?: cosmos_base_query_v1beta1_pagination_pb.PageRequest.AsObject,
    }
}

export class QueryValidatorsResponse extends jspb.Message { 
    clearValidatorsList(): void;
    getValidatorsList(): Array<cosmos_staking_v1beta1_staking_pb.Validator>;
    setValidatorsList(value: Array<cosmos_staking_v1beta1_staking_pb.Validator>): QueryValidatorsResponse;
    addValidators(value?: cosmos_staking_v1beta1_staking_pb.Validator, index?: number): cosmos_staking_v1beta1_staking_pb.Validator;

    hasPagination(): boolean;
    clearPagination(): void;
    getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageResponse | undefined;
    setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageResponse): QueryValidatorsResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryValidatorsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: QueryValidatorsResponse): QueryValidatorsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryValidatorsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryValidatorsResponse;
    static deserializeBinaryFromReader(message: QueryValidatorsResponse, reader: jspb.BinaryReader): QueryValidatorsResponse;
}

export namespace QueryValidatorsResponse {
    export type AsObject = {
        validatorsList: Array<cosmos_staking_v1beta1_staking_pb.Validator.AsObject>,
        pagination?: cosmos_base_query_v1beta1_pagination_pb.PageResponse.AsObject,
    }
}

export class QueryValidatorRequest extends jspb.Message { 
    getValidatorAddr(): string;
    setValidatorAddr(value: string): QueryValidatorRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryValidatorRequest.AsObject;
    static toObject(includeInstance: boolean, msg: QueryValidatorRequest): QueryValidatorRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryValidatorRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryValidatorRequest;
    static deserializeBinaryFromReader(message: QueryValidatorRequest, reader: jspb.BinaryReader): QueryValidatorRequest;
}

export namespace QueryValidatorRequest {
    export type AsObject = {
        validatorAddr: string,
    }
}

export class QueryValidatorResponse extends jspb.Message { 

    hasValidator(): boolean;
    clearValidator(): void;
    getValidator(): cosmos_staking_v1beta1_staking_pb.Validator | undefined;
    setValidator(value?: cosmos_staking_v1beta1_staking_pb.Validator): QueryValidatorResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryValidatorResponse.AsObject;
    static toObject(includeInstance: boolean, msg: QueryValidatorResponse): QueryValidatorResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryValidatorResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryValidatorResponse;
    static deserializeBinaryFromReader(message: QueryValidatorResponse, reader: jspb.BinaryReader): QueryValidatorResponse;
}

export namespace QueryValidatorResponse {
    export type AsObject = {
        validator?: cosmos_staking_v1beta1_staking_pb.Validator.AsObject,
    }
}

export class QueryValidatorDelegationsRequest extends jspb.Message { 
    getValidatorAddr(): string;
    setValidatorAddr(value: string): QueryValidatorDelegationsRequest;

    hasPagination(): boolean;
    clearPagination(): void;
    getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageRequest | undefined;
    setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageRequest): QueryValidatorDelegationsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryValidatorDelegationsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: QueryValidatorDelegationsRequest): QueryValidatorDelegationsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryValidatorDelegationsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryValidatorDelegationsRequest;
    static deserializeBinaryFromReader(message: QueryValidatorDelegationsRequest, reader: jspb.BinaryReader): QueryValidatorDelegationsRequest;
}

export namespace QueryValidatorDelegationsRequest {
    export type AsObject = {
        validatorAddr: string,
        pagination?: cosmos_base_query_v1beta1_pagination_pb.PageRequest.AsObject,
    }
}

export class QueryValidatorDelegationsResponse extends jspb.Message { 
    clearDelegationResponsesList(): void;
    getDelegationResponsesList(): Array<cosmos_staking_v1beta1_staking_pb.DelegationResponse>;
    setDelegationResponsesList(value: Array<cosmos_staking_v1beta1_staking_pb.DelegationResponse>): QueryValidatorDelegationsResponse;
    addDelegationResponses(value?: cosmos_staking_v1beta1_staking_pb.DelegationResponse, index?: number): cosmos_staking_v1beta1_staking_pb.DelegationResponse;

    hasPagination(): boolean;
    clearPagination(): void;
    getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageResponse | undefined;
    setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageResponse): QueryValidatorDelegationsResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryValidatorDelegationsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: QueryValidatorDelegationsResponse): QueryValidatorDelegationsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryValidatorDelegationsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryValidatorDelegationsResponse;
    static deserializeBinaryFromReader(message: QueryValidatorDelegationsResponse, reader: jspb.BinaryReader): QueryValidatorDelegationsResponse;
}

export namespace QueryValidatorDelegationsResponse {
    export type AsObject = {
        delegationResponsesList: Array<cosmos_staking_v1beta1_staking_pb.DelegationResponse.AsObject>,
        pagination?: cosmos_base_query_v1beta1_pagination_pb.PageResponse.AsObject,
    }
}

export class QueryValidatorUnbondingDelegationsRequest extends jspb.Message { 
    getValidatorAddr(): string;
    setValidatorAddr(value: string): QueryValidatorUnbondingDelegationsRequest;

    hasPagination(): boolean;
    clearPagination(): void;
    getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageRequest | undefined;
    setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageRequest): QueryValidatorUnbondingDelegationsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryValidatorUnbondingDelegationsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: QueryValidatorUnbondingDelegationsRequest): QueryValidatorUnbondingDelegationsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryValidatorUnbondingDelegationsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryValidatorUnbondingDelegationsRequest;
    static deserializeBinaryFromReader(message: QueryValidatorUnbondingDelegationsRequest, reader: jspb.BinaryReader): QueryValidatorUnbondingDelegationsRequest;
}

export namespace QueryValidatorUnbondingDelegationsRequest {
    export type AsObject = {
        validatorAddr: string,
        pagination?: cosmos_base_query_v1beta1_pagination_pb.PageRequest.AsObject,
    }
}

export class QueryValidatorUnbondingDelegationsResponse extends jspb.Message { 
    clearUnbondingResponsesList(): void;
    getUnbondingResponsesList(): Array<cosmos_staking_v1beta1_staking_pb.UnbondingDelegation>;
    setUnbondingResponsesList(value: Array<cosmos_staking_v1beta1_staking_pb.UnbondingDelegation>): QueryValidatorUnbondingDelegationsResponse;
    addUnbondingResponses(value?: cosmos_staking_v1beta1_staking_pb.UnbondingDelegation, index?: number): cosmos_staking_v1beta1_staking_pb.UnbondingDelegation;

    hasPagination(): boolean;
    clearPagination(): void;
    getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageResponse | undefined;
    setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageResponse): QueryValidatorUnbondingDelegationsResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryValidatorUnbondingDelegationsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: QueryValidatorUnbondingDelegationsResponse): QueryValidatorUnbondingDelegationsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryValidatorUnbondingDelegationsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryValidatorUnbondingDelegationsResponse;
    static deserializeBinaryFromReader(message: QueryValidatorUnbondingDelegationsResponse, reader: jspb.BinaryReader): QueryValidatorUnbondingDelegationsResponse;
}

export namespace QueryValidatorUnbondingDelegationsResponse {
    export type AsObject = {
        unbondingResponsesList: Array<cosmos_staking_v1beta1_staking_pb.UnbondingDelegation.AsObject>,
        pagination?: cosmos_base_query_v1beta1_pagination_pb.PageResponse.AsObject,
    }
}

export class QueryDelegationRequest extends jspb.Message { 
    getDelegatorAddr(): string;
    setDelegatorAddr(value: string): QueryDelegationRequest;
    getValidatorAddr(): string;
    setValidatorAddr(value: string): QueryDelegationRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryDelegationRequest.AsObject;
    static toObject(includeInstance: boolean, msg: QueryDelegationRequest): QueryDelegationRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryDelegationRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryDelegationRequest;
    static deserializeBinaryFromReader(message: QueryDelegationRequest, reader: jspb.BinaryReader): QueryDelegationRequest;
}

export namespace QueryDelegationRequest {
    export type AsObject = {
        delegatorAddr: string,
        validatorAddr: string,
    }
}

export class QueryDelegationResponse extends jspb.Message { 

    hasDelegationResponse(): boolean;
    clearDelegationResponse(): void;
    getDelegationResponse(): cosmos_staking_v1beta1_staking_pb.DelegationResponse | undefined;
    setDelegationResponse(value?: cosmos_staking_v1beta1_staking_pb.DelegationResponse): QueryDelegationResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryDelegationResponse.AsObject;
    static toObject(includeInstance: boolean, msg: QueryDelegationResponse): QueryDelegationResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryDelegationResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryDelegationResponse;
    static deserializeBinaryFromReader(message: QueryDelegationResponse, reader: jspb.BinaryReader): QueryDelegationResponse;
}

export namespace QueryDelegationResponse {
    export type AsObject = {
        delegationResponse?: cosmos_staking_v1beta1_staking_pb.DelegationResponse.AsObject,
    }
}

export class QueryUnbondingDelegationRequest extends jspb.Message { 
    getDelegatorAddr(): string;
    setDelegatorAddr(value: string): QueryUnbondingDelegationRequest;
    getValidatorAddr(): string;
    setValidatorAddr(value: string): QueryUnbondingDelegationRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryUnbondingDelegationRequest.AsObject;
    static toObject(includeInstance: boolean, msg: QueryUnbondingDelegationRequest): QueryUnbondingDelegationRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryUnbondingDelegationRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryUnbondingDelegationRequest;
    static deserializeBinaryFromReader(message: QueryUnbondingDelegationRequest, reader: jspb.BinaryReader): QueryUnbondingDelegationRequest;
}

export namespace QueryUnbondingDelegationRequest {
    export type AsObject = {
        delegatorAddr: string,
        validatorAddr: string,
    }
}

export class QueryUnbondingDelegationResponse extends jspb.Message { 

    hasUnbond(): boolean;
    clearUnbond(): void;
    getUnbond(): cosmos_staking_v1beta1_staking_pb.UnbondingDelegation | undefined;
    setUnbond(value?: cosmos_staking_v1beta1_staking_pb.UnbondingDelegation): QueryUnbondingDelegationResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryUnbondingDelegationResponse.AsObject;
    static toObject(includeInstance: boolean, msg: QueryUnbondingDelegationResponse): QueryUnbondingDelegationResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryUnbondingDelegationResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryUnbondingDelegationResponse;
    static deserializeBinaryFromReader(message: QueryUnbondingDelegationResponse, reader: jspb.BinaryReader): QueryUnbondingDelegationResponse;
}

export namespace QueryUnbondingDelegationResponse {
    export type AsObject = {
        unbond?: cosmos_staking_v1beta1_staking_pb.UnbondingDelegation.AsObject,
    }
}

export class QueryDelegatorDelegationsRequest extends jspb.Message { 
    getDelegatorAddr(): string;
    setDelegatorAddr(value: string): QueryDelegatorDelegationsRequest;

    hasPagination(): boolean;
    clearPagination(): void;
    getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageRequest | undefined;
    setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageRequest): QueryDelegatorDelegationsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryDelegatorDelegationsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: QueryDelegatorDelegationsRequest): QueryDelegatorDelegationsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryDelegatorDelegationsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryDelegatorDelegationsRequest;
    static deserializeBinaryFromReader(message: QueryDelegatorDelegationsRequest, reader: jspb.BinaryReader): QueryDelegatorDelegationsRequest;
}

export namespace QueryDelegatorDelegationsRequest {
    export type AsObject = {
        delegatorAddr: string,
        pagination?: cosmos_base_query_v1beta1_pagination_pb.PageRequest.AsObject,
    }
}

export class QueryDelegatorDelegationsResponse extends jspb.Message { 
    clearDelegationResponsesList(): void;
    getDelegationResponsesList(): Array<cosmos_staking_v1beta1_staking_pb.DelegationResponse>;
    setDelegationResponsesList(value: Array<cosmos_staking_v1beta1_staking_pb.DelegationResponse>): QueryDelegatorDelegationsResponse;
    addDelegationResponses(value?: cosmos_staking_v1beta1_staking_pb.DelegationResponse, index?: number): cosmos_staking_v1beta1_staking_pb.DelegationResponse;

    hasPagination(): boolean;
    clearPagination(): void;
    getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageResponse | undefined;
    setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageResponse): QueryDelegatorDelegationsResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryDelegatorDelegationsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: QueryDelegatorDelegationsResponse): QueryDelegatorDelegationsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryDelegatorDelegationsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryDelegatorDelegationsResponse;
    static deserializeBinaryFromReader(message: QueryDelegatorDelegationsResponse, reader: jspb.BinaryReader): QueryDelegatorDelegationsResponse;
}

export namespace QueryDelegatorDelegationsResponse {
    export type AsObject = {
        delegationResponsesList: Array<cosmos_staking_v1beta1_staking_pb.DelegationResponse.AsObject>,
        pagination?: cosmos_base_query_v1beta1_pagination_pb.PageResponse.AsObject,
    }
}

export class QueryDelegatorUnbondingDelegationsRequest extends jspb.Message { 
    getDelegatorAddr(): string;
    setDelegatorAddr(value: string): QueryDelegatorUnbondingDelegationsRequest;

    hasPagination(): boolean;
    clearPagination(): void;
    getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageRequest | undefined;
    setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageRequest): QueryDelegatorUnbondingDelegationsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryDelegatorUnbondingDelegationsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: QueryDelegatorUnbondingDelegationsRequest): QueryDelegatorUnbondingDelegationsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryDelegatorUnbondingDelegationsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryDelegatorUnbondingDelegationsRequest;
    static deserializeBinaryFromReader(message: QueryDelegatorUnbondingDelegationsRequest, reader: jspb.BinaryReader): QueryDelegatorUnbondingDelegationsRequest;
}

export namespace QueryDelegatorUnbondingDelegationsRequest {
    export type AsObject = {
        delegatorAddr: string,
        pagination?: cosmos_base_query_v1beta1_pagination_pb.PageRequest.AsObject,
    }
}

export class QueryDelegatorUnbondingDelegationsResponse extends jspb.Message { 
    clearUnbondingResponsesList(): void;
    getUnbondingResponsesList(): Array<cosmos_staking_v1beta1_staking_pb.UnbondingDelegation>;
    setUnbondingResponsesList(value: Array<cosmos_staking_v1beta1_staking_pb.UnbondingDelegation>): QueryDelegatorUnbondingDelegationsResponse;
    addUnbondingResponses(value?: cosmos_staking_v1beta1_staking_pb.UnbondingDelegation, index?: number): cosmos_staking_v1beta1_staking_pb.UnbondingDelegation;

    hasPagination(): boolean;
    clearPagination(): void;
    getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageResponse | undefined;
    setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageResponse): QueryDelegatorUnbondingDelegationsResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryDelegatorUnbondingDelegationsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: QueryDelegatorUnbondingDelegationsResponse): QueryDelegatorUnbondingDelegationsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryDelegatorUnbondingDelegationsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryDelegatorUnbondingDelegationsResponse;
    static deserializeBinaryFromReader(message: QueryDelegatorUnbondingDelegationsResponse, reader: jspb.BinaryReader): QueryDelegatorUnbondingDelegationsResponse;
}

export namespace QueryDelegatorUnbondingDelegationsResponse {
    export type AsObject = {
        unbondingResponsesList: Array<cosmos_staking_v1beta1_staking_pb.UnbondingDelegation.AsObject>,
        pagination?: cosmos_base_query_v1beta1_pagination_pb.PageResponse.AsObject,
    }
}

export class QueryRedelegationsRequest extends jspb.Message { 
    getDelegatorAddr(): string;
    setDelegatorAddr(value: string): QueryRedelegationsRequest;
    getSrcValidatorAddr(): string;
    setSrcValidatorAddr(value: string): QueryRedelegationsRequest;
    getDstValidatorAddr(): string;
    setDstValidatorAddr(value: string): QueryRedelegationsRequest;

    hasPagination(): boolean;
    clearPagination(): void;
    getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageRequest | undefined;
    setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageRequest): QueryRedelegationsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryRedelegationsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: QueryRedelegationsRequest): QueryRedelegationsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryRedelegationsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryRedelegationsRequest;
    static deserializeBinaryFromReader(message: QueryRedelegationsRequest, reader: jspb.BinaryReader): QueryRedelegationsRequest;
}

export namespace QueryRedelegationsRequest {
    export type AsObject = {
        delegatorAddr: string,
        srcValidatorAddr: string,
        dstValidatorAddr: string,
        pagination?: cosmos_base_query_v1beta1_pagination_pb.PageRequest.AsObject,
    }
}

export class QueryRedelegationsResponse extends jspb.Message { 
    clearRedelegationResponsesList(): void;
    getRedelegationResponsesList(): Array<cosmos_staking_v1beta1_staking_pb.RedelegationResponse>;
    setRedelegationResponsesList(value: Array<cosmos_staking_v1beta1_staking_pb.RedelegationResponse>): QueryRedelegationsResponse;
    addRedelegationResponses(value?: cosmos_staking_v1beta1_staking_pb.RedelegationResponse, index?: number): cosmos_staking_v1beta1_staking_pb.RedelegationResponse;

    hasPagination(): boolean;
    clearPagination(): void;
    getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageResponse | undefined;
    setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageResponse): QueryRedelegationsResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryRedelegationsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: QueryRedelegationsResponse): QueryRedelegationsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryRedelegationsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryRedelegationsResponse;
    static deserializeBinaryFromReader(message: QueryRedelegationsResponse, reader: jspb.BinaryReader): QueryRedelegationsResponse;
}

export namespace QueryRedelegationsResponse {
    export type AsObject = {
        redelegationResponsesList: Array<cosmos_staking_v1beta1_staking_pb.RedelegationResponse.AsObject>,
        pagination?: cosmos_base_query_v1beta1_pagination_pb.PageResponse.AsObject,
    }
}

export class QueryDelegatorValidatorsRequest extends jspb.Message { 
    getDelegatorAddr(): string;
    setDelegatorAddr(value: string): QueryDelegatorValidatorsRequest;

    hasPagination(): boolean;
    clearPagination(): void;
    getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageRequest | undefined;
    setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageRequest): QueryDelegatorValidatorsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryDelegatorValidatorsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: QueryDelegatorValidatorsRequest): QueryDelegatorValidatorsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryDelegatorValidatorsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryDelegatorValidatorsRequest;
    static deserializeBinaryFromReader(message: QueryDelegatorValidatorsRequest, reader: jspb.BinaryReader): QueryDelegatorValidatorsRequest;
}

export namespace QueryDelegatorValidatorsRequest {
    export type AsObject = {
        delegatorAddr: string,
        pagination?: cosmos_base_query_v1beta1_pagination_pb.PageRequest.AsObject,
    }
}

export class QueryDelegatorValidatorsResponse extends jspb.Message { 
    clearValidatorsList(): void;
    getValidatorsList(): Array<cosmos_staking_v1beta1_staking_pb.Validator>;
    setValidatorsList(value: Array<cosmos_staking_v1beta1_staking_pb.Validator>): QueryDelegatorValidatorsResponse;
    addValidators(value?: cosmos_staking_v1beta1_staking_pb.Validator, index?: number): cosmos_staking_v1beta1_staking_pb.Validator;

    hasPagination(): boolean;
    clearPagination(): void;
    getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageResponse | undefined;
    setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageResponse): QueryDelegatorValidatorsResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryDelegatorValidatorsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: QueryDelegatorValidatorsResponse): QueryDelegatorValidatorsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryDelegatorValidatorsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryDelegatorValidatorsResponse;
    static deserializeBinaryFromReader(message: QueryDelegatorValidatorsResponse, reader: jspb.BinaryReader): QueryDelegatorValidatorsResponse;
}

export namespace QueryDelegatorValidatorsResponse {
    export type AsObject = {
        validatorsList: Array<cosmos_staking_v1beta1_staking_pb.Validator.AsObject>,
        pagination?: cosmos_base_query_v1beta1_pagination_pb.PageResponse.AsObject,
    }
}

export class QueryDelegatorValidatorRequest extends jspb.Message { 
    getDelegatorAddr(): string;
    setDelegatorAddr(value: string): QueryDelegatorValidatorRequest;
    getValidatorAddr(): string;
    setValidatorAddr(value: string): QueryDelegatorValidatorRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryDelegatorValidatorRequest.AsObject;
    static toObject(includeInstance: boolean, msg: QueryDelegatorValidatorRequest): QueryDelegatorValidatorRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryDelegatorValidatorRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryDelegatorValidatorRequest;
    static deserializeBinaryFromReader(message: QueryDelegatorValidatorRequest, reader: jspb.BinaryReader): QueryDelegatorValidatorRequest;
}

export namespace QueryDelegatorValidatorRequest {
    export type AsObject = {
        delegatorAddr: string,
        validatorAddr: string,
    }
}

export class QueryDelegatorValidatorResponse extends jspb.Message { 

    hasValidator(): boolean;
    clearValidator(): void;
    getValidator(): cosmos_staking_v1beta1_staking_pb.Validator | undefined;
    setValidator(value?: cosmos_staking_v1beta1_staking_pb.Validator): QueryDelegatorValidatorResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryDelegatorValidatorResponse.AsObject;
    static toObject(includeInstance: boolean, msg: QueryDelegatorValidatorResponse): QueryDelegatorValidatorResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryDelegatorValidatorResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryDelegatorValidatorResponse;
    static deserializeBinaryFromReader(message: QueryDelegatorValidatorResponse, reader: jspb.BinaryReader): QueryDelegatorValidatorResponse;
}

export namespace QueryDelegatorValidatorResponse {
    export type AsObject = {
        validator?: cosmos_staking_v1beta1_staking_pb.Validator.AsObject,
    }
}

export class QueryHistoricalInfoRequest extends jspb.Message { 
    getHeight(): number;
    setHeight(value: number): QueryHistoricalInfoRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryHistoricalInfoRequest.AsObject;
    static toObject(includeInstance: boolean, msg: QueryHistoricalInfoRequest): QueryHistoricalInfoRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryHistoricalInfoRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryHistoricalInfoRequest;
    static deserializeBinaryFromReader(message: QueryHistoricalInfoRequest, reader: jspb.BinaryReader): QueryHistoricalInfoRequest;
}

export namespace QueryHistoricalInfoRequest {
    export type AsObject = {
        height: number,
    }
}

export class QueryHistoricalInfoResponse extends jspb.Message { 

    hasHist(): boolean;
    clearHist(): void;
    getHist(): cosmos_staking_v1beta1_staking_pb.HistoricalInfo | undefined;
    setHist(value?: cosmos_staking_v1beta1_staking_pb.HistoricalInfo): QueryHistoricalInfoResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryHistoricalInfoResponse.AsObject;
    static toObject(includeInstance: boolean, msg: QueryHistoricalInfoResponse): QueryHistoricalInfoResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryHistoricalInfoResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryHistoricalInfoResponse;
    static deserializeBinaryFromReader(message: QueryHistoricalInfoResponse, reader: jspb.BinaryReader): QueryHistoricalInfoResponse;
}

export namespace QueryHistoricalInfoResponse {
    export type AsObject = {
        hist?: cosmos_staking_v1beta1_staking_pb.HistoricalInfo.AsObject,
    }
}

export class QueryPoolRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryPoolRequest.AsObject;
    static toObject(includeInstance: boolean, msg: QueryPoolRequest): QueryPoolRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryPoolRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryPoolRequest;
    static deserializeBinaryFromReader(message: QueryPoolRequest, reader: jspb.BinaryReader): QueryPoolRequest;
}

export namespace QueryPoolRequest {
    export type AsObject = {
    }
}

export class QueryPoolResponse extends jspb.Message { 

    hasPool(): boolean;
    clearPool(): void;
    getPool(): cosmos_staking_v1beta1_staking_pb.Pool | undefined;
    setPool(value?: cosmos_staking_v1beta1_staking_pb.Pool): QueryPoolResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryPoolResponse.AsObject;
    static toObject(includeInstance: boolean, msg: QueryPoolResponse): QueryPoolResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryPoolResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryPoolResponse;
    static deserializeBinaryFromReader(message: QueryPoolResponse, reader: jspb.BinaryReader): QueryPoolResponse;
}

export namespace QueryPoolResponse {
    export type AsObject = {
        pool?: cosmos_staking_v1beta1_staking_pb.Pool.AsObject,
    }
}

export class QueryParamsRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryParamsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: QueryParamsRequest): QueryParamsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryParamsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryParamsRequest;
    static deserializeBinaryFromReader(message: QueryParamsRequest, reader: jspb.BinaryReader): QueryParamsRequest;
}

export namespace QueryParamsRequest {
    export type AsObject = {
    }
}

export class QueryParamsResponse extends jspb.Message { 

    hasParams(): boolean;
    clearParams(): void;
    getParams(): cosmos_staking_v1beta1_staking_pb.Params | undefined;
    setParams(value?: cosmos_staking_v1beta1_staking_pb.Params): QueryParamsResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryParamsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: QueryParamsResponse): QueryParamsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryParamsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryParamsResponse;
    static deserializeBinaryFromReader(message: QueryParamsResponse, reader: jspb.BinaryReader): QueryParamsResponse;
}

export namespace QueryParamsResponse {
    export type AsObject = {
        params?: cosmos_staking_v1beta1_staking_pb.Params.AsObject,
    }
}
