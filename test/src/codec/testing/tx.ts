/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bluzelle.curium.testing";

/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgTestSendVote {
  creator: string;
  id: string;
  value: Uint8Array;
  from: string;
  voteType: string;
}

export interface MsgTestSendVoteResponse {}

const baseMsgTestSendVote: object = {
  creator: "",
  id: "",
  from: "",
  voteType: "",
};

export const MsgTestSendVote = {
  encode(
    message: MsgTestSendVote,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.value.length !== 0) {
      writer.uint32(26).bytes(message.value);
    }
    if (message.from !== "") {
      writer.uint32(34).string(message.from);
    }
    if (message.voteType !== "") {
      writer.uint32(42).string(message.voteType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTestSendVote {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgTestSendVote } as MsgTestSendVote;
    message.value = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.value = reader.bytes();
          break;
        case 4:
          message.from = reader.string();
          break;
        case 5:
          message.voteType = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgTestSendVote {
    const message = { ...baseMsgTestSendVote } as MsgTestSendVote;
    message.value = new Uint8Array();
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
    if (object.value !== undefined && object.value !== null) {
      message.value = bytesFromBase64(object.value);
    }
    if (object.from !== undefined && object.from !== null) {
      message.from = String(object.from);
    } else {
      message.from = "";
    }
    if (object.voteType !== undefined && object.voteType !== null) {
      message.voteType = String(object.voteType);
    } else {
      message.voteType = "";
    }
    return message;
  },

  toJSON(message: MsgTestSendVote): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.value !== undefined &&
      (obj.value = base64FromBytes(
        message.value !== undefined ? message.value : new Uint8Array()
      ));
    message.from !== undefined && (obj.from = message.from);
    message.voteType !== undefined && (obj.voteType = message.voteType);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgTestSendVote>): MsgTestSendVote {
    const message = { ...baseMsgTestSendVote } as MsgTestSendVote;
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
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = new Uint8Array();
    }
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    } else {
      message.from = "";
    }
    if (object.voteType !== undefined && object.voteType !== null) {
      message.voteType = object.voteType;
    } else {
      message.voteType = "";
    }
    return message;
  },
};

const baseMsgTestSendVoteResponse: object = {};

export const MsgTestSendVoteResponse = {
  encode(
    _: MsgTestSendVoteResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgTestSendVoteResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgTestSendVoteResponse,
    } as MsgTestSendVoteResponse;
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

  fromJSON(_: any): MsgTestSendVoteResponse {
    const message = {
      ...baseMsgTestSendVoteResponse,
    } as MsgTestSendVoteResponse;
    return message;
  },

  toJSON(_: MsgTestSendVoteResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgTestSendVoteResponse>
  ): MsgTestSendVoteResponse {
    const message = {
      ...baseMsgTestSendVoteResponse,
    } as MsgTestSendVoteResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  TestSendVote(request: MsgTestSendVote): Promise<MsgTestSendVoteResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  TestSendVote(request: MsgTestSendVote): Promise<MsgTestSendVoteResponse> {
    const data = MsgTestSendVote.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.testing.Msg",
      "TestSendVote",
      data
    );
    return promise.then((data) =>
      MsgTestSendVoteResponse.decode(new _m0.Reader(data))
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
