"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryClientImpl = exports.QueryGetNShortestLeasesResponse = exports.QueryGetNShortestLeasesRequest = exports.QueryGetLeaseResponse = exports.QueryGetLeaseRequest = exports.QuerySearchResponse = exports.QuerySearchRequest = exports.QueryHasResponse = exports.QueryHasRequest = exports.QueryCountResponse = exports.QueryCountRequest = exports.QueryMyKeysResponse = exports.QueryMyKeysRequest = exports.QueryKeysResponse = exports.QueryKeysRequest = exports.QueryReadResponse = exports.QueryReadRequest = exports.QueryKeyValuesResponse = exports.QueryKeyValuesRequest = exports.QueryFileResponse = exports.QueryFileRequest = exports.QueryOwnerResponse = exports.QueryOwnerRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const Paging_1 = require("../crud/Paging");
const KeyValue_1 = require("../crud/KeyValue");
exports.protobufPackage = "bluzelle.curium.crud";
const baseQueryOwnerRequest = { uuid: "", key: "" };
exports.QueryOwnerRequest = {
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
        const message = { ...baseQueryOwnerRequest };
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
        const message = { ...baseQueryOwnerRequest };
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
        const message = { ...baseQueryOwnerRequest };
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
const baseQueryOwnerResponse = { owner: "" };
exports.QueryOwnerResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryOwnerResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryOwnerResponse };
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = String(object.owner);
        }
        else {
            message.owner = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryOwnerResponse };
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        }
        else {
            message.owner = "";
        }
        return message;
    },
};
const baseQueryFileRequest = { uuid: "", key: "" };
exports.QueryFileRequest = {
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
        const message = { ...baseQueryFileRequest };
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
        const message = { ...baseQueryFileRequest };
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
        const message = { ...baseQueryFileRequest };
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
const baseQueryFileResponse = { uuid: "", key: "" };
exports.QueryFileResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.data.length !== 0) {
            writer.uint32(10).bytes(message.data);
        }
        if (message.uuid !== "") {
            writer.uint32(18).string(message.uuid);
        }
        if (message.key !== "") {
            writer.uint32(26).string(message.key);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryFileResponse };
        message.data = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.data = reader.bytes();
                    break;
                case 2:
                    message.uuid = reader.string();
                    break;
                case 3:
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
        const message = { ...baseQueryFileResponse };
        message.data = new Uint8Array();
        if (object.data !== undefined && object.data !== null) {
            message.data = bytesFromBase64(object.data);
        }
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
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        message.uuid !== undefined && (obj.uuid = message.uuid);
        message.key !== undefined && (obj.key = message.key);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryFileResponse };
        if (object.data !== undefined && object.data !== null) {
            message.data = object.data;
        }
        else {
            message.data = new Uint8Array();
        }
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
const baseQueryKeyValuesRequest = { uuid: "" };
exports.QueryKeyValuesRequest = {
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
        const message = { ...baseQueryKeyValuesRequest };
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
        const message = { ...baseQueryKeyValuesRequest };
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
        const message = { ...baseQueryKeyValuesRequest };
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
const baseQueryKeyValuesResponse = {};
exports.QueryKeyValuesResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.keyValues) {
            KeyValue_1.KeyValue.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            Paging_1.PagingResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryKeyValuesResponse };
        message.keyValues = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.keyValues.push(KeyValue_1.KeyValue.decode(reader, reader.uint32()));
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
        const message = { ...baseQueryKeyValuesResponse };
        message.keyValues = [];
        if (object.keyValues !== undefined && object.keyValues !== null) {
            for (const e of object.keyValues) {
                message.keyValues.push(KeyValue_1.KeyValue.fromJSON(e));
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
        if (message.keyValues) {
            obj.keyValues = message.keyValues.map((e) => e ? KeyValue_1.KeyValue.toJSON(e) : undefined);
        }
        else {
            obj.keyValues = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? Paging_1.PagingResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryKeyValuesResponse };
        message.keyValues = [];
        if (object.keyValues !== undefined && object.keyValues !== null) {
            for (const e of object.keyValues) {
                message.keyValues.push(KeyValue_1.KeyValue.fromPartial(e));
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
const baseQueryCountRequest = { uuid: "" };
exports.QueryCountRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.uuid !== "") {
            writer.uint32(10).string(message.uuid);
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
        message.uuid !== undefined && (obj.uuid = message.uuid);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryCountRequest };
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = object.uuid;
        }
        else {
            message.uuid = "";
        }
        return message;
    },
};
const baseQueryCountResponse = { uuid: "", count: 0 };
exports.QueryCountResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.uuid !== "") {
            writer.uint32(10).string(message.uuid);
        }
        if (message.count !== 0) {
            writer.uint32(16).uint32(message.count);
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
                    message.count = reader.uint32();
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
            message.count = Number(object.count);
        }
        else {
            message.count = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.uuid !== undefined && (obj.uuid = message.uuid);
        message.count !== undefined && (obj.count = message.count);
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
            message.count = 0;
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
const baseQuerySearchRequest = { uuid: "", searchString: "" };
exports.QuerySearchRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.uuid !== "") {
            writer.uint32(10).string(message.uuid);
        }
        if (message.searchString !== "") {
            writer.uint32(18).string(message.searchString);
        }
        if (message.pagination !== undefined) {
            Paging_1.PagingRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQuerySearchRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.uuid = reader.string();
                    break;
                case 2:
                    message.searchString = reader.string();
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
        const message = { ...baseQuerySearchRequest };
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = String(object.uuid);
        }
        else {
            message.uuid = "";
        }
        if (object.searchString !== undefined && object.searchString !== null) {
            message.searchString = String(object.searchString);
        }
        else {
            message.searchString = "";
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
        message.searchString !== undefined &&
            (obj.searchString = message.searchString);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? Paging_1.PagingRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQuerySearchRequest };
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = object.uuid;
        }
        else {
            message.uuid = "";
        }
        if (object.searchString !== undefined && object.searchString !== null) {
            message.searchString = object.searchString;
        }
        else {
            message.searchString = "";
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
const baseQuerySearchResponse = {};
exports.QuerySearchResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.keyValues) {
            KeyValue_1.KeyValue.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            Paging_1.PagingResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQuerySearchResponse };
        message.keyValues = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.keyValues.push(KeyValue_1.KeyValue.decode(reader, reader.uint32()));
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
        const message = { ...baseQuerySearchResponse };
        message.keyValues = [];
        if (object.keyValues !== undefined && object.keyValues !== null) {
            for (const e of object.keyValues) {
                message.keyValues.push(KeyValue_1.KeyValue.fromJSON(e));
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
        if (message.keyValues) {
            obj.keyValues = message.keyValues.map((e) => e ? KeyValue_1.KeyValue.toJSON(e) : undefined);
        }
        else {
            obj.keyValues = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? Paging_1.PagingResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQuerySearchResponse };
        message.keyValues = [];
        if (object.keyValues !== undefined && object.keyValues !== null) {
            for (const e of object.keyValues) {
                message.keyValues.push(KeyValue_1.KeyValue.fromPartial(e));
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
const baseQueryGetLeaseRequest = { uuid: "", key: "" };
exports.QueryGetLeaseRequest = {
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
        const message = { ...baseQueryGetLeaseRequest };
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
        const message = { ...baseQueryGetLeaseRequest };
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
        const message = { ...baseQueryGetLeaseRequest };
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
const baseQueryGetLeaseResponse = { uuid: "", key: "", seconds: 0 };
exports.QueryGetLeaseResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.uuid !== "") {
            writer.uint32(10).string(message.uuid);
        }
        if (message.key !== "") {
            writer.uint32(18).string(message.key);
        }
        if (message.seconds !== 0) {
            writer.uint32(24).uint32(message.seconds);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetLeaseResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.uuid = reader.string();
                    break;
                case 2:
                    message.key = reader.string();
                    break;
                case 3:
                    message.seconds = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetLeaseResponse };
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
        if (object.seconds !== undefined && object.seconds !== null) {
            message.seconds = Number(object.seconds);
        }
        else {
            message.seconds = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.uuid !== undefined && (obj.uuid = message.uuid);
        message.key !== undefined && (obj.key = message.key);
        message.seconds !== undefined && (obj.seconds = message.seconds);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetLeaseResponse };
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
        if (object.seconds !== undefined && object.seconds !== null) {
            message.seconds = object.seconds;
        }
        else {
            message.seconds = 0;
        }
        return message;
    },
};
const baseQueryGetNShortestLeasesRequest = { uuid: "", num: 0 };
exports.QueryGetNShortestLeasesRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.uuid !== "") {
            writer.uint32(10).string(message.uuid);
        }
        if (message.num !== 0) {
            writer.uint32(16).uint32(message.num);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetNShortestLeasesRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.uuid = reader.string();
                    break;
                case 2:
                    message.num = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = {
            ...baseQueryGetNShortestLeasesRequest,
        };
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = String(object.uuid);
        }
        else {
            message.uuid = "";
        }
        if (object.num !== undefined && object.num !== null) {
            message.num = Number(object.num);
        }
        else {
            message.num = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.uuid !== undefined && (obj.uuid = message.uuid);
        message.num !== undefined && (obj.num = message.num);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetNShortestLeasesRequest,
        };
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = object.uuid;
        }
        else {
            message.uuid = "";
        }
        if (object.num !== undefined && object.num !== null) {
            message.num = object.num;
        }
        else {
            message.num = 0;
        }
        return message;
    },
};
const baseQueryGetNShortestLeasesResponse = { uuid: "" };
exports.QueryGetNShortestLeasesResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.uuid !== "") {
            writer.uint32(10).string(message.uuid);
        }
        for (const v of message.keyLeases) {
            KeyValue_1.KeyLease.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetNShortestLeasesResponse,
        };
        message.keyLeases = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.uuid = reader.string();
                    break;
                case 2:
                    message.keyLeases.push(KeyValue_1.KeyLease.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = {
            ...baseQueryGetNShortestLeasesResponse,
        };
        message.keyLeases = [];
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = String(object.uuid);
        }
        else {
            message.uuid = "";
        }
        if (object.keyLeases !== undefined && object.keyLeases !== null) {
            for (const e of object.keyLeases) {
                message.keyLeases.push(KeyValue_1.KeyLease.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.uuid !== undefined && (obj.uuid = message.uuid);
        if (message.keyLeases) {
            obj.keyLeases = message.keyLeases.map((e) => e ? KeyValue_1.KeyLease.toJSON(e) : undefined);
        }
        else {
            obj.keyLeases = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetNShortestLeasesResponse,
        };
        message.keyLeases = [];
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = object.uuid;
        }
        else {
            message.uuid = "";
        }
        if (object.keyLeases !== undefined && object.keyLeases !== null) {
            for (const e of object.keyLeases) {
                message.keyLeases.push(KeyValue_1.KeyLease.fromPartial(e));
            }
        }
        return message;
    },
};
class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.Read = this.Read.bind(this);
        this.Keys = this.Keys.bind(this);
        this.MyKeys = this.MyKeys.bind(this);
        this.Count = this.Count.bind(this);
        this.Has = this.Has.bind(this);
        this.Search = this.Search.bind(this);
        this.GetNShortestLeases = this.GetNShortestLeases.bind(this);
        this.GetLease = this.GetLease.bind(this);
        this.KeyValues = this.KeyValues.bind(this);
        this.File = this.File.bind(this);
        this.Owner = this.Owner.bind(this);
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
    Search(request) {
        const data = exports.QuerySearchRequest.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.crud.Query", "Search", data);
        return promise.then((data) => exports.QuerySearchResponse.decode(new minimal_1.default.Reader(data)));
    }
    GetNShortestLeases(request) {
        const data = exports.QueryGetNShortestLeasesRequest.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.crud.Query", "GetNShortestLeases", data);
        return promise.then((data) => exports.QueryGetNShortestLeasesResponse.decode(new minimal_1.default.Reader(data)));
    }
    GetLease(request) {
        const data = exports.QueryGetLeaseRequest.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.crud.Query", "GetLease", data);
        return promise.then((data) => exports.QueryGetLeaseResponse.decode(new minimal_1.default.Reader(data)));
    }
    KeyValues(request) {
        const data = exports.QueryKeyValuesRequest.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.crud.Query", "KeyValues", data);
        return promise.then((data) => exports.QueryKeyValuesResponse.decode(new minimal_1.default.Reader(data)));
    }
    File(request) {
        const data = exports.QueryFileRequest.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.crud.Query", "File", data);
        return promise.then((data) => exports.QueryFileResponse.decode(new minimal_1.default.Reader(data)));
    }
    Owner(request) {
        const data = exports.QueryOwnerRequest.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.crud.Query", "Owner", data);
        return promise.then((data) => exports.QueryOwnerResponse.decode(new minimal_1.default.Reader(data)));
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
    for (const byte of arr) {
        bin.push(String.fromCharCode(byte));
    }
    return btoa(bin.join(""));
}
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=query.js.map