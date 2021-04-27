// package: cosmos.bank.v1beta1
// file: cosmos/bank/v1beta1/query.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as cosmos_bank_v1beta1_query_pb from "../../../cosmos/bank/v1beta1/query_pb";
import * as cosmos_base_query_v1beta1_pagination_pb from "../../../cosmos/base/query/v1beta1/pagination_pb";
import * as gogoproto_gogo_pb from "../../../gogoproto/gogo_pb";
import * as cosmos_base_v1beta1_coin_pb from "../../../cosmos/base/v1beta1/coin_pb";
import * as cosmos_bank_v1beta1_bank_pb from "../../../cosmos/bank/v1beta1/bank_pb";

interface IQueryService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    balance: IQueryService_IBalance;
    allBalances: IQueryService_IAllBalances;
    totalSupply: IQueryService_ITotalSupply;
    supplyOf: IQueryService_ISupplyOf;
    params: IQueryService_IParams;
    denomMetadata: IQueryService_IDenomMetadata;
    denomsMetadata: IQueryService_IDenomsMetadata;
}

interface IQueryService_IBalance extends grpc.MethodDefinition<cosmos_bank_v1beta1_query_pb.QueryBalanceRequest, cosmos_bank_v1beta1_query_pb.QueryBalanceResponse> {
    path: "/cosmos.bank.v1beta1.Query/Balance";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_bank_v1beta1_query_pb.QueryBalanceRequest>;
    requestDeserialize: grpc.deserialize<cosmos_bank_v1beta1_query_pb.QueryBalanceRequest>;
    responseSerialize: grpc.serialize<cosmos_bank_v1beta1_query_pb.QueryBalanceResponse>;
    responseDeserialize: grpc.deserialize<cosmos_bank_v1beta1_query_pb.QueryBalanceResponse>;
}
interface IQueryService_IAllBalances extends grpc.MethodDefinition<cosmos_bank_v1beta1_query_pb.QueryAllBalancesRequest, cosmos_bank_v1beta1_query_pb.QueryAllBalancesResponse> {
    path: "/cosmos.bank.v1beta1.Query/AllBalances";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_bank_v1beta1_query_pb.QueryAllBalancesRequest>;
    requestDeserialize: grpc.deserialize<cosmos_bank_v1beta1_query_pb.QueryAllBalancesRequest>;
    responseSerialize: grpc.serialize<cosmos_bank_v1beta1_query_pb.QueryAllBalancesResponse>;
    responseDeserialize: grpc.deserialize<cosmos_bank_v1beta1_query_pb.QueryAllBalancesResponse>;
}
interface IQueryService_ITotalSupply extends grpc.MethodDefinition<cosmos_bank_v1beta1_query_pb.QueryTotalSupplyRequest, cosmos_bank_v1beta1_query_pb.QueryTotalSupplyResponse> {
    path: "/cosmos.bank.v1beta1.Query/TotalSupply";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_bank_v1beta1_query_pb.QueryTotalSupplyRequest>;
    requestDeserialize: grpc.deserialize<cosmos_bank_v1beta1_query_pb.QueryTotalSupplyRequest>;
    responseSerialize: grpc.serialize<cosmos_bank_v1beta1_query_pb.QueryTotalSupplyResponse>;
    responseDeserialize: grpc.deserialize<cosmos_bank_v1beta1_query_pb.QueryTotalSupplyResponse>;
}
interface IQueryService_ISupplyOf extends grpc.MethodDefinition<cosmos_bank_v1beta1_query_pb.QuerySupplyOfRequest, cosmos_bank_v1beta1_query_pb.QuerySupplyOfResponse> {
    path: "/cosmos.bank.v1beta1.Query/SupplyOf";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_bank_v1beta1_query_pb.QuerySupplyOfRequest>;
    requestDeserialize: grpc.deserialize<cosmos_bank_v1beta1_query_pb.QuerySupplyOfRequest>;
    responseSerialize: grpc.serialize<cosmos_bank_v1beta1_query_pb.QuerySupplyOfResponse>;
    responseDeserialize: grpc.deserialize<cosmos_bank_v1beta1_query_pb.QuerySupplyOfResponse>;
}
interface IQueryService_IParams extends grpc.MethodDefinition<cosmos_bank_v1beta1_query_pb.QueryParamsRequest, cosmos_bank_v1beta1_query_pb.QueryParamsResponse> {
    path: "/cosmos.bank.v1beta1.Query/Params";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_bank_v1beta1_query_pb.QueryParamsRequest>;
    requestDeserialize: grpc.deserialize<cosmos_bank_v1beta1_query_pb.QueryParamsRequest>;
    responseSerialize: grpc.serialize<cosmos_bank_v1beta1_query_pb.QueryParamsResponse>;
    responseDeserialize: grpc.deserialize<cosmos_bank_v1beta1_query_pb.QueryParamsResponse>;
}
interface IQueryService_IDenomMetadata extends grpc.MethodDefinition<cosmos_bank_v1beta1_query_pb.QueryDenomMetadataRequest, cosmos_bank_v1beta1_query_pb.QueryDenomMetadataResponse> {
    path: "/cosmos.bank.v1beta1.Query/DenomMetadata";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_bank_v1beta1_query_pb.QueryDenomMetadataRequest>;
    requestDeserialize: grpc.deserialize<cosmos_bank_v1beta1_query_pb.QueryDenomMetadataRequest>;
    responseSerialize: grpc.serialize<cosmos_bank_v1beta1_query_pb.QueryDenomMetadataResponse>;
    responseDeserialize: grpc.deserialize<cosmos_bank_v1beta1_query_pb.QueryDenomMetadataResponse>;
}
interface IQueryService_IDenomsMetadata extends grpc.MethodDefinition<cosmos_bank_v1beta1_query_pb.QueryDenomsMetadataRequest, cosmos_bank_v1beta1_query_pb.QueryDenomsMetadataResponse> {
    path: "/cosmos.bank.v1beta1.Query/DenomsMetadata";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_bank_v1beta1_query_pb.QueryDenomsMetadataRequest>;
    requestDeserialize: grpc.deserialize<cosmos_bank_v1beta1_query_pb.QueryDenomsMetadataRequest>;
    responseSerialize: grpc.serialize<cosmos_bank_v1beta1_query_pb.QueryDenomsMetadataResponse>;
    responseDeserialize: grpc.deserialize<cosmos_bank_v1beta1_query_pb.QueryDenomsMetadataResponse>;
}

