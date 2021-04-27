// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var crud_query_pb = require('../crud/query_pb.js');
var google_api_annotations_pb = require('../google/api/annotations_pb.js');
var cosmos_base_query_v1beta1_pagination_pb = require('../cosmos/base/query/v1beta1/pagination_pb.js');
var crud_CrudValue_pb = require('../crud/CrudValue_pb.js');

function serialize_bluzelle_curium_crud_QueryAllCrudValueRequest(arg) {
  if (!(arg instanceof crud_query_pb.QueryAllCrudValueRequest)) {
    throw new Error('Expected argument of type bluzelle.curium.crud.QueryAllCrudValueRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_crud_QueryAllCrudValueRequest(buffer_arg) {
  return crud_query_pb.QueryAllCrudValueRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bluzelle_curium_crud_QueryAllCrudValueResponse(arg) {
  if (!(arg instanceof crud_query_pb.QueryAllCrudValueResponse)) {
    throw new Error('Expected argument of type bluzelle.curium.crud.QueryAllCrudValueResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_crud_QueryAllCrudValueResponse(buffer_arg) {
  return crud_query_pb.QueryAllCrudValueResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bluzelle_curium_crud_QueryGetCrudValueRequest(arg) {
  if (!(arg instanceof crud_query_pb.QueryGetCrudValueRequest)) {
    throw new Error('Expected argument of type bluzelle.curium.crud.QueryGetCrudValueRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_crud_QueryGetCrudValueRequest(buffer_arg) {
  return crud_query_pb.QueryGetCrudValueRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bluzelle_curium_crud_QueryGetCrudValueResponse(arg) {
  if (!(arg instanceof crud_query_pb.QueryGetCrudValueResponse)) {
    throw new Error('Expected argument of type bluzelle.curium.crud.QueryGetCrudValueResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_crud_QueryGetCrudValueResponse(buffer_arg) {
  return crud_query_pb.QueryGetCrudValueResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// Query defines the gRPC querier service.
var QueryService = exports.QueryService = {
  // this line is used by starport scaffolding # 2
crudValue: {
    path: '/bluzelle.curium.crud.Query/CrudValue',
    requestStream: false,
    responseStream: false,
    requestType: crud_query_pb.QueryGetCrudValueRequest,
    responseType: crud_query_pb.QueryGetCrudValueResponse,
    requestSerialize: serialize_bluzelle_curium_crud_QueryGetCrudValueRequest,
    requestDeserialize: deserialize_bluzelle_curium_crud_QueryGetCrudValueRequest,
    responseSerialize: serialize_bluzelle_curium_crud_QueryGetCrudValueResponse,
    responseDeserialize: deserialize_bluzelle_curium_crud_QueryGetCrudValueResponse,
  },
  crudValueAll: {
    path: '/bluzelle.curium.crud.Query/CrudValueAll',
    requestStream: false,
    responseStream: false,
    requestType: crud_query_pb.QueryAllCrudValueRequest,
    responseType: crud_query_pb.QueryAllCrudValueResponse,
    requestSerialize: serialize_bluzelle_curium_crud_QueryAllCrudValueRequest,
    requestDeserialize: deserialize_bluzelle_curium_crud_QueryAllCrudValueRequest,
    responseSerialize: serialize_bluzelle_curium_crud_QueryAllCrudValueResponse,
    responseDeserialize: deserialize_bluzelle_curium_crud_QueryAllCrudValueResponse,
  },
};

exports.QueryClient = grpc.makeGenericClientConstructor(QueryService);
