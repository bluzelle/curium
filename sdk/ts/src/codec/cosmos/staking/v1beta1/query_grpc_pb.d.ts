// package: cosmos.staking.v1beta1
// file: cosmos/staking/v1beta1/query.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as cosmos_staking_v1beta1_query_pb from "../../../cosmos/staking/v1beta1/query_pb";
import * as cosmos_base_query_v1beta1_pagination_pb from "../../../cosmos/base/query/v1beta1/pagination_pb";
import * as gogoproto_gogo_pb from "../../../gogoproto/gogo_pb";
import * as cosmos_staking_v1beta1_staking_pb from "../../../cosmos/staking/v1beta1/staking_pb";

interface IQueryService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    validators: IQueryService_IValidators;
    validator: IQueryService_IValidator;
    validatorDelegations: IQueryService_IValidatorDelegations;
    validatorUnbondingDelegations: IQueryService_IValidatorUnbondingDelegations;
    delegation: IQueryService_IDelegation;
    unbondingDelegation: IQueryService_IUnbondingDelegation;
    delegatorDelegations: IQueryService_IDelegatorDelegations;
    delegatorUnbondingDelegations: IQueryService_IDelegatorUnbondingDelegations;
    redelegations: IQueryService_IRedelegations;
    delegatorValidators: IQueryService_IDelegatorValidators;
    delegatorValidator: IQueryService_IDelegatorValidator;
    historicalInfo: IQueryService_IHistoricalInfo;
    pool: IQueryService_IPool;
    params: IQueryService_IParams;
}

interface IQueryService_IValidators extends grpc.MethodDefinition<cosmos_staking_v1beta1_query_pb.QueryValidatorsRequest, cosmos_staking_v1beta1_query_pb.QueryValidatorsResponse> {
    path: "/cosmos.staking.v1beta1.Query/Validators";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryValidatorsRequest>;
    requestDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryValidatorsRequest>;
    responseSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryValidatorsResponse>;
    responseDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryValidatorsResponse>;
}
interface IQueryService_IValidator extends grpc.MethodDefinition<cosmos_staking_v1beta1_query_pb.QueryValidatorRequest, cosmos_staking_v1beta1_query_pb.QueryValidatorResponse> {
    path: "/cosmos.staking.v1beta1.Query/Validator";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryValidatorRequest>;
    requestDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryValidatorRequest>;
    responseSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryValidatorResponse>;
    responseDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryValidatorResponse>;
}
interface IQueryService_IValidatorDelegations extends grpc.MethodDefinition<cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsRequest, cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsResponse> {
    path: "/cosmos.staking.v1beta1.Query/ValidatorDelegations";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsRequest>;
    requestDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsRequest>;
    responseSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsResponse>;
    responseDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsResponse>;
}
interface IQueryService_IValidatorUnbondingDelegations extends grpc.MethodDefinition<cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsRequest, cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsResponse> {
    path: "/cosmos.staking.v1beta1.Query/ValidatorUnbondingDelegations";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsRequest>;
    requestDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsRequest>;
    responseSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsResponse>;
    responseDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsResponse>;
}
interface IQueryService_IDelegation extends grpc.MethodDefinition<cosmos_staking_v1beta1_query_pb.QueryDelegationRequest, cosmos_staking_v1beta1_query_pb.QueryDelegationResponse> {
    path: "/cosmos.staking.v1beta1.Query/Delegation";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryDelegationRequest>;
    requestDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryDelegationRequest>;
    responseSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryDelegationResponse>;
    responseDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryDelegationResponse>;
}
interface IQueryService_IUnbondingDelegation extends grpc.MethodDefinition<cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationRequest, cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationResponse> {
    path: "/cosmos.staking.v1beta1.Query/UnbondingDelegation";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationRequest>;
    requestDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationRequest>;
    responseSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationResponse>;
    responseDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationResponse>;
}
interface IQueryService_IDelegatorDelegations extends grpc.MethodDefinition<cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsRequest, cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsResponse> {
    path: "/cosmos.staking.v1beta1.Query/DelegatorDelegations";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsRequest>;
    requestDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsRequest>;
    responseSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsResponse>;
    responseDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsResponse>;
}
interface IQueryService_IDelegatorUnbondingDelegations extends grpc.MethodDefinition<cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsRequest, cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsResponse> {
    path: "/cosmos.staking.v1beta1.Query/DelegatorUnbondingDelegations";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsRequest>;
    requestDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsRequest>;
    responseSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsResponse>;
    responseDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsResponse>;
}
interface IQueryService_IRedelegations extends grpc.MethodDefinition<cosmos_staking_v1beta1_query_pb.QueryRedelegationsRequest, cosmos_staking_v1beta1_query_pb.QueryRedelegationsResponse> {
    path: "/cosmos.staking.v1beta1.Query/Redelegations";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryRedelegationsRequest>;
    requestDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryRedelegationsRequest>;
    responseSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryRedelegationsResponse>;
    responseDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryRedelegationsResponse>;
}
interface IQueryService_IDelegatorValidators extends grpc.MethodDefinition<cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsRequest, cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsResponse> {
    path: "/cosmos.staking.v1beta1.Query/DelegatorValidators";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsRequest>;
    requestDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsRequest>;
    responseSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsResponse>;
    responseDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsResponse>;
}
interface IQueryService_IDelegatorValidator extends grpc.MethodDefinition<cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorRequest, cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorResponse> {
    path: "/cosmos.staking.v1beta1.Query/DelegatorValidator";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorRequest>;
    requestDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorRequest>;
    responseSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorResponse>;
    responseDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorResponse>;
}
interface IQueryService_IHistoricalInfo extends grpc.MethodDefinition<cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoRequest, cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoResponse> {
    path: "/cosmos.staking.v1beta1.Query/HistoricalInfo";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoRequest>;
    requestDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoRequest>;
    responseSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoResponse>;
    responseDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoResponse>;
}
interface IQueryService_IPool extends grpc.MethodDefinition<cosmos_staking_v1beta1_query_pb.QueryPoolRequest, cosmos_staking_v1beta1_query_pb.QueryPoolResponse> {
    path: "/cosmos.staking.v1beta1.Query/Pool";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryPoolRequest>;
    requestDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryPoolRequest>;
    responseSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryPoolResponse>;
    responseDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryPoolResponse>;
}
interface IQueryService_IParams extends grpc.MethodDefinition<cosmos_staking_v1beta1_query_pb.QueryParamsRequest, cosmos_staking_v1beta1_query_pb.QueryParamsResponse> {
    path: "/cosmos.staking.v1beta1.Query/Params";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryParamsRequest>;
    requestDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryParamsRequest>;
    responseSerialize: grpc.serialize<cosmos_staking_v1beta1_query_pb.QueryParamsResponse>;
    responseDeserialize: grpc.deserialize<cosmos_staking_v1beta1_query_pb.QueryParamsResponse>;
}

