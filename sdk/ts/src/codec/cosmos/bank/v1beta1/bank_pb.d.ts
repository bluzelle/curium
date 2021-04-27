// package: cosmos.bank.v1beta1
// file: cosmos/bank/v1beta1/bank.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as gogoproto_gogo_pb from "../../../gogoproto/gogo_pb";
import * as cosmos_proto_cosmos_pb from "../../../cosmos_proto/cosmos_pb";
import * as cosmos_base_v1beta1_coin_pb from "../../../cosmos/base/v1beta1/coin_pb";

export class Params extends jspb.Message { 
    clearSendEnabledList(): void;
    getSendEnabledList(): Array<SendEnabled>;
    setSendEnabledList(value: Array<SendEnabled>): Params;
    addSendEnabled(value?: SendEnabled, index?: number): SendEnabled;
    getDefaultSendEnabled(): boolean;
    setDefaultSendEnabled(value: boolean): Params;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Params.AsObject;
    static toObject(includeInstance: boolean, msg: Params): Params.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Params, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Params;
    static deserializeBinaryFromReader(message: Params, reader: jspb.BinaryReader): Params;
}

export namespace Params {
    export type AsObject = {
        sendEnabledList: Array<SendEnabled.AsObject>,
        defaultSendEnabled: boolean,
    }
}

export class SendEnabled extends jspb.Message { 
    getDenom(): string;
    setDenom(value: string): SendEnabled;
    getEnabled(): boolean;
    setEnabled(value: boolean): SendEnabled;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendEnabled.AsObject;
    static toObject(includeInstance: boolean, msg: SendEnabled): SendEnabled.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendEnabled, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendEnabled;
    static deserializeBinaryFromReader(message: SendEnabled, reader: jspb.BinaryReader): SendEnabled;
}

export namespace SendEnabled {
    export type AsObject = {
        denom: string,
        enabled: boolean,
    }
}

export class Input extends jspb.Message { 
    getAddress(): string;
    setAddress(value: string): Input;
    clearCoinsList(): void;
    getCoinsList(): Array<cosmos_base_v1beta1_coin_pb.Coin>;
    setCoinsList(value: Array<cosmos_base_v1beta1_coin_pb.Coin>): Input;
    addCoins(value?: cosmos_base_v1beta1_coin_pb.Coin, index?: number): cosmos_base_v1beta1_coin_pb.Coin;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Input.AsObject;
    static toObject(includeInstance: boolean, msg: Input): Input.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Input, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Input;
    static deserializeBinaryFromReader(message: Input, reader: jspb.BinaryReader): Input;
}

export namespace Input {
    export type AsObject = {
        address: string,
        coinsList: Array<cosmos_base_v1beta1_coin_pb.Coin.AsObject>,
    }
}

export class Output extends jspb.Message { 
    getAddress(): string;
    setAddress(value: string): Output;
    clearCoinsList(): void;
    getCoinsList(): Array<cosmos_base_v1beta1_coin_pb.Coin>;
    setCoinsList(value: Array<cosmos_base_v1beta1_coin_pb.Coin>): Output;
    addCoins(value?: cosmos_base_v1beta1_coin_pb.Coin, index?: number): cosmos_base_v1beta1_coin_pb.Coin;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Output.AsObject;
    static toObject(includeInstance: boolean, msg: Output): Output.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Output, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Output;
    static deserializeBinaryFromReader(message: Output, reader: jspb.BinaryReader): Output;
}

export namespace Output {
    export type AsObject = {
        address: string,
        coinsList: Array<cosmos_base_v1beta1_coin_pb.Coin.AsObject>,
    }
}

export class Supply extends jspb.Message { 
    clearTotalList(): void;
    getTotalList(): Array<cosmos_base_v1beta1_coin_pb.Coin>;
    setTotalList(value: Array<cosmos_base_v1beta1_coin_pb.Coin>): Supply;
    addTotal(value?: cosmos_base_v1beta1_coin_pb.Coin, index?: number): cosmos_base_v1beta1_coin_pb.Coin;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Supply.AsObject;
    static toObject(includeInstance: boolean, msg: Supply): Supply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Supply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Supply;
    static deserializeBinaryFromReader(message: Supply, reader: jspb.BinaryReader): Supply;
}

export namespace Supply {
    export type AsObject = {
        totalList: Array<cosmos_base_v1beta1_coin_pb.Coin.AsObject>,
    }
}

export class DenomUnit extends jspb.Message { 
    getDenom(): string;
    setDenom(value: string): DenomUnit;
    getExponent(): number;
    setExponent(value: number): DenomUnit;
    clearAliasesList(): void;
    getAliasesList(): Array<string>;
    setAliasesList(value: Array<string>): DenomUnit;
    addAliases(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DenomUnit.AsObject;
    static toObject(includeInstance: boolean, msg: DenomUnit): DenomUnit.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DenomUnit, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DenomUnit;
    static deserializeBinaryFromReader(message: DenomUnit, reader: jspb.BinaryReader): DenomUnit;
}

export namespace DenomUnit {
    export type AsObject = {
        denom: string,
        exponent: number,
        aliasesList: Array<string>,
    }
}

export class Metadata extends jspb.Message { 
    getDescription(): string;
    setDescription(value: string): Metadata;
    clearDenomUnitsList(): void;
    getDenomUnitsList(): Array<DenomUnit>;
    setDenomUnitsList(value: Array<DenomUnit>): Metadata;
    addDenomUnits(value?: DenomUnit, index?: number): DenomUnit;
    getBase(): string;
    setBase(value: string): Metadata;
    getDisplay(): string;
    setDisplay(value: string): Metadata;
    getName(): string;
    setName(value: string): Metadata;
    getSymbol(): string;
    setSymbol(value: string): Metadata;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Metadata.AsObject;
    static toObject(includeInstance: boolean, msg: Metadata): Metadata.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Metadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Metadata;
    static deserializeBinaryFromReader(message: Metadata, reader: jspb.BinaryReader): Metadata;
}

export namespace Metadata {
    export type AsObject = {
        description: string,
        denomUnitsList: Array<DenomUnit.AsObject>,
        base: string,
        display: string,
        name: string,
        symbol: string,
    }
}
