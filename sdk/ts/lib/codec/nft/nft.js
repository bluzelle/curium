"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nft = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "bluzelle.curium.nft";
const baseNft = { creator: "", id: long_1.default.UZERO, mime: "", meta: "" };
exports.Nft = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (!message.id.isZero()) {
            writer.uint32(16).uint64(message.id);
        }
        if (message.mime !== "") {
            writer.uint32(26).string(message.mime);
        }
        if (message.meta !== "") {
            writer.uint32(34).string(message.meta);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.default.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseNft };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.id = reader.uint64();
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
    fromJSON(object) {
        const message = { ...baseNft };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.id !== undefined && object.id !== null) {
            message.id = long_1.default.fromString(object.id);
        }
        else {
            message.id = long_1.default.UZERO;
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
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined &&
            (obj.id = (message.id || long_1.default.UZERO).toString());
        message.mime !== undefined && (obj.mime = message.mime);
        message.meta !== undefined && (obj.meta = message.meta);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseNft };
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
            message.id = long_1.default.UZERO;
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
        return message;
    },
};
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=nft.js.map