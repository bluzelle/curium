// package: bluzelle.curium.nft
// file: nft/tx.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as nft_tx_pb from "../nft/tx_pb";

interface IMsgService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    chunk: IMsgService_IChunk;
    createNft: IMsgService_ICreateNft;
    updateNft: IMsgService_IUpdateNft;
    deleteNft: IMsgService_IDeleteNft;
}

interface IMsgService_IChunk extends grpc.MethodDefinition<nft_tx_pb.MsgChunk, nft_tx_pb.MsgChunkResponse> {
    path: "/bluzelle.curium.nft.Msg/Chunk";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<nft_tx_pb.MsgChunk>;
    requestDeserialize: grpc.deserialize<nft_tx_pb.MsgChunk>;
    responseSerialize: grpc.serialize<nft_tx_pb.MsgChunkResponse>;
    responseDeserialize: grpc.deserialize<nft_tx_pb.MsgChunkResponse>;
}
interface IMsgService_ICreateNft extends grpc.MethodDefinition<nft_tx_pb.MsgCreateNft, nft_tx_pb.MsgCreateNftResponse> {
    path: "/bluzelle.curium.nft.Msg/CreateNft";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<nft_tx_pb.MsgCreateNft>;
    requestDeserialize: grpc.deserialize<nft_tx_pb.MsgCreateNft>;
    responseSerialize: grpc.serialize<nft_tx_pb.MsgCreateNftResponse>;
    responseDeserialize: grpc.deserialize<nft_tx_pb.MsgCreateNftResponse>;
}
interface IMsgService_IUpdateNft extends grpc.MethodDefinition<nft_tx_pb.MsgUpdateNft, nft_tx_pb.MsgUpdateNftResponse> {
    path: "/bluzelle.curium.nft.Msg/UpdateNft";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<nft_tx_pb.MsgUpdateNft>;
    requestDeserialize: grpc.deserialize<nft_tx_pb.MsgUpdateNft>;
    responseSerialize: grpc.serialize<nft_tx_pb.MsgUpdateNftResponse>;
    responseDeserialize: grpc.deserialize<nft_tx_pb.MsgUpdateNftResponse>;
}
interface IMsgService_IDeleteNft extends grpc.MethodDefinition<nft_tx_pb.MsgDeleteNft, nft_tx_pb.MsgDeleteNftResponse> {
    path: "/bluzelle.curium.nft.Msg/DeleteNft";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<nft_tx_pb.MsgDeleteNft>;
    requestDeserialize: grpc.deserialize<nft_tx_pb.MsgDeleteNft>;
    responseSerialize: grpc.serialize<nft_tx_pb.MsgDeleteNftResponse>;
    responseDeserialize: grpc.deserialize<nft_tx_pb.MsgDeleteNftResponse>;
}

export const MsgService: IMsgService;

export interface IMsgServer {
    chunk: grpc.handleUnaryCall<nft_tx_pb.MsgChunk, nft_tx_pb.MsgChunkResponse>;
    createNft: grpc.handleUnaryCall<nft_tx_pb.MsgCreateNft, nft_tx_pb.MsgCreateNftResponse>;
    updateNft: grpc.handleUnaryCall<nft_tx_pb.MsgUpdateNft, nft_tx_pb.MsgUpdateNftResponse>;
    deleteNft: grpc.handleUnaryCall<nft_tx_pb.MsgDeleteNft, nft_tx_pb.MsgDeleteNftResponse>;
}

export interface IMsgClient {
    chunk(request: nft_tx_pb.MsgChunk, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgChunkResponse) => void): grpc.ClientUnaryCall;
    chunk(request: nft_tx_pb.MsgChunk, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgChunkResponse) => void): grpc.ClientUnaryCall;
    chunk(request: nft_tx_pb.MsgChunk, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgChunkResponse) => void): grpc.ClientUnaryCall;
    createNft(request: nft_tx_pb.MsgCreateNft, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgCreateNftResponse) => void): grpc.ClientUnaryCall;
    createNft(request: nft_tx_pb.MsgCreateNft, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgCreateNftResponse) => void): grpc.ClientUnaryCall;
    createNft(request: nft_tx_pb.MsgCreateNft, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgCreateNftResponse) => void): grpc.ClientUnaryCall;
    updateNft(request: nft_tx_pb.MsgUpdateNft, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgUpdateNftResponse) => void): grpc.ClientUnaryCall;
    updateNft(request: nft_tx_pb.MsgUpdateNft, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgUpdateNftResponse) => void): grpc.ClientUnaryCall;
    updateNft(request: nft_tx_pb.MsgUpdateNft, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgUpdateNftResponse) => void): grpc.ClientUnaryCall;
    deleteNft(request: nft_tx_pb.MsgDeleteNft, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgDeleteNftResponse) => void): grpc.ClientUnaryCall;
    deleteNft(request: nft_tx_pb.MsgDeleteNft, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgDeleteNftResponse) => void): grpc.ClientUnaryCall;
    deleteNft(request: nft_tx_pb.MsgDeleteNft, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgDeleteNftResponse) => void): grpc.ClientUnaryCall;
}

export class MsgClient extends grpc.Client implements IMsgClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public chunk(request: nft_tx_pb.MsgChunk, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgChunkResponse) => void): grpc.ClientUnaryCall;
    public chunk(request: nft_tx_pb.MsgChunk, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgChunkResponse) => void): grpc.ClientUnaryCall;
    public chunk(request: nft_tx_pb.MsgChunk, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgChunkResponse) => void): grpc.ClientUnaryCall;
    public createNft(request: nft_tx_pb.MsgCreateNft, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgCreateNftResponse) => void): grpc.ClientUnaryCall;
    public createNft(request: nft_tx_pb.MsgCreateNft, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgCreateNftResponse) => void): grpc.ClientUnaryCall;
    public createNft(request: nft_tx_pb.MsgCreateNft, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgCreateNftResponse) => void): grpc.ClientUnaryCall;
    public updateNft(request: nft_tx_pb.MsgUpdateNft, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgUpdateNftResponse) => void): grpc.ClientUnaryCall;
    public updateNft(request: nft_tx_pb.MsgUpdateNft, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgUpdateNftResponse) => void): grpc.ClientUnaryCall;
    public updateNft(request: nft_tx_pb.MsgUpdateNft, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgUpdateNftResponse) => void): grpc.ClientUnaryCall;
    public deleteNft(request: nft_tx_pb.MsgDeleteNft, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgDeleteNftResponse) => void): grpc.ClientUnaryCall;
    public deleteNft(request: nft_tx_pb.MsgDeleteNft, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgDeleteNftResponse) => void): grpc.ClientUnaryCall;
    public deleteNft(request: nft_tx_pb.MsgDeleteNft, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: nft_tx_pb.MsgDeleteNftResponse) => void): grpc.ClientUnaryCall;
}
