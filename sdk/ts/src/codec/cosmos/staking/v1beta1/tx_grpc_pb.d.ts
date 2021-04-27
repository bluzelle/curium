// package: cosmos.staking.v1beta1
// file: cosmos/staking/v1beta1/tx.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as cosmos_staking_v1beta1_tx_pb from "../../../cosmos/staking/v1beta1/tx_pb";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as gogoproto_gogo_pb from "../../../gogoproto/gogo_pb";
import * as cosmos_proto_cosmos_pb from "../../../cosmos_proto/cosmos_pb";
import * as cosmos_base_v1beta1_coin_pb from "../../../cosmos/base/v1beta1/coin_pb";
import * as cosmos_staking_v1beta1_staking_pb from "../../../cosmos/staking/v1beta1/staking_pb";

interface IMsgService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createValidator: IMsgService_ICreateValidator;
    editValidator: IMsgService_IEditValidator;
    delegate: IMsgService_IDelegate;
    beginRedelegate: IMsgService_IBeginRedelegate;
    undelegate: IMsgService_IUndelegate;
}

interface IMsgService_ICreateValidator extends grpc.MethodDefinition<cosmos_staking_v1beta1_tx_pb.MsgCreateValidator, cosmos_staking_v1beta1_tx_pb.MsgCreateValidatorResponse> {
    path: "/cosmos.staking.v1beta1.Msg/CreateValidator";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_staking_v1beta1_tx_pb.MsgCreateValidator>;
    requestDeserialize: grpc.deserialize<cosmos_staking_v1beta1_tx_pb.MsgCreateValidator>;
    responseSerialize: grpc.serialize<cosmos_staking_v1beta1_tx_pb.MsgCreateValidatorResponse>;
    responseDeserialize: grpc.deserialize<cosmos_staking_v1beta1_tx_pb.MsgCreateValidatorResponse>;
}
interface IMsgService_IEditValidator extends grpc.MethodDefinition<cosmos_staking_v1beta1_tx_pb.MsgEditValidator, cosmos_staking_v1beta1_tx_pb.MsgEditValidatorResponse> {
    path: "/cosmos.staking.v1beta1.Msg/EditValidator";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_staking_v1beta1_tx_pb.MsgEditValidator>;
    requestDeserialize: grpc.deserialize<cosmos_staking_v1beta1_tx_pb.MsgEditValidator>;
    responseSerialize: grpc.serialize<cosmos_staking_v1beta1_tx_pb.MsgEditValidatorResponse>;
    responseDeserialize: grpc.deserialize<cosmos_staking_v1beta1_tx_pb.MsgEditValidatorResponse>;
}
interface IMsgService_IDelegate extends grpc.MethodDefinition<cosmos_staking_v1beta1_tx_pb.MsgDelegate, cosmos_staking_v1beta1_tx_pb.MsgDelegateResponse> {
    path: "/cosmos.staking.v1beta1.Msg/Delegate";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_staking_v1beta1_tx_pb.MsgDelegate>;
    requestDeserialize: grpc.deserialize<cosmos_staking_v1beta1_tx_pb.MsgDelegate>;
    responseSerialize: grpc.serialize<cosmos_staking_v1beta1_tx_pb.MsgDelegateResponse>;
    responseDeserialize: grpc.deserialize<cosmos_staking_v1beta1_tx_pb.MsgDelegateResponse>;
}
interface IMsgService_IBeginRedelegate extends grpc.MethodDefinition<cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegate, cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegateResponse> {
    path: "/cosmos.staking.v1beta1.Msg/BeginRedelegate";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegate>;
    requestDeserialize: grpc.deserialize<cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegate>;
    responseSerialize: grpc.serialize<cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegateResponse>;
    responseDeserialize: grpc.deserialize<cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegateResponse>;
}
interface IMsgService_IUndelegate extends grpc.MethodDefinition<cosmos_staking_v1beta1_tx_pb.MsgUndelegate, cosmos_staking_v1beta1_tx_pb.MsgUndelegateResponse> {
    path: "/cosmos.staking.v1beta1.Msg/Undelegate";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_staking_v1beta1_tx_pb.MsgUndelegate>;
    requestDeserialize: grpc.deserialize<cosmos_staking_v1beta1_tx_pb.MsgUndelegate>;
    responseSerialize: grpc.serialize<cosmos_staking_v1beta1_tx_pb.MsgUndelegateResponse>;
    responseDeserialize: grpc.deserialize<cosmos_staking_v1beta1_tx_pb.MsgUndelegateResponse>;
}

export const MsgService: IMsgService;

export interface IMsgServer {
    createValidator: grpc.handleUnaryCall<cosmos_staking_v1beta1_tx_pb.MsgCreateValidator, cosmos_staking_v1beta1_tx_pb.MsgCreateValidatorResponse>;
    editValidator: grpc.handleUnaryCall<cosmos_staking_v1beta1_tx_pb.MsgEditValidator, cosmos_staking_v1beta1_tx_pb.MsgEditValidatorResponse>;
    delegate: grpc.handleUnaryCall<cosmos_staking_v1beta1_tx_pb.MsgDelegate, cosmos_staking_v1beta1_tx_pb.MsgDelegateResponse>;
    beginRedelegate: grpc.handleUnaryCall<cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegate, cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegateResponse>;
    undelegate: grpc.handleUnaryCall<cosmos_staking_v1beta1_tx_pb.MsgUndelegate, cosmos_staking_v1beta1_tx_pb.MsgUndelegateResponse>;
}

