"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagingResponse = exports.PagingRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "bluzelle.curium.crud";
const basePagingRequest = { startKey: "", limit: long_1.default.UZERO };
exports.PagingRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.startKey !== "") {
            writer.uint32(10).string(message.startKey);
        }
        if (!message.limit.isZero()) {
            writer.uint32(16).uint64(message.limit);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...basePagingRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.startKey = reader.string();
                    break;
                case 2:
                    message.limit = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...basePagingRequest };
        if (object.startKey !== undefined && object.startKey !== null) {
            message.startKey = String(object.startKey);
        }
        else {
            message.startKey = "";
        }
        if (object.limit !== undefined && object.limit !== null) {
            message.limit = long_1.default.fromString(object.limit);
        }
        else {
            message.limit = long_1.default.UZERO;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.startKey !== undefined && (obj.startKey = message.startKey);
        message.limit !== undefined &&
            (obj.limit = (message.limit || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = { ...basePagingRequest };
        if (object.startKey !== undefined && object.startKey !== null) {
            message.startKey = object.startKey;
        }
        else {
            message.startKey = "";
        }
        if (object.limit !== undefined && object.limit !== null) {
            message.limit = object.limit;
        }
        else {
            message.limit = long_1.default.UZERO;
        }
        return message;
    },
};
const basePagingResponse = { nextKey: "", total: long_1.default.UZERO };
exports.PagingResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.nextKey !== "") {
            writer.uint32(10).string(message.nextKey);
        }
        if (!message.total.isZero()) {
            writer.uint32(16).uint64(message.total);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...basePagingResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.nextKey = reader.string();
                    break;
                case 2:
                    message.total = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...basePagingResponse };
        if (object.nextKey !== undefined && object.nextKey !== null) {
            message.nextKey = String(object.nextKey);
        }
        else {
            message.nextKey = "";
        }
        if (object.total !== undefined && object.total !== null) {
            message.total = long_1.default.fromString(object.total);
        }
        else {
            message.total = long_1.default.UZERO;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.nextKey !== undefined && (obj.nextKey = message.nextKey);
        message.total !== undefined &&
            (obj.total = (message.total || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = { ...basePagingResponse };
        if (object.nextKey !== undefined && object.nextKey !== null) {
            message.nextKey = object.nextKey;
        }
        else {
            message.nextKey = "";
        }
        if (object.total !== undefined && object.total !== null) {
            message.total = object.total;
        }
        else {
            message.total = long_1.default.UZERO;
        }
        return message;
    },
};
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=Paging.js.map