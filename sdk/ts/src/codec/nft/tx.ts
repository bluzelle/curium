/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "bluzelle.curium.nft";

/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgRegisterPeer {
  creator: string;
  id: string;
  address: string;
  port: Long;
}

export interface MsgRegisterPeerResponse {}

export interface MsgPublishFile {
  creator: string;
  id: string;
  hash: string;
  metainfo: Uint8Array;
}

export interface MsgPublishFileResponse {}

export interface MsgFileReceived {
  creator: string;
  id: string;
  nodeId: string;
}

export interface MsgFileReceivedResponse {}

export interface MsgCreateNft {
  id: string;
  hash: string;
  creator: string;
  mime: string;
  meta: string;
}

export interface MsgCreateNftResponse {
  id: string;
}

export interface MsgUpdateNft {
  id: string;
  creator: string;
  mime: string;
  meta: string;
}

export interface MsgUpdateNftResponse {}

export interface MsgDeleteNft {
  creator: string;
  id: string;
}

export interface MsgDeleteNftResponse {}

const baseMsgRegisterPeer: object = {
  creator: "",
  id: "",
  address: "",
  port: Long.UZERO,
};

export const MsgRegisterPeer = {
  encode(
    message: MsgRegisterPeer,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    if (!message.port.isZero()) {
      writer.uint32(32).uint64(message.port);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterPeer {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgRegisterPeer } as MsgRegisterPeer;
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
          message.address = reader.string();
          break;
        case 4:
          message.port = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRegisterPeer {
    const message = { ...baseMsgRegisterPeer } as MsgRegisterPeer;
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
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    if (object.port !== undefined && object.port !== null) {
      message.port = Long.fromString(object.port);
    } else {
      message.port = Long.UZERO;
    }
    return message;
  },

  toJSON(message: MsgRegisterPeer): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.address !== undefined && (obj.address = message.address);
    message.port !== undefined &&
      (obj.port = (message.port || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<MsgRegisterPeer>): MsgRegisterPeer {
    const message = { ...baseMsgRegisterPeer } as MsgRegisterPeer;
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
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    if (object.port !== undefined && object.port !== null) {
      message.port = object.port as Long;
    } else {
      message.port = Long.UZERO;
    }
    return message;
  },
};

const baseMsgRegisterPeerResponse: object = {};

export const MsgRegisterPeerResponse = {
  encode(
    _: MsgRegisterPeerResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgRegisterPeerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgRegisterPeerResponse,
    } as MsgRegisterPeerResponse;
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

  fromJSON(_: any): MsgRegisterPeerResponse {
    const message = {
      ...baseMsgRegisterPeerResponse,
    } as MsgRegisterPeerResponse;
    return message;
  },

  toJSON(_: MsgRegisterPeerResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgRegisterPeerResponse>
  ): MsgRegisterPeerResponse {
    const message = {
      ...baseMsgRegisterPeerResponse,
    } as MsgRegisterPeerResponse;
    return message;
  },
};

const baseMsgPublishFile: object = { creator: "", id: "", hash: "" };

export const MsgPublishFile = {
  encode(
    message: MsgPublishFile,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.hash !== "") {
      writer.uint32(26).string(message.hash);
    }
    if (message.metainfo.length !== 0) {
      writer.uint32(34).bytes(message.metainfo);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPublishFile {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgPublishFile } as MsgPublishFile;
    message.metainfo = new Uint8Array();
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
          message.hash = reader.string();
          break;
        case 4:
          message.metainfo = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgPublishFile {
    const message = { ...baseMsgPublishFile } as MsgPublishFile;
    message.metainfo = new Uint8Array();
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
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = String(object.hash);
    } else {
      message.hash = "";
    }
    if (object.metainfo !== undefined && object.metainfo !== null) {
      message.metainfo = bytesFromBase64(object.metainfo);
    }
    return message;
  },

  toJSON(message: MsgPublishFile): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.hash !== undefined && (obj.hash = message.hash);
    message.metainfo !== undefined &&
      (obj.metainfo = base64FromBytes(
        message.metainfo !== undefined ? message.metainfo : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<MsgPublishFile>): MsgPublishFile {
    const message = { ...baseMsgPublishFile } as MsgPublishFile;
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
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash;
    } else {
      message.hash = "";
    }
    if (object.metainfo !== undefined && object.metainfo !== null) {
      message.metainfo = object.metainfo;
    } else {
      message.metainfo = new Uint8Array();
    }
    return message;
  },
};

const baseMsgPublishFileResponse: object = {};

export const MsgPublishFileResponse = {
  encode(
    _: MsgPublishFileResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgPublishFileResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgPublishFileResponse } as MsgPublishFileResponse;
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

  fromJSON(_: any): MsgPublishFileResponse {
    const message = { ...baseMsgPublishFileResponse } as MsgPublishFileResponse;
    return message;
  },

  toJSON(_: MsgPublishFileResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgPublishFileResponse>): MsgPublishFileResponse {
    const message = { ...baseMsgPublishFileResponse } as MsgPublishFileResponse;
    return message;
  },
};

const baseMsgFileReceived: object = { creator: "", id: "", nodeId: "" };

export const MsgFileReceived = {
  encode(
    message: MsgFileReceived,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.nodeId !== "") {
      writer.uint32(26).string(message.nodeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgFileReceived {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgFileReceived } as MsgFileReceived;
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
          message.nodeId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgFileReceived {
    const message = { ...baseMsgFileReceived } as MsgFileReceived;
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
    if (object.nodeId !== undefined && object.nodeId !== null) {
      message.nodeId = String(object.nodeId);
    } else {
      message.nodeId = "";
    }
    return message;
  },

  toJSON(message: MsgFileReceived): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.nodeId !== undefined && (obj.nodeId = message.nodeId);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgFileReceived>): MsgFileReceived {
    const message = { ...baseMsgFileReceived } as MsgFileReceived;
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
    if (object.nodeId !== undefined && object.nodeId !== null) {
      message.nodeId = object.nodeId;
    } else {
      message.nodeId = "";
    }
    return message;
  },
};

const baseMsgFileReceivedResponse: object = {};

export const MsgFileReceivedResponse = {
  encode(
    _: MsgFileReceivedResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgFileReceivedResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgFileReceivedResponse,
    } as MsgFileReceivedResponse;
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

  fromJSON(_: any): MsgFileReceivedResponse {
    const message = {
      ...baseMsgFileReceivedResponse,
    } as MsgFileReceivedResponse;
    return message;
  },

  toJSON(_: MsgFileReceivedResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgFileReceivedResponse>
  ): MsgFileReceivedResponse {
    const message = {
      ...baseMsgFileReceivedResponse,
    } as MsgFileReceivedResponse;
    return message;
  },
};

const baseMsgCreateNft: object = {
  id: "",
  hash: "",
  creator: "",
  mime: "",
  meta: "",
};

export const MsgCreateNft = {
  encode(
    message: MsgCreateNft,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.hash !== "") {
      writer.uint32(18).string(message.hash);
    }
    if (message.creator !== "") {
      writer.uint32(26).string(message.creator);
    }
    if (message.mime !== "") {
      writer.uint32(34).string(message.mime);
    }
    if (message.meta !== "") {
      writer.uint32(42).string(message.meta);
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
          message.hash = reader.string();
          break;
        case 3:
          message.creator = reader.string();
          break;
        case 4:
          message.mime = reader.string();
          break;
        case 5:
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
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = String(object.hash);
    } else {
      message.hash = "";
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
    return message;
  },

  toJSON(message: MsgCreateNft): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.hash !== undefined && (obj.hash = message.hash);
    message.creator !== undefined && (obj.creator = message.creator);
    message.mime !== undefined && (obj.mime = message.mime);
    message.meta !== undefined && (obj.meta = message.meta);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateNft>): MsgCreateNft {
    const message = { ...baseMsgCreateNft } as MsgCreateNft;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash;
    } else {
      message.hash = "";
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

const baseMsgUpdateNft: object = { id: "", creator: "", mime: "", meta: "" };

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
    return message;
  },

  toJSON(message: MsgUpdateNft): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.creator !== undefined && (obj.creator = message.creator);
    message.mime !== undefined && (obj.mime = message.mime);
    message.meta !== undefined && (obj.meta = message.meta);
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
  RegisterPeer(request: MsgRegisterPeer): Promise<MsgRegisterPeerResponse>;
  PublishFile(request: MsgPublishFile): Promise<MsgPublishFileResponse>;
  FileReceived(request: MsgFileReceived): Promise<MsgFileReceivedResponse>;
  CreateNft(request: MsgCreateNft): Promise<MsgCreateNftResponse>;
  UpdateNft(request: MsgUpdateNft): Promise<MsgUpdateNftResponse>;
  DeleteNft(request: MsgDeleteNft): Promise<MsgDeleteNftResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.RegisterPeer = this.RegisterPeer.bind(this);
    this.PublishFile = this.PublishFile.bind(this);
    this.FileReceived = this.FileReceived.bind(this);
    this.CreateNft = this.CreateNft.bind(this);
    this.UpdateNft = this.UpdateNft.bind(this);
    this.DeleteNft = this.DeleteNft.bind(this);
  }
  RegisterPeer(request: MsgRegisterPeer): Promise<MsgRegisterPeerResponse> {
    const data = MsgRegisterPeer.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.nft.Msg",
      "RegisterPeer",
      data
    );
    return promise.then((data) =>
      MsgRegisterPeerResponse.decode(new _m0.Reader(data))
    );
  }

  PublishFile(request: MsgPublishFile): Promise<MsgPublishFileResponse> {
    const data = MsgPublishFile.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.nft.Msg",
      "PublishFile",
      data
    );
    return promise.then((data) =>
      MsgPublishFileResponse.decode(new _m0.Reader(data))
    );
  }

  FileReceived(request: MsgFileReceived): Promise<MsgFileReceivedResponse> {
    const data = MsgFileReceived.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.nft.Msg",
      "FileReceived",
      data
    );
    return promise.then((data) =>
      MsgFileReceivedResponse.decode(new _m0.Reader(data))
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
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(""));
}

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
