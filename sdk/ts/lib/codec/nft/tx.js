"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgClientImpl = exports.MsgDeleteNftResponse = exports.MsgDeleteNft = exports.MsgUpdateNftResponse = exports.MsgUpdateNft = exports.MsgCreateNftResponse = exports.MsgCreateNft = exports.MsgFileReceivedResponse = exports.MsgFileReceived = exports.MsgPublishFileResponse = exports.MsgPublishFile = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "bluzelle.curium.nft";
const baseMsgPublishFile = { creator: "", id: "" };
exports.MsgPublishFile = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== "") {
            writer.uint32(18).string(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgPublishFile };
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
    fromJSON(object) {
        const message = { ...baseMsgPublishFile };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgPublishFile };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        return message;
    },
};
const baseMsgPublishFileResponse = {};
exports.MsgPublishFileResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgPublishFileResponse };
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
    fromJSON(_) {
        const message = { ...baseMsgPublishFileResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgPublishFileResponse };
        return message;
    },
};
const baseMsgFileReceived = { creator: "", id: "", nodeId: "" };
exports.MsgFileReceived = {
    encode(message, writer = minimal_1.default.Writer.create()) {
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
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgFileReceived };
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
    fromJSON(object) {
        const message = { ...baseMsgFileReceived };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        if (object.nodeId !== undefined && object.nodeId !== null) {
            message.nodeId = String(object.nodeId);
        }
        else {
            message.nodeId = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.nodeId !== undefined && (obj.nodeId = message.nodeId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgFileReceived };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        if (object.nodeId !== undefined && object.nodeId !== null) {
            message.nodeId = object.nodeId;
        }
        else {
            message.nodeId = "";
        }
        return message;
    },
};
const baseMsgFileReceivedResponse = {};
exports.MsgFileReceivedResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgFileReceivedResponse,
        };
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
    fromJSON(_) {
        const message = {
            ...baseMsgFileReceivedResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgFileReceivedResponse,
        };
        return message;
    },
};
const baseMsgCreateNft = {
    id: "",
    creator: "",
    mime: "",
    meta: "",
    host: "",
};
exports.MsgCreateNft = {
    encode(message, writer = minimal_1.default.Writer.create()) {
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
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateNft };
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
    fromJSON(object) {
        const message = { ...baseMsgCreateNft };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.mime !== undefined && object.mime !== null) {
            message.mime = String(object.mime);
        }
        else {
            message.mime = "";
        }
        if (object.meta !== undefined && object.meta !== null) {
            message.meta = String(object.meta);
        }
        else {
            message.meta = "";
        }
        if (object.host !== undefined && object.host !== null) {
            message.host = String(object.host);
        }
        else {
            message.host = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.creator !== undefined && (obj.creator = message.creator);
        message.mime !== undefined && (obj.mime = message.mime);
        message.meta !== undefined && (obj.meta = message.meta);
        message.host !== undefined && (obj.host = message.host);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateNft };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.mime !== undefined && object.mime !== null) {
            message.mime = object.mime;
        }
        else {
            message.mime = "";
        }
        if (object.meta !== undefined && object.meta !== null) {
            message.meta = object.meta;
        }
        else {
            message.meta = "";
        }
        if (object.host !== undefined && object.host !== null) {
            message.host = object.host;
        }
        else {
            message.host = "";
        }
        return message;
    },
};
const baseMsgCreateNftResponse = { id: "" };
exports.MsgCreateNftResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateNftResponse };
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
    fromJSON(object) {
        const message = { ...baseMsgCreateNftResponse };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateNftResponse };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        return message;
    },
};
const baseMsgUpdateNft = {
    id: "",
    creator: "",
    mime: "",
    meta: "",
    host: "",
};
exports.MsgUpdateNft = {
    encode(message, writer = minimal_1.default.Writer.create()) {
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
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateNft };
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
    fromJSON(object) {
        const message = { ...baseMsgUpdateNft };
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.mime !== undefined && object.mime !== null) {
            message.mime = String(object.mime);
        }
        else {
            message.mime = "";
        }
        if (object.meta !== undefined && object.meta !== null) {
            message.meta = String(object.meta);
        }
        else {
            message.meta = "";
        }
        if (object.host !== undefined && object.host !== null) {
            message.host = String(object.host);
        }
        else {
            message.host = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.creator !== undefined && (obj.creator = message.creator);
        message.mime !== undefined && (obj.mime = message.mime);
        message.meta !== undefined && (obj.meta = message.meta);
        message.host !== undefined && (obj.host = message.host);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdateNft };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.mime !== undefined && object.mime !== null) {
            message.mime = object.mime;
        }
        else {
            message.mime = "";
        }
        if (object.meta !== undefined && object.meta !== null) {
            message.meta = object.meta;
        }
        else {
            message.meta = "";
        }
        if (object.host !== undefined && object.host !== null) {
            message.host = object.host;
        }
        else {
            message.host = "";
        }
        return message;
    },
};
const baseMsgUpdateNftResponse = {};
exports.MsgUpdateNftResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateNftResponse };
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
    fromJSON(_) {
        const message = { ...baseMsgUpdateNftResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgUpdateNftResponse };
        return message;
    },
};
const baseMsgDeleteNft = { creator: "", id: "" };
exports.MsgDeleteNft = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== "") {
            writer.uint32(18).string(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteNft };
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
    fromJSON(object) {
        const message = { ...baseMsgDeleteNft };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgDeleteNft };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        return message;
    },
};
const baseMsgDeleteNftResponse = {};
exports.MsgDeleteNftResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteNftResponse };
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
    fromJSON(_) {
        const message = { ...baseMsgDeleteNftResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgDeleteNftResponse };
        return message;
    },
};
class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    PublishFile(request) {
        const data = exports.MsgPublishFile.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.nft.Msg", "PublishFile", data);
        return promise.then((data) => exports.MsgPublishFileResponse.decode(new minimal_1.default.Reader(data)));
    }
    FileReceived(request) {
        const data = exports.MsgFileReceived.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.nft.Msg", "FileReceived", data);
        return promise.then((data) => exports.MsgFileReceivedResponse.decode(new minimal_1.default.Reader(data)));
    }
    CreateNft(request) {
        const data = exports.MsgCreateNft.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.nft.Msg", "CreateNft", data);
        return promise.then((data) => exports.MsgCreateNftResponse.decode(new minimal_1.default.Reader(data)));
    }
    UpdateNft(request) {
        const data = exports.MsgUpdateNft.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.nft.Msg", "UpdateNft", data);
        return promise.then((data) => exports.MsgUpdateNftResponse.decode(new minimal_1.default.Reader(data)));
    }
    DeleteNft(request) {
        const data = exports.MsgDeleteNft.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.nft.Msg", "DeleteNft", data);
        return promise.then((data) => exports.MsgDeleteNftResponse.decode(new minimal_1.default.Reader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=tx.js.map