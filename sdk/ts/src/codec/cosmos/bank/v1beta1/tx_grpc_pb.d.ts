// package: cosmos.bank.v1beta1
// file: cosmos/bank/v1beta1/tx.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as cosmos_bank_v1beta1_tx_pb from "../../../cosmos/bank/v1beta1/tx_pb";
import * as gogoproto_gogo_pb from "../../../gogoproto/gogo_pb";
import * as cosmos_base_v1beta1_coin_pb from "../../../cosmos/base/v1beta1/coin_pb";
import * as cosmos_bank_v1beta1_bank_pb from "../../../cosmos/bank/v1beta1/bank_pb";

interface IMsgService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    send: IMsgService_ISend;
    multiSend: IMsgService_IMultiSend;
}

interface IMsgService_ISend extends grpc.MethodDefinition<cosmos_bank_v1beta1_tx_pb.MsgSend, cosmos_bank_v1beta1_tx_pb.MsgSendResponse> {
    path: "/cosmos.bank.v1beta1.Msg/Send";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_bank_v1beta1_tx_pb.MsgSend>;
    requestDeserialize: grpc.deserialize<cosmos_bank_v1beta1_tx_pb.MsgSend>;
    responseSerialize: grpc.serialize<cosmos_bank_v1beta1_tx_pb.MsgSendResponse>;
    responseDeserialize: grpc.deserialize<cosmos_bank_v1beta1_tx_pb.MsgSendResponse>;
}
interface IMsgService_IMultiSend extends grpc.MethodDefinition<cosmos_bank_v1beta1_tx_pb.MsgMultiSend, cosmos_bank_v1beta1_tx_pb.MsgMultiSendResponse> {
    path: "/cosmos.bank.v1beta1.Msg/MultiSend";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cosmos_bank_v1beta1_tx_pb.MsgMultiSend>;
    requestDeserialize: grpc.deserialize<cosmos_bank_v1beta1_tx_pb.MsgMultiSend>;
    responseSerialize: grpc.serialize<cosmos_bank_v1beta1_tx_pb.MsgMultiSendResponse>;
    responseDeserialize: grpc.deserialize<cosmos_bank_v1beta1_tx_pb.MsgMultiSendResponse>;
}

export const MsgService: IMsgService;

export interface IMsgServer {
    send: grpc.handleUnaryCall<cosmos_bank_v1beta1_tx_pb.MsgSend, cosmos_bank_v1beta1_tx_pb.MsgSendResponse>;
    multiSend: grpc.handleUnaryCall<cosmos_bank_v1beta1_tx_pb.MsgMultiSend, cosmos_bank_v1beta1_tx_pb.MsgMultiSendResponse>;
}

export interface IMsgClient {
    send(request: cosmos_bank_v1beta1_tx_pb.MsgSend, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_tx_pb.MsgSendResponse) => void): grpc.ClientUnaryCall;
    send(request: cosmos_bank_v1beta1_tx_pb.MsgSend, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_tx_pb.MsgSendResponse) => void): grpc.ClientUnaryCall;
    send(request: cosmos_bank_v1beta1_tx_pb.MsgSend, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_tx_pb.MsgSendResponse) => void): grpc.ClientUnaryCall;
    multiSend(request: cosmos_bank_v1beta1_tx_pb.MsgMultiSend, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_tx_pb.MsgMultiSendResponse) => void): grpc.ClientUnaryCall;
    multiSend(request: cosmos_bank_v1beta1_tx_pb.MsgMultiSend, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_tx_pb.MsgMultiSendResponse) => void): grpc.ClientUnaryCall;
    multiSend(request: cosmos_bank_v1beta1_tx_pb.MsgMultiSend, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_tx_pb.MsgMultiSendResponse) => void): grpc.ClientUnaryCall;
}

export class MsgClient extends grpc.Client implements IMsgClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public send(request: cosmos_bank_v1beta1_tx_pb.MsgSend, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_tx_pb.MsgSendResponse) => void): grpc.ClientUnaryCall;
    public send(request: cosmos_bank_v1beta1_tx_pb.MsgSend, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_tx_pb.MsgSendResponse) => void): grpc.ClientUnaryCall;
    public send(request: cosmos_bank_v1beta1_tx_pb.MsgSend, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_tx_pb.MsgSendResponse) => void): grpc.ClientUnaryCall;
    public multiSend(request: cosmos_bank_v1beta1_tx_pb.MsgMultiSend, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_tx_pb.MsgMultiSendResponse) => void): grpc.ClientUnaryCall;
    public multiSend(request: cosmos_bank_v1beta1_tx_pb.MsgMultiSend, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_tx_pb.MsgMultiSendResponse) => void): grpc.ClientUnaryCall;
    public multiSend(request: cosmos_bank_v1beta1_tx_pb.MsgMultiSend, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cosmos_bank_v1beta1_tx_pb.MsgMultiSendResponse) => void): grpc.ClientUnaryCall;
}
