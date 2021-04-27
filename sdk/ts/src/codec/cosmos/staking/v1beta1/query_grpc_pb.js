// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var cosmos_staking_v1beta1_query_pb = require('../../../cosmos/staking/v1beta1/query_pb.js');
var cosmos_base_query_v1beta1_pagination_pb = require('../../../cosmos/base/query/v1beta1/pagination_pb.js');
var gogoproto_gogo_pb = require('../../../gogoproto/gogo_pb.js');
var google_api_annotations_pb = require('../../../google/api/annotations_pb.js');
var cosmos_staking_v1beta1_staking_pb = require('../../../cosmos/staking/v1beta1/staking_pb.js');

function serialize_cosmos_staking_v1beta1_QueryDelegationRequest(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryDelegationRequest)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryDelegationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryDelegationRequest(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryDelegationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryDelegationResponse(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryDelegationResponse)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryDelegationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryDelegationResponse(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryDelegationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryDelegatorDelegationsRequest(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsRequest)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryDelegatorDelegationsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryDelegatorDelegationsRequest(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryDelegatorDelegationsResponse(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsResponse)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryDelegatorDelegationsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryDelegatorDelegationsResponse(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryDelegatorUnbondingDelegationsRequest(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsRequest)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryDelegatorUnbondingDelegationsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryDelegatorUnbondingDelegationsRequest(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryDelegatorUnbondingDelegationsResponse(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsResponse)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryDelegatorUnbondingDelegationsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryDelegatorUnbondingDelegationsResponse(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryDelegatorValidatorRequest(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorRequest)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryDelegatorValidatorRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryDelegatorValidatorRequest(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryDelegatorValidatorResponse(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorResponse)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryDelegatorValidatorResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryDelegatorValidatorResponse(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryDelegatorValidatorsRequest(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsRequest)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryDelegatorValidatorsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryDelegatorValidatorsRequest(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryDelegatorValidatorsResponse(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsResponse)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryDelegatorValidatorsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryDelegatorValidatorsResponse(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryHistoricalInfoRequest(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoRequest)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryHistoricalInfoRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryHistoricalInfoRequest(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryHistoricalInfoResponse(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoResponse)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryHistoricalInfoResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryHistoricalInfoResponse(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryParamsRequest(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryParamsRequest)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryParamsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryParamsRequest(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryParamsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryParamsResponse(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryParamsResponse)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryParamsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryParamsResponse(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryParamsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryPoolRequest(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryPoolRequest)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryPoolRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryPoolRequest(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryPoolRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryPoolResponse(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryPoolResponse)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryPoolResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryPoolResponse(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryPoolResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryRedelegationsRequest(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryRedelegationsRequest)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryRedelegationsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryRedelegationsRequest(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryRedelegationsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryRedelegationsResponse(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryRedelegationsResponse)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryRedelegationsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryRedelegationsResponse(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryRedelegationsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryUnbondingDelegationRequest(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationRequest)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryUnbondingDelegationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryUnbondingDelegationRequest(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryUnbondingDelegationResponse(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationResponse)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryUnbondingDelegationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryUnbondingDelegationResponse(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryValidatorDelegationsRequest(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsRequest)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryValidatorDelegationsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryValidatorDelegationsRequest(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryValidatorDelegationsResponse(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsResponse)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryValidatorDelegationsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryValidatorDelegationsResponse(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryValidatorRequest(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryValidatorRequest)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryValidatorRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryValidatorRequest(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryValidatorRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryValidatorResponse(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryValidatorResponse)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryValidatorResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryValidatorResponse(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryValidatorResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryValidatorUnbondingDelegationsRequest(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsRequest)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryValidatorUnbondingDelegationsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryValidatorUnbondingDelegationsRequest(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryValidatorUnbondingDelegationsResponse(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsResponse)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryValidatorUnbondingDelegationsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryValidatorUnbondingDelegationsResponse(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryValidatorsRequest(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryValidatorsRequest)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryValidatorsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryValidatorsRequest(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryValidatorsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_QueryValidatorsResponse(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_query_pb.QueryValidatorsResponse)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.QueryValidatorsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_QueryValidatorsResponse(buffer_arg) {
  return cosmos_staking_v1beta1_query_pb.QueryValidatorsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// Query defines the gRPC querier service.
var QueryService = exports.QueryService = {
  // Validators queries all validators that match the given status.
validators: {
    path: '/cosmos.staking.v1beta1.Query/Validators',
    requestStream: false,
    responseStream: false,
    requestType: cosmos_staking_v1beta1_query_pb.QueryValidatorsRequest,
    responseType: cosmos_staking_v1beta1_query_pb.QueryValidatorsResponse,
    requestSerialize: serialize_cosmos_staking_v1beta1_QueryValidatorsRequest,
    requestDeserialize: deserialize_cosmos_staking_v1beta1_QueryValidatorsRequest,
    responseSerialize: serialize_cosmos_staking_v1beta1_QueryValidatorsResponse,
    responseDeserialize: deserialize_cosmos_staking_v1beta1_QueryValidatorsResponse,
  },
  // Validator queries validator info for given validator address.
validator: {
    path: '/cosmos.staking.v1beta1.Query/Validator',
    requestStream: false,
    responseStream: false,
    requestType: cosmos_staking_v1beta1_query_pb.QueryValidatorRequest,
    responseType: cosmos_staking_v1beta1_query_pb.QueryValidatorResponse,
    requestSerialize: serialize_cosmos_staking_v1beta1_QueryValidatorRequest,
    requestDeserialize: deserialize_cosmos_staking_v1beta1_QueryValidatorRequest,
    responseSerialize: serialize_cosmos_staking_v1beta1_QueryValidatorResponse,
    responseDeserialize: deserialize_cosmos_staking_v1beta1_QueryValidatorResponse,
  },
  // ValidatorDelegations queries delegate info for given validator.
validatorDelegations: {
    path: '/cosmos.staking.v1beta1.Query/ValidatorDelegations',
    requestStream: false,
    responseStream: false,
    requestType: cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsRequest,
    responseType: cosmos_staking_v1beta1_query_pb.QueryValidatorDelegationsResponse,
    requestSerialize: serialize_cosmos_staking_v1beta1_QueryValidatorDelegationsRequest,
    requestDeserialize: deserialize_cosmos_staking_v1beta1_QueryValidatorDelegationsRequest,
    responseSerialize: serialize_cosmos_staking_v1beta1_QueryValidatorDelegationsResponse,
    responseDeserialize: deserialize_cosmos_staking_v1beta1_QueryValidatorDelegationsResponse,
  },
  // ValidatorUnbondingDelegations queries unbonding delegations of a validator.
validatorUnbondingDelegations: {
    path: '/cosmos.staking.v1beta1.Query/ValidatorUnbondingDelegations',
    requestStream: false,
    responseStream: false,
    requestType: cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsRequest,
    responseType: cosmos_staking_v1beta1_query_pb.QueryValidatorUnbondingDelegationsResponse,
    requestSerialize: serialize_cosmos_staking_v1beta1_QueryValidatorUnbondingDelegationsRequest,
    requestDeserialize: deserialize_cosmos_staking_v1beta1_QueryValidatorUnbondingDelegationsRequest,
    responseSerialize: serialize_cosmos_staking_v1beta1_QueryValidatorUnbondingDelegationsResponse,
    responseDeserialize: deserialize_cosmos_staking_v1beta1_QueryValidatorUnbondingDelegationsResponse,
  },
  // Delegation queries delegate info for given validator delegator pair.
delegation: {
    path: '/cosmos.staking.v1beta1.Query/Delegation',
    requestStream: false,
    responseStream: false,
    requestType: cosmos_staking_v1beta1_query_pb.QueryDelegationRequest,
    responseType: cosmos_staking_v1beta1_query_pb.QueryDelegationResponse,
    requestSerialize: serialize_cosmos_staking_v1beta1_QueryDelegationRequest,
    requestDeserialize: deserialize_cosmos_staking_v1beta1_QueryDelegationRequest,
    responseSerialize: serialize_cosmos_staking_v1beta1_QueryDelegationResponse,
    responseDeserialize: deserialize_cosmos_staking_v1beta1_QueryDelegationResponse,
  },
  // UnbondingDelegation queries unbonding info for given validator delegator
// pair.
unbondingDelegation: {
    path: '/cosmos.staking.v1beta1.Query/UnbondingDelegation',
    requestStream: false,
    responseStream: false,
    requestType: cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationRequest,
    responseType: cosmos_staking_v1beta1_query_pb.QueryUnbondingDelegationResponse,
    requestSerialize: serialize_cosmos_staking_v1beta1_QueryUnbondingDelegationRequest,
    requestDeserialize: deserialize_cosmos_staking_v1beta1_QueryUnbondingDelegationRequest,
    responseSerialize: serialize_cosmos_staking_v1beta1_QueryUnbondingDelegationResponse,
    responseDeserialize: deserialize_cosmos_staking_v1beta1_QueryUnbondingDelegationResponse,
  },
  // DelegatorDelegations queries all delegations of a given delegator address.
delegatorDelegations: {
    path: '/cosmos.staking.v1beta1.Query/DelegatorDelegations',
    requestStream: false,
    responseStream: false,
    requestType: cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsRequest,
    responseType: cosmos_staking_v1beta1_query_pb.QueryDelegatorDelegationsResponse,
    requestSerialize: serialize_cosmos_staking_v1beta1_QueryDelegatorDelegationsRequest,
    requestDeserialize: deserialize_cosmos_staking_v1beta1_QueryDelegatorDelegationsRequest,
    responseSerialize: serialize_cosmos_staking_v1beta1_QueryDelegatorDelegationsResponse,
    responseDeserialize: deserialize_cosmos_staking_v1beta1_QueryDelegatorDelegationsResponse,
  },
  // DelegatorUnbondingDelegations queries all unbonding delegations of a given
// delegator address.
delegatorUnbondingDelegations: {
    path: '/cosmos.staking.v1beta1.Query/DelegatorUnbondingDelegations',
    requestStream: false,
    responseStream: false,
    requestType: cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsRequest,
    responseType: cosmos_staking_v1beta1_query_pb.QueryDelegatorUnbondingDelegationsResponse,
    requestSerialize: serialize_cosmos_staking_v1beta1_QueryDelegatorUnbondingDelegationsRequest,
    requestDeserialize: deserialize_cosmos_staking_v1beta1_QueryDelegatorUnbondingDelegationsRequest,
    responseSerialize: serialize_cosmos_staking_v1beta1_QueryDelegatorUnbondingDelegationsResponse,
    responseDeserialize: deserialize_cosmos_staking_v1beta1_QueryDelegatorUnbondingDelegationsResponse,
  },
  // Redelegations queries redelegations of given address.
redelegations: {
    path: '/cosmos.staking.v1beta1.Query/Redelegations',
    requestStream: false,
    responseStream: false,
    requestType: cosmos_staking_v1beta1_query_pb.QueryRedelegationsRequest,
    responseType: cosmos_staking_v1beta1_query_pb.QueryRedelegationsResponse,
    requestSerialize: serialize_cosmos_staking_v1beta1_QueryRedelegationsRequest,
    requestDeserialize: deserialize_cosmos_staking_v1beta1_QueryRedelegationsRequest,
    responseSerialize: serialize_cosmos_staking_v1beta1_QueryRedelegationsResponse,
    responseDeserialize: deserialize_cosmos_staking_v1beta1_QueryRedelegationsResponse,
  },
  // DelegatorValidators queries all validators info for given delegator
// address.
delegatorValidators: {
    path: '/cosmos.staking.v1beta1.Query/DelegatorValidators',
    requestStream: false,
    responseStream: false,
    requestType: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsRequest,
    responseType: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorsResponse,
    requestSerialize: serialize_cosmos_staking_v1beta1_QueryDelegatorValidatorsRequest,
    requestDeserialize: deserialize_cosmos_staking_v1beta1_QueryDelegatorValidatorsRequest,
    responseSerialize: serialize_cosmos_staking_v1beta1_QueryDelegatorValidatorsResponse,
    responseDeserialize: deserialize_cosmos_staking_v1beta1_QueryDelegatorValidatorsResponse,
  },
  // DelegatorValidator queries validator info for given delegator validator
// pair.
delegatorValidator: {
    path: '/cosmos.staking.v1beta1.Query/DelegatorValidator',
    requestStream: false,
    responseStream: false,
    requestType: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorRequest,
    responseType: cosmos_staking_v1beta1_query_pb.QueryDelegatorValidatorResponse,
    requestSerialize: serialize_cosmos_staking_v1beta1_QueryDelegatorValidatorRequest,
    requestDeserialize: deserialize_cosmos_staking_v1beta1_QueryDelegatorValidatorRequest,
    responseSerialize: serialize_cosmos_staking_v1beta1_QueryDelegatorValidatorResponse,
    responseDeserialize: deserialize_cosmos_staking_v1beta1_QueryDelegatorValidatorResponse,
  },
  // HistoricalInfo queries the historical info for given height.
historicalInfo: {
    path: '/cosmos.staking.v1beta1.Query/HistoricalInfo',
    requestStream: false,
    responseStream: false,
    requestType: cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoRequest,
    responseType: cosmos_staking_v1beta1_query_pb.QueryHistoricalInfoResponse,
    requestSerialize: serialize_cosmos_staking_v1beta1_QueryHistoricalInfoRequest,
    requestDeserialize: deserialize_cosmos_staking_v1beta1_QueryHistoricalInfoRequest,
    responseSerialize: serialize_cosmos_staking_v1beta1_QueryHistoricalInfoResponse,
    responseDeserialize: deserialize_cosmos_staking_v1beta1_QueryHistoricalInfoResponse,
  },
  // Pool queries the pool info.
pool: {
    path: '/cosmos.staking.v1beta1.Query/Pool',
    requestStream: false,
    responseStream: false,
    requestType: cosmos_staking_v1beta1_query_pb.QueryPoolRequest,
    responseType: cosmos_staking_v1beta1_query_pb.QueryPoolResponse,
    requestSerialize: serialize_cosmos_staking_v1beta1_QueryPoolRequest,
    requestDeserialize: deserialize_cosmos_staking_v1beta1_QueryPoolRequest,
    responseSerialize: serialize_cosmos_staking_v1beta1_QueryPoolResponse,
    responseDeserialize: deserialize_cosmos_staking_v1beta1_QueryPoolResponse,
  },
  // Parameters queries the staking parameters.
params: {
    path: '/cosmos.staking.v1beta1.Query/Params',
    requestStream: false,
    responseStream: false,
    requestType: cosmos_staking_v1beta1_query_pb.QueryParamsRequest,
    responseType: cosmos_staking_v1beta1_query_pb.QueryParamsResponse,
    requestSerialize: serialize_cosmos_staking_v1beta1_QueryParamsRequest,
    requestDeserialize: deserialize_cosmos_staking_v1beta1_QueryParamsRequest,
    responseSerialize: serialize_cosmos_staking_v1beta1_QueryParamsResponse,
    responseDeserialize: deserialize_cosmos_staking_v1beta1_QueryParamsResponse,
  },
};

exports.QueryClient = grpc.makeGenericClientConstructor(QueryService);
