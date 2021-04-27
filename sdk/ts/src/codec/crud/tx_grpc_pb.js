// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var crud_tx_pb = require('../crud/tx_pb.js');
var crud_lease_pb = require('../crud/lease_pb.js');

function serialize_bluzelle_curium_crud_MsgCreate(arg) {
  if (!(arg instanceof crud_tx_pb.MsgCreate)) {
    throw new Error('Expected argument of type bluzelle.curium.crud.MsgCreate');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_crud_MsgCreate(buffer_arg) {
  return crud_tx_pb.MsgCreate.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bluzelle_curium_crud_MsgCreateResponse(arg) {
  if (!(arg instanceof crud_tx_pb.MsgCreateResponse)) {
    throw new Error('Expected argument of type bluzelle.curium.crud.MsgCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_crud_MsgCreateResponse(buffer_arg) {
  return crud_tx_pb.MsgCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bluzelle_curium_crud_MsgDelete(arg) {
  if (!(arg instanceof crud_tx_pb.MsgDelete)) {
    throw new Error('Expected argument of type bluzelle.curium.crud.MsgDelete');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_crud_MsgDelete(buffer_arg) {
  return crud_tx_pb.MsgDelete.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bluzelle_curium_crud_MsgDeleteResponse(arg) {
  if (!(arg instanceof crud_tx_pb.MsgDeleteResponse)) {
    throw new Error('Expected argument of type bluzelle.curium.crud.MsgDeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_crud_MsgDeleteResponse(buffer_arg) {
  return crud_tx_pb.MsgDeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bluzelle_curium_crud_MsgRead(arg) {
  if (!(arg instanceof crud_tx_pb.MsgRead)) {
    throw new Error('Expected argument of type bluzelle.curium.crud.MsgRead');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_crud_MsgRead(buffer_arg) {
  return crud_tx_pb.MsgRead.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bluzelle_curium_crud_MsgReadResponse(arg) {
  if (!(arg instanceof crud_tx_pb.MsgReadResponse)) {
    throw new Error('Expected argument of type bluzelle.curium.crud.MsgReadResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_crud_MsgReadResponse(buffer_arg) {
  return crud_tx_pb.MsgReadResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bluzelle_curium_crud_MsgUpdate(arg) {
  if (!(arg instanceof crud_tx_pb.MsgUpdate)) {
    throw new Error('Expected argument of type bluzelle.curium.crud.MsgUpdate');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_crud_MsgUpdate(buffer_arg) {
  return crud_tx_pb.MsgUpdate.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bluzelle_curium_crud_MsgUpdateResponse(arg) {
  if (!(arg instanceof crud_tx_pb.MsgUpdateResponse)) {
    throw new Error('Expected argument of type bluzelle.curium.crud.MsgUpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_crud_MsgUpdateResponse(buffer_arg) {
  return crud_tx_pb.MsgUpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bluzelle_curium_crud_MsgUpsert(arg) {
  if (!(arg instanceof crud_tx_pb.MsgUpsert)) {
    throw new Error('Expected argument of type bluzelle.curium.crud.MsgUpsert');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_crud_MsgUpsert(buffer_arg) {
  return crud_tx_pb.MsgUpsert.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bluzelle_curium_crud_MsgUpsertResponse(arg) {
  if (!(arg instanceof crud_tx_pb.MsgUpsertResponse)) {
    throw new Error('Expected argument of type bluzelle.curium.crud.MsgUpsertResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_crud_MsgUpsertResponse(buffer_arg) {
  return crud_tx_pb.MsgUpsertResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// Msg defines the Msg service.
var MsgService = exports.MsgService = {
  // this line is used by starport scaffolding # proto/tx/rpc
read: {
    path: '/bluzelle.curium.crud.Msg/Read',
    requestStream: false,
    responseStream: false,
    requestType: crud_tx_pb.MsgRead,
    responseType: crud_tx_pb.MsgReadResponse,
    requestSerialize: serialize_bluzelle_curium_crud_MsgRead,
    requestDeserialize: deserialize_bluzelle_curium_crud_MsgRead,
    responseSerialize: serialize_bluzelle_curium_crud_MsgReadResponse,
    responseDeserialize: deserialize_bluzelle_curium_crud_MsgReadResponse,
  },
  upsert: {
    path: '/bluzelle.curium.crud.Msg/Upsert',
    requestStream: false,
    responseStream: false,
    requestType: crud_tx_pb.MsgUpsert,
    responseType: crud_tx_pb.MsgUpsertResponse,
    requestSerialize: serialize_bluzelle_curium_crud_MsgUpsert,
    requestDeserialize: deserialize_bluzelle_curium_crud_MsgUpsert,
    responseSerialize: serialize_bluzelle_curium_crud_MsgUpsertResponse,
    responseDeserialize: deserialize_bluzelle_curium_crud_MsgUpsertResponse,
  },
  create: {
    path: '/bluzelle.curium.crud.Msg/Create',
    requestStream: false,
    responseStream: false,
    requestType: crud_tx_pb.MsgCreate,
    responseType: crud_tx_pb.MsgCreateResponse,
    requestSerialize: serialize_bluzelle_curium_crud_MsgCreate,
    requestDeserialize: deserialize_bluzelle_curium_crud_MsgCreate,
    responseSerialize: serialize_bluzelle_curium_crud_MsgCreateResponse,
    responseDeserialize: deserialize_bluzelle_curium_crud_MsgCreateResponse,
  },
  update: {
    path: '/bluzelle.curium.crud.Msg/Update',
    requestStream: false,
    responseStream: false,
    requestType: crud_tx_pb.MsgUpdate,
    responseType: crud_tx_pb.MsgUpdateResponse,
    requestSerialize: serialize_bluzelle_curium_crud_MsgUpdate,
    requestDeserialize: deserialize_bluzelle_curium_crud_MsgUpdate,
    responseSerialize: serialize_bluzelle_curium_crud_MsgUpdateResponse,
    responseDeserialize: deserialize_bluzelle_curium_crud_MsgUpdateResponse,
  },
  delete: {
    path: '/bluzelle.curium.crud.Msg/Delete',
    requestStream: false,
    responseStream: false,
    requestType: crud_tx_pb.MsgDelete,
    responseType: crud_tx_pb.MsgDeleteResponse,
    requestSerialize: serialize_bluzelle_curium_crud_MsgDelete,
    requestDeserialize: deserialize_bluzelle_curium_crud_MsgDelete,
    responseSerialize: serialize_bluzelle_curium_crud_MsgDeleteResponse,
    responseDeserialize: deserialize_bluzelle_curium_crud_MsgDeleteResponse,
  },
};

exports.MsgClient = grpc.makeGenericClientConstructor(MsgService);
