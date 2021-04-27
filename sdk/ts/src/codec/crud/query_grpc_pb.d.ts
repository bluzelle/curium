// package: bluzelle.curium.crud
// file: crud/query.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as crud_query_pb from "../crud/query_pb";
import * as cosmos_base_query_v1beta1_pagination_pb from "../cosmos/base/query/v1beta1/pagination_pb";
import * as crud_CrudValue_pb from "../crud/CrudValue_pb";

interface IQueryService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    crudValue: IQueryService_ICrudValue;
    crudValueAll: IQueryService_ICrudValueAll;
}

interface IQueryService_ICrudValue extends grpc.MethodDefinition<crud_query_pb.QueryGetCrudValueRequest, crud_query_pb.QueryGetCrudValueResponse> {
    path: "/bluzelle.curium.crud.Query/CrudValue";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<crud_query_pb.QueryGetCrudValueRequest>;
    requestDeserialize: grpc.deserialize<crud_query_pb.QueryGetCrudValueRequest>;
    responseSerialize: grpc.serialize<crud_query_pb.QueryGetCrudValueResponse>;
    responseDeserialize: grpc.deserialize<crud_query_pb.QueryGetCrudValueResponse>;
}
interface IQueryService_ICrudValueAll extends grpc.MethodDefinition<crud_query_pb.QueryAllCrudValueRequest, crud_query_pb.QueryAllCrudValueResponse> {
    path: "/bluzelle.curium.crud.Query/CrudValueAll";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<crud_query_pb.QueryAllCrudValueRequest>;
    requestDeserialize: grpc.deserialize<crud_query_pb.QueryAllCrudValueRequest>;
    responseSerialize: grpc.serialize<crud_query_pb.QueryAllCrudValueResponse>;
    responseDeserialize: grpc.deserialize<crud_query_pb.QueryAllCrudValueResponse>;
}

export const QueryService: IQueryService;

export interface IQueryServer {
    crudValue: grpc.handleUnaryCall<crud_query_pb.QueryGetCrudValueRequest, crud_query_pb.QueryGetCrudValueResponse>;
    crudValueAll: grpc.handleUnaryCall<crud_query_pb.QueryAllCrudValueRequest, crud_query_pb.QueryAllCrudValueResponse>;
}

export interface IQueryClient {
    crudValue(request: crud_query_pb.QueryGetCrudValueRequest, callback: (error: grpc.ServiceError | null, response: crud_query_pb.QueryGetCrudValueResponse) => void): grpc.ClientUnaryCall;
    crudValue(request: crud_query_pb.QueryGetCrudValueRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: crud_query_pb.QueryGetCrudValueResponse) => void): grpc.ClientUnaryCall;
    crudValue(request: crud_query_pb.QueryGetCrudValueRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: crud_query_pb.QueryGetCrudValueResponse) => void): grpc.ClientUnaryCall;
    crudValueAll(request: crud_query_pb.QueryAllCrudValueRequest, callback: (error: grpc.ServiceError | null, response: crud_query_pb.QueryAllCrudValueResponse) => void): grpc.ClientUnaryCall;
    crudValueAll(request: crud_query_pb.QueryAllCrudValueRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: crud_query_pb.QueryAllCrudValueResponse) => void): grpc.ClientUnaryCall;
    crudValueAll(request: crud_query_pb.QueryAllCrudValueRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: crud_query_pb.QueryAllCrudValueResponse) => void): grpc.ClientUnaryCall;
}

export class QueryClient extends grpc.Client implements IQueryClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public crudValue(request: crud_query_pb.QueryGetCrudValueRequest, callback: (error: grpc.ServiceError | null, response: crud_query_pb.QueryGetCrudValueResponse) => void): grpc.ClientUnaryCall;
    public crudValue(request: crud_query_pb.QueryGetCrudValueRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: crud_query_pb.QueryGetCrudValueResponse) => void): grpc.ClientUnaryCall;
    public crudValue(request: crud_query_pb.QueryGetCrudValueRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: crud_query_pb.QueryGetCrudValueResponse) => void): grpc.ClientUnaryCall;
    public crudValueAll(request: crud_query_pb.QueryAllCrudValueRequest, callback: (error: grpc.ServiceError | null, response: crud_query_pb.QueryAllCrudValueResponse) => void): grpc.ClientUnaryCall;
    public crudValueAll(request: crud_query_pb.QueryAllCrudValueRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: crud_query_pb.QueryAllCrudValueResponse) => void): grpc.ClientUnaryCall;
    public crudValueAll(request: crud_query_pb.QueryAllCrudValueRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: crud_query_pb.QueryAllCrudValueResponse) => void): grpc.ClientUnaryCall;
}
