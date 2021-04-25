/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bluzelle.curium.nft";

/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgChunk {
  creator: string;
  id: number;
  chunk: number;
  data: Uint8Array;
}

export interface MsgChunkResponse {}

export interface MsgCreateNft {
  creator: string;
  mime: string;
  meta: string;
}

export interface MsgCreateNftResponse {
  id: number;
}

export interface MsgUpdateNft {
  creator: string;
  id: number;
  mime: string;
  meta: string;
}

export interface MsgUpdateNftResponse {}

export interface MsgDeleteNft {
  creator: string;
  id: number;
}

export interface MsgDeleteNftResponse {}

const baseMsgChunk: object = { creator: "", id: 0, chunk: 0 };

export const MsgChunk = {
  encode(
    message: MsgChunk,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint32(message.id);
    }
    if (message.chunk !== 0) {
      writer.uint32(24).uint32(message.chunk);
    }
    if (message.data.length !== 0) {
      writer.uint32(34).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChunk {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgChunk } as MsgChunk;
    message.data = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.uint32();
          break;
        case 3:
          message.chunk = reader.uint32();
          break;
        case 4:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgChunk {
    const message = { ...baseMsgChunk } as MsgChunk;
    message.data = new Uint8Array();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.chunk !== undefined && object.chunk !== null) {
      message.chunk = Number(object.chunk);
    } else {
      message.chunk = 0;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    return message;
  },

  toJSON(message: MsgChunk): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.chunk !== undefined && (obj.chunk = message.chunk);
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<MsgChunk>): MsgChunk {
    const message = { ...baseMsgChunk } as MsgChunk;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.chunk !== undefined && object.chunk !== null) {
      message.chunk = object.chunk;
    } else {
      message.chunk = 0;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = new Uint8Array();
    }
    return message;
  },
};

const baseMsgChunkResponse: object = {};

export const MsgChunkResponse = {
  encode(
    _: MsgChunkResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChunkResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgChunkResponse } as MsgChunkResponse;
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

  fromJSON(_: any): MsgChunkResponse {
    const message = { ...baseMsgChunkResponse } as MsgChunkResponse;
    return message;
  },

  toJSON(_: MsgChunkResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgChunkResponse>): MsgChunkResponse {
    const message = { ...baseMsgChunkResponse } as MsgChunkResponse;
    return message;
  },
};

const baseMsgCreateNft: object = { creator: "", mime: "", meta: "" };

export const MsgCreateNft = {
  encode(
    message: MsgCreateNft,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.mime !== "") {
      writer.uint32(18).string(message.mime);
    }
    if (message.meta !== "") {
      writer.uint32(26).string(message.meta);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateNft {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateNft } as MsgCreateNft;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.mime = reader.string();
          break;
        case 3:
          message.meta = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateNft {
    const message = { ...baseMsgCreateNft } as MsgCreateNft;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.mime !== undefined && object.mime !== null) {
      message.mime = String(object.mime);
    } else {
      message.mime = "";
    }
    if (object.meta !== undefined && object.meta !== null) {
      message.meta = String(object.meta);
    } else {
      message.meta = "";
    }
    return message;
  },

  toJSON(message: MsgCreateNft): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.mime !== undefined && (obj.mime = message.mime);
    message.meta !== undefined && (obj.meta = message.meta);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateNft>): MsgCreateNft {
    const message = { ...baseMsgCreateNft } as MsgCreateNft;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.mime !== undefined && object.mime !== null) {
      message.mime = object.mime;
    } else {
      message.mime = "";
    }
    if (object.meta !== undefined && object.meta !== null) {
      message.meta = object.meta;
    } else {
      message.meta = "";
    }
    return message;
  },
};

const baseMsgCreateNftResponse: object = { id: 0 };

