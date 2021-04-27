// package: tendermint.version
// file: tendermint/version/types.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as gogoproto_gogo_pb from "../../gogoproto/gogo_pb";

export class Consensus extends jspb.Message { 
    getBlock(): number;
    setBlock(value: number): Consensus;
    getApp(): number;
    setApp(value: number): Consensus;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Consensus.AsObject;
    static toObject(includeInstance: boolean, msg: Consensus): Consensus.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Consensus, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Consensus;
    static deserializeBinaryFromReader(message: Consensus, reader: jspb.BinaryReader): Consensus;
}

export namespace Consensus {
    export type AsObject = {
        block: number,
        app: number,
    }
}
