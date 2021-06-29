"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchTxsResult = exports.TxMsgData = exports.MsgData = exports.SimulationResponse = exports.Result = exports.GasInfo = exports.Attribute = exports.StringEvent = exports.ABCIMessageLog = exports.TxResponse = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const any_1 = require("../../../../google/protobuf/any");
const types_1 = require("../../../../tendermint/abci/types");
exports.protobufPackage = "cosmos.base.abci.v1beta1";
const baseTxResponse = {
    height: long_1.default.ZERO,
    txhash: "",
    codespace: "",
    code: 0,
    data: "",
    rawLog: "",
    info: "",
    gasWanted: long_1.default.ZERO,
    gasUsed: long_1.default.ZERO,
    timestamp: "",
};
exports.TxResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.height.isZero()) {
            writer.uint32(8).int64(message.height);
        }
        if (message.txhash !== "") {
            writer.uint32(18).string(message.txhash);
        }
        if (message.codespace !== "") {
            writer.uint32(26).string(message.codespace);
        }
        if (message.code !== 0) {
            writer.uint32(32).uint32(message.code);
        }
        if (message.data !== "") {
            writer.uint32(42).string(message.data);
        }
        if (message.rawLog !== "") {
            writer.uint32(50).string(message.rawLog);
        }
        for (const v of message.logs) {
            exports.ABCIMessageLog.encode(v, writer.uint32(58).fork()).ldelim();
        }
        if (message.info !== "") {
            writer.uint32(66).string(message.info);
        }
        if (!message.gasWanted.isZero()) {
            writer.uint32(72).int64(message.gasWanted);
        }
        if (!message.gasUsed.isZero()) {
            writer.uint32(80).int64(message.gasUsed);
        }
        if (message.tx !== undefined) {
            any_1.Any.encode(message.tx, writer.uint32(90).fork()).ldelim();
        }
        if (message.timestamp !== "") {
            writer.uint32(98).string(message.timestamp);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseTxResponse };
        message.logs = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.height = reader.int64();
                    break;
                case 2:
                    message.txhash = reader.string();
                    break;
                case 3:
                    message.codespace = reader.string();
                    break;
                case 4:
                    message.code = reader.uint32();
                    break;
                case 5:
                    message.data = reader.string();
                    break;
                case 6:
                    message.rawLog = reader.string();
                    break;
                case 7:
                    message.logs.push(exports.ABCIMessageLog.decode(reader, reader.uint32()));
                    break;
                case 8:
                    message.info = reader.string();
                    break;
                case 9:
                    message.gasWanted = reader.int64();
                    break;
                case 10:
                    message.gasUsed = reader.int64();
                    break;
                case 11:
                    message.tx = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 12:
                    message.timestamp = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseTxResponse };
        message.logs = [];
        if (object.height !== undefined && object.height !== null) {
            message.height = long_1.default.fromString(object.height);
        }
        else {
            message.height = long_1.default.ZERO;
        }
        if (object.txhash !== undefined && object.txhash !== null) {
            message.txhash = String(object.txhash);
        }
        else {
            message.txhash = "";
        }
        if (object.codespace !== undefined && object.codespace !== null) {
            message.codespace = String(object.codespace);
        }
        else {
            message.codespace = "";
        }
        if (object.code !== undefined && object.code !== null) {
            message.code = Number(object.code);
        }
        else {
            message.code = 0;
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = String(object.data);
        }
        else {
            message.data = "";
        }
        if (object.rawLog !== undefined && object.rawLog !== null) {
            message.rawLog = String(object.rawLog);
        }
        else {
            message.rawLog = "";
        }
        if (object.logs !== undefined && object.logs !== null) {
            for (const e of object.logs) {
                message.logs.push(exports.ABCIMessageLog.fromJSON(e));
            }
        }
        if (object.info !== undefined && object.info !== null) {
            message.info = String(object.info);
        }
        else {
            message.info = "";
        }
        if (object.gasWanted !== undefined && object.gasWanted !== null) {
            message.gasWanted = long_1.default.fromString(object.gasWanted);
        }
        else {
            message.gasWanted = long_1.default.ZERO;
        }
        if (object.gasUsed !== undefined && object.gasUsed !== null) {
            message.gasUsed = long_1.default.fromString(object.gasUsed);
        }
        else {
            message.gasUsed = long_1.default.ZERO;
        }
        if (object.tx !== undefined && object.tx !== null) {
            message.tx = any_1.Any.fromJSON(object.tx);
        }
        else {
            message.tx = undefined;
        }
        if (object.timestamp !== undefined && object.timestamp !== null) {
            message.timestamp = String(object.timestamp);
        }
        else {
            message.timestamp = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.height !== undefined &&
            (obj.height = (message.height || long_1.default.ZERO).toString());
        message.txhash !== undefined && (obj.txhash = message.txhash);
        message.codespace !== undefined && (obj.codespace = message.codespace);
        message.code !== undefined && (obj.code = message.code);
        message.data !== undefined && (obj.data = message.data);
        message.rawLog !== undefined && (obj.rawLog = message.rawLog);
        if (message.logs) {
            obj.logs = message.logs.map((e) => e ? exports.ABCIMessageLog.toJSON(e) : undefined);
        }
        else {
            obj.logs = [];
        }
        message.info !== undefined && (obj.info = message.info);
        message.gasWanted !== undefined &&
            (obj.gasWanted = (message.gasWanted || long_1.default.ZERO).toString());
        message.gasUsed !== undefined &&
            (obj.gasUsed = (message.gasUsed || long_1.default.ZERO).toString());
        message.tx !== undefined &&
            (obj.tx = message.tx ? any_1.Any.toJSON(message.tx) : undefined);
        message.timestamp !== undefined && (obj.timestamp = message.timestamp);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseTxResponse };
        message.logs = [];
        if (object.height !== undefined && object.height !== null) {
            message.height = object.height;
        }
        else {
            message.height = long_1.default.ZERO;
        }
        if (object.txhash !== undefined && object.txhash !== null) {
            message.txhash = object.txhash;
        }
        else {
            message.txhash = "";
        }
        if (object.codespace !== undefined && object.codespace !== null) {
            message.codespace = object.codespace;
        }
        else {
            message.codespace = "";
        }
        if (object.code !== undefined && object.code !== null) {
            message.code = object.code;
        }
        else {
            message.code = 0;
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = object.data;
        }
        else {
            message.data = "";
        }
        if (object.rawLog !== undefined && object.rawLog !== null) {
            message.rawLog = object.rawLog;
        }
        else {
            message.rawLog = "";
        }
        if (object.logs !== undefined && object.logs !== null) {
            for (const e of object.logs) {
                message.logs.push(exports.ABCIMessageLog.fromPartial(e));
            }
        }
        if (object.info !== undefined && object.info !== null) {
            message.info = object.info;
        }
        else {
            message.info = "";
        }
        if (object.gasWanted !== undefined && object.gasWanted !== null) {
            message.gasWanted = object.gasWanted;
        }
        else {
            message.gasWanted = long_1.default.ZERO;
        }
        if (object.gasUsed !== undefined && object.gasUsed !== null) {
            message.gasUsed = object.gasUsed;
        }
        else {
            message.gasUsed = long_1.default.ZERO;
        }
        if (object.tx !== undefined && object.tx !== null) {
            message.tx = any_1.Any.fromPartial(object.tx);
        }
        else {
            message.tx = undefined;
        }
        if (object.timestamp !== undefined && object.timestamp !== null) {
            message.timestamp = object.timestamp;
        }
        else {
            message.timestamp = "";
        }
        return message;
    },
};
const baseABCIMessageLog = { msgIndex: 0, log: "" };
exports.ABCIMessageLog = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.msgIndex !== 0) {
            writer.uint32(8).uint32(message.msgIndex);
        }
        if (message.log !== "") {
            writer.uint32(18).string(message.log);
        }
        for (const v of message.events) {
            exports.StringEvent.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseABCIMessageLog };
        message.events = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.msgIndex = reader.uint32();
                    break;
                case 2:
                    message.log = reader.string();
                    break;
                case 3:
                    message.events.push(exports.StringEvent.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseABCIMessageLog };
        message.events = [];
        if (object.msgIndex !== undefined && object.msgIndex !== null) {
            message.msgIndex = Number(object.msgIndex);
        }
        else {
            message.msgIndex = 0;
        }
        if (object.log !== undefined && object.log !== null) {
            message.log = String(object.log);
        }
        else {
            message.log = "";
        }
        if (object.events !== undefined && object.events !== null) {
            for (const e of object.events) {
                message.events.push(exports.StringEvent.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.msgIndex !== undefined && (obj.msgIndex = message.msgIndex);
        message.log !== undefined && (obj.log = message.log);
        if (message.events) {
            obj.events = message.events.map((e) => e ? exports.StringEvent.toJSON(e) : undefined);
        }
        else {
            obj.events = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseABCIMessageLog };
        message.events = [];
        if (object.msgIndex !== undefined && object.msgIndex !== null) {
            message.msgIndex = object.msgIndex;
        }
        else {
            message.msgIndex = 0;
        }
        if (object.log !== undefined && object.log !== null) {
            message.log = object.log;
        }
        else {
            message.log = "";
        }
        if (object.events !== undefined && object.events !== null) {
            for (const e of object.events) {
                message.events.push(exports.StringEvent.fromPartial(e));
            }
        }
        return message;
    },
};
const baseStringEvent = { type: "" };
exports.StringEvent = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.type !== "") {
            writer.uint32(10).string(message.type);
        }
        for (const v of message.attributes) {
            exports.Attribute.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseStringEvent };
        message.attributes = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = reader.string();
                    break;
                case 2:
                    message.attributes.push(exports.Attribute.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseStringEvent };
        message.attributes = [];
        if (object.type !== undefined && object.type !== null) {
            message.type = String(object.type);
        }
        else {
            message.type = "";
        }
        if (object.attributes !== undefined && object.attributes !== null) {
            for (const e of object.attributes) {
                message.attributes.push(exports.Attribute.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.type !== undefined && (obj.type = message.type);
        if (message.attributes) {
            obj.attributes = message.attributes.map((e) => e ? exports.Attribute.toJSON(e) : undefined);
        }
        else {
            obj.attributes = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseStringEvent };
        message.attributes = [];
        if (object.type !== undefined && object.type !== null) {
            message.type = object.type;
        }
        else {
            message.type = "";
        }
        if (object.attributes !== undefined && object.attributes !== null) {
            for (const e of object.attributes) {
                message.attributes.push(exports.Attribute.fromPartial(e));
            }
        }
        return message;
    },
};
const baseAttribute = { key: "", value: "" };
exports.Attribute = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.key !== "") {
            writer.uint32(10).string(message.key);
        }
        if (message.value !== "") {
            writer.uint32(18).string(message.value);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseAttribute };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.string();
                    break;
                case 2:
                    message.value = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseAttribute };
        if (object.key !== undefined && object.key !== null) {
            message.key = String(object.key);
        }
        else {
            message.key = "";
        }
        if (object.value !== undefined && object.value !== null) {
            message.value = String(object.value);
        }
        else {
            message.value = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.key !== undefined && (obj.key = message.key);
        message.value !== undefined && (obj.value = message.value);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseAttribute };
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
            message.value = "";
        }
        return message;
    },
};
const baseGasInfo = { gasWanted: long_1.default.UZERO, gasUsed: long_1.default.UZERO };
exports.GasInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.gasWanted.isZero()) {
            writer.uint32(8).uint64(message.gasWanted);
        }
        if (!message.gasUsed.isZero()) {
            writer.uint32(16).uint64(message.gasUsed);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseGasInfo };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.gasWanted = reader.uint64();
                    break;
                case 2:
                    message.gasUsed = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseGasInfo };
        if (object.gasWanted !== undefined && object.gasWanted !== null) {
            message.gasWanted = long_1.default.fromString(object.gasWanted);
        }
        else {
            message.gasWanted = long_1.default.UZERO;
        }
        if (object.gasUsed !== undefined && object.gasUsed !== null) {
            message.gasUsed = long_1.default.fromString(object.gasUsed);
        }
        else {
            message.gasUsed = long_1.default.UZERO;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.gasWanted !== undefined &&
            (obj.gasWanted = (message.gasWanted || long_1.default.UZERO).toString());
        message.gasUsed !== undefined &&
            (obj.gasUsed = (message.gasUsed || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseGasInfo };
        if (object.gasWanted !== undefined && object.gasWanted !== null) {
            message.gasWanted = object.gasWanted;
        }
        else {
            message.gasWanted = long_1.default.UZERO;
        }
        if (object.gasUsed !== undefined && object.gasUsed !== null) {
            message.gasUsed = object.gasUsed;
        }
        else {
            message.gasUsed = long_1.default.UZERO;
        }
        return message;
    },
};
const baseResult = { log: "" };
exports.Result = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.data.length !== 0) {
            writer.uint32(10).bytes(message.data);
        }
        if (message.log !== "") {
            writer.uint32(18).string(message.log);
        }
        for (const v of message.events) {
            types_1.Event.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseResult };
        message.events = [];
        message.data = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.data = reader.bytes();
                    break;
                case 2:
                    message.log = reader.string();
                    break;
                case 3:
                    message.events.push(types_1.Event.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseResult };
        message.events = [];
        message.data = new Uint8Array();
        if (object.data !== undefined && object.data !== null) {
            message.data = bytesFromBase64(object.data);
        }
        if (object.log !== undefined && object.log !== null) {
            message.log = String(object.log);
        }
        else {
            message.log = "";
        }
        if (object.events !== undefined && object.events !== null) {
            for (const e of object.events) {
                message.events.push(types_1.Event.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        message.log !== undefined && (obj.log = message.log);
        if (message.events) {
            obj.events = message.events.map((e) => (e ? types_1.Event.toJSON(e) : undefined));
        }
        else {
            obj.events = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseResult };
        message.events = [];
        if (object.data !== undefined && object.data !== null) {
            message.data = object.data;
        }
        else {
            message.data = new Uint8Array();
        }
        if (object.log !== undefined && object.log !== null) {
            message.log = object.log;
        }
        else {
            message.log = "";
        }
        if (object.events !== undefined && object.events !== null) {
            for (const e of object.events) {
                message.events.push(types_1.Event.fromPartial(e));
            }
        }
        return message;
    },
};
const baseSimulationResponse = {};
exports.SimulationResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.gasInfo !== undefined) {
            exports.GasInfo.encode(message.gasInfo, writer.uint32(10).fork()).ldelim();
        }
        if (message.result !== undefined) {
            exports.Result.encode(message.result, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseSimulationResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.gasInfo = exports.GasInfo.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.result = exports.Result.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseSimulationResponse };
        if (object.gasInfo !== undefined && object.gasInfo !== null) {
            message.gasInfo = exports.GasInfo.fromJSON(object.gasInfo);
        }
        else {
            message.gasInfo = undefined;
        }
        if (object.result !== undefined && object.result !== null) {
            message.result = exports.Result.fromJSON(object.result);
        }
        else {
            message.result = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.gasInfo !== undefined &&
            (obj.gasInfo = message.gasInfo
                ? exports.GasInfo.toJSON(message.gasInfo)
                : undefined);
        message.result !== undefined &&
            (obj.result = message.result ? exports.Result.toJSON(message.result) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseSimulationResponse };
        if (object.gasInfo !== undefined && object.gasInfo !== null) {
            message.gasInfo = exports.GasInfo.fromPartial(object.gasInfo);
        }
        else {
            message.gasInfo = undefined;
        }
        if (object.result !== undefined && object.result !== null) {
            message.result = exports.Result.fromPartial(object.result);
        }
        else {
            message.result = undefined;
        }
        return message;
    },
};
const baseMsgData = { msgType: "" };
exports.MsgData = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.msgType !== "") {
            writer.uint32(10).string(message.msgType);
        }
        if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgData };
        message.data = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.msgType = reader.string();
                    break;
                case 2:
                    message.data = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgData };
        message.data = new Uint8Array();
        if (object.msgType !== undefined && object.msgType !== null) {
            message.msgType = String(object.msgType);
        }
        else {
            message.msgType = "";
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = bytesFromBase64(object.data);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.msgType !== undefined && (obj.msgType = message.msgType);
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgData };
        if (object.msgType !== undefined && object.msgType !== null) {
            message.msgType = object.msgType;
        }
        else {
            message.msgType = "";
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = object.data;
        }
        else {
            message.data = new Uint8Array();
        }
        return message;
    },
};
const baseTxMsgData = {};
exports.TxMsgData = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.data) {
            exports.MsgData.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseTxMsgData };
        message.data = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.data.push(exports.MsgData.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseTxMsgData };
        message.data = [];
        if (object.data !== undefined && object.data !== null) {
            for (const e of object.data) {
                message.data.push(exports.MsgData.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.data) {
            obj.data = message.data.map((e) => (e ? exports.MsgData.toJSON(e) : undefined));
        }
        else {
            obj.data = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseTxMsgData };
        message.data = [];
        if (object.data !== undefined && object.data !== null) {
            for (const e of object.data) {
                message.data.push(exports.MsgData.fromPartial(e));
            }
        }
        return message;
    },
};
const baseSearchTxsResult = {
    totalCount: long_1.default.UZERO,
    count: long_1.default.UZERO,
    pageNumber: long_1.default.UZERO,
    pageTotal: long_1.default.UZERO,
    limit: long_1.default.UZERO,
};
exports.SearchTxsResult = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.totalCount.isZero()) {
            writer.uint32(8).uint64(message.totalCount);
        }
        if (!message.count.isZero()) {
            writer.uint32(16).uint64(message.count);
        }
        if (!message.pageNumber.isZero()) {
            writer.uint32(24).uint64(message.pageNumber);
        }
        if (!message.pageTotal.isZero()) {
            writer.uint32(32).uint64(message.pageTotal);
        }
        if (!message.limit.isZero()) {
            writer.uint32(40).uint64(message.limit);
        }
        for (const v of message.txs) {
            exports.TxResponse.encode(v, writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseSearchTxsResult };
        message.txs = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.totalCount = reader.uint64();
                    break;
                case 2:
                    message.count = reader.uint64();
                    break;
                case 3:
                    message.pageNumber = reader.uint64();
                    break;
                case 4:
                    message.pageTotal = reader.uint64();
                    break;
                case 5:
                    message.limit = reader.uint64();
                    break;
                case 6:
                    message.txs.push(exports.TxResponse.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseSearchTxsResult };
        message.txs = [];
        if (object.totalCount !== undefined && object.totalCount !== null) {
            message.totalCount = long_1.default.fromString(object.totalCount);
        }
        else {
            message.totalCount = long_1.default.UZERO;
        }
        if (object.count !== undefined && object.count !== null) {
            message.count = long_1.default.fromString(object.count);
        }
        else {
            message.count = long_1.default.UZERO;
        }
        if (object.pageNumber !== undefined && object.pageNumber !== null) {
            message.pageNumber = long_1.default.fromString(object.pageNumber);
        }
        else {
            message.pageNumber = long_1.default.UZERO;
        }
        if (object.pageTotal !== undefined && object.pageTotal !== null) {
            message.pageTotal = long_1.default.fromString(object.pageTotal);
        }
        else {
            message.pageTotal = long_1.default.UZERO;
        }
        if (object.limit !== undefined && object.limit !== null) {
            message.limit = long_1.default.fromString(object.limit);
        }
        else {
            message.limit = long_1.default.UZERO;
        }
        if (object.txs !== undefined && object.txs !== null) {
            for (const e of object.txs) {
                message.txs.push(exports.TxResponse.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.totalCount !== undefined &&
            (obj.totalCount = (message.totalCount || long_1.default.UZERO).toString());
        message.count !== undefined &&
            (obj.count = (message.count || long_1.default.UZERO).toString());
        message.pageNumber !== undefined &&
            (obj.pageNumber = (message.pageNumber || long_1.default.UZERO).toString());
        message.pageTotal !== undefined &&
            (obj.pageTotal = (message.pageTotal || long_1.default.UZERO).toString());
        message.limit !== undefined &&
            (obj.limit = (message.limit || long_1.default.UZERO).toString());
        if (message.txs) {
            obj.txs = message.txs.map((e) => (e ? exports.TxResponse.toJSON(e) : undefined));
        }
        else {
            obj.txs = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseSearchTxsResult };
        message.txs = [];
        if (object.totalCount !== undefined && object.totalCount !== null) {
            message.totalCount = object.totalCount;
        }
        else {
            message.totalCount = long_1.default.UZERO;
        }
        if (object.count !== undefined && object.count !== null) {
            message.count = object.count;
        }
        else {
            message.count = long_1.default.UZERO;
        }
        if (object.pageNumber !== undefined && object.pageNumber !== null) {
            message.pageNumber = object.pageNumber;
        }
        else {
            message.pageNumber = long_1.default.UZERO;
        }
        if (object.pageTotal !== undefined && object.pageTotal !== null) {
            message.pageTotal = object.pageTotal;
        }
        else {
            message.pageTotal = long_1.default.UZERO;
        }
        if (object.limit !== undefined && object.limit !== null) {
            message.limit = object.limit;
        }
        else {
            message.limit = long_1.default.UZERO;
        }
        if (object.txs !== undefined && object.txs !== null) {
            for (const e of object.txs) {
                message.txs.push(exports.TxResponse.fromPartial(e));
            }
        }
        return message;
    },
};
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
//# sourceMappingURL=abci.js.map