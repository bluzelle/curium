// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var cosmos_bank_v1beta1_tx_pb = require('../../../cosmos/bank/v1beta1/tx_pb.js');
var gogoproto_gogo_pb = require('../../../gogoproto/gogo_pb.js');
var cosmos_base_v1beta1_coin_pb = require('../../../cosmos/base/v1beta1/coin_pb.js');
var cosmos_bank_v1beta1_bank_pb = require('../../../cosmos/bank/v1beta1/bank_pb.js');

function serialize_cosmos_bank_v1beta1_MsgMultiSend(arg) {
  if (!(arg instanceof cosmos_bank_v1beta1_tx_pb.MsgMultiSend)) {
    throw new Error('Expected argument of type cosmos.bank.v1beta1.MsgMultiSend');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_bank_v1beta1_MsgMultiSend(buffer_arg) {
  return cosmos_bank_v1beta1_tx_pb.MsgMultiSend.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_bank_v1beta1_MsgMultiSendResponse(arg) {
  if (!(arg instanceof cosmos_bank_v1beta1_tx_pb.MsgMultiSendResponse)) {
    throw new Error('Expected argument of type cosmos.bank.v1beta1.MsgMultiSendResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_bank_v1beta1_MsgMultiSendResponse(buffer_arg) {
  return cosmos_bank_v1beta1_tx_pb.MsgMultiSendResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_bank_v1beta1_MsgSend(arg) {
  if (!(arg instanceof cosmos_bank_v1beta1_tx_pb.MsgSend)) {
    throw new Error('Expected argument of type cosmos.bank.v1beta1.MsgSend');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_bank_v1beta1_MsgSend(buffer_arg) {
  return cosmos_bank_v1beta1_tx_pb.MsgSend.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cosmos_bank_v1beta1_MsgSendResponse(arg) {
  if (!(arg instanceof cosmos_bank_v1beta1_tx_pb.MsgSendResponse)) {
    throw new Error('Expected argument of type cosmos.bank.v1beta1.MsgSendResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cosmos_bank_v1beta1_MsgSendResponse(buffer_arg) {
  return cosmos_bank_v1beta1_tx_pb.MsgSendResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// Msg defines the bank Msg service.
var MsgService = exports.MsgService = {
  // Send defines a method for sending coins from one account to another account.
send: {
    path: '/cosmos.bank.v1beta1.Msg/Send',
    requestStream: false,
    responseStream: false,
    requestType: cosmos_bank_v1beta1_tx_pb.MsgSend,
    responseType: cosmos_bank_v1beta1_tx_pb.MsgSendResponse,
    requestSerialize: serialize_cosmos_bank_v1beta1_MsgSend,
    requestDeserialize: deserialize_cosmos_bank_v1beta1_MsgSend,
    responseSerialize: serialize_cosmos_bank_v1beta1_MsgSendResponse,
    responseDeserialize: deserialize_cosmos_bank_v1beta1_MsgSendResponse,
  },
  // MultiSend defines a method for sending coins from some accounts to other accounts.
multiSend: {
    path: '/cosmos.bank.v1beta1.Msg/MultiSend',
    requestStream: false,
    responseStream: false,
    requestType: cosmos_bank_v1beta1_tx_pb.MsgMultiSend,
    responseType: cosmos_bank_v1beta1_tx_pb.MsgMultiSendResponse,
    requestSerialize: serialize_cosmos_bank_v1beta1_MsgMultiSend,
    requestDeserialize: deserialize_cosmos_bank_v1beta1_MsgMultiSend,
    responseSerialize: serialize_cosmos_bank_v1beta1_MsgMultiSendResponse,
    responseDeserialize: deserialize_cosmos_bank_v1beta1_MsgMultiSendResponse,
  },
};

exports.MsgClient = grpc.makeGenericClientConstructor(MsgService);
