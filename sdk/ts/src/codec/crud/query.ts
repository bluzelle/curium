/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { CrudValue } from "../crud/CrudValue";
import {
  PageRequest,
  PageResponse,
} from "../cosmos/base/query/v1beta1/pagination";

export const protobufPackage = "bluzelle.curium.crud";

/** this line is used by starport scaffolding # 3 */
export interface QueryGetCrudValueRequest {
  uuid: string;
  key: string;
}

export interface QueryGetCrudValueResponse {
  CrudValue?: CrudValue;
}

export interface QueryAllCrudValueRequest {
  uuid: string;
  pagination?: PageRequest;
}

export interface QueryAllCrudValueResponse {
  CrudValue: CrudValue[];
  pagination?: PageResponse;
}

const baseQueryGetCrudValueRequest: object = { uuid: "", key: "" };

export const QueryGetCrudValueRequest = {
  encode(
    message: QueryGetCrudValueRequest,
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetCrudValueRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetCrudValueRequest,
    } as QueryGetCrudValueRequest;
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

  fromJSON(object: any): QueryGetCrudValueRequest {
    const message = {
      ...baseQueryGetCrudValueRequest,
    } as QueryGetCrudValueRequest;
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

  toJSON(message: QueryGetCrudValueRequest): unknown {
    const obj: any = {};
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.key !== undefined && (obj.key = message.key);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetCrudValueRequest>
  ): QueryGetCrudValueRequest {
    const message = {
      ...baseQueryGetCrudValueRequest,
    } as QueryGetCrudValueRequest;
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

const baseQueryGetCrudValueResponse: object = {};

export const QueryGetCrudValueResponse = {
  encode(
    message: QueryGetCrudValueResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.CrudValue !== undefined) {
      CrudValue.encode(message.CrudValue, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetCrudValueResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetCrudValueResponse,
    } as QueryGetCrudValueResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.CrudValue = CrudValue.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetCrudValueResponse {
    const message = {
      ...baseQueryGetCrudValueResponse,
    } as QueryGetCrudValueResponse;
    if (object.CrudValue !== undefined && object.CrudValue !== null) {
      message.CrudValue = CrudValue.fromJSON(object.CrudValue);
    } else {
      message.CrudValue = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetCrudValueResponse): unknown {
    const obj: any = {};
    message.CrudValue !== undefined &&
      (obj.CrudValue = message.CrudValue
        ? CrudValue.toJSON(message.CrudValue)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetCrudValueResponse>
  ): QueryGetCrudValueResponse {
    const message = {
      ...baseQueryGetCrudValueResponse,
    } as QueryGetCrudValueResponse;
    if (object.CrudValue !== undefined && object.CrudValue !== null) {
      message.CrudValue = CrudValue.fromPartial(object.CrudValue);
    } else {
      message.CrudValue = undefined;
    }
    return message;
  },
};

const baseQueryAllCrudValueRequest: object = { uuid: "" };

export const QueryAllCrudValueRequest = {
  encode(
    message: QueryAllCrudValueRequest,
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAllCrudValueRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllCrudValueRequest,
    } as QueryAllCrudValueRequest;
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

  fromJSON(object: any): QueryAllCrudValueRequest {
    const message = {
      ...baseQueryAllCrudValueRequest,
    } as QueryAllCrudValueRequest;
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

  toJSON(message: QueryAllCrudValueRequest): unknown {
    const obj: any = {};
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllCrudValueRequest>
  ): QueryAllCrudValueRequest {
    const message = {
      ...baseQueryAllCrudValueRequest,
    } as QueryAllCrudValueRequest;
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

const baseQueryAllCrudValueResponse: object = {};

export const QueryAllCrudValueResponse = {
  encode(
    message: QueryAllCrudValueResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.CrudValue) {
      CrudValue.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAllCrudValueResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllCrudValueResponse,
    } as QueryAllCrudValueResponse;
    message.CrudValue = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.CrudValue.push(CrudValue.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllCrudValueResponse {
    const message = {
      ...baseQueryAllCrudValueResponse,
    } as QueryAllCrudValueResponse;
    message.CrudValue = [];
    if (object.CrudValue !== undefined && object.CrudValue !== null) {
      for (const e of object.CrudValue) {
        message.CrudValue.push(CrudValue.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllCrudValueResponse): unknown {
    const obj: any = {};
    if (message.CrudValue) {
      obj.CrudValue = message.CrudValue.map((e) =>
        e ? CrudValue.toJSON(e) : undefined
      );
    } else {
      obj.CrudValue = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllCrudValueResponse>
  ): QueryAllCrudValueResponse {
    const message = {
      ...baseQueryAllCrudValueResponse,
    } as QueryAllCrudValueResponse;
    message.CrudValue = [];
    if (object.CrudValue !== undefined && object.CrudValue !== null) {
      for (const e of object.CrudValue) {
        message.CrudValue.push(CrudValue.fromPartial(e));
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

/** Query defines the gRPC querier service. */
export interface Query {
  /** this line is used by starport scaffolding # 2 */
  CrudValue(
    request: QueryGetCrudValueRequest
  ): Promise<QueryGetCrudValueResponse>;
  CrudValueAll(
    request: QueryAllCrudValueRequest
  ): Promise<QueryAllCrudValueResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  CrudValue(
    request: QueryGetCrudValueRequest
  ): Promise<QueryGetCrudValueResponse> {
    const data = QueryGetCrudValueRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.crud.Query",
      "CrudValue",
      data
    );
    return promise.then((data) =>
      QueryGetCrudValueResponse.decode(new _m0.Reader(data))
    );
  }

  CrudValueAll(
    request: QueryAllCrudValueRequest
  ): Promise<QueryAllCrudValueResponse> {
    const data = QueryAllCrudValueRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.crud.Query",
      "CrudValueAll",
      data
    );
    return promise.then((data) =>
      QueryAllCrudValueResponse.decode(new _m0.Reader(data))
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
