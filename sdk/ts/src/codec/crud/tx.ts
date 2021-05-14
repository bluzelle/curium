/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Lease } from "../crud/lease";
import { KeyValue } from "../crud/KeyValue";

export const protobufPackage = "bluzelle.curium.crud";

/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgKeyValues {
  creator: string;
  uuid: string;
}

export interface MsgKeyValuesResponse {
  keyValues: KeyValue[];
}

export interface MsgHas {
  creator: string;
  uuid: string;
  key: string;
}

export interface MsgHasResponse {
  has: boolean;
}

export interface MsgGetLease {
  creator: string;
  uuid: string;
  key: string;
}

export interface MsgGetLeaseResponse {
  uuid: string;
  key: string;
  leaseBlocks: Long;
}

export interface MsgRead {
  creator: string;
  uuid: string;
  key: string;
}

export interface MsgReadResponse {
  value: Uint8Array;
  key: string;
}

export interface MsgUpsert {
  creator: string;
  uuid: string;
  key: string;
  value: Uint8Array;
  lease?: Lease;
  metadata: Uint8Array;
}

export interface MsgUpsertResponse {}

export interface MsgCreate {
  creator: string;
  uuid: string;
  key: string;
  value: Uint8Array;
  lease?: Lease;
  metadata: Uint8Array;
}

export interface MsgCreateResponse {}

export interface MsgUpdate {
  creator: string;
  uuid: string;
  key: string;
  value: Uint8Array;
  lease?: Lease;
  metadata: Uint8Array;
}

export interface MsgUpdateResponse {}

export interface MsgDelete {
  creator: string;
  uuid: string;
  key: string;
}

export interface MsgDeleteResponse {}

const baseMsgKeyValues: object = { creator: "", uuid: "" };

export const MsgKeyValues = {
  encode(
    message: MsgKeyValues,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.uuid !== "") {
      writer.uint32(18).string(message.uuid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgKeyValues {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgKeyValues } as MsgKeyValues;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.uuid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgKeyValues {
    const message = { ...baseMsgKeyValues } as MsgKeyValues;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = String(object.uuid);
    } else {
      message.uuid = "";
    }
    return message;
  },

  toJSON(message: MsgKeyValues): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.uuid !== undefined && (obj.uuid = message.uuid);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgKeyValues>): MsgKeyValues {
    const message = { ...baseMsgKeyValues } as MsgKeyValues;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = object.uuid;
    } else {
      message.uuid = "";
    }
    return message;
  },
};

const baseMsgKeyValuesResponse: object = {};