export const QueryService: IQueryService;

export interface IQueryServer {
    validators: grpc.handleUnaryCall<cosmos_staking_v1beta1_query_pb.QueryValidatorsRequest, cosmos_staking_v1beta1_query_pb.QueryValidatorsResponse>;
    validator: grpc.handleUnaryCall<cosmos_staking_v1beta1_query_pb.QueryValidatorRequest, cosmos_staking_v1beta1_query_pb.QueryValidatorResponse>;
    validatorDelegations: grpc.handleUnaryCall<cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsRequest, cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsResponse>;
    validatorUnbondingDelegations: grpc.handleUnaryCall<cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsRequest, cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsResponse>;
    delegation: grpc.handleUnaryCall<cosmos_staking_v1beta1_query_pb.QueryDelegationRequest, cosmos_staking_v1beta1_query_pb.QueryDelegationResponse>;
    unbondingDelegation: grpc.handleUnaryCall<cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationRequest, cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationResponse>;
    delegatorDelegations: grpc.handleUnaryCall<cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsRequest, cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsResponse>;
    delegatorUnbondingDelegations: grpc.handleUnaryCall<cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsRequest, cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsResponse>;
    redelegations: grpc.handleUnaryCall<cosmos_staking_v1beta1_query_pb.QueryRedelegationsRequest, cosmos_staking_v1beta1_query_pb.QueryRedelegationsResponse>;
    delegatorValidators: grpc.handleUnaryCall<cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsRequest, cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsResponse>;
    delegatorValidator: grpc.handleUnaryCall<cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorRequest, cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorResponse>;
    historicalInfo: grpc.handleUnaryCall<cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoRequest, cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoResponse>;
    pool: grpc.handleUnaryCall<cosmos_staking_v1beta1_query_pb.QueryPoolRequest, cosmos_staking_v1beta1_query_pb.QueryPoolResponse>;
    params: grpc.handleUnaryCall<cosmos_staking_v1beta1_query_pb.QueryParamsRequest, cosmos_staking_v1beta1_query_pb.QueryParamsResponse>;
}

export interface IQueryClient {
    validators(request: cosmos_staking_v1beta1_query_pb.QueryValidatorsRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorsResponse) => void): grpc.ClientUnaryCall;
    validators(request: cosmos_staking_v1beta1_query_pb.QueryValidatorsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorsResponse) => void): grpc.ClientUnaryCall;
    validators(request: cosmos_staking_v1beta1_query_pb.QueryValidatorsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorsResponse) => void): grpc.ClientUnaryCall;
    validator(request: cosmos_staking_v1beta1_query_pb.QueryValidatorRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorResponse) => void): grpc.ClientUnaryCall;
    validator(request: cosmos_staking_v1beta1_query_pb.QueryValidatorRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorResponse) => void): grpc.ClientUnaryCall;
    validator(request: cosmos_staking_v1beta1_query_pb.QueryValidatorRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorResponse) => void): grpc.ClientUnaryCall;
    validatorDelegations(request: cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsResponse) => void): grpc.ClientUnaryCall;
    validatorDelegations(request: cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsResponse) => void): grpc.ClientUnaryCall;
    validatorDelegations(request: cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsResponse) => void): grpc.ClientUnaryCall;
    validatorUnbondingDelegations(request: cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsResponse) => void): grpc.ClientUnaryCall;
    validatorUnbondingDelegations(request: cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsResponse) => void): grpc.ClientUnaryCall;
    validatorUnbondingDelegations(request: cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsResponse) => void): grpc.ClientUnaryCall;
    delegation(request: cosmos_staking_v1beta1_query_pb.QueryDelegationRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegationResponse) => void): grpc.ClientUnaryCall;
    delegation(request: cosmos_staking_v1beta1_query_pb.QueryDelegationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegationResponse) => void): grpc.ClientUnaryCall;
    delegation(request: cosmos_staking_v1beta1_query_pb.QueryDelegationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegationResponse) => void): grpc.ClientUnaryCall;
    unbondingDelegation(request: cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationResponse) => void): grpc.ClientUnaryCall;
    unbondingDelegation(request: cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationResponse) => void): grpc.ClientUnaryCall;
    unbondingDelegation(request: cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationResponse) => void): grpc.ClientUnaryCall;
    delegatorDelegations(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsResponse) => void): grpc.ClientUnaryCall;
    delegatorDelegations(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsResponse) => void): grpc.ClientUnaryCall;
    delegatorDelegations(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsResponse) => void): grpc.ClientUnaryCall;
    delegatorUnbondingDelegations(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsResponse) => void): grpc.ClientUnaryCall;
    delegatorUnbondingDelegations(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsResponse) => void): grpc.ClientUnaryCall;
    delegatorUnbondingDelegations(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsResponse) => void): grpc.ClientUnaryCall;
    redelegations(request: cosmos_staking_v1beta1_query_pb.QueryRedelegationsRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryRedelegationsResponse) => void): grpc.ClientUnaryCall;
    redelegations(request: cosmos_staking_v1beta1_query_pb.QueryRedelegationsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryRedelegationsResponse) => void): grpc.ClientUnaryCall;
    redelegations(request: cosmos_staking_v1beta1_query_pb.QueryRedelegationsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryRedelegationsResponse) => void): grpc.ClientUnaryCall;
    delegatorValidators(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsResponse) => void): grpc.ClientUnaryCall;
    delegatorValidators(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsResponse) => void): grpc.ClientUnaryCall;
    delegatorValidators(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsResponse) => void): grpc.ClientUnaryCall;
    delegatorValidator(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorResponse) => void): grpc.ClientUnaryCall;
    delegatorValidator(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorResponse) => void): grpc.ClientUnaryCall;
    delegatorValidator(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorResponse) => void): grpc.ClientUnaryCall;
    historicalInfo(request: cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoResponse) => void): grpc.ClientUnaryCall;
    historicalInfo(request: cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoResponse) => void): grpc.ClientUnaryCall;
    historicalInfo(request: cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoResponse) => void): grpc.ClientUnaryCall;
    pool(request: cosmos_staking_v1beta1_query_pb.QueryPoolRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryPoolResponse) => void): grpc.ClientUnaryCall;
    pool(request: cosmos_staking_v1beta1_query_pb.QueryPoolRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryPoolResponse) => void): grpc.ClientUnaryCall;
    pool(request: cosmos_staking_v1beta1_query_pb.QueryPoolRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryPoolResponse) => void): grpc.ClientUnaryCall;
    params(request: cosmos_staking_v1beta1_query_pb.QueryParamsRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryParamsResponse) => void): grpc.ClientUnaryCall;
    params(request: cosmos_staking_v1beta1_query_pb.QueryParamsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryParamsResponse) => void): grpc.ClientUnaryCall;
    params(request: cosmos_staking_v1beta1_query_pb.QueryParamsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryParamsResponse) => void): grpc.ClientUnaryCall;
}

