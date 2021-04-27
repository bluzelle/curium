// package: bluzelle.curium.crud
// file: crud/tx.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as crud_tx_pb from "../crud/tx_pb";
import * as crud_lease_pb from "../crud/lease_pb";

interface IMsgService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    read: IMsgService_IRead;
    upsert: IMsgService_IUpsert;
    create: IMsgService_ICreate;
    update: IMsgService_IUpdate;
    delete: IMsgService_IDelete;
}

interface IMsgService_IRead extends grpc.MethodDefinition<crud_tx_pb.MsgRead, crud_tx_pb.MsgReadResponse> {
    path: "/bluzelle.curium.crud.Msg/Read";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<crud_tx_pb.MsgRead>;
    requestDeserialize: grpc.deserialize<crud_tx_pb.MsgRead>;
    responseSerialize: grpc.serialize<crud_tx_pb.MsgReadResponse>;
    responseDeserialize: grpc.deserialize<crud_tx_pb.MsgReadResponse>;
}
interface IMsgService_IUpsert extends grpc.MethodDefinition<crud_tx_pb.MsgUpsert, crud_tx_pb.MsgUpsertResponse> {
    path: "/bluzelle.curium.crud.Msg/Upsert";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<crud_tx_pb.MsgUpsert>;
    requestDeserialize: grpc.deserialize<crud_tx_pb.MsgUpsert>;
    responseSerialize: grpc.serialize<crud_tx_pb.MsgUpsertResponse>;
    responseDeserialize: grpc.deserialize<crud_tx_pb.MsgUpsertResponse>;
}
interface IMsgService_ICreate extends grpc.MethodDefinition<crud_tx_pb.MsgCreate, crud_tx_pb.MsgCreateResponse> {
    path: "/bluzelle.curium.crud.Msg/Create";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<crud_tx_pb.MsgCreate>;
    requestDeserialize: grpc.deserialize<crud_tx_pb.MsgCreate>;
    responseSerialize: grpc.serialize<crud_tx_pb.MsgCreateResponse>;
    responseDeserialize: grpc.deserialize<crud_tx_pb.MsgCreateResponse>;
}
interface IMsgService_IUpdate extends grpc.MethodDefinition<crud_tx_pb.MsgUpdate, crud_tx_pb.MsgUpdateResponse> {
    path: "/bluzelle.curium.crud.Msg/Update";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<crud_tx_pb.MsgUpdate>;
    requestDeserialize: grpc.deserialize<crud_tx_pb.MsgUpdate>;
    responseSerialize: grpc.serialize<crud_tx_pb.MsgUpdateResponse>;
    responseDeserialize: grpc.deserialize<crud_tx_pb.MsgUpdateResponse>;
}
interface IMsgService_IDelete extends grpc.MethodDefinition<crud_tx_pb.MsgDelete, crud_tx_pb.MsgDeleteResponse> {
    path: "/bluzelle.curium.crud.Msg/Delete";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<crud_tx_pb.MsgDelete>;
    requestDeserialize: grpc.deserialize<crud_tx_pb.MsgDelete>;
    responseSerialize: grpc.serialize<crud_tx_pb.MsgDeleteResponse>;
    responseDeserialize: grpc.deserialize<crud_tx_pb.MsgDeleteResponse>;
}

export const MsgService: IMsgService;

export interface IMsgServer {
    read: grpc.handleUnaryCall<crud_tx_pb.MsgRead, crud_tx_pb.MsgReadResponse>;
    upsert: grpc.handleUnaryCall<crud_tx_pb.MsgUpsert, crud_tx_pb.MsgUpsertResponse>;
    create: grpc.handleUnaryCall<crud_tx_pb.MsgCreate, crud_tx_pb.MsgCreateResponse>;
    update: grpc.handleUnaryCall<crud_tx_pb.MsgUpdate, crud_tx_pb.MsgUpdateResponse>;
    delete: grpc.handleUnaryCall<crud_tx_pb.MsgDelete, crud_tx_pb.MsgDeleteResponse>;
}