export const QueryService: IQueryService;

export interface IQueryServer {
    balance: grpc.handleUnaryCall<cosmos_bank_v1beta1_query_pb.QueryBalanceRequest, cosmos_bank_v1beta1_query_pb.QueryBalanceResponse>;
    allBalances: grpc.handleUnaryCall<cosmos_bank_v1beta1_query_pb.QueryAllBalancesRequest, cosmos_bank_v1beta1_query_pb.QueryAllBalancesResponse>;
    totalSupply: grpc.handleUnaryCall<cosmos_bank_v1beta1_query_pb.QueryTotalSupplyRequest, cosmos_bank_v1beta1_query_pb.QueryTotalSupplyResponse>;
    supplyOf: grpc.handleUnaryCall<cosmos_bank_v1beta1_query_pb.QuerySupplyOfRequest, cosmos_bank_v1beta1_query_pb.QuerySupplyOfResponse>;
    params: grpc.handleUnaryCall<cosmos_bank_v1beta1_query_pb.QueryParamsRequest, cosmos_bank_v1beta1_query_pb.QueryParamsResponse>;
    denomMetadata: grpc.handleUnaryCall<cosmos_bank_v1beta1_query_pb.QueryDenomMetadataRequest, cosmos_bank_v1beta1_query_pb.QueryDenomMetadataResponse>;
    denomsMetadata: grpc.handleUnaryCall<cosmos_bank_v1beta1_query_pb.QueryDenomsMetadataRequest, cosmos_bank_v1beta1_query_pb.QueryDenomsMetadataResponse>;
}

export interface IQueryClient {
    balance(request: cosmos_bank_v1beta1_query_pb.QueryBalanceRequest, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryBalanceResponse) => void): grpc.ClientUnaryCall;
    balance(request: cosmos_bank_v1beta1_query_pb.QueryBalanceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryBalanceResponse) => void): grpc.ClientUnaryCall;
    balance(request: cosmos_bank_v1beta1_query_pb.QueryBalanceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryBalanceResponse) => void): grpc.ClientUnaryCall;
    allBalances(request: cosmos_bank_v1beta1_query_pb.QueryAllBalancesRequest, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryAllBalancesResponse) => void): grpc.ClientUnaryCall;
    allBalances(request: cosmos_bank_v1beta1_query_pb.QueryAllBalancesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryAllBalancesResponse) => void): grpc.ClientUnaryCall;
    allBalances(request: cosmos_bank_v1beta1_query_pb.QueryAllBalancesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryAllBalancesResponse) => void): grpc.ClientUnaryCall;
    totalSupply(request: cosmos_bank_v1beta1_query_pb.QueryTotalSupplyRequest, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryTotalSupplyResponse) => void): grpc.ClientUnaryCall;
    totalSupply(request: cosmos_bank_v1beta1_query_pb.QueryTotalSupplyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryTotalSupplyResponse) => void): grpc.ClientUnaryCall;
    totalSupply(request: cosmos_bank_v1beta1_query_pb.QueryTotalSupplyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryTotalSupplyResponse) => void): grpc.ClientUnaryCall;
    supplyOf(request: cosmos_bank_v1beta1_query_pb.QuerySupplyOfRequest, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QuerySupplyOfResponse) => void): grpc.ClientUnaryCall;
    supplyOf(request: cosmos_bank_v1beta1_query_pb.QuerySupplyOfRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QuerySupplyOfResponse) => void): grpc.ClientUnaryCall;
    supplyOf(request: cosmos_bank_v1beta1_query_pb.QuerySupplyOfRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QuerySupplyOfResponse) => void): grpc.ClientUnaryCall;
    params(request: cosmos_bank_v1beta1_query_pb.QueryParamsRequest, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryParamsResponse) => void): grpc.ClientUnaryCall;
    params(request: cosmos_bank_v1beta1_query_pb.QueryParamsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryParamsResponse) => void): grpc.ClientUnaryCall;
    params(request: cosmos_bank_v1beta1_query_pb.QueryParamsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryParamsResponse) => void): grpc.ClientUnaryCall;
    denomMetadata(request: cosmos_bank_v1beta1_query_pb.QueryDenomMetadataRequest, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryDenomMetadataResponse) => void): grpc.ClientUnaryCall;
    denomMetadata(request: cosmos_bank_v1beta1_query_pb.QueryDenomMetadataRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryDenomMetadataResponse) => void): grpc.ClientUnaryCall;
    denomMetadata(request: cosmos_bank_v1beta1_query_pb.QueryDenomMetadataRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryDenomMetadataResponse) => void): grpc.ClientUnaryCall;
    denomsMetadata(request: cosmos_bank_v1beta1_query_pb.QueryDenomsMetadataRequest, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryDenomsMetadataResponse) => void): grpc.ClientUnaryCall;
    denomsMetadata(request: cosmos_bank_v1beta1_query_pb.QueryDenomsMetadataRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryDenomsMetadataResponse) => void): grpc.ClientUnaryCall;
    denomsMetadata(request: cosmos_bank_v1beta1_query_pb.QueryDenomsMetadataRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryDenomsMetadataResponse) => void): grpc.ClientUnaryCall;
}

