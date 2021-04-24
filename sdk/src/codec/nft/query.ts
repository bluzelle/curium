/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Nft } from "../nft/nft";
import {
  PageRequest,
  PageResponse,
} from "../cosmos/base/query/v1beta1/pagination";

export const protobufPackage = "bluzelle.curium.nft";

/** this line is used by starport scaffolding # 3 */
export interface QueryGetNftRequest {
  id: Long;
}

export interface QueryGetNftResponse {
  Nft?: Nft;
}

export interface QueryAllNftRequest {
  pagination?: PageRequest;
}

export interface QueryAllNftResponse {
  Nft: Nft[];
  pagination?: PageResponse;
}

const baseQueryGetNftRequest: object = { id: Long.UZERO };

export const QueryGetNftRequest = {
  encode(
    message: QueryGetNftRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetNftRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetNftRequest } as QueryGetNftRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetNftRequest {
    const message = { ...baseQueryGetNftRequest } as QueryGetNftRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = Long.fromString(object.id);
    } else {
      message.id = Long.UZERO;
    }
    return message;
  },

  toJSON(message: QueryGetNftRequest): unknown {
    const obj: any = {};
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetNftRequest>): QueryGetNftRequest {
    const message = { ...baseQueryGetNftRequest } as QueryGetNftRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id as Long;
    } else {
      message.id = Long.UZERO;
    }
    return message;
  },
};

const baseQueryGetNftResponse: object = {};

export const QueryGetNftResponse = {
  encode(
    message: QueryGetNftResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Nft !== undefined) {
      Nft.encode(message.Nft, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetNftResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetNftResponse } as QueryGetNftResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Nft = Nft.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetNftResponse {
    const message = { ...baseQueryGetNftResponse } as QueryGetNftResponse;
    if (object.Nft !== undefined && object.Nft !== null) {
      message.Nft = Nft.fromJSON(object.Nft);
    } else {
      message.Nft = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetNftResponse): unknown {
    const obj: any = {};
    message.Nft !== undefined &&
      (obj.Nft = message.Nft ? Nft.toJSON(message.Nft) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetNftResponse>): QueryGetNftResponse {
    const message = { ...baseQueryGetNftResponse } as QueryGetNftResponse;
    if (object.Nft !== undefined && object.Nft !== null) {
      message.Nft = Nft.fromPartial(object.Nft);
    } else {
      message.Nft = undefined;
    }
    return message;
  },
};

const baseQueryAllNftRequest: object = {};

export const QueryAllNftRequest = {
  encode(
    message: QueryAllNftRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllNftRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllNftRequest } as QueryAllNftRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllNftRequest {
    const message = { ...baseQueryAllNftRequest } as QueryAllNftRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllNftRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllNftRequest>): QueryAllNftRequest {
    const message = { ...baseQueryAllNftRequest } as QueryAllNftRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllNftResponse: object = {};

export const QueryAllNftResponse = {
  encode(
    message: QueryAllNftResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.Nft) {
      Nft.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllNftResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllNftResponse } as QueryAllNftResponse;
    message.Nft = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Nft.push(Nft.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllNftResponse {
    const message = { ...baseQueryAllNftResponse } as QueryAllNftResponse;
    message.Nft = [];
    if (object.Nft !== undefined && object.Nft !== null) {
      for (const e of object.Nft) {
        message.Nft.push(Nft.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllNftResponse): unknown {
    const obj: any = {};
    if (message.Nft) {
      obj.Nft = message.Nft.map((e) => (e ? Nft.toJSON(e) : undefined));
    } else {
      obj.Nft = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllNftResponse>): QueryAllNftResponse {
    const message = { ...baseQueryAllNftResponse } as QueryAllNftResponse;
    message.Nft = [];
    if (object.Nft !== undefined && object.Nft !== null) {
      for (const e of object.Nft) {
        message.Nft.push(Nft.fromPartial(e));
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
  Nft(request: QueryGetNftRequest): Promise<QueryGetNftResponse>;
  NftAll(request: QueryAllNftRequest): Promise<QueryAllNftResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Nft(request: QueryGetNftRequest): Promise<QueryGetNftResponse> {
    const data = QueryGetNftRequest.encode(request).finish();
    const promise = this.rpc.request("bluzelle.curium.nft.Query", "Nft", data);
    return promise.then((data) =>
      QueryGetNftResponse.decode(new _m0.Reader(data))
    );
  }

  NftAll(request: QueryAllNftRequest): Promise<QueryAllNftResponse> {
    const data = QueryAllNftRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.nft.Query",
      "NftAll",
      data
    );
    return promise.then((data) =>
      QueryAllNftResponse.decode(new _m0.Reader(data))
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
