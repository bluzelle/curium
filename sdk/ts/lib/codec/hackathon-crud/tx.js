"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgClientImpl = exports.MsgDeleteResponse = exports.MsgDelete = exports.MsgUpdateResponse = exports.MsgUpdate = exports.MsgCreateResponse = exports.MsgCreate = exports.MsgUpsertResponse = exports.MsgUpsert = exports.MsgDeleteAllResponse = exports.MsgDeleteAll = exports.MsgMultiUpdateResponse = exports.MsgMultiUpdate = exports.MsgRenameResponse = exports.MsgRename = exports.MsgRenewLeaseResponse = exports.MsgRenewLease = exports.MsgRenewLeasesAllResponse = exports.MsgRenewLeasesAll = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const lease_1 = require("../hackathon-crud/lease");
const KeyValue_1 = require("../hackathon-crud/KeyValue");
exports.protobufPackage = "bluzelle.curium.crud";
const baseMsgRenewLeasesAll = { creator: "", uuid: "" };
exports.MsgRenewLeasesAll = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.uuid !== "") {
            writer.uint32(18).string(message.uuid);
        }
        if (message.lease !== undefined) {
            lease_1.Lease.encode(message.lease, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRenewLeasesAll };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.uuid = reader.string();
                    break;
                case 3:
                    message.lease = lease_1.Lease.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgRenewLeasesAll };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = String(object.uuid);
        }
        else {
            message.uuid = "";
        }
        if (object.lease !== undefined && object.lease !== null) {
            message.lease = lease_1.Lease.fromJSON(object.lease);
        }
        else {
            message.lease = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.uuid !== undefined && (obj.uuid = message.uuid);
        message.lease !== undefined &&
            (obj.lease = message.lease ? lease_1.Lease.toJSON(message.lease) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgRenewLeasesAll };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = object.uuid;
        }
        else {
            message.uuid = "";
        }
        if (object.lease !== undefined && object.lease !== null) {
            message.lease = lease_1.Lease.fromPartial(object.lease);
        }
        else {
            message.lease = undefined;
        }
        return message;
    },
};
const baseMsgRenewLeasesAllResponse = {};
exports.MsgRenewLeasesAllResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgRenewLeasesAllResponse,
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
            ...baseMsgRenewLeasesAllResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgRenewLeasesAllResponse,
        };
        return message;
    },
};
const baseMsgRenewLease = { creator: "", uuid: "", key: "" };
exports.MsgRenewLease = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.uuid !== "") {
            writer.uint32(18).string(message.uuid);
        }
        if (message.key !== "") {
            writer.uint32(26).string(message.key);
        }
        if (message.lease !== undefined) {
            lease_1.Lease.encode(message.lease, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRenewLease };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.uuid = reader.string();
                    break;
                case 3:
                    message.key = reader.string();
                    break;
                case 4:
                    message.lease = lease_1.Lease.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgRenewLease };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
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
        if (object.lease !== undefined && object.lease !== null) {
            message.lease = lease_1.Lease.fromJSON(object.lease);
        }
        else {
            message.lease = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.uuid !== undefined && (obj.uuid = message.uuid);
        message.key !== undefined && (obj.key = message.key);
        message.lease !== undefined &&
            (obj.lease = message.lease ? lease_1.Lease.toJSON(message.lease) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgRenewLease };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
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
        if (object.lease !== undefined && object.lease !== null) {
            message.lease = lease_1.Lease.fromPartial(object.lease);
        }
        else {
            message.lease = undefined;
        }
        return message;
    },
};
const baseMsgRenewLeaseResponse = {};
exports.MsgRenewLeaseResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRenewLeaseResponse };
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
        const message = { ...baseMsgRenewLeaseResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgRenewLeaseResponse };
        return message;
    },
};
const baseMsgRename = { creator: "", uuid: "", key: "", newKey: "" };
exports.MsgRename = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.uuid !== "") {
            writer.uint32(18).string(message.uuid);
        }
        if (message.key !== "") {
            writer.uint32(26).string(message.key);
        }
        if (message.newKey !== "") {
            writer.uint32(34).string(message.newKey);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRename };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.uuid = reader.string();
                    break;
                case 3:
                    message.key = reader.string();
                    break;
                case 4:
                    message.newKey = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgRename };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
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
        if (object.newKey !== undefined && object.newKey !== null) {
            message.newKey = String(object.newKey);
        }
        else {
            message.newKey = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.uuid !== undefined && (obj.uuid = message.uuid);
        message.key !== undefined && (obj.key = message.key);
        message.newKey !== undefined && (obj.newKey = message.newKey);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgRename };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
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
        if (object.newKey !== undefined && object.newKey !== null) {
            message.newKey = object.newKey;
        }
        else {
            message.newKey = "";
        }
        return message;
    },
};
const baseMsgRenameResponse = {};
exports.MsgRenameResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRenameResponse };
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
        const message = { ...baseMsgRenameResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgRenameResponse };
        return message;
    },
};
const baseMsgMultiUpdate = { creator: "", uuid: "" };
exports.MsgMultiUpdate = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.uuid !== "") {
            writer.uint32(18).string(message.uuid);
        }
        for (const v of message.keyValues) {
            KeyValue_1.KeyValueLease.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMultiUpdate };
        message.keyValues = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.uuid = reader.string();
                    break;
                case 3:
                    message.keyValues.push(KeyValue_1.KeyValueLease.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgMultiUpdate };
        message.keyValues = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = String(object.uuid);
        }
        else {
            message.uuid = "";
        }
        if (object.keyValues !== undefined && object.keyValues !== null) {
            for (const e of object.keyValues) {
                message.keyValues.push(KeyValue_1.KeyValueLease.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.uuid !== undefined && (obj.uuid = message.uuid);
        if (message.keyValues) {
            obj.keyValues = message.keyValues.map((e) => e ? KeyValue_1.KeyValueLease.toJSON(e) : undefined);
        }
        else {
            obj.keyValues = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgMultiUpdate };
        message.keyValues = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = object.uuid;
        }
        else {
            message.uuid = "";
        }
        if (object.keyValues !== undefined && object.keyValues !== null) {
            for (const e of object.keyValues) {
                message.keyValues.push(KeyValue_1.KeyValueLease.fromPartial(e));
            }
        }
        return message;
    },
};
const baseMsgMultiUpdateResponse = {};
exports.MsgMultiUpdateResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMultiUpdateResponse };
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
        const message = { ...baseMsgMultiUpdateResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgMultiUpdateResponse };
        return message;
    },
};
const baseMsgDeleteAll = { creator: "", uuid: "" };
exports.MsgDeleteAll = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.uuid !== "") {
            writer.uint32(18).string(message.uuid);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteAll };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
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
        const message = { ...baseMsgDeleteAll };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
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
        message.creator !== undefined && (obj.creator = message.creator);
        message.uuid !== undefined && (obj.uuid = message.uuid);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgDeleteAll };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
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
const baseMsgDeleteAllResponse = {};
exports.MsgDeleteAllResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteAllResponse };
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
        const message = { ...baseMsgDeleteAllResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgDeleteAllResponse };
        return message;
    },
};
const baseMsgUpsert = { creator: "", uuid: "", key: "" };
exports.MsgUpsert = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.uuid !== "") {
            writer.uint32(18).string(message.uuid);
        }
        if (message.key !== "") {
            writer.uint32(26).string(message.key);
        }
        if (message.value.length !== 0) {
            writer.uint32(34).bytes(message.value);
        }
        if (message.lease !== undefined) {
            lease_1.Lease.encode(message.lease, writer.uint32(42).fork()).ldelim();
        }
        if (message.metadata.length !== 0) {
            writer.uint32(50).bytes(message.metadata);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpsert };
        message.value = new Uint8Array();
        message.metadata = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.uuid = reader.string();
                    break;
                case 3:
                    message.key = reader.string();
                    break;
                case 4:
                    message.value = reader.bytes();
                    break;
                case 5:
                    message.lease = lease_1.Lease.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.metadata = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgUpsert };
        message.value = new Uint8Array();
        message.metadata = new Uint8Array();
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
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
        if (object.value !== undefined && object.value !== null) {
            message.value = bytesFromBase64(object.value);
        }
        if (object.lease !== undefined && object.lease !== null) {
            message.lease = lease_1.Lease.fromJSON(object.lease);
        }
        else {
            message.lease = undefined;
        }
        if (object.metadata !== undefined && object.metadata !== null) {
            message.metadata = bytesFromBase64(object.metadata);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.uuid !== undefined && (obj.uuid = message.uuid);
        message.key !== undefined && (obj.key = message.key);
        message.value !== undefined &&
            (obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()));
        message.lease !== undefined &&
            (obj.lease = message.lease ? lease_1.Lease.toJSON(message.lease) : undefined);
        message.metadata !== undefined &&
            (obj.metadata = base64FromBytes(message.metadata !== undefined ? message.metadata : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpsert };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
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
        if (object.value !== undefined && object.value !== null) {
            message.value = object.value;
        }
        else {
            message.value = new Uint8Array();
        }
        if (object.lease !== undefined && object.lease !== null) {
            message.lease = lease_1.Lease.fromPartial(object.lease);
        }
        else {
            message.lease = undefined;
        }
        if (object.metadata !== undefined && object.metadata !== null) {
            message.metadata = object.metadata;
        }
        else {
            message.metadata = new Uint8Array();
        }
        return message;
    },
};
const baseMsgUpsertResponse = {};
exports.MsgUpsertResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpsertResponse };
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
        const message = { ...baseMsgUpsertResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgUpsertResponse };
        return message;
    },
};
const baseMsgCreate = { creator: "", uuid: "", key: "" };
exports.MsgCreate = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.uuid !== "") {
            writer.uint32(18).string(message.uuid);
        }
        if (message.key !== "") {
            writer.uint32(26).string(message.key);
        }
        if (message.value.length !== 0) {
            writer.uint32(34).bytes(message.value);
        }
        if (message.lease !== undefined) {
            lease_1.Lease.encode(message.lease, writer.uint32(42).fork()).ldelim();
        }
        if (message.metadata.length !== 0) {
            writer.uint32(50).bytes(message.metadata);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreate };
        message.value = new Uint8Array();
        message.metadata = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.uuid = reader.string();
                    break;
                case 3:
                    message.key = reader.string();
                    break;
                case 4:
                    message.value = reader.bytes();
                    break;
                case 5:
                    message.lease = lease_1.Lease.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.metadata = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreate };
        message.value = new Uint8Array();
        message.metadata = new Uint8Array();
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
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
        if (object.value !== undefined && object.value !== null) {
            message.value = bytesFromBase64(object.value);
        }
        if (object.lease !== undefined && object.lease !== null) {
            message.lease = lease_1.Lease.fromJSON(object.lease);
        }
        else {
            message.lease = undefined;
        }
        if (object.metadata !== undefined && object.metadata !== null) {
            message.metadata = bytesFromBase64(object.metadata);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.uuid !== undefined && (obj.uuid = message.uuid);
        message.key !== undefined && (obj.key = message.key);
        message.value !== undefined &&
            (obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()));
        message.lease !== undefined &&
            (obj.lease = message.lease ? lease_1.Lease.toJSON(message.lease) : undefined);
        message.metadata !== undefined &&
            (obj.metadata = base64FromBytes(message.metadata !== undefined ? message.metadata : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreate };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
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
        if (object.value !== undefined && object.value !== null) {
            message.value = object.value;
        }
        else {
            message.value = new Uint8Array();
        }
        if (object.lease !== undefined && object.lease !== null) {
            message.lease = lease_1.Lease.fromPartial(object.lease);
        }
        else {
            message.lease = undefined;
        }
        if (object.metadata !== undefined && object.metadata !== null) {
            message.metadata = object.metadata;
        }
        else {
            message.metadata = new Uint8Array();
        }
        return message;
    },
};
const baseMsgCreateResponse = {};
exports.MsgCreateResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateResponse };
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
        const message = { ...baseMsgCreateResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgCreateResponse };
        return message;
    },
};
const baseMsgUpdate = { creator: "", uuid: "", key: "" };
exports.MsgUpdate = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.uuid !== "") {
            writer.uint32(18).string(message.uuid);
        }
        if (message.key !== "") {
            writer.uint32(26).string(message.key);
        }
        if (message.value.length !== 0) {
            writer.uint32(34).bytes(message.value);
        }
        if (message.lease !== undefined) {
            lease_1.Lease.encode(message.lease, writer.uint32(42).fork()).ldelim();
        }
        if (message.metadata.length !== 0) {
            writer.uint32(50).bytes(message.metadata);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdate };
        message.value = new Uint8Array();
        message.metadata = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.uuid = reader.string();
                    break;
                case 3:
                    message.key = reader.string();
                    break;
                case 4:
                    message.value = reader.bytes();
                    break;
                case 5:
                    message.lease = lease_1.Lease.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.metadata = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgUpdate };
        message.value = new Uint8Array();
        message.metadata = new Uint8Array();
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
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
        if (object.value !== undefined && object.value !== null) {
            message.value = bytesFromBase64(object.value);
        }
        if (object.lease !== undefined && object.lease !== null) {
            message.lease = lease_1.Lease.fromJSON(object.lease);
        }
        else {
            message.lease = undefined;
        }
        if (object.metadata !== undefined && object.metadata !== null) {
            message.metadata = bytesFromBase64(object.metadata);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.uuid !== undefined && (obj.uuid = message.uuid);
        message.key !== undefined && (obj.key = message.key);
        message.value !== undefined &&
            (obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()));
        message.lease !== undefined &&
            (obj.lease = message.lease ? lease_1.Lease.toJSON(message.lease) : undefined);
        message.metadata !== undefined &&
            (obj.metadata = base64FromBytes(message.metadata !== undefined ? message.metadata : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgUpdate };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
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
        if (object.value !== undefined && object.value !== null) {
            message.value = object.value;
        }
        else {
            message.value = new Uint8Array();
        }
        if (object.lease !== undefined && object.lease !== null) {
            message.lease = lease_1.Lease.fromPartial(object.lease);
        }
        else {
            message.lease = undefined;
        }
        if (object.metadata !== undefined && object.metadata !== null) {
            message.metadata = object.metadata;
        }
        else {
            message.metadata = new Uint8Array();
        }
        return message;
    },
};
const baseMsgUpdateResponse = {};
exports.MsgUpdateResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgUpdateResponse };
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
        const message = { ...baseMsgUpdateResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgUpdateResponse };
        return message;
    },
};
const baseMsgDelete = { creator: "", uuid: "", key: "" };
exports.MsgDelete = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
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
        const message = { ...baseMsgDelete };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
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
        const message = { ...baseMsgDelete };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
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
        message.creator !== undefined && (obj.creator = message.creator);
        message.uuid !== undefined && (obj.uuid = message.uuid);
        message.key !== undefined && (obj.key = message.key);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgDelete };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
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
const baseMsgDeleteResponse = {};
exports.MsgDeleteResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgDeleteResponse };
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
        const message = { ...baseMsgDeleteResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgDeleteResponse };
        return message;
    },
};
class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    RenewLeasesAll(request) {
        const data = exports.MsgRenewLeasesAll.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.crud.Msg", "RenewLeasesAll", data);
        return promise.then((data) => exports.MsgRenewLeasesAllResponse.decode(new minimal_1.default.Reader(data)));
    }
    RenewLease(request) {
        const data = exports.MsgRenewLease.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.crud.Msg", "RenewLease", data);
        return promise.then((data) => exports.MsgRenewLeaseResponse.decode(new minimal_1.default.Reader(data)));
    }
    Rename(request) {
        const data = exports.MsgRename.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.crud.Msg", "Rename", data);
        return promise.then((data) => exports.MsgRenameResponse.decode(new minimal_1.default.Reader(data)));
    }
    MultiUpdate(request) {
        const data = exports.MsgMultiUpdate.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.crud.Msg", "MultiUpdate", data);
        return promise.then((data) => exports.MsgMultiUpdateResponse.decode(new minimal_1.default.Reader(data)));
    }
    DeleteAll(request) {
        const data = exports.MsgDeleteAll.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.crud.Msg", "DeleteAll", data);
        return promise.then((data) => exports.MsgDeleteAllResponse.decode(new minimal_1.default.Reader(data)));
    }
    Upsert(request) {
        const data = exports.MsgUpsert.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.crud.Msg", "Upsert", data);
        return promise.then((data) => exports.MsgUpsertResponse.decode(new minimal_1.default.Reader(data)));
    }
    Create(request) {
        const data = exports.MsgCreate.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.crud.Msg", "Create", data);
        return promise.then((data) => exports.MsgCreateResponse.decode(new minimal_1.default.Reader(data)));
    }
    Update(request) {
        const data = exports.MsgUpdate.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.crud.Msg", "Update", data);
        return promise.then((data) => exports.MsgUpdateResponse.decode(new minimal_1.default.Reader(data)));
    }
    Delete(request) {
        const data = exports.MsgDelete.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.crud.Msg", "Delete", data);
        return promise.then((data) => exports.MsgDeleteResponse.decode(new minimal_1.default.Reader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
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
//# sourceMappingURL=tx.js.map