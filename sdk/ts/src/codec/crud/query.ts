/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  PageRequest,
  PageResponse,
} from "../cosmos/base/query/v1beta1/pagination";

export const protobufPackage = "bluzelle.curium.crud";

/** this line is used by starport scaffolding # 3 */
export interface QueryReadRequest {
  uuid: string;
  key: string;
}

export interface QueryReadResponse {
  value: Uint8Array;
}

export interface QueryKeysRequest {
  uuid: string;
  pagination?: PageRequest;
}

export interface QueryKeysResponse {
  keys: string[];
  pagination?: PageResponse;
}

export interface QueryMyKeysRequest {
  address: string;
  uuid: string;
  pagination?: PageRequest;
}

export interface QueryMyKeysResponse {
  keys: string[];
  pagination?: PageResponse;
}

export interface QueryCountRequest {
  address: string;
  uuid: string;
}

export interface QueryCountResponse {
  uuid: string;
  count: Long;
}

export interface QueryHasRequest {
  uuid: string;
  key: string;
}

export interface QueryHasResponse {
  has: boolean;
}

export interface QuerySearchResponse {
  searchString: string;
}

const baseQueryReadRequest: object = { uuid: "", key: "" };

export const QueryReadRequest = {
  encode(
    message: QueryReadRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.uuid !== "") {
      writer.uint32(10).string(message.uuid);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryReadRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryReadRequest } as QueryReadRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uuid = reader.string();
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

  fromJSON(object: any): QueryReadRequest {
    const message = { ...baseQueryReadRequest } as QueryReadRequest;
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

  toJSON(message: QueryReadRequest): unknown {
    const obj: any = {};
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.key !== undefined && (obj.key = message.key);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryReadRequest>): QueryReadRequest {
    const message = { ...baseQueryReadRequest } as QueryReadRequest;
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

const baseQueryReadResponse: object = {};

export const QueryReadResponse = {
  encode(
    message: QueryReadResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.value.length !== 0) {
      writer.uint32(10).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryReadResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryReadResponse } as QueryReadResponse;
    message.value = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryReadResponse {
    const message = { ...baseQueryReadResponse } as QueryReadResponse;
    message.value = new Uint8Array();
    if (object.value !== undefined && object.value !== null) {
      message.value = bytesFromBase64(object.value);
    }
    return message;
  },

  toJSON(message: QueryReadResponse): unknown {
    const obj: any = {};
    message.value !== undefined &&
      (obj.value = base64FromBytes(
        message.value !== undefined ? message.value : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<QueryReadResponse>): QueryReadResponse {
    const message = { ...baseQueryReadResponse } as QueryReadResponse;
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = new Uint8Array();
    }
    return message;
  },
};

const baseQueryKeysRequest: object = { uuid: "" };

export const QueryKeysRequest = {
  encode(
    message: QueryKeysRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.uuid !== "") {
      writer.uint32(10).string(message.uuid);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeysRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryKeysRequest } as QueryKeysRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uuid = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryKeysRequest {
    const message = { ...baseQueryKeysRequest } as QueryKeysRequest;
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = String(object.uuid);
    } else {
      message.uuid = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryKeysRequest): unknown {
    const obj: any = {};
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryKeysRequest>): QueryKeysRequest {
    const message = { ...baseQueryKeysRequest } as QueryKeysRequest;
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = object.uuid;
    } else {
      message.uuid = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryKeysResponse: object = { keys: "" };

export const QueryKeysResponse = {
  encode(
    message: QueryKeysResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.keys) {
      writer.uint32(10).string(v!);
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryKeysResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryKeysResponse } as QueryKeysResponse;
    message.keys = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.keys.push(reader.string());
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryKeysResponse {
    const message = { ...baseQueryKeysResponse } as QueryKeysResponse;
    message.keys = [];
    if (object.keys !== undefined && object.keys !== null) {
      for (const e of object.keys) {
        message.keys.push(String(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryKeysResponse): unknown {
    const obj: any = {};
    if (message.keys) {
      obj.keys = message.keys.map((e) => e);
    } else {
      obj.keys = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryKeysResponse>): QueryKeysResponse {
    const message = { ...baseQueryKeysResponse } as QueryKeysResponse;
    message.keys = [];
    if (object.keys !== undefined && object.keys !== null) {
      for (const e of object.keys) {
        message.keys.push(e);
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryMyKeysRequest: object = { address: "", uuid: "" };

export const QueryMyKeysRequest = {
  encode(
    message: QueryMyKeysRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.uuid !== "") {
      writer.uint32(18).string(message.uuid);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryMyKeysRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryMyKeysRequest } as QueryMyKeysRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.uuid = reader.string();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryMyKeysRequest {
    const message = { ...baseQueryMyKeysRequest } as QueryMyKeysRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = String(object.uuid);
    } else {
      message.uuid = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryMyKeysRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryMyKeysRequest>): QueryMyKeysRequest {
    const message = { ...baseQueryMyKeysRequest } as QueryMyKeysRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = object.uuid;
    } else {
      message.uuid = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryMyKeysResponse: object = { keys: "" };

export const QueryMyKeysResponse = {
  encode(
    message: QueryMyKeysResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.keys) {
      writer.uint32(10).string(v!);
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryMyKeysResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryMyKeysResponse } as QueryMyKeysResponse;
    message.keys = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.keys.push(reader.string());
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryMyKeysResponse {
    const message = { ...baseQueryMyKeysResponse } as QueryMyKeysResponse;
    message.keys = [];
    if (object.keys !== undefined && object.keys !== null) {
      for (const e of object.keys) {
        message.keys.push(String(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryMyKeysResponse): unknown {
    const obj: any = {};
    if (message.keys) {
      obj.keys = message.keys.map((e) => e);
    } else {
      obj.keys = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryMyKeysResponse>): QueryMyKeysResponse {
    const message = { ...baseQueryMyKeysResponse } as QueryMyKeysResponse;
    message.keys = [];
    if (object.keys !== undefined && object.keys !== null) {
      for (const e of object.keys) {
        message.keys.push(e);
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryCountRequest: object = { address: "", uuid: "" };

export const QueryCountRequest = {
  encode(
    message: QueryCountRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.uuid !== "") {
      writer.uint32(18).string(message.uuid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCountRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryCountRequest } as QueryCountRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
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

  fromJSON(object: any): QueryCountRequest {
    const message = { ...baseQueryCountRequest } as QueryCountRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = String(object.uuid);
    } else {
      message.uuid = "";
    }
    return message;
  },

  toJSON(message: QueryCountRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.uuid !== undefined && (obj.uuid = message.uuid);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryCountRequest>): QueryCountRequest {
    const message = { ...baseQueryCountRequest } as QueryCountRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = object.uuid;
    } else {
      message.uuid = "";
    }
    return message;
  },
};

const baseQueryCountResponse: object = { uuid: "", count: Long.ZERO };

export const QueryCountResponse = {
  encode(
    message: QueryCountResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.uuid !== "") {
      writer.uint32(10).string(message.uuid);
    }
    if (!message.count.isZero()) {
      writer.uint32(16).int64(message.count);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryCountResponse } as QueryCountResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uuid = reader.string();
          break;
        case 2:
          message.count = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCountResponse {
    const message = { ...baseQueryCountResponse } as QueryCountResponse;
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = String(object.uuid);
    } else {
      message.uuid = "";
    }
    if (object.count !== undefined && object.count !== null) {
      message.count = Long.fromString(object.count);
    } else {
      message.count = Long.ZERO;
    }
    return message;
  },

  toJSON(message: QueryCountResponse): unknown {
    const obj: any = {};
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.count !== undefined &&
      (obj.count = (message.count || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<QueryCountResponse>): QueryCountResponse {
    const message = { ...baseQueryCountResponse } as QueryCountResponse;
    if (object.uuid !== undefined && object.uuid !== null) {
      message.uuid = object.uuid;
    } else {
      message.uuid = "";
    }
    if (object.count !== undefined && object.count !== null) {
      message.count = object.count as Long;
    } else {
      message.count = Long.ZERO;
    }
    return message;
  },
};

const baseQueryHasRequest: object = { uuid: "", key: "" };

export const QueryHasRequest = {
  encode(
    message: QueryHasRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.uuid !== "") {
      writer.uint32(10).string(message.uuid);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryHasRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryHasRequest } as QueryHasRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uuid = reader.string();
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

  fromJSON(object: any): QueryHasRequest {
    const message = { ...baseQueryHasRequest } as QueryHasRequest;
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

  toJSON(message: QueryHasRequest): unknown {
    const obj: any = {};
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.key !== undefined && (obj.key = message.key);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryHasRequest>): QueryHasRequest {
    const message = { ...baseQueryHasRequest } as QueryHasRequest;
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

const baseQueryHasResponse: object = { has: false };

export const QueryHasResponse = {
  encode(
    message: QueryHasResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.has === true) {
      writer.uint32(8).bool(message.has);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryHasResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryHasResponse } as QueryHasResponse;
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

  fromJSON(object: any): QueryHasResponse {
    const message = { ...baseQueryHasResponse } as QueryHasResponse;
    if (object.has !== undefined && object.has !== null) {
      message.has = Boolean(object.has);
    } else {
      message.has = false;
    }
    return message;
  },

  toJSON(message: QueryHasResponse): unknown {
    const obj: any = {};
    message.has !== undefined && (obj.has = message.has);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryHasResponse>): QueryHasResponse {
    const message = { ...baseQueryHasResponse } as QueryHasResponse;
    if (object.has !== undefined && object.has !== null) {
      message.has = object.has;
    } else {
      message.has = false;
    }
    return message;
  },
};

const baseQuerySearchResponse: object = { searchString: "" };

export const QuerySearchResponse = {
  encode(
    message: QuerySearchResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.searchString !== "") {
      writer.uint32(10).string(message.searchString);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySearchResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQuerySearchResponse } as QuerySearchResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.searchString = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySearchResponse {
    const message = { ...baseQuerySearchResponse } as QuerySearchResponse;
    if (object.searchString !== undefined && object.searchString !== null) {
      message.searchString = String(object.searchString);
    } else {
      message.searchString = "";
    }
    return message;
  },

  toJSON(message: QuerySearchResponse): unknown {
    const obj: any = {};
    message.searchString !== undefined &&
      (obj.searchString = message.searchString);
    return obj;
  },

  fromPartial(object: DeepPartial<QuerySearchResponse>): QuerySearchResponse {
    const message = { ...baseQuerySearchResponse } as QuerySearchResponse;
    if (object.searchString !== undefined && object.searchString !== null) {
      message.searchString = object.searchString;
    } else {
      message.searchString = "";
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** this line is used by starport scaffolding # 2 */
  Read(request: QueryReadRequest): Promise<QueryReadResponse>;
  Keys(request: QueryKeysRequest): Promise<QueryKeysResponse>;
  MyKeys(request: QueryMyKeysRequest): Promise<QueryMyKeysResponse>;
  Count(request: QueryCountRequest): Promise<QueryCountResponse>;
  Has(request: QueryHasRequest): Promise<QueryHasResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Read(request: QueryReadRequest): Promise<QueryReadResponse> {
    const data = QueryReadRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.crud.Query",
      "Read",
      data
    );
    return promise.then((data) =>
      QueryReadResponse.decode(new _m0.Reader(data))
    );
  }

  Keys(request: QueryKeysRequest): Promise<QueryKeysResponse> {
    const data = QueryKeysRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.crud.Query",
      "Keys",
      data
    );
    return promise.then((data) =>
      QueryKeysResponse.decode(new _m0.Reader(data))
    );
  }

  MyKeys(request: QueryMyKeysRequest): Promise<QueryMyKeysResponse> {
    const data = QueryMyKeysRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.crud.Query",
      "MyKeys",
      data
    );
    return promise.then((data) =>
      QueryMyKeysResponse.decode(new _m0.Reader(data))
    );
  }

  Count(request: QueryCountRequest): Promise<QueryCountResponse> {
    const data = QueryCountRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.crud.Query",
      "Count",
      data
    );
    return promise.then((data) =>
      QueryCountResponse.decode(new _m0.Reader(data))
    );
  }

  Has(request: QueryHasRequest): Promise<QueryHasResponse> {
    const data = QueryHasRequest.encode(request).finish();
    const promise = this.rpc.request("bluzelle.curium.crud.Query", "Has", data);
    return promise.then((data) =>
      QueryHasResponse.decode(new _m0.Reader(data))
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
