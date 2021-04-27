// package: cosmos.bank.v1beta1
// file: cosmos/bank/v1beta1/tx.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as gogoproto_gogo_pb from "../../../gogoproto/gogo_pb";
import * as cosmos_base_v1beta1_coin_pb from "../../../cosmos/base/v1beta1/coin_pb";
import * as cosmos_bank_v1beta1_bank_pb from "../../../cosmos/bank/v1beta1/bank_pb";

export class MsgSend extends jspb.Message { 
    getFromAddress(): string;
    setFromAddress(value: string): MsgSend;
    getToAddress(): string;
    setToAddress(value: string): MsgSend;
    clearAmountList(): void;
    getAmountList(): Array<cosmos_base_v1beta1_coin_pb.Coin>;
    setAmountList(value: Array<cosmos_base_v1beta1_coin_pb.Coin>): MsgSend;
    addAmount(value?: cosmos_base_v1beta1_coin_pb.Coin, index?: number): cosmos_base_v1beta1_coin_pb.Coin;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgSend.AsObject;
    static toObject(includeInstance: boolean, msg: MsgSend): MsgSend.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgSend, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgSend;
    static deserializeBinaryFromReader(message: MsgSend, reader: jspb.BinaryReader): MsgSend;
}

export namespace MsgSend {
    export type AsObject = {
        fromAddress: string,
        toAddress: string,
        amountList: Array<cosmos_base_v1beta1_coin_pb.Coin.AsObject>,
    }
}

export class MsgSendResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgSendResponse.AsObject;
    static toObject(includeInstance: boolean, msg: MsgSendResponse): MsgSendResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgSendResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgSendResponse;
    static deserializeBinaryFromReader(message: MsgSendResponse, reader: jspb.BinaryReader): MsgSendResponse;
}

export namespace MsgSendResponse {
    export type AsObject = {
    }
}

export class MsgMultiSend extends jspb.Message { 
    clearInputsList(): void;
    getInputsList(): Array<cosmos_bank_v1beta1_bank_pb.Input>;
    setInputsList(value: Array<cosmos_bank_v1beta1_bank_pb.Input>): MsgMultiSend;
    addInputs(value?: cosmos_bank_v1beta1_bank_pb.Input, index?: number): cosmos_bank_v1beta1_bank_pb.Input;
    clearOutputsList(): void;
    getOutputsList(): Array<cosmos_bank_v1beta1_bank_pb.Output>;
    setOutputsList(value: Array<cosmos_bank_v1beta1_bank_pb.Output>): MsgMultiSend;
    addOutputs(value?: cosmos_bank_v1beta1_bank_pb.Output, index?: number): cosmos_bank_v1beta1_bank_pb.Output;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgMultiSend.AsObject;
    static toObject(includeInstance: boolean, msg: MsgMultiSend): MsgMultiSend.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgMultiSend, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgMultiSend;
    static deserializeBinaryFromReader(message: MsgMultiSend, reader: jspb.BinaryReader): MsgMultiSend;
}

export namespace MsgMultiSend {
    export type AsObject = {
        inputsList: Array<cosmos_bank_v1beta1_bank_pb.Input.AsObject>,
        outputsList: Array<cosmos_bank_v1beta1_bank_pb.Output.AsObject>,
    }
}

export class MsgMultiSendResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MsgMultiSendResponse.AsObject;
    static toObject(includeInstance: boolean, msg: MsgMultiSendResponse): MsgMultiSendResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MsgMultiSendResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MsgMultiSendResponse;
    static deserializeBinaryFromReader(message: MsgMultiSendResponse, reader: jspb.BinaryReader): MsgMultiSendResponse;
}

export namespace MsgMultiSendResponse {
    export type AsObject = {
    }
}
