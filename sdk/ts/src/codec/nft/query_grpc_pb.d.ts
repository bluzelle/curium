// package: bluzelle.curium.nft
// file: nft/query.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as nft_query_pb from "../nft/query_pb";
import * as cosmos_base_query_v1beta1_pagination_pb from "../cosmos/base/query/v1beta1/pagination_pb";
import * as nft_nft_pb from "../nft/nft_pb";

interface IQueryService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    nft: IQueryService_INft;
    nftAll: IQueryService_INftAll;
}

interface IQueryService_INft extends grpc.MethodDefinition<nft_query_pb.QueryGetNftRequest, nft_query_pb.QueryGetNftResponse> {
    path: "/bluzelle.curium.nft.Query/Nft";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<nft_query_pb.QueryGetNftRequest>;
    requestDeserialize: grpc.deserialize<nft_query_pb.QueryGetNftRequest>;
    responseSerialize: grpc.serialize<nft_query_pb.QueryGetNftResponse>;
    responseDeserialize: grpc.deserialize<nft_query_pb.QueryGetNftResponse>;
}
interface IQueryService_INftAll extends grpc.MethodDefinition<nft_query_pb.QueryAllNftRequest, nft_query_pb.QueryAllNftResponse> {
    path: "/bluzelle.curium.nft.Query/NftAll";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<nft_query_pb.QueryAllNftRequest>;
    requestDeserialize: grpc.deserialize<nft_query_pb.QueryAllNftRequest>;
    responseSerialize: grpc.serialize<nft_query_pb.QueryAllNftResponse>;
    responseDeserialize: grpc.deserialize<nft_query_pb.QueryAllNftResponse>;
}

export const QueryService: IQueryService;

export interface IQueryServer {
    nft: grpc.handleUnaryCall<nft_query_pb.QueryGetNftRequest, nft_query_pb.QueryGetNftResponse>;
    nftAll: grpc.handleUnaryCall<nft_query_pb.QueryAllNftRequest, nft_query_pb.QueryAllNftResponse>;
}

export interface IQueryClient {
    nft(request: nft_query_pb.QueryGetNftRequest, callback: (error: grpc.ServiceError | null, response: nft_query_pb.QueryGetNftResponse) => void): grpc.ClientUnaryCall;
    nft(request: nft_query_pb.QueryGetNftRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: nft_query_pb.QueryGetNftResponse) => void): grpc.ClientUnaryCall;
    nft(request: nft_query_pb.QueryGetNftRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: nft_query_pb.QueryGetNftResponse) => void): grpc.ClientUnaryCall;
    nftAll(request: nft_query_pb.QueryAllNftRequest, callback: (error: grpc.ServiceError | null, response: nft_query_pb.QueryAllNftResponse) => void): grpc.ClientUnaryCall;
    nftAll(request: nft_query_pb.QueryAllNftRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: nft_query_pb.QueryAllNftResponse) => void): grpc.ClientUnaryCall;
    nftAll(request: nft_query_pb.QueryAllNftRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: nft_query_pb.QueryAllNftResponse) => void): grpc.ClientUnaryCall;
}

export class QueryClient extends grpc.Client implements IQueryClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public nft(request: nft_query_pb.QueryGetNftRequest, callback: (error: grpc.ServiceError | null, response: nft_query_pb.QueryGetNftResponse) => void): grpc.ClientUnaryCall;
    public nft(request: nft_query_pb.QueryGetNftRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: nft_query_pb.QueryGetNftResponse) => void): grpc.ClientUnaryCall;
    public nft(request: nft_query_pb.QueryGetNftRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: nft_query_pb.QueryGetNftResponse) => void): grpc.ClientUnaryCall;
    public nftAll(request: nft_query_pb.QueryAllNftRequest, callback: (error: grpc.ServiceError | null, response: nft_query_pb.QueryAllNftResponse) => void): grpc.ClientUnaryCall;
    public nftAll(request: nft_query_pb.QueryAllNftRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: nft_query_pb.QueryAllNftResponse) => void): grpc.ClientUnaryCall;
    public nftAll(request: nft_query_pb.QueryAllNftRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: nft_query_pb.QueryAllNftResponse) => void): grpc.ClientUnaryCall;
}
