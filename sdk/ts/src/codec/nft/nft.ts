/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bluzelle.curium.nft";

export interface Nft {
  creator: string;
  id: number;
  mime: string;
  meta: string;
}

const baseNft: object = { creator: "", id: 0, mime: "", meta: "" };

export const Nft = {
  encode(message: Nft, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): Nft {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNft } as Nft;
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

  fromJSON(object: any): Nft {
    const message = { ...baseNft } as Nft;
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

  toJSON(message: Nft): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.mime !== undefined && (obj.mime = message.mime);
    message.meta !== undefined && (obj.meta = message.meta);
    return obj;
  },

  fromPartial(object: DeepPartial<Nft>): Nft {
    const message = { ...baseNft } as Nft;
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
