// package: cosmos.base.v1beta1
// file: cosmos/base/v1beta1/coin.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as gogoproto_gogo_pb from "../../../gogoproto/gogo_pb";

export class Coin extends jspb.Message { 
    getDenom(): string;
    setDenom(value: string): Coin;
    getAmount(): string;
    setAmount(value: string): Coin;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Coin.AsObject;
    static toObject(includeInstance: boolean, msg: Coin): Coin.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Coin, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Coin;
    static deserializeBinaryFromReader(message: Coin, reader: jspb.BinaryReader): Coin;
}

export namespace Coin {
    export type AsObject = {
        denom: string,
        amount: string,
    }
}

export class DecCoin extends jspb.Message { 
    getDenom(): string;
    setDenom(value: string): DecCoin;
    getAmount(): string;
    setAmount(value: string): DecCoin;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DecCoin.AsObject;
    static toObject(includeInstance: boolean, msg: DecCoin): DecCoin.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DecCoin, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DecCoin;
    static deserializeBinaryFromReader(message: DecCoin, reader: jspb.BinaryReader): DecCoin;
}

export namespace DecCoin {
    export type AsObject = {
        denom: string,
        amount: string,
    }
}

export class IntProto extends jspb.Message { 
    getInt(): string;
    setInt(value: string): IntProto;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): IntProto.AsObject;
    static toObject(includeInstance: boolean, msg: IntProto): IntProto.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: IntProto, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): IntProto;
    static deserializeBinaryFromReader(message: IntProto, reader: jspb.BinaryReader): IntProto;
}

export namespace IntProto {
    export type AsObject = {
        pb_int: string,
    }
}

export class DecProto extends jspb.Message { 
    getDec(): string;
    setDec(value: string): DecProto;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DecProto.AsObject;
    static toObject(includeInstance: boolean, msg: DecProto): DecProto.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DecProto, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DecProto;
    static deserializeBinaryFromReader(message: DecProto, reader: jspb.BinaryReader): DecProto;
}

export namespace DecProto {
    export type AsObject = {
        dec: string,
    }
}
