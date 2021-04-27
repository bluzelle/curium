// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var nft_tx_pb = require('../nft/tx_pb.js');

function serialize_bluzelle_curium_nft_MsgChunk(arg) {
  if (!(arg instanceof nft_tx_pb.MsgChunk)) {
    throw new Error('Expected argument of type bluzelle.curium.nft.MsgChunk');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_nft_MsgChunk(buffer_arg) {
  return nft_tx_pb.MsgChunk.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bluzelle_curium_nft_MsgChunkResponse(arg) {
  if (!(arg instanceof nft_tx_pb.MsgChunkResponse)) {
    throw new Error('Expected argument of type bluzelle.curium.nft.MsgChunkResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_nft_MsgChunkResponse(buffer_arg) {
  return nft_tx_pb.MsgChunkResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bluzelle_curium_nft_MsgCreateNft(arg) {
  if (!(arg instanceof nft_tx_pb.MsgCreateNft)) {
    throw new Error('Expected argument of type bluzelle.curium.nft.MsgCreateNft');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_nft_MsgCreateNft(buffer_arg) {
  return nft_tx_pb.MsgCreateNft.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bluzelle_curium_nft_MsgCreateNftResponse(arg) {
  if (!(arg instanceof nft_tx_pb.MsgCreateNftResponse)) {
    throw new Error('Expected argument of type bluzelle.curium.nft.MsgCreateNftResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_nft_MsgCreateNftResponse(buffer_arg) {
  return nft_tx_pb.MsgCreateNftResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bluzelle_curium_nft_MsgDeleteNft(arg) {
  if (!(arg instanceof nft_tx_pb.MsgDeleteNft)) {
    throw new Error('Expected argument of type bluzelle.curium.nft.MsgDeleteNft');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_nft_MsgDeleteNft(buffer_arg) {
  return nft_tx_pb.MsgDeleteNft.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bluzelle_curium_nft_MsgDeleteNftResponse(arg) {
  if (!(arg instanceof nft_tx_pb.MsgDeleteNftResponse)) {
    throw new Error('Expected argument of type bluzelle.curium.nft.MsgDeleteNftResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_nft_MsgDeleteNftResponse(buffer_arg) {
  return nft_tx_pb.MsgDeleteNftResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bluzelle_curium_nft_MsgUpdateNft(arg) {
  if (!(arg instanceof nft_tx_pb.MsgUpdateNft)) {
    throw new Error('Expected argument of type bluzelle.curium.nft.MsgUpdateNft');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_nft_MsgUpdateNft(buffer_arg) {
  return nft_tx_pb.MsgUpdateNft.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bluzelle_curium_nft_MsgUpdateNftResponse(arg) {
  if (!(arg instanceof nft_tx_pb.MsgUpdateNftResponse)) {
    throw new Error('Expected argument of type bluzelle.curium.nft.MsgUpdateNftResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bluzelle_curium_nft_MsgUpdateNftResponse(buffer_arg) {
  return nft_tx_pb.MsgUpdateNftResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// Msg defines the Msg service.
var MsgService = exports.MsgService = {
  // this line is used by starport scaffolding # proto/tx/rpc
chunk: {
    path: '/bluzelle.curium.nft.Msg/Chunk',
    requestStream: false,
    responseStream: false,
    requestType: nft_tx_pb.MsgChunk,
    responseType: nft_tx_pb.MsgChunkResponse,
    requestSerialize: serialize_bluzelle_curium_nft_MsgChunk,
    requestDeserialize: deserialize_bluzelle_curium_nft_MsgChunk,
    responseSerialize: serialize_bluzelle_curium_nft_MsgChunkResponse,
    responseDeserialize: deserialize_bluzelle_curium_nft_MsgChunkResponse,
  },
  createNft: {
    path: '/bluzelle.curium.nft.Msg/CreateNft',
    requestStream: false,
    responseStream: false,
    requestType: nft_tx_pb.MsgCreateNft,
    responseType: nft_tx_pb.MsgCreateNftResponse,
    requestSerialize: serialize_bluzelle_curium_nft_MsgCreateNft,
    requestDeserialize: deserialize_bluzelle_curium_nft_MsgCreateNft,
    responseSerialize: serialize_bluzelle_curium_nft_MsgCreateNftResponse,
    responseDeserialize: deserialize_bluzelle_curium_nft_MsgCreateNftResponse,
  },
  updateNft: {
    path: '/bluzelle.curium.nft.Msg/UpdateNft',
    requestStream: false,
    responseStream: false,
    requestType: nft_tx_pb.MsgUpdateNft,
    responseType: nft_tx_pb.MsgUpdateNftResponse,
    requestSerialize: serialize_bluzelle_curium_nft_MsgUpdateNft,
    requestDeserialize: deserialize_bluzelle_curium_nft_MsgUpdateNft,
    responseSerialize: serialize_bluzelle_curium_nft_MsgUpdateNftResponse,
    responseDeserialize: deserialize_bluzelle_curium_nft_MsgUpdateNftResponse,
  },
  deleteNft: {
    path: '/bluzelle.curium.nft.Msg/DeleteNft',
    requestStream: false,
    responseStream: false,
    requestType: nft_tx_pb.MsgDeleteNft,
    responseType: nft_tx_pb.MsgDeleteNftResponse,
    requestSerialize: serialize_bluzelle_curium_nft_MsgDeleteNft,
    requestDeserialize: deserialize_bluzelle_curium_nft_MsgDeleteNft,
    responseSerialize: serialize_bluzelle_curium_nft_MsgDeleteNftResponse,
    responseDeserialize: deserialize_bluzelle_curium_nft_MsgDeleteNftResponse,
  },
};

exports.MsgClient = grpc.makeGenericClientConstructor(MsgService);
