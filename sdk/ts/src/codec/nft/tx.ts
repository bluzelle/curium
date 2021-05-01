/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bluzelle.curium.nft";

/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgCreateNft {
  id: string;
  creator: string;
  mime: string;
  meta: string;
  host: string;
}

export interface MsgCreateNftResponse {
  id: string;
}

export interface MsgUpdateNft {
  id: string;
  creator: string;
  mime: string;
  meta: string;
  host: string;
}

export interface MsgUpdateNftResponse {}

export interface MsgDeleteNft {
  creator: string;
  id: string;
}

export interface MsgDeleteNftResponse {}

const baseMsgCreateNft: object = {
  id: "",
  creator: "",
  mime: "",
  meta: "",
  host: "",
};

export const MsgCreateNft = {
  encode(
    message: MsgCreateNft,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.mime !== "") {
      writer.uint32(26).string(message.mime);
    }
    if (message.meta !== "") {
      writer.uint32(34).string(message.meta);
    }
    if (message.host !== "") {
      writer.uint32(42).string(message.host);
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
          message.id = reader.string();
          break;
        case 2:
          message.creator = reader.string();
          break;
        case 3:
          message.mime = reader.string();
          break;
        case 4:
          message.meta = reader.string();
          break;
        case 5:
          message.host = reader.string();
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
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
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
    if (object.host !== undefined && object.host !== null) {
      message.host = String(object.host);
    } else {
      message.host = "";
    }
    return message;
  },

  toJSON(message: MsgCreateNft): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.creator !== undefined && (obj.creator = message.creator);
    message.mime !== undefined && (obj.mime = message.mime);
    message.meta !== undefined && (obj.meta = message.meta);
    message.host !== undefined && (obj.host = message.host);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateNft>): MsgCreateNft {
    const message = { ...baseMsgCreateNft } as MsgCreateNft;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
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
    if (object.host !== undefined && object.host !== null) {
      message.host = object.host;
    } else {
      message.host = "";
    }
    return message;
  },
};

const baseMsgCreateNftResponse: object = { id: "" };

export const MsgCreateNftResponse = {
  encode(
    message: MsgCreateNftResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
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
          message.id = reader.string();
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
      message.id = String(object.id);
    } else {
      message.id = "";
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
      message.id = "";
    }
    return message;
  },
};

const baseMsgUpdateNft: object = {
  id: "",
  creator: "",
  mime: "",
  meta: "",
  host: "",
};

export const MsgUpdateNft = {
  encode(
    message: MsgUpdateNft,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.mime !== "") {
      writer.uint32(26).string(message.mime);
    }
    if (message.meta !== "") {
      writer.uint32(34).string(message.meta);
    }
    if (message.host !== "") {
      writer.uint32(42).string(message.host);
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
          message.id = reader.string();
          break;
        case 2:
          message.creator = reader.string();
          break;
        case 3:
          message.mime = reader.string();
          break;
        case 4:
          message.meta = reader.string();
          break;
        case 5:
          message.host = reader.string();
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
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
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
    if (object.host !== undefined && object.host !== null) {
      message.host = String(object.host);
    } else {
      message.host = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateNft): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.creator !== undefined && (obj.creator = message.creator);
    message.mime !== undefined && (obj.mime = message.mime);
    message.meta !== undefined && (obj.meta = message.meta);
    message.host !== undefined && (obj.host = message.host);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateNft>): MsgUpdateNft {
    const message = { ...baseMsgUpdateNft } as MsgUpdateNft;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
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
    if (object.host !== undefined && object.host !== null) {
      message.host = object.host;
    } else {
      message.host = "";
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

const baseMsgDeleteNft: object = { creator: "", id: "" };

export const MsgDeleteNft = {
  encode(
    message: MsgDeleteNft,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
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
          message.id = reader.string();
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
      message.id = String(object.id);
    } else {
      message.id = "";
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
      message.id = "";
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
  CreateNft(request: MsgCreateNft): Promise<MsgCreateNftResponse>;
  UpdateNft(request: MsgUpdateNft): Promise<MsgUpdateNftResponse>;
  DeleteNft(request: MsgDeleteNft): Promise<MsgDeleteNftResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
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
