// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var cosmos_staking_v1beta1_tx_pb = require('../../../cosmos/staking/v1beta1/tx_pb.js');
var google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var gogoproto_gogo_pb = require('../../../gogoproto/gogo_pb.js');
var cosmos_proto_cosmos_pb = require('../../../cosmos_proto/cosmos_pb.js');
var cosmos_base_v1beta1_coin_pb = require('../../../cosmos/base/v1beta1/coin_pb.js');
var cosmos_staking_v1beta1_staking_pb = require('../../../cosmos/staking/v1beta1/staking_pb.js');

function serialize_cosmos_staking_v1beta1_MsgBeginRedelegate(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegate)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.MsgBeginRedelegate');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_MsgBeginRedelegate(buffer_arg) {
  return cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegate.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_MsgBeginRedelegateResponse(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegateResponse)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.MsgBeginRedelegateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_MsgBeginRedelegateResponse(buffer_arg) {
  return cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_MsgCreateValidator(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_tx_pb.MsgCreateValidator)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.MsgCreateValidator');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_MsgCreateValidator(buffer_arg) {
  return cosmos_staking_v1beta1_tx_pb.MsgCreateValidator.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_MsgCreateValidatorResponse(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_tx_pb.MsgCreateValidatorResponse)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.MsgCreateValidatorResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_MsgCreateValidatorResponse(buffer_arg) {
  return cosmos_staking_v1beta1_tx_pb.MsgCreateValidatorResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_MsgDelegate(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_tx_pb.MsgDelegate)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.MsgDelegate');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_MsgDelegate(buffer_arg) {
  return cosmos_staking_v1beta1_tx_pb.MsgDelegate.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_MsgDelegateResponse(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_tx_pb.MsgDelegateResponse)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.MsgDelegateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_MsgDelegateResponse(buffer_arg) {
  return cosmos_staking_v1beta1_tx_pb.MsgDelegateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_MsgEditValidator(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_tx_pb.MsgEditValidator)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.MsgEditValidator');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_MsgEditValidator(buffer_arg) {
  return cosmos_staking_v1beta1_tx_pb.MsgEditValidator.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_MsgEditValidatorResponse(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_tx_pb.MsgEditValidatorResponse)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.MsgEditValidatorResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_MsgEditValidatorResponse(buffer_arg) {
  return cosmos_staking_v1beta1_tx_pb.MsgEditValidatorResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_MsgUndelegate(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_tx_pb.MsgUndelegate)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.MsgUndelegate');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_MsgUndelegate(buffer_arg) {
  return cosmos_staking_v1beta1_tx_pb.MsgUndelegate.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_staking_v1beta1_MsgUndelegateResponse(arg) {
  if (!(arg instanceof cosmos_staking_v1beta1_tx_pb.MsgUndelegateResponse)) {
    throw new Error('Expected argument of type cosmos.staking.v1beta1.MsgUndelegateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_staking_v1beta1_MsgUndelegateResponse(buffer_arg) {
  return cosmos_staking_v1beta1_tx_pb.MsgUndelegateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// Msg defines the staking Msg service.
var MsgService = exports.MsgService = {
  // CreateValidator defines a method for creating a new validator.
createValidator: {
    path: '/cosmos.staking.v1beta1.Msg/CreateValidator',
    requestStream: false,
    responseStream: false,
    requestType: cosmos_staking_v1beta1_tx_pb.MsgCreateValidator,
    responseType: cosmos_staking_v1beta1_tx_pb.MsgCreateValidatorResponse,
    requestSerialize: serialize_cosmos_staking_v1beta1_MsgCreateValidator,
    requestDeserialize: deserialize_cosmos_staking_v1beta1_MsgCreateValidator,
    responseSerialize: serialize_cosmos_staking_v1beta1_MsgCreateValidatorResponse,
    responseDeserialize: deserialize_cosmos_staking_v1beta1_MsgCreateValidatorResponse,
  },
  // EditValidator defines a method for editing an existing validator.
editValidator: {
    path: '/cosmos.staking.v1beta1.Msg/EditValidator',
    requestStream: false,
    responseStream: false,
    requestType: cosmos_staking_v1beta1_tx_pb.MsgEditValidator,
    responseType: cosmos_staking_v1beta1_tx_pb.MsgEditValidatorResponse,
    requestSerialize: serialize_cosmos_staking_v1beta1_MsgEditValidator,
    requestDeserialize: deserialize_cosmos_staking_v1beta1_MsgEditValidator,
    responseSerialize: serialize_cosmos_staking_v1beta1_MsgEditValidatorResponse,
    responseDeserialize: deserialize_cosmos_staking_v1beta1_MsgEditValidatorResponse,
  },
  // Delegate defines a method for performing a delegation of coins
// from a delegator to a validator.
delegate: {
    path: '/cosmos.staking.v1beta1.Msg/Delegate',
    requestStream: false,
    responseStream: false,
    requestType: cosmos_staking_v1beta1_tx_pb.MsgDelegate,
    responseType: cosmos_staking_v1beta1_tx_pb.MsgDelegateResponse,
    requestSerialize: serialize_cosmos_staking_v1beta1_MsgDelegate,
    requestDeserialize: deserialize_cosmos_staking_v1beta1_MsgDelegate,
    responseSerialize: serialize_cosmos_staking_v1beta1_MsgDelegateResponse,
    responseDeserialize: deserialize_cosmos_staking_v1beta1_MsgDelegateResponse,
  },
  // BeginRedelegate defines a method for performing a redelegation
// of coins from a delegator and source validator to a destination validator.
beginRedelegate: {
    path: '/cosmos.staking.v1beta1.Msg/BeginRedelegate',
    requestStream: false,
    responseStream: false,
    requestType: cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegate,
    responseType: cosmos_staking_v1beta1_tx_pb.MsgBeginRedelegateResponse,
    requestSerialize: serialize_cosmos_staking_v1beta1_MsgBeginRedelegate,
    requestDeserialize: deserialize_cosmos_staking_v1beta1_MsgBeginRedelegate,
    responseSerialize: serialize_cosmos_staking_v1beta1_MsgBeginRedelegateResponse,
    responseDeserialize: deserialize_cosmos_staking_v1beta1_MsgBeginRedelegateResponse,
  },
  // Undelegate defines a method for performing an undelegation from a
// delegate and a validator.
undelegate: {
    path: '/cosmos.staking.v1beta1.Msg/Undelegate',
    requestStream: false,
    responseStream: false,
    requestType: cosmos_staking_v1beta1_tx_pb.MsgUndelegate,
    responseType: cosmos_staking_v1beta1_tx_pb.MsgUndelegateResponse,
    requestSerialize: serialize_cosmos_staking_v1beta1_MsgUndelegate,
    requestDeserialize: deserialize_cosmos_staking_v1beta1_MsgUndelegate,
    responseSerialize: serialize_cosmos_staking_v1beta1_MsgUndelegateResponse,
    responseDeserialize: deserialize_cosmos_staking_v1beta1_MsgUndelegateResponse,
  },
};

exports.MsgClient = grpc.makeGenericClientConstructor(MsgService);