export class QueryClient extends grpc.Client implements IQueryClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public balance(request: cosmos_bank_v1beta1_query_pb.QueryBalanceRequest, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryBalanceResponse) => void): grpc.ClientUnaryCall;
    public balance(request: cosmos_bank_v1beta1_query_pb.QueryBalanceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryBalanceResponse) => void): grpc.ClientUnaryCall;
    public balance(request: cosmos_bank_v1beta1_query_pb.QueryBalanceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryBalanceResponse) => void): grpc.ClientUnaryCall;
    public allBalances(request: cosmos_bank_v1beta1_query_pb.QueryAllBalancesRequest, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryAllBalancesResponse) => void): grpc.ClientUnaryCall;
    public allBalances(request: cosmos_bank_v1beta1_query_pb.QueryAllBalancesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryAllBalancesResponse) => void): grpc.ClientUnaryCall;
    public allBalances(request: cosmos_bank_v1beta1_query_pb.QueryAllBalancesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryAllBalancesResponse) => void): grpc.ClientUnaryCall;
    public totalSupply(request: cosmos_bank_v1beta1_query_pb.QueryTotalSupplyRequest, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryTotalSupplyResponse) => void): grpc.ClientUnaryCall;
    public totalSupply(request: cosmos_bank_v1beta1_query_pb.QueryTotalSupplyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryTotalSupplyResponse) => void): grpc.ClientUnaryCall;
    public totalSupply(request: cosmos_bank_v1beta1_query_pb.QueryTotalSupplyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryTotalSupplyResponse) => void): grpc.ClientUnaryCall;
    public supplyOf(request: cosmos_bank_v1beta1_query_pb.QuerySupplyOfRequest, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QuerySupplyOfResponse) => void): grpc.ClientUnaryCall;
    public supplyOf(request: cosmos_bank_v1beta1_query_pb.QuerySupplyOfRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QuerySupplyOfResponse) => void): grpc.ClientUnaryCall;
    public supplyOf(request: cosmos_bank_v1beta1_query_pb.QuerySupplyOfRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QuerySupplyOfResponse) => void): grpc.ClientUnaryCall;
    public params(request: cosmos_bank_v1beta1_query_pb.QueryParamsRequest, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryParamsResponse) => void): grpc.ClientUnaryCall;
    public params(request: cosmos_bank_v1beta1_query_pb.QueryParamsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryParamsResponse) => void): grpc.ClientUnaryCall;
    public params(request: cosmos_bank_v1beta1_query_pb.QueryParamsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryParamsResponse) => void): grpc.ClientUnaryCall;
    public denomMetadata(request: cosmos_bank_v1beta1_query_pb.QueryDenomMetadataRequest, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryDenomMetadataResponse) => void): grpc.ClientUnaryCall;
    public denomMetadata(request: cosmos_bank_v1beta1_query_pb.QueryDenomMetadataRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryDenomMetadataResponse) => void): grpc.ClientUnaryCall;
    public denomMetadata(request: cosmos_bank_v1beta1_query_pb.QueryDenomMetadataRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryDenomMetadataResponse) => void): grpc.ClientUnaryCall;
    public denomsMetadata(request: cosmos_bank_v1beta1_query_pb.QueryDenomsMetadataRequest, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryDenomsMetadataResponse) => void): grpc.ClientUnaryCall;
    public denomsMetadata(request: cosmos_bank_v1beta1_query_pb.QueryDenomsMetadataRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryDenomsMetadataResponse) => void): grpc.ClientUnaryCall;
    public denomsMetadata(request: cosmos_bank_v1beta1_query_pb.QueryDenomsMetadataRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_query_pb.QueryDenomsMetadataResponse) => void): grpc.ClientUnaryCall;
}