export class QueryClient extends grpc.Client implements IQueryClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public validators(request: cosmos_staking_v1beta1_query_pb.QueryValidatorsRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorsResponse) => void): grpc.ClientUnaryCall;
    public validators(request: cosmos_staking_v1beta1_query_pb.QueryValidatorsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorsResponse) => void): grpc.ClientUnaryCall;
    public validators(request: cosmos_staking_v1beta1_query_pb.QueryValidatorsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorsResponse) => void): grpc.ClientUnaryCall;
    public validator(request: cosmos_staking_v1beta1_query_pb.QueryValidatorRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorResponse) => void): grpc.ClientUnaryCall;
    public validator(request: cosmos_staking_v1beta1_query_pb.QueryValidatorRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorResponse) => void): grpc.ClientUnaryCall;
    public validator(request: cosmos_staking_v1beta1_query_pb.QueryValidatorRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorResponse) => void): grpc.ClientUnaryCall;
    public validatorDelegations(request: cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsResponse) => void): grpc.ClientUnaryCall;
    public validatorDelegations(request: cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsResponse) => void): grpc.ClientUnaryCall;
    public validatorDelegations(request: cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsResponse) => void): grpc.ClientUnaryCall;
    public validatorUnbondingDelegations(request: cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsResponse) => void): grpc.ClientUnaryCall;
    public validatorUnbondingDelegations(request: cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsResponse) => void): grpc.ClientUnaryCall;
    public validatorUnbondingDelegations(request: cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsResponse) => void): grpc.ClientUnaryCall;
    public delegation(request: cosmos_staking_v1beta1_query_pb.QueryDelegationRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegationResponse) => void): grpc.ClientUnaryCall;
    public delegation(request: cosmos_staking_v1beta1_query_pb.QueryDelegationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegationResponse) => void): grpc.ClientUnaryCall;
    public delegation(request: cosmos_staking_v1beta1_query_pb.QueryDelegationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegationResponse) => void): grpc.ClientUnaryCall;
    public unbondingDelegation(request: cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationResponse) => void): grpc.ClientUnaryCall;
    public unbondingDelegation(request: cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationResponse) => void): grpc.ClientUnaryCall;
    public unbondingDelegation(request: cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationResponse) => void): grpc.ClientUnaryCall;
    public delegatorDelegations(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsResponse) => void): grpc.ClientUnaryCall;
    public delegatorDelegations(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsResponse) => void): grpc.ClientUnaryCall;
    public delegatorDelegations(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsResponse) => void): grpc.ClientUnaryCall;
    public delegatorUnbondingDelegations(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsResponse) => void): grpc.ClientUnaryCall;
    public delegatorUnbondingDelegations(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsResponse) => void): grpc.ClientUnaryCall;
    public delegatorUnbondingDelegations(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsResponse) => void): grpc.ClientUnaryCall;
    public redelegations(request: cosmos_staking_v1beta1_query_pb.QueryRedelegationsRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryRedelegationsResponse) => void): grpc.ClientUnaryCall;
    public redelegations(request: cosmos_staking_v1beta1_query_pb.QueryRedelegationsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryRedelegationsResponse) => void): grpc.ClientUnaryCall;
    public redelegations(request: cosmos_staking_v1beta1_query_pb.QueryRedelegationsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryRedelegationsResponse) => void): grpc.ClientUnaryCall;
    public delegatorValidators(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsResponse) => void): grpc.ClientUnaryCall;
    public delegatorValidators(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsResponse) => void): grpc.ClientUnaryCall;
    public delegatorValidators(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsResponse) => void): grpc.ClientUnaryCall;
    public delegatorValidator(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorResponse) => void): grpc.ClientUnaryCall;
    public delegatorValidator(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorResponse) => void): grpc.ClientUnaryCall;
    public delegatorValidator(request: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorResponse) => void): grpc.ClientUnaryCall;
    public historicalInfo(request: cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoResponse) => void): grpc.ClientUnaryCall;
    public historicalInfo(request: cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoResponse) => void): grpc.ClientUnaryCall;
    public historicalInfo(request: cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoResponse) => void): grpc.ClientUnaryCall;
    public pool(request: cosmos_staking_v1beta1_query_pb.QueryPoolRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryPoolResponse) => void): grpc.ClientUnaryCall;
    public pool(request: cosmos_staking_v1beta1_query_pb.QueryPoolRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryPoolResponse) => void): grpc.ClientUnaryCall;
    public pool(request: cosmos_staking_v1beta1_query_pb.QueryPoolRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryPoolResponse) => void): grpc.ClientUnaryCall;
    public params(request: cosmos_staking_v1beta1_query_pb.QueryParamsRequest, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryParamsResponse) => void): grpc.ClientUnaryCall;
    public params(request: cosmos_staking_v1beta1_query_pb.QueryParamsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryParamsResponse) => void): grpc.ClientUnaryCall;
    public params(request: cosmos_staking_v1beta1_query_pb.QueryParamsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_staking_v1beta1_query_pb.QueryParamsResponse) => void): grpc.ClientUnaryCall;
}
