"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryClientImpl = exports.QuerySearchResponse = exports.QueryHasResponse = exports.QueryHasRequest = exports.QueryCountResponse = exports.QueryCountRequest = exports.QueryMyKeysResponse = exports.QueryMyKeysRequest = exports.QueryKeysResponse = exports.QueryKeysRequest = exports.QueryReadResponse = exports.QueryReadRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const Paging_1 = require("../crud/Paging");
exports.protobufPackage = "bluzelle.curium.crud";
const baseQueryReadRequest = { uuid: "", key: "" };
exports.QueryReadRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.uuid !== "") {
            writer.uint32(10).string(message.uuid);
        }
        if (message.key !== "") {
            writer.uint32(18).string(message.key);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryReadRequest };
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
    fromJSON(object) {
        const message = { ...baseQueryReadRequest };
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = String(object.uuid);
        }
        else {
            message.uuid = "";
        }
        if (object.key !== undefined && object.key !== null) {
            message.key = String(object.key);
        }
        else {
            message.key = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.uuid !== undefined && (obj.uuid = message.uuid);
        message.key !== undefined && (obj.key = message.key);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryReadRequest };
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = object.uuid;
        }
        else {
            message.uuid = "";
        }
        if (object.key !== undefined && object.key !== null) {
            message.key = object.key;
        }
        else {
            message.key = "";
        }
        return message;
    },
};
const baseQueryReadResponse = {};
exports.QueryReadResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.value.length !== 0) {
            writer.uint32(10).bytes(message.value);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryReadResponse };
        message.value = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.value = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryReadResponse };
        message.value = new Uint8Array();
        if (object.value !== undefined && object.value !== null) {
            message.value = bytesFromBase64(object.value);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.value !== undefined &&
            (obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryReadResponse };
        if (object.value !== undefined && object.value !== null) {
            message.value = object.value;
        }
        else {
            message.value = new Uint8Array();
        }
        return message;
    },
};
const baseQueryKeysRequest = { uuid: "" };
exports.QueryKeysRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.uuid !== "") {
            writer.uint32(10).string(message.uuid);
        }
        if (message.pagination !== undefined) {
            Paging_1.PagingRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryKeysRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.uuid = reader.string();
                    break;
                case 2:
                    message.pagination = Paging_1.PagingRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryKeysRequest };
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = String(object.uuid);
        }
        else {
            message.uuid = "";
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = Paging_1.PagingRequest.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.uuid !== undefined && (obj.uuid = message.uuid);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? Paging_1.PagingRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryKeysRequest };
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = object.uuid;
        }
        else {
            message.uuid = "";
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = Paging_1.PagingRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryKeysResponse = { keys: "" };
exports.QueryKeysResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.keys) {
            writer.uint32(10).string(v);
        }
        if (message.pagination !== undefined) {
            Paging_1.PagingResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryKeysResponse };
        message.keys = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.keys.push(reader.string());
                    break;
                case 2:
                    message.pagination = Paging_1.PagingResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryKeysResponse };
        message.keys = [];
        if (object.keys !== undefined && object.keys !== null) {
            for (const e of object.keys) {
                message.keys.push(String(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = Paging_1.PagingResponse.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.keys) {
            obj.keys = message.keys.map((e) => e);
        }
        else {
            obj.keys = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? Paging_1.PagingResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryKeysResponse };
        message.keys = [];
        if (object.keys !== undefined && object.keys !== null) {
            for (const e of object.keys) {
                message.keys.push(e);
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = Paging_1.PagingResponse.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryMyKeysRequest = { address: "", uuid: "" };
exports.QueryMyKeysRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.uuid !== "") {
            writer.uint32(18).string(message.uuid);
        }
        if (message.pagination !== undefined) {
            Paging_1.PagingRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryMyKeysRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                case 2:
                    message.uuid = reader.string();
                    break;
                case 3:
                    message.pagination = Paging_1.PagingRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryMyKeysRequest };
        if (object.address !== undefined && object.address !== null) {
            message.address = String(object.address);
        }
        else {
            message.address = "";
        }
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = String(object.uuid);
        }
        else {
            message.uuid = "";
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = Paging_1.PagingRequest.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        message.uuid !== undefined && (obj.uuid = message.uuid);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? Paging_1.PagingRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryMyKeysRequest };
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        else {
            message.address = "";
        }
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = object.uuid;
        }
        else {
            message.uuid = "";
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = Paging_1.PagingRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryMyKeysResponse = { keys: "" };
exports.QueryMyKeysResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.keys) {
            writer.uint32(10).string(v);
        }
        if (message.pagination !== undefined) {
            Paging_1.PagingResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryMyKeysResponse };
        message.keys = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.keys.push(reader.string());
                    break;
                case 2:
                    message.pagination = Paging_1.PagingResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryMyKeysResponse };
        message.keys = [];
        if (object.keys !== undefined && object.keys !== null) {
            for (const e of object.keys) {
                message.keys.push(String(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = Paging_1.PagingResponse.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.keys) {
            obj.keys = message.keys.map((e) => e);
        }
        else {
            obj.keys = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? Paging_1.PagingResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryMyKeysResponse };
        message.keys = [];
        if (object.keys !== undefined && object.keys !== null) {
            for (const e of object.keys) {
                message.keys.push(e);
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = Paging_1.PagingResponse.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryCountRequest = { address: "", uuid: "" };
exports.QueryCountRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.uuid !== "") {
            writer.uint32(18).string(message.uuid);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryCountRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                case 2:
                    message.uuid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryCountRequest };
        if (object.address !== undefined && object.address !== null) {
            message.address = String(object.address);
        }
        else {
            message.address = "";
        }
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = String(object.uuid);
        }
        else {
            message.uuid = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        message.uuid !== undefined && (obj.uuid = message.uuid);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryCountRequest };
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        else {
            message.address = "";
        }
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = object.uuid;
        }
        else {
            message.uuid = "";
        }
        return message;
    },
};
const baseQueryCountResponse = { uuid: "", count: long_1.default.ZERO };
exports.QueryCountResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.uuid !== "") {
            writer.uint32(10).string(message.uuid);
        }
        if (!message.count.isZero()) {
            writer.uint32(16).int64(message.count);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryCountResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.uuid = reader.string();
                    break;
                case 2:
                    message.count = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryCountResponse };
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = String(object.uuid);
        }
        else {
            message.uuid = "";
        }
        if (object.count !== undefined && object.count !== null) {
            message.count = long_1.default.fromString(object.count);
        }
        else {
            message.count = long_1.default.ZERO;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.uuid !== undefined && (obj.uuid = message.uuid);
        message.count !== undefined &&
            (obj.count = (message.count || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryCountResponse };
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = object.uuid;
        }
        else {
            message.uuid = "";
        }
        if (object.count !== undefined && object.count !== null) {
            message.count = object.count;
        }
        else {
            message.count = long_1.default.ZERO;
        }
        return message;
    },
};
const baseQueryHasRequest = { uuid: "", key: "" };
exports.QueryHasRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.uuid !== "") {
            writer.uint32(10).string(message.uuid);
        }
        if (message.key !== "") {
            writer.uint32(18).string(message.key);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryHasRequest };
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
    fromJSON(object) {
        const message = { ...baseQueryHasRequest };
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = String(object.uuid);
        }
        else {
            message.uuid = "";
        }
        if (object.key !== undefined && object.key !== null) {
            message.key = String(object.key);
        }
        else {
            message.key = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.uuid !== undefined && (obj.uuid = message.uuid);
        message.key !== undefined && (obj.key = message.key);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryHasRequest };
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = object.uuid;
        }
        else {
            message.uuid = "";
        }
        if (object.key !== undefined && object.key !== null) {
            message.key = object.key;
        }
        else {
            message.key = "";
        }
        return message;
    },
};
const baseQueryHasResponse = { has: false };
exports.QueryHasResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.has === true) {
            writer.uint32(8).bool(message.has);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryHasResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.has = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryHasResponse };
        if (object.has !== undefined && object.has !== null) {
            message.has = Boolean(object.has);
        }
        else {
            message.has = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.has !== undefined && (obj.has = message.has);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryHasResponse };
        if (object.has !== undefined && object.has !== null) {
            message.has = object.has;
        }
        else {
            message.has = false;
        }
        return message;
    },
};
const baseQuerySearchResponse = { searchString: "" };
exports.QuerySearchResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.searchString !== "") {
            writer.uint32(10).string(message.searchString);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQuerySearchResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.searchString = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQuerySearchResponse };
        if (object.searchString !== undefined && object.searchString !== null) {
            message.searchString = String(object.searchString);
        }
        else {
            message.searchString = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.searchString !== undefined &&
            (obj.searchString = message.searchString);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQuerySearchResponse };
        if (object.searchString !== undefined && object.searchString !== null) {
            message.searchString = object.searchString;
        }
        else {
            message.searchString = "";
        }
        return message;
    },
};
class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    Read(request) {
        const data = exports.QueryReadRequest.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.crud.Query", "Read", data);
        return promise.then((data) => exports.QueryReadResponse.decode(new minimal_1.default.Reader(data)));
    }
    Keys(request) {
        const data = exports.QueryKeysRequest.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.crud.Query", "Keys", data);
        return promise.then((data) => exports.QueryKeysResponse.decode(new minimal_1.default.Reader(data)));
    }
    MyKeys(request) {
        const data = exports.QueryMyKeysRequest.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.crud.Query", "MyKeys", data);
        return promise.then((data) => exports.QueryMyKeysResponse.decode(new minimal_1.default.Reader(data)));
    }
    Count(request) {
        const data = exports.QueryCountRequest.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.crud.Query", "Count", data);
        return promise.then((data) => exports.QueryCountResponse.decode(new minimal_1.default.Reader(data)));
    }
    Has(request) {
        const data = exports.QueryHasRequest.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.crud.Query", "Has", data);
        return promise.then((data) => exports.QueryHasResponse.decode(new minimal_1.default.Reader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
var globalThis = (() => {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
const atob = globalThis.atob ||
    ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64) {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}
const btoa = globalThis.btoa ||
    ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr) {
    const bin = [];
    for (let i = 0; i < arr.byteLength; ++i) {
        bin.push(String.fromCharCode(arr[i]));
    }
    return btoa(bin.join(""));
}
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=query.js.map