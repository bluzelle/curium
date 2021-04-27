// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var nft_query_pb = require('../nft/query_pb.js');
var google_api_annotations_pb = require('../google/api/annotations_pb.js');
var cosmos_base_query_v1beta1_pagination_pb = require('../cosmos/base/query/v1beta1/pagination_pb.js');
var nft_nft_pb = require('../nft/nft_pb.js');

function serialize_bluzelle_curium_nft_QueryAllNftRequest(arg) {
  if (!(arg instanceof nft_query_pb.QueryAllNftRequest)) {
    throw new Error('Expected argument of type bluzelle.curium.nft.QueryAllNftRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_nft_QueryAllNftRequest(buffer_arg) {
  return nft_query_pb.QueryAllNftRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bluzelle_curium_nft_QueryAllNftResponse(arg) {
  if (!(arg instanceof nft_query_pb.QueryAllNftResponse)) {
    throw new Error('Expected argument of type bluzelle.curium.nft.QueryAllNftResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_nft_QueryAllNftResponse(buffer_arg) {
  return nft_query_pb.QueryAllNftResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bluzelle_curium_nft_QueryGetNftRequest(arg) {
  if (!(arg instanceof nft_query_pb.QueryGetNftRequest)) {
    throw new Error('Expected argument of type bluzelle.curium.nft.QueryGetNftRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_nft_QueryGetNftRequest(buffer_arg) {
  return nft_query_pb.QueryGetNftRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bluzelle_curium_nft_QueryGetNftResponse(arg) {
  if (!(arg instanceof nft_query_pb.QueryGetNftResponse)) {
    throw new Error('Expected argument of type bluzelle.curium.nft.QueryGetNftResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_nft_QueryGetNftResponse(buffer_arg) {
  return nft_query_pb.QueryGetNftResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// Query defines the gRPC querier service.
var QueryService = exports.QueryService = {
  // this line is used by starport scaffolding # 2
nft: {
    path: '/bluzelle.curium.nft.Query/Nft',
    requestStream: false,
    responseStream: false,
    requestType: nft_query_pb.QueryGetNftRequest,
    responseType: nft_query_pb.QueryGetNftResponse,
    requestSerialize: serialize_bluzelle_curium_nft_QueryGetNftRequest,
    requestDeserialize: deserialize_bluzelle_curium_nft_QueryGetNftRequest,
    responseSerialize: serialize_bluzelle_curium_nft_QueryGetNftResponse,
    responseDeserialize: deserialize_bluzelle_curium_nft_QueryGetNftResponse,
  },
  nftAll: {
    path: '/bluzelle.curium.nft.Query/NftAll',
    requestStream: false,
    responseStream: false,
    requestType: nft_query_pb.QueryAllNftRequest,
    responseType: nft_query_pb.QueryAllNftResponse,
    requestSerialize: serialize_bluzelle_curium_nft_QueryAllNftRequest,
    requestDeserialize: deserialize_bluzelle_curium_nft_QueryAllNftRequest,
    responseSerialize: serialize_bluzelle_curium_nft_QueryAllNftResponse,
    responseDeserialize: deserialize_bluzelle_curium_nft_QueryAllNftResponse,
  },
};

exports.QueryClient = grpc.makeGenericClientConstructor(QueryService);