export interface IMsgClient {
    read(request: crud_tx_pb.MsgRead, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgReadResponse) => void): grpc.ClientUnaryCall;
    read(request: crud_tx_pb.MsgRead, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgReadResponse) => void): grpc.ClientUnaryCall;
    read(request: crud_tx_pb.MsgRead, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgReadResponse) => void): grpc.ClientUnaryCall;
    upsert(request: crud_tx_pb.MsgUpsert, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgUpsertResponse) => void): grpc.ClientUnaryCall;
    upsert(request: crud_tx_pb.MsgUpsert, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgUpsertResponse) => void): grpc.ClientUnaryCall;
    upsert(request: crud_tx_pb.MsgUpsert, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgUpsertResponse) => void): grpc.ClientUnaryCall;
    create(request: crud_tx_pb.MsgCreate, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgCreateResponse) => void): grpc.ClientUnaryCall;
    create(request: crud_tx_pb.MsgCreate, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgCreateResponse) => void): grpc.ClientUnaryCall;
    create(request: crud_tx_pb.MsgCreate, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgCreateResponse) => void): grpc.ClientUnaryCall;
    update(request: crud_tx_pb.MsgUpdate, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgUpdateResponse) => void): grpc.ClientUnaryCall;
    update(request: crud_tx_pb.MsgUpdate, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgUpdateResponse) => void): grpc.ClientUnaryCall;
    update(request: crud_tx_pb.MsgUpdate, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgUpdateResponse) => void): grpc.ClientUnaryCall;
    delete(request: crud_tx_pb.MsgDelete, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgDeleteResponse) => void): grpc.ClientUnaryCall;
    delete(request: crud_tx_pb.MsgDelete, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgDeleteResponse) => void): grpc.ClientUnaryCall;
    delete(request: crud_tx_pb.MsgDelete, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgDeleteResponse) => void): grpc.ClientUnaryCall;
}

export class MsgClient extends grpc.Client implements IMsgClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public read(request: crud_tx_pb.MsgRead, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgReadResponse) => void): grpc.ClientUnaryCall;
    public read(request: crud_tx_pb.MsgRead, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgReadResponse) => void): grpc.ClientUnaryCall;
    public read(request: crud_tx_pb.MsgRead, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgReadResponse) => void): grpc.ClientUnaryCall;
    public upsert(request: crud_tx_pb.MsgUpsert, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgUpsertResponse) => void): grpc.ClientUnaryCall;
    public upsert(request: crud_tx_pb.MsgUpsert, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgUpsertResponse) => void): grpc.ClientUnaryCall;
    public upsert(request: crud_tx_pb.MsgUpsert, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgUpsertResponse) => void): grpc.ClientUnaryCall;
    public create(request: crud_tx_pb.MsgCreate, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgCreateResponse) => void): grpc.ClientUnaryCall;
    public create(request: crud_tx_pb.MsgCreate, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgCreateResponse) => void): grpc.ClientUnaryCall;
    public create(request: crud_tx_pb.MsgCreate, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgCreateResponse) => void): grpc.ClientUnaryCall;
    public update(request: crud_tx_pb.MsgUpdate, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgUpdateResponse) => void): grpc.ClientUnaryCall;
    public update(request: crud_tx_pb.MsgUpdate, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgUpdateResponse) => void): grpc.ClientUnaryCall;
    public update(request: crud_tx_pb.MsgUpdate, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgUpdateResponse) => void): grpc.ClientUnaryCall;
    public delete(request: crud_tx_pb.MsgDelete, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgDeleteResponse) => void): grpc.ClientUnaryCall;
    public delete(request: crud_tx_pb.MsgDelete, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgDeleteResponse) => void): grpc.ClientUnaryCall;
    public delete(request: crud_tx_pb.MsgDelete, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: crud_tx_pb.MsgDeleteResponse) => void): grpc.ClientUnaryCall;
}
