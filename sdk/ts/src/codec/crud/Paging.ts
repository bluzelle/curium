/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bluzelle.curium.crud";

export interface PagingRequest {
  startKey: string;
  limit: Long;
}

export interface PagingResponse {
  nextKey: string;
  total: Long;
}

const basePagingRequest: object = { startKey: "", limit: Long.UZERO };

export const PagingRequest = {
  encode(
    message: PagingRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.startKey !== "") {
      writer.uint32(10).string(message.startKey);
    }
    if (!message.limit.isZero()) {
      writer.uint32(16).uint64(message.limit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PagingRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePagingRequest } as PagingRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.startKey = reader.string();
          break;
        case 2:
          message.limit = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PagingRequest {
    const message = { ...basePagingRequest } as PagingRequest;
    if (object.startKey !== undefined && object.startKey !== null) {
      message.startKey = String(object.startKey);
    } else {
      message.startKey = "";
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = Long.fromString(object.limit);
    } else {
      message.limit = Long.UZERO;
    }
    return message;
  },

  toJSON(message: PagingRequest): unknown {
    const obj: any = {};
    message.startKey !== undefined && (obj.startKey = message.startKey);
    message.limit !== undefined &&
      (obj.limit = (message.limit || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<PagingRequest>): PagingRequest {
    const message = { ...basePagingRequest } as PagingRequest;
    if (object.startKey !== undefined && object.startKey !== null) {
      message.startKey = object.startKey;
    } else {
      message.startKey = "";
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = object.limit as Long;
    } else {
      message.limit = Long.UZERO;
    }
    return message;
  },
};

const basePagingResponse: object = { nextKey: "", total: Long.UZERO };

export const PagingResponse = {
  encode(
    message: PagingResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.nextKey !== "") {
      writer.uint32(10).string(message.nextKey);
    }
    if (!message.total.isZero()) {
      writer.uint32(16).uint64(message.total);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PagingResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePagingResponse } as PagingResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nextKey = reader.string();
          break;
        case 2:
          message.total = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PagingResponse {
    const message = { ...basePagingResponse } as PagingResponse;
    if (object.nextKey !== undefined && object.nextKey !== null) {
      message.nextKey = String(object.nextKey);
    } else {
      message.nextKey = "";
    }
    if (object.total !== undefined && object.total !== null) {
      message.total = Long.fromString(object.total);
    } else {
      message.total = Long.UZERO;
    }
    return message;
  },

  toJSON(message: PagingResponse): unknown {
    const obj: any = {};
    message.nextKey !== undefined && (obj.nextKey = message.nextKey);
    message.total !== undefined &&
      (obj.total = (message.total || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<PagingResponse>): PagingResponse {
    const message = { ...basePagingResponse } as PagingResponse;
    if (object.nextKey !== undefined && object.nextKey !== null) {
      message.nextKey = object.nextKey;
    } else {
      message.nextKey = "";
    }
    if (object.total !== undefined && object.total !== null) {
      message.total = object.total as Long;
    } else {
      message.total = Long.UZERO;
    }
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
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