export const MsgKeyValuesResponse = {
  encode(
    message: MsgKeyValuesResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.keyValues) {
      KeyValue.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgKeyValuesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgKeyValuesResponse } as MsgKeyValuesResponse;
    message.keyValues = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.keyValues.push(KeyValue.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgKeyValuesResponse {
    const message = { ...baseMsgKeyValuesResponse } as MsgKeyValuesResponse;
    message.keyValues = [];
    if (object.keyValues !== undefined && object.keyValues !== null) {
      for (const e of object.keyValues) {
        message.keyValues.push(KeyValue.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: MsgKeyValuesResponse): unknown {
    const obj: any = {};
    if (message.keyValues) {
      obj.keyValues = message.keyValues.map((e) =>
        e ? KeyValue.toJSON(e) : undefined
      );
    } else {
      obj.keyValues = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgKeyValuesResponse>): MsgKeyValuesResponse {
    const message = { ...baseMsgKeyValuesResponse } as MsgKeyValuesResponse;
    message.keyValues = [];
    if (object.keyValues !== undefined && object.keyValues !== null) {
      for (const e of object.keyValues) {
        message.keyValues.push(KeyValue.fromPartial(e));
      }
    }
    return message;
  },
};

const baseMsgHas: object = { creator: "", uuid: "", key: "" };

export const MsgHas = {
  encode(
    message: MsgHas,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.uuid !== "") {
      writer.uint32(18).string(message.uuid);
    }
    if (message.key !== "") {
      writer.uint32(26).string(message.key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgHas {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgHas } as MsgHas;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.uuid = reader.string();
          break;
        case 3:
          message.key = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgHas {
    const message = { ...baseMsgHas } as MsgHas;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = String(object.uuid);
    } else {
      message.uuid = "";
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    return message;
  },

  toJSON(message: MsgHas): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.key !== undefined && (obj.key = message.key);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgHas>): MsgHas {
    const message = { ...baseMsgHas } as MsgHas;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = object.uuid;
    } else {
      message.uuid = "";
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    return message;
  },
};

const baseMsgHasResponse: object = { has: false };

export const MsgHasResponse = {
  encode(
    message: MsgHasResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.has === true) {
      writer.uint32(8).bool(message.has);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgHasResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgHasResponse } as MsgHasResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.has = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgHasResponse {
    const message = { ...baseMsgHasResponse } as MsgHasResponse;
    if (object.has !== undefined && object.has !== null) {
      message.has = Boolean(object.has);
    } else {
      message.has = false;
    }
    return message;
  },

  toJSON(message: MsgHasResponse): unknown {
    const obj: any = {};
    message.has !== undefined && (obj.has = message.has);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgHasResponse>): MsgHasResponse {
    const message = { ...baseMsgHasResponse } as MsgHasResponse;
    if (object.has !== undefined && object.has !== null) {
      message.has = object.has;
    } else {
      message.has = false;
    }
    return message;
  },
};

const baseMsgGetLease: object = { creator: "", uuid: "", key: "" };

export const MsgGetLease = {
  encode(
    message: MsgGetLease,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.uuid !== "") {
      writer.uint32(18).string(message.uuid);
    }
    if (message.key !== "") {
      writer.uint32(26).string(message.key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgGetLease {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgGetLease } as MsgGetLease;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.uuid = reader.string();
          break;
        case 3:
          message.key = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgGetLease {
    const message = { ...baseMsgGetLease } as MsgGetLease;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = String(object.uuid);
    } else {
      message.uuid = "";
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    return message;
  },

  toJSON(message: MsgGetLease): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.key !== undefined && (obj.key = message.key);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgGetLease>): MsgGetLease {
    const message = { ...baseMsgGetLease } as MsgGetLease;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = object.uuid;
    } else {
      message.uuid = "";
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    return message;
  },
};

const baseMsgGetLeaseResponse: object = {
  uuid: "",
  key: "",
  leaseBlocks: Long.ZERO,
};

export const MsgGetLeaseResponse = {
  encode(
    message: MsgGetLeaseResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.uuid !== "") {
      writer.uint32(10).string(message.uuid);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    if (!message.leaseBlocks.isZero()) {
      writer.uint32(24).int64(message.leaseBlocks);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgGetLeaseResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgGetLeaseResponse } as MsgGetLeaseResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uuid = reader.string();
          break;
        case 2:
          message.key = reader.string();
          break;
        case 3:
          message.leaseBlocks = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgGetLeaseResponse {
    const message = { ...baseMsgGetLeaseResponse } as MsgGetLeaseResponse;
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = String(object.uuid);
    } else {
      message.uuid = "";
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.leaseBlocks !== undefined && object.leaseBlocks !== null) {
      message.leaseBlocks = Long.fromString(object.leaseBlocks);
    } else {
      message.leaseBlocks = Long.ZERO;
    }
    return message;
  },

  toJSON(message: MsgGetLeaseResponse): unknown {
    const obj: any = {};
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.key !== undefined && (obj.key = message.key);
    message.leaseBlocks !== undefined &&
      (obj.leaseBlocks = (message.leaseBlocks || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<MsgGetLeaseResponse>): MsgGetLeaseResponse {
    const message = { ...baseMsgGetLeaseResponse } as MsgGetLeaseResponse;
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = object.uuid;
    } else {
      message.uuid = "";
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.leaseBlocks !== undefined && object.leaseBlocks !== null) {
      message.leaseBlocks = object.leaseBlocks as Long;
    } else {
      message.leaseBlocks = Long.ZERO;
    }
    return message;
  },
};

const baseMsgRead: object = { creator: "", uuid: "", key: "" };

export const MsgRead = {
  encode(
    message: MsgRead,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.uuid !== "") {
      writer.uint32(18).string(message.uuid);
    }
    if (message.key !== "") {
      writer.uint32(26).string(message.key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRead {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgRead } as MsgRead;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.uuid = reader.string();
          break;
        case 3:
          message.key = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRead {
    const message = { ...baseMsgRead } as MsgRead;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = String(object.uuid);
    } else {
      message.uuid = "";
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    return message;
  },

  toJSON(message: MsgRead): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.key !== undefined && (obj.key = message.key);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgRead>): MsgRead {
    const message = { ...baseMsgRead } as MsgRead;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = object.uuid;
    } else {
      message.uuid = "";
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    return message;
  },
};

const baseMsgReadResponse: object = { key: "" };

export const MsgReadResponse = {
  encode(
    message: MsgReadResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.value.length !== 0) {
      writer.uint32(10).bytes(message.value);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgReadResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgReadResponse } as MsgReadResponse;
    message.value = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.bytes();
          break;
        case 2:
          message.key = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgReadResponse {
    const message = { ...baseMsgReadResponse } as MsgReadResponse;
    message.value = new Uint8Array();
    if (object.value !== undefined && object.value !== null) {
      message.value = bytesFromBase64(object.value);
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    return message;
  },

  toJSON(message: MsgReadResponse): unknown {
    const obj: any = {};
    message.value !== undefined &&
      (obj.value = base64FromBytes(
        message.value !== undefined ? message.value : new Uint8Array()
      ));
    message.key !== undefined && (obj.key = message.key);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgReadResponse>): MsgReadResponse {
    const message = { ...baseMsgReadResponse } as MsgReadResponse;
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = new Uint8Array();
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    return message;
  },
};

const baseMsgUpsert: object = { creator: "", uuid: "", key: "" };

export const MsgUpsert = {
  encode(
    message: MsgUpsert,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.uuid !== "") {
      writer.uint32(18).string(message.uuid);
    }
    if (message.key !== "") {
      writer.uint32(26).string(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(34).bytes(message.value);
    }
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(42).fork()).ldelim();
    }
    if (message.metadata.length !== 0) {
      writer.uint32(50).bytes(message.metadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpsert {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpsert } as MsgUpsert;
    message.value = new Uint8Array();
    message.metadata = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.uuid = reader.string();
          break;
        case 3:
          message.key = reader.string();
          break;
        case 4:
          message.value = reader.bytes();
          break;
        case 5:
          message.lease = Lease.decode(reader, reader.uint32());
          break;
        case 6:
          message.metadata = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpsert {
    const message = { ...baseMsgUpsert } as MsgUpsert;
    message.value = new Uint8Array();
    message.metadata = new Uint8Array();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = String(object.uuid);
    } else {
      message.uuid = "";
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = bytesFromBase64(object.value);
    }
    if (object.lease !== undefined && object.lease !== null) {
      message.lease = Lease.fromJSON(object.lease);
    } else {
      message.lease = undefined;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = bytesFromBase64(object.metadata);
    }
    return message;
  },

  toJSON(message: MsgUpsert): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = base64FromBytes(
        message.value !== undefined ? message.value : new Uint8Array()
      ));
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    message.metadata !== undefined &&
      (obj.metadata = base64FromBytes(
        message.metadata !== undefined ? message.metadata : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpsert>): MsgUpsert {
    const message = { ...baseMsgUpsert } as MsgUpsert;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = object.uuid;
    } else {
      message.uuid = "";
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = new Uint8Array();
    }
    if (object.lease !== undefined && object.lease !== null) {
      message.lease = Lease.fromPartial(object.lease);
    } else {
      message.lease = undefined;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata;
    } else {
      message.metadata = new Uint8Array();
    }
    return message;
  },
};

const baseMsgUpsertResponse: object = {};

export const MsgUpsertResponse = {
  encode(
    _: MsgUpsertResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpsertResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpsertResponse } as MsgUpsertResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpsertResponse {
    const message = { ...baseMsgUpsertResponse } as MsgUpsertResponse;
    return message;
  },

  toJSON(_: MsgUpsertResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgUpsertResponse>): MsgUpsertResponse {
    const message = { ...baseMsgUpsertResponse } as MsgUpsertResponse;
    return message;
  },
};

const baseMsgCreate: object = { creator: "", uuid: "", key: "" };

export const MsgCreate = {
  encode(
    message: MsgCreate,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.uuid !== "") {
      writer.uint32(18).string(message.uuid);
    }
    if (message.key !== "") {
      writer.uint32(26).string(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(34).bytes(message.value);
    }
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(42).fork()).ldelim();
    }
    if (message.metadata.length !== 0) {
      writer.uint32(50).bytes(message.metadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreate } as MsgCreate;
    message.value = new Uint8Array();
    message.metadata = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.uuid = reader.string();
          break;
        case 3:
          message.key = reader.string();
          break;
        case 4:
          message.value = reader.bytes();
          break;
        case 5:
          message.lease = Lease.decode(reader, reader.uint32());
          break;
        case 6:
          message.metadata = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreate {
    const message = { ...baseMsgCreate } as MsgCreate;
    message.value = new Uint8Array();
    message.metadata = new Uint8Array();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = String(object.uuid);
    } else {
      message.uuid = "";
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = bytesFromBase64(object.value);
    }
    if (object.lease !== undefined && object.lease !== null) {
      message.lease = Lease.fromJSON(object.lease);
    } else {
      message.lease = undefined;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = bytesFromBase64(object.metadata);
    }
    return message;
  },

  toJSON(message: MsgCreate): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = base64FromBytes(
        message.value !== undefined ? message.value : new Uint8Array()
      ));
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    message.metadata !== undefined &&
      (obj.metadata = base64FromBytes(
        message.metadata !== undefined ? message.metadata : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreate>): MsgCreate {
    const message = { ...baseMsgCreate } as MsgCreate;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = object.uuid;
    } else {
      message.uuid = "";
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = new Uint8Array();
    }
    if (object.lease !== undefined && object.lease !== null) {
      message.lease = Lease.fromPartial(object.lease);
    } else {
      message.lease = undefined;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata;
    } else {
      message.metadata = new Uint8Array();
    }
    return message;
  },
};

const baseMsgCreateResponse: object = {};

export const MsgCreateResponse = {
  encode(
    _: MsgCreateResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateResponse } as MsgCreateResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgCreateResponse {
    const message = { ...baseMsgCreateResponse } as MsgCreateResponse;
    return message;
  },

  toJSON(_: MsgCreateResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgCreateResponse>): MsgCreateResponse {
    const message = { ...baseMsgCreateResponse } as MsgCreateResponse;
    return message;
  },
};

const baseMsgUpdate: object = { creator: "", uuid: "", key: "" };

export const MsgUpdate = {
  encode(
    message: MsgUpdate,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.uuid !== "") {
      writer.uint32(18).string(message.uuid);
    }
    if (message.key !== "") {
      writer.uint32(26).string(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(34).bytes(message.value);
    }
    if (message.lease !== undefined) {
      Lease.encode(message.lease, writer.uint32(42).fork()).ldelim();
    }
    if (message.metadata.length !== 0) {
      writer.uint32(50).bytes(message.metadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdate } as MsgUpdate;
    message.value = new Uint8Array();
    message.metadata = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.uuid = reader.string();
          break;
        case 3:
          message.key = reader.string();
          break;
        case 4:
          message.value = reader.bytes();
          break;
        case 5:
          message.lease = Lease.decode(reader, reader.uint32());
          break;
        case 6:
          message.metadata = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdate {
    const message = { ...baseMsgUpdate } as MsgUpdate;
    message.value = new Uint8Array();
    message.metadata = new Uint8Array();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = String(object.uuid);
    } else {
      message.uuid = "";
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = bytesFromBase64(object.value);
    }
    if (object.lease !== undefined && object.lease !== null) {
      message.lease = Lease.fromJSON(object.lease);
    } else {
      message.lease = undefined;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = bytesFromBase64(object.metadata);
    }
    return message;
  },

  toJSON(message: MsgUpdate): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = base64FromBytes(
        message.value !== undefined ? message.value : new Uint8Array()
      ));
    message.lease !== undefined &&
      (obj.lease = message.lease ? Lease.toJSON(message.lease) : undefined);
    message.metadata !== undefined &&
      (obj.metadata = base64FromBytes(
        message.metadata !== undefined ? message.metadata : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdate>): MsgUpdate {
    const message = { ...baseMsgUpdate } as MsgUpdate;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = object.uuid;
    } else {
      message.uuid = "";
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = new Uint8Array();
    }
    if (object.lease !== undefined && object.lease !== null) {
      message.lease = Lease.fromPartial(object.lease);
    } else {
      message.lease = undefined;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata;
    } else {
      message.metadata = new Uint8Array();
    }
    return message;
  },
};

const baseMsgUpdateResponse: object = {};

export const MsgUpdateResponse = {
  encode(
    _: MsgUpdateResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateResponse } as MsgUpdateResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateResponse {
    const message = { ...baseMsgUpdateResponse } as MsgUpdateResponse;
    return message;
  },

  toJSON(_: MsgUpdateResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgUpdateResponse>): MsgUpdateResponse {
    const message = { ...baseMsgUpdateResponse } as MsgUpdateResponse;
    return message;
  },
};

const baseMsgDelete: object = { creator: "", uuid: "", key: "" };

export const MsgDelete = {
  encode(
    message: MsgDelete,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.uuid !== "") {
      writer.uint32(18).string(message.uuid);
    }
    if (message.key !== "") {
      writer.uint32(26).string(message.key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDelete {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDelete } as MsgDelete;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.uuid = reader.string();
          break;
        case 3:
          message.key = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDelete {
    const message = { ...baseMsgDelete } as MsgDelete;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = String(object.uuid);
    } else {
      message.uuid = "";
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    return message;
  },

  toJSON(message: MsgDelete): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.key !== undefined && (obj.key = message.key);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDelete>): MsgDelete {
    const message = { ...baseMsgDelete } as MsgDelete;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = object.uuid;
    } else {
      message.uuid = "";
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    return message;
  },
};

const baseMsgDeleteResponse: object = {};

export const MsgDeleteResponse = {
  encode(
    _: MsgDeleteResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteResponse } as MsgDeleteResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteResponse {
    const message = { ...baseMsgDeleteResponse } as MsgDeleteResponse;
    return message;
  },

  toJSON(_: MsgDeleteResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgDeleteResponse>): MsgDeleteResponse {
    const message = { ...baseMsgDeleteResponse } as MsgDeleteResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  KeyValues(request: MsgKeyValues): Promise<MsgKeyValuesResponse>;
  Has(request: MsgHas): Promise<MsgHasResponse>;
  GetLease(request: MsgGetLease): Promise<MsgGetLeaseResponse>;
  Read(request: MsgRead): Promise<MsgReadResponse>;
  Upsert(request: MsgUpsert): Promise<MsgUpsertResponse>;
  Create(request: MsgCreate): Promise<MsgCreateResponse>;
  Update(request: MsgUpdate): Promise<MsgUpdateResponse>;
  Delete(request: MsgDelete): Promise<MsgDeleteResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  KeyValues(request: MsgKeyValues): Promise<MsgKeyValuesResponse> {
    const data = MsgKeyValues.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.crud.Msg",
      "KeyValues",
      data
    );
    return promise.then((data) =>
      MsgKeyValuesResponse.decode(new _m0.Reader(data))
    );
  }

  Has(request: MsgHas): Promise<MsgHasResponse> {
    const data = MsgHas.encode(request).finish();
    const promise = this.rpc.request("bluzelle.curium.crud.Msg", "Has", data);
    return promise.then((data) => MsgHasResponse.decode(new _m0.Reader(data)));
  }

  GetLease(request: MsgGetLease): Promise<MsgGetLeaseResponse> {
    const data = MsgGetLease.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.crud.Msg",
      "GetLease",
      data
    );
    return promise.then((data) =>
      MsgGetLeaseResponse.decode(new _m0.Reader(data))
    );
  }

  Read(request: MsgRead): Promise<MsgReadResponse> {
    const data = MsgRead.encode(request).finish();
    const promise = this.rpc.request("bluzelle.curium.crud.Msg", "Read", data);
    return promise.then((data) => MsgReadResponse.decode(new _m0.Reader(data)));
  }

  Upsert(request: MsgUpsert): Promise<MsgUpsertResponse> {
    const data = MsgUpsert.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.crud.Msg",
      "Upsert",
      data
    );
    return promise.then((data) =>
      MsgUpsertResponse.decode(new _m0.Reader(data))
    );
  }

  Create(request: MsgCreate): Promise<MsgCreateResponse> {
    const data = MsgCreate.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.crud.Msg",
      "Create",
      data
    );
    return promise.then((data) =>
      MsgCreateResponse.decode(new _m0.Reader(data))
    );
  }

  Update(request: MsgUpdate): Promise<MsgUpdateResponse> {
    const data = MsgUpdate.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.crud.Msg",
      "Update",
      data
    );
    return promise.then((data) =>
      MsgUpdateResponse.decode(new _m0.Reader(data))
    );
  }

  Delete(request: MsgDelete): Promise<MsgDeleteResponse> {
    const data = MsgDelete.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.crud.Msg",
      "Delete",
      data
    );
    return promise.then((data) =>
      MsgDeleteResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(""));
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | undefined
  | Long;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