export const MsgCreateNftResponse = {
  encode(
    message: MsgCreateNftResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateNftResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateNftResponse } as MsgCreateNftResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateNftResponse {
    const message = { ...baseMsgCreateNftResponse } as MsgCreateNftResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgCreateNftResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateNftResponse>): MsgCreateNftResponse {
    const message = { ...baseMsgCreateNftResponse } as MsgCreateNftResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgUpdateNft: object = { creator: "", id: 0, mime: "", meta: "" };

export const MsgUpdateNft = {
  encode(
    message: MsgUpdateNft,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint32(message.id);
    }
    if (message.mime !== "") {
      writer.uint32(26).string(message.mime);
    }
    if (message.meta !== "") {
      writer.uint32(34).string(message.meta);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateNft {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateNft } as MsgUpdateNft;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.uint32();
          break;
        case 3:
          message.mime = reader.string();
          break;
        case 4:
          message.meta = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateNft {
    const message = { ...baseMsgUpdateNft } as MsgUpdateNft;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.mime !== undefined && object.mime !== null) {
      message.mime = String(object.mime);
    } else {
      message.mime = "";
    }
    if (object.meta !== undefined && object.meta !== null) {
      message.meta = String(object.meta);
    } else {
      message.meta = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateNft): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.mime !== undefined && (obj.mime = message.mime);
    message.meta !== undefined && (obj.meta = message.meta);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateNft>): MsgUpdateNft {
    const message = { ...baseMsgUpdateNft } as MsgUpdateNft;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.mime !== undefined && object.mime !== null) {
      message.mime = object.mime;
    } else {
      message.mime = "";
    }
    if (object.meta !== undefined && object.meta !== null) {
      message.meta = object.meta;
    } else {
      message.meta = "";
    }
    return message;
  },
};

const baseMsgUpdateNftResponse: object = {};

export const MsgUpdateNftResponse = {
  encode(
    _: MsgUpdateNftResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateNftResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateNftResponse } as MsgUpdateNftResponse;
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

  fromJSON(_: any): MsgUpdateNftResponse {
    const message = { ...baseMsgUpdateNftResponse } as MsgUpdateNftResponse;
    return message;
  },

  toJSON(_: MsgUpdateNftResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgUpdateNftResponse>): MsgUpdateNftResponse {
    const message = { ...baseMsgUpdateNftResponse } as MsgUpdateNftResponse;
    return message;
  },
};

const baseMsgDeleteNft: object = { creator: "", id: 0 };

export const MsgDeleteNft = {
  encode(
    message: MsgDeleteNft,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteNft {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteNft } as MsgDeleteNft;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteNft {
    const message = { ...baseMsgDeleteNft } as MsgDeleteNft;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgDeleteNft): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteNft>): MsgDeleteNft {
    const message = { ...baseMsgDeleteNft } as MsgDeleteNft;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgDeleteNftResponse: object = {};

export const MsgDeleteNftResponse = {
  encode(
    _: MsgDeleteNftResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgDeleteNftResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteNftResponse } as MsgDeleteNftResponse;
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

  fromJSON(_: any): MsgDeleteNftResponse {
    const message = { ...baseMsgDeleteNftResponse } as MsgDeleteNftResponse;
    return message;
  },

  toJSON(_: MsgDeleteNftResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgDeleteNftResponse>): MsgDeleteNftResponse {
    const message = { ...baseMsgDeleteNftResponse } as MsgDeleteNftResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  Chunk(request: MsgChunk): Promise<MsgChunkResponse>;
  CreateNft(request: MsgCreateNft): Promise<MsgCreateNftResponse>;
  UpdateNft(request: MsgUpdateNft): Promise<MsgUpdateNftResponse>;
  DeleteNft(request: MsgDeleteNft): Promise<MsgDeleteNftResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Chunk(request: MsgChunk): Promise<MsgChunkResponse> {
    const data = MsgChunk.encode(request).finish();
    const promise = this.rpc.request("bluzelle.curium.nft.Msg", "Chunk", data);
    return promise.then((data) =>
      MsgChunkResponse.decode(new _m0.Reader(data))
    );
  }

  CreateNft(request: MsgCreateNft): Promise<MsgCreateNftResponse> {
    const data = MsgCreateNft.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.nft.Msg",
      "CreateNft",
      data
    );
    return promise.then((data) =>
      MsgCreateNftResponse.decode(new _m0.Reader(data))
    );
  }

  UpdateNft(request: MsgUpdateNft): Promise<MsgUpdateNftResponse> {
    const data = MsgUpdateNft.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.nft.Msg",
      "UpdateNft",
      data
    );
    return promise.then((data) =>
      MsgUpdateNftResponse.decode(new _m0.Reader(data))
    );
  }

  DeleteNft(request: MsgDeleteNft): Promise<MsgDeleteNftResponse> {
    const data = MsgDeleteNft.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.nft.Msg",
      "DeleteNft",
      data
    );
    return promise.then((data) =>
      MsgDeleteNftResponse.decode(new _m0.Reader(data))
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