export interface IMsgClient {
    createValidator(request: cosmos_staking_v1beta1_tx_pb.MsgCreateValidator, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgCreateValidatorResponse) => void): grpc.ClientUnaryCall;
    createValidator(request: cosmos_staking_v1beta1_tx_pb.MsgCreateValidator, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgCreateValidatorResponse) => void): grpc.ClientUnaryCall;
    createValidator(request: cosmos_staking_v1beta1_tx_pb.MsgCreateValidator, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgCreateValidatorResponse) => void): grpc.ClientUnaryCall;
    editValidator(request: cosmos_staking_v1beta1_tx_pb.MsgEditValidator, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgEditValidatorResponse) => void): grpc.ClientUnaryCall;
    editValidator(request: cosmos_staking_v1beta1_tx_pb.MsgEditValidator, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgEditValidatorResponse) => void): grpc.ClientUnaryCall;
    editValidator(request: cosmos_staking_v1beta1_tx_pb.MsgEditValidator, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgEditValidatorResponse) => void): grpc.ClientUnaryCall;
    delegate(request: cosmos_staking_v1beta1_tx_pb.MsgDelegate, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgDelegateResponse) => void): grpc.ClientUnaryCall;
    delegate(request: cosmos_staking_v1beta1_tx_pb.MsgDelegate, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgDelegateResponse) => void): grpc.ClientUnaryCall;
    delegate(request: cosmos_staking_v1beta1_tx_pb.MsgDelegate, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgDelegateResponse) => void): grpc.ClientUnaryCall;
    beginRedelegate(request: cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegate, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegateResponse) => void): grpc.ClientUnaryCall;
    beginRedelegate(request: cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegate, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegateResponse) => void): grpc.ClientUnaryCall;
    beginRedelegate(request: cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegate, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegateResponse) => void): grpc.ClientUnaryCall;
    undelegate(request: cosmos_staking_v1beta1_tx_pb.MsgUndelegate, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgUndelegateResponse) => void): grpc.ClientUnaryCall;
    undelegate(request: cosmos_staking_v1beta1_tx_pb.MsgUndelegate, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgUndelegateResponse) => void): grpc.ClientUnaryCall;
    undelegate(request: cosmos_staking_v1beta1_tx_pb.MsgUndelegate, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgUndelegateResponse) => void): grpc.ClientUnaryCall;
}

export class MsgClient extends grpc.Client implements IMsgClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public createValidator(request: cosmos_staking_v1beta1_tx_pb.MsgCreateValidator, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgCreateValidatorResponse) => void): grpc.ClientUnaryCall;
    public createValidator(request: cosmos_staking_v1beta1_tx_pb.MsgCreateValidator, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgCreateValidatorResponse) => void): grpc.ClientUnaryCall;
    public createValidator(request: cosmos_staking_v1beta1_tx_pb.MsgCreateValidator, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgCreateValidatorResponse) => void): grpc.ClientUnaryCall;
    public editValidator(request: cosmos_staking_v1beta1_tx_pb.MsgEditValidator, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgEditValidatorResponse) => void): grpc.ClientUnaryCall;
    public editValidator(request: cosmos_staking_v1beta1_tx_pb.MsgEditValidator, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgEditValidatorResponse) => void): grpc.ClientUnaryCall;
    public editValidator(request: cosmos_staking_v1beta1_tx_pb.MsgEditValidator, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgEditValidatorResponse) => void): grpc.ClientUnaryCall;
    public delegate(request: cosmos_staking_v1beta1_tx_pb.MsgDelegate, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgDelegateResponse) => void): grpc.ClientUnaryCall;
    public delegate(request: cosmos_staking_v1beta1_tx_pb.MsgDelegate, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgDelegateResponse) => void): grpc.ClientUnaryCall;
    public delegate(request: cosmos_staking_v1beta1_tx_pb.MsgDelegate, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgDelegateResponse) => void): grpc.ClientUnaryCall;
    public beginRedelegate(request: cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegate, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegateResponse) => void): grpc.ClientUnaryCall;
    public beginRedelegate(request: cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegate, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegateResponse) => void): grpc.ClientUnaryCall;
    public beginRedelegate(request: cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegate, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegateResponse) => void): grpc.ClientUnaryCall;
    public undelegate(request: cosmos_staking_v1beta1_tx_pb.MsgUndelegate, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgUndelegateResponse) => void): grpc.ClientUnaryCall;
    public undelegate(request: cosmos_staking_v1beta1_tx_pb.MsgUndelegate, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgUndelegateResponse) => void): grpc.ClientUnaryCall;
    public undelegate(request: cosmos_staking_v1beta1_tx_pb.MsgUndelegate, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_tx_pb.MsgUndelegateResponse) => void): grpc.ClientUnaryCall;
}
