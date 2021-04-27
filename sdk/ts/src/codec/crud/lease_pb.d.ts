// package: bluzelle.curium.crud
// file: crud/lease.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Lease extends jspb.Message { 
    getSeconds(): number;
    setSeconds(value: number): Lease;
    getMinutes(): number;
    setMinutes(value: number): Lease;
    getHours(): number;
    setHours(value: number): Lease;
    getDays(): number;
    setDays(value: number): Lease;
    getYears(): number;
    setYears(value: number): Lease;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Lease.AsObject;
    static toObject(includeInstance: boolean, msg: Lease): Lease.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Lease, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Lease;
    static deserializeBinaryFromReader(message: Lease, reader: jspb.BinaryReader): Lease;
}

export namespace Lease {
    export type AsObject = {
        seconds: number,
        minutes: number,
        hours: number,
        days: number,
        years: number,
    }
}
