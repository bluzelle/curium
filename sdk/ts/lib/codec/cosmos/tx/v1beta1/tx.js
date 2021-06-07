"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fee = exports.ModeInfo_Multi = exports.ModeInfo_Single = exports.ModeInfo = exports.SignerInfo = exports.AuthInfo = exports.TxBody = exports.SignDoc = exports.TxRaw = exports.Tx = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const any_1 = require("../../../google/protobuf/any");
const signing_1 = require("../../../cosmos/tx/signing/v1beta1/signing");
const multisig_1 = require("../../../cosmos/crypto/multisig/v1beta1/multisig");
const coin_1 = require("../../../cosmos/base/v1beta1/coin");
exports.protobufPackage = "cosmos.tx.v1beta1";
const baseTx = {};
exports.Tx = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.body !== undefined) {
            exports.TxBody.encode(message.body, writer.uint32(10).fork()).ldelim();
        }
        if (message.authInfo !== undefined) {
            exports.AuthInfo.encode(message.authInfo, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.signatures) {
            writer.uint32(26).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseTx };
        message.signatures = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.body = exports.TxBody.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.authInfo = exports.AuthInfo.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.signatures.push(reader.bytes());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseTx };
        message.signatures = [];
        if (object.body !== undefined && object.body !== null) {
            message.body = exports.TxBody.fromJSON(object.body);
        }
        else {
            message.body = undefined;
        }
        if (object.authInfo !== undefined && object.authInfo !== null) {
            message.authInfo = exports.AuthInfo.fromJSON(object.authInfo);
        }
        else {
            message.authInfo = undefined;
        }
        if (object.signatures !== undefined && object.signatures !== null) {
            for (const e of object.signatures) {
                message.signatures.push(bytesFromBase64(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.body !== undefined &&
            (obj.body = message.body ? exports.TxBody.toJSON(message.body) : undefined);
        message.authInfo !== undefined &&
            (obj.authInfo = message.authInfo
                ? exports.AuthInfo.toJSON(message.authInfo)
                : undefined);
        if (message.signatures) {
            obj.signatures = message.signatures.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array()));
        }
        else {
            obj.signatures = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseTx };
        message.signatures = [];
        if (object.body !== undefined && object.body !== null) {
            message.body = exports.TxBody.fromPartial(object.body);
        }
        else {
            message.body = undefined;
        }
        if (object.authInfo !== undefined && object.authInfo !== null) {
            message.authInfo = exports.AuthInfo.fromPartial(object.authInfo);
        }
        else {
            message.authInfo = undefined;
        }
        if (object.signatures !== undefined && object.signatures !== null) {
            for (const e of object.signatures) {
                message.signatures.push(e);
            }
        }
        return message;
    },
};
const baseTxRaw = {};
exports.TxRaw = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.bodyBytes.length !== 0) {
            writer.uint32(10).bytes(message.bodyBytes);
        }
        if (message.authInfoBytes.length !== 0) {
            writer.uint32(18).bytes(message.authInfoBytes);
        }
        for (const v of message.signatures) {
            writer.uint32(26).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseTxRaw };
        message.signatures = [];
        message.bodyBytes = new Uint8Array();
        message.authInfoBytes = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bodyBytes = reader.bytes();
                    break;
                case 2:
                    message.authInfoBytes = reader.bytes();
                    break;
                case 3:
                    message.signatures.push(reader.bytes());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseTxRaw };
        message.signatures = [];
        message.bodyBytes = new Uint8Array();
        message.authInfoBytes = new Uint8Array();
        if (object.bodyBytes !== undefined && object.bodyBytes !== null) {
            message.bodyBytes = bytesFromBase64(object.bodyBytes);
        }
        if (object.authInfoBytes !== undefined && object.authInfoBytes !== null) {
            message.authInfoBytes = bytesFromBase64(object.authInfoBytes);
        }
        if (object.signatures !== undefined && object.signatures !== null) {
            for (const e of object.signatures) {
                message.signatures.push(bytesFromBase64(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.bodyBytes !== undefined &&
            (obj.bodyBytes = base64FromBytes(message.bodyBytes !== undefined ? message.bodyBytes : new Uint8Array()));
        message.authInfoBytes !== undefined &&
            (obj.authInfoBytes = base64FromBytes(message.authInfoBytes !== undefined
                ? message.authInfoBytes
                : new Uint8Array()));
        if (message.signatures) {
            obj.signatures = message.signatures.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array()));
        }
        else {
            obj.signatures = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseTxRaw };
        message.signatures = [];
        if (object.bodyBytes !== undefined && object.bodyBytes !== null) {
            message.bodyBytes = object.bodyBytes;
        }
        else {
            message.bodyBytes = new Uint8Array();
        }
        if (object.authInfoBytes !== undefined && object.authInfoBytes !== null) {
            message.authInfoBytes = object.authInfoBytes;
        }
        else {
            message.authInfoBytes = new Uint8Array();
        }
        if (object.signatures !== undefined && object.signatures !== null) {
            for (const e of object.signatures) {
                message.signatures.push(e);
            }
        }
        return message;
    },
};
const baseSignDoc = { chainId: "", accountNumber: long_1.default.UZERO };
exports.SignDoc = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.bodyBytes.length !== 0) {
            writer.uint32(10).bytes(message.bodyBytes);
        }
        if (message.authInfoBytes.length !== 0) {
            writer.uint32(18).bytes(message.authInfoBytes);
        }
        if (message.chainId !== "") {
            writer.uint32(26).string(message.chainId);
        }
        if (!message.accountNumber.isZero()) {
            writer.uint32(32).uint64(message.accountNumber);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseSignDoc };
        message.bodyBytes = new Uint8Array();
        message.authInfoBytes = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bodyBytes = reader.bytes();
                    break;
                case 2:
                    message.authInfoBytes = reader.bytes();
                    break;
                case 3:
                    message.chainId = reader.string();
                    break;
                case 4:
                    message.accountNumber = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseSignDoc };
        message.bodyBytes = new Uint8Array();
        message.authInfoBytes = new Uint8Array();
        if (object.bodyBytes !== undefined && object.bodyBytes !== null) {
            message.bodyBytes = bytesFromBase64(object.bodyBytes);
        }
        if (object.authInfoBytes !== undefined && object.authInfoBytes !== null) {
            message.authInfoBytes = bytesFromBase64(object.authInfoBytes);
        }
        if (object.chainId !== undefined && object.chainId !== null) {
            message.chainId = String(object.chainId);
        }
        else {
            message.chainId = "";
        }
        if (object.accountNumber !== undefined && object.accountNumber !== null) {
            message.accountNumber = long_1.default.fromString(object.accountNumber);
        }
        else {
            message.accountNumber = long_1.default.UZERO;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.bodyBytes !== undefined &&
            (obj.bodyBytes = base64FromBytes(message.bodyBytes !== undefined ? message.bodyBytes : new Uint8Array()));
        message.authInfoBytes !== undefined &&
            (obj.authInfoBytes = base64FromBytes(message.authInfoBytes !== undefined
                ? message.authInfoBytes
                : new Uint8Array()));
        message.chainId !== undefined && (obj.chainId = message.chainId);
        message.accountNumber !== undefined &&
            (obj.accountNumber = (message.accountNumber || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseSignDoc };
        if (object.bodyBytes !== undefined && object.bodyBytes !== null) {
            message.bodyBytes = object.bodyBytes;
        }
        else {
            message.bodyBytes = new Uint8Array();
        }
        if (object.authInfoBytes !== undefined && object.authInfoBytes !== null) {
            message.authInfoBytes = object.authInfoBytes;
        }
        else {
            message.authInfoBytes = new Uint8Array();
        }
        if (object.chainId !== undefined && object.chainId !== null) {
            message.chainId = object.chainId;
        }
        else {
            message.chainId = "";
        }
        if (object.accountNumber !== undefined && object.accountNumber !== null) {
            message.accountNumber = object.accountNumber;
        }
        else {
            message.accountNumber = long_1.default.UZERO;
        }
        return message;
    },
};
const baseTxBody = { memo: "", timeoutHeight: long_1.default.UZERO };
exports.TxBody = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.messages) {
            any_1.Any.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.memo !== "") {
            writer.uint32(18).string(message.memo);
        }
        if (!message.timeoutHeight.isZero()) {
            writer.uint32(24).uint64(message.timeoutHeight);
        }
        for (const v of message.extensionOptions) {
            any_1.Any.encode(v, writer.uint32(8186).fork()).ldelim();
        }
        for (const v of message.nonCriticalExtensionOptions) {
            any_1.Any.encode(v, writer.uint32(16378).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseTxBody };
        message.messages = [];
        message.extensionOptions = [];
        message.nonCriticalExtensionOptions = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.messages.push(any_1.Any.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.memo = reader.string();
                    break;
                case 3:
                    message.timeoutHeight = reader.uint64();
                    break;
                case 1023:
                    message.extensionOptions.push(any_1.Any.decode(reader, reader.uint32()));
                    break;
                case 2047:
                    message.nonCriticalExtensionOptions.push(any_1.Any.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseTxBody };
        message.messages = [];
        message.extensionOptions = [];
        message.nonCriticalExtensionOptions = [];
        if (object.messages !== undefined && object.messages !== null) {
            for (const e of object.messages) {
                message.messages.push(any_1.Any.fromJSON(e));
            }
        }
        if (object.memo !== undefined && object.memo !== null) {
            message.memo = String(object.memo);
        }
        else {
            message.memo = "";
        }
        if (object.timeoutHeight !== undefined && object.timeoutHeight !== null) {
            message.timeoutHeight = long_1.default.fromString(object.timeoutHeight);
        }
        else {
            message.timeoutHeight = long_1.default.UZERO;
        }
        if (object.extensionOptions !== undefined &&
            object.extensionOptions !== null) {
            for (const e of object.extensionOptions) {
                message.extensionOptions.push(any_1.Any.fromJSON(e));
            }
        }
        if (object.nonCriticalExtensionOptions !== undefined &&
            object.nonCriticalExtensionOptions !== null) {
            for (const e of object.nonCriticalExtensionOptions) {
                message.nonCriticalExtensionOptions.push(any_1.Any.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.messages) {
            obj.messages = message.messages.map((e) => e ? any_1.Any.toJSON(e) : undefined);
        }
        else {
            obj.messages = [];
        }
        message.memo !== undefined && (obj.memo = message.memo);
        message.timeoutHeight !== undefined &&
            (obj.timeoutHeight = (message.timeoutHeight || long_1.default.UZERO).toString());
        if (message.extensionOptions) {
            obj.extensionOptions = message.extensionOptions.map((e) => e ? any_1.Any.toJSON(e) : undefined);
        }
        else {
            obj.extensionOptions = [];
        }
        if (message.nonCriticalExtensionOptions) {
            obj.nonCriticalExtensionOptions = message.nonCriticalExtensionOptions.map((e) => (e ? any_1.Any.toJSON(e) : undefined));
        }
        else {
            obj.nonCriticalExtensionOptions = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseTxBody };
        message.messages = [];
        message.extensionOptions = [];
        message.nonCriticalExtensionOptions = [];
        if (object.messages !== undefined && object.messages !== null) {
            for (const e of object.messages) {
                message.messages.push(any_1.Any.fromPartial(e));
            }
        }
        if (object.memo !== undefined && object.memo !== null) {
            message.memo = object.memo;
        }
        else {
            message.memo = "";
        }
        if (object.timeoutHeight !== undefined && object.timeoutHeight !== null) {
            message.timeoutHeight = object.timeoutHeight;
        }
        else {
            message.timeoutHeight = long_1.default.UZERO;
        }
        if (object.extensionOptions !== undefined &&
            object.extensionOptions !== null) {
            for (const e of object.extensionOptions) {
                message.extensionOptions.push(any_1.Any.fromPartial(e));
            }
        }
        if (object.nonCriticalExtensionOptions !== undefined &&
            object.nonCriticalExtensionOptions !== null) {
            for (const e of object.nonCriticalExtensionOptions) {
                message.nonCriticalExtensionOptions.push(any_1.Any.fromPartial(e));
            }
        }
        return message;
    },
};
const baseAuthInfo = {};
exports.AuthInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.signerInfos) {
            exports.SignerInfo.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.fee !== undefined) {
            exports.Fee.encode(message.fee, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseAuthInfo };
        message.signerInfos = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.signerInfos.push(exports.SignerInfo.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.fee = exports.Fee.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseAuthInfo };
        message.signerInfos = [];
        if (object.signerInfos !== undefined && object.signerInfos !== null) {
            for (const e of object.signerInfos) {
                message.signerInfos.push(exports.SignerInfo.fromJSON(e));
            }
        }
        if (object.fee !== undefined && object.fee !== null) {
            message.fee = exports.Fee.fromJSON(object.fee);
        }
        else {
            message.fee = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.signerInfos) {
            obj.signerInfos = message.signerInfos.map((e) => e ? exports.SignerInfo.toJSON(e) : undefined);
        }
        else {
            obj.signerInfos = [];
        }
        message.fee !== undefined &&
            (obj.fee = message.fee ? exports.Fee.toJSON(message.fee) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseAuthInfo };
        message.signerInfos = [];
        if (object.signerInfos !== undefined && object.signerInfos !== null) {
            for (const e of object.signerInfos) {
                message.signerInfos.push(exports.SignerInfo.fromPartial(e));
            }
        }
        if (object.fee !== undefined && object.fee !== null) {
            message.fee = exports.Fee.fromPartial(object.fee);
        }
        else {
            message.fee = undefined;
        }
        return message;
    },
};
const baseSignerInfo = { sequence: long_1.default.UZERO };
exports.SignerInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.publicKey !== undefined) {
            any_1.Any.encode(message.publicKey, writer.uint32(10).fork()).ldelim();
        }
        if (message.modeInfo !== undefined) {
            exports.ModeInfo.encode(message.modeInfo, writer.uint32(18).fork()).ldelim();
        }
        if (!message.sequence.isZero()) {
            writer.uint32(24).uint64(message.sequence);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseSignerInfo };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.publicKey = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.modeInfo = exports.ModeInfo.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.sequence = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseSignerInfo };
        if (object.publicKey !== undefined && object.publicKey !== null) {
            message.publicKey = any_1.Any.fromJSON(object.publicKey);
        }
        else {
            message.publicKey = undefined;
        }
        if (object.modeInfo !== undefined && object.modeInfo !== null) {
            message.modeInfo = exports.ModeInfo.fromJSON(object.modeInfo);
        }
        else {
            message.modeInfo = undefined;
        }
        if (object.sequence !== undefined && object.sequence !== null) {
            message.sequence = long_1.default.fromString(object.sequence);
        }
        else {
            message.sequence = long_1.default.UZERO;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.publicKey !== undefined &&
            (obj.publicKey = message.publicKey
                ? any_1.Any.toJSON(message.publicKey)
                : undefined);
        message.modeInfo !== undefined &&
            (obj.modeInfo = message.modeInfo
                ? exports.ModeInfo.toJSON(message.modeInfo)
                : undefined);
        message.sequence !== undefined &&
            (obj.sequence = (message.sequence || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseSignerInfo };
        if (object.publicKey !== undefined && object.publicKey !== null) {
            message.publicKey = any_1.Any.fromPartial(object.publicKey);
        }
        else {
            message.publicKey = undefined;
        }
        if (object.modeInfo !== undefined && object.modeInfo !== null) {
            message.modeInfo = exports.ModeInfo.fromPartial(object.modeInfo);
        }
        else {
            message.modeInfo = undefined;
        }
        if (object.sequence !== undefined && object.sequence !== null) {
            message.sequence = object.sequence;
        }
        else {
            message.sequence = long_1.default.UZERO;
        }
        return message;
    },
};
const baseModeInfo = {};
exports.ModeInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.single !== undefined) {
            exports.ModeInfo_Single.encode(message.single, writer.uint32(10).fork()).ldelim();
        }
        if (message.multi !== undefined) {
            exports.ModeInfo_Multi.encode(message.multi, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseModeInfo };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.single = exports.ModeInfo_Single.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.multi = exports.ModeInfo_Multi.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseModeInfo };
        if (object.single !== undefined && object.single !== null) {
            message.single = exports.ModeInfo_Single.fromJSON(object.single);
        }
        else {
            message.single = undefined;
        }
        if (object.multi !== undefined && object.multi !== null) {
            message.multi = exports.ModeInfo_Multi.fromJSON(object.multi);
        }
        else {
            message.multi = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.single !== undefined &&
            (obj.single = message.single
                ? exports.ModeInfo_Single.toJSON(message.single)
                : undefined);
        message.multi !== undefined &&
            (obj.multi = message.multi
                ? exports.ModeInfo_Multi.toJSON(message.multi)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseModeInfo };
        if (object.single !== undefined && object.single !== null) {
            message.single = exports.ModeInfo_Single.fromPartial(object.single);
        }
        else {
            message.single = undefined;
        }
        if (object.multi !== undefined && object.multi !== null) {
            message.multi = exports.ModeInfo_Multi.fromPartial(object.multi);
        }
        else {
            message.multi = undefined;
        }
        return message;
    },
};
const baseModeInfo_Single = { mode: 0 };
exports.ModeInfo_Single = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.mode !== 0) {
            writer.uint32(8).int32(message.mode);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseModeInfo_Single };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.mode = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseModeInfo_Single };
        if (object.mode !== undefined && object.mode !== null) {
            message.mode = signing_1.signModeFromJSON(object.mode);
        }
        else {
            message.mode = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.mode !== undefined && (obj.mode = signing_1.signModeToJSON(message.mode));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseModeInfo_Single };
        if (object.mode !== undefined && object.mode !== null) {
            message.mode = object.mode;
        }
        else {
            message.mode = 0;
        }
        return message;
    },
};
const baseModeInfo_Multi = {};
exports.ModeInfo_Multi = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.bitarray !== undefined) {
            multisig_1.CompactBitArray.encode(message.bitarray, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.modeInfos) {
            exports.ModeInfo.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseModeInfo_Multi };
        message.modeInfos = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bitarray = multisig_1.CompactBitArray.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.modeInfos.push(exports.ModeInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseModeInfo_Multi };
        message.modeInfos = [];
        if (object.bitarray !== undefined && object.bitarray !== null) {
            message.bitarray = multisig_1.CompactBitArray.fromJSON(object.bitarray);
        }
        else {
            message.bitarray = undefined;
        }
        if (object.modeInfos !== undefined && object.modeInfos !== null) {
            for (const e of object.modeInfos) {
                message.modeInfos.push(exports.ModeInfo.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.bitarray !== undefined &&
            (obj.bitarray = message.bitarray
                ? multisig_1.CompactBitArray.toJSON(message.bitarray)
                : undefined);
        if (message.modeInfos) {
            obj.modeInfos = message.modeInfos.map((e) => e ? exports.ModeInfo.toJSON(e) : undefined);
        }
        else {
            obj.modeInfos = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseModeInfo_Multi };
        message.modeInfos = [];
        if (object.bitarray !== undefined && object.bitarray !== null) {
            message.bitarray = multisig_1.CompactBitArray.fromPartial(object.bitarray);
        }
        else {
            message.bitarray = undefined;
        }
        if (object.modeInfos !== undefined && object.modeInfos !== null) {
            for (const e of object.modeInfos) {
                message.modeInfos.push(exports.ModeInfo.fromPartial(e));
            }
        }
        return message;
    },
};
const baseFee = { gasLimit: long_1.default.UZERO, payer: "", granter: "" };
exports.Fee = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.amount) {
            coin_1.Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (!message.gasLimit.isZero()) {
            writer.uint32(16).uint64(message.gasLimit);
        }
        if (message.payer !== "") {
            writer.uint32(26).string(message.payer);
        }
        if (message.granter !== "") {
            writer.uint32(34).string(message.granter);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseFee };
        message.amount = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.amount.push(coin_1.Coin.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.gasLimit = reader.uint64();
                    break;
                case 3:
                    message.payer = reader.string();
                    break;
                case 4:
                    message.granter = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseFee };
        message.amount = [];
        if (object.amount !== undefined && object.amount !== null) {
            for (const e of object.amount) {
                message.amount.push(coin_1.Coin.fromJSON(e));
            }
        }
        if (object.gasLimit !== undefined && object.gasLimit !== null) {
            message.gasLimit = long_1.default.fromString(object.gasLimit);
        }
        else {
            message.gasLimit = long_1.default.UZERO;
        }
        if (object.payer !== undefined && object.payer !== null) {
            message.payer = String(object.payer);
        }
        else {
            message.payer = "";
        }
        if (object.granter !== undefined && object.granter !== null) {
            message.granter = String(object.granter);
        }
        else {
            message.granter = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.amount) {
            obj.amount = message.amount.map((e) => (e ? coin_1.Coin.toJSON(e) : undefined));
        }
        else {
            obj.amount = [];
        }
        message.gasLimit !== undefined &&
            (obj.gasLimit = (message.gasLimit || long_1.default.UZERO).toString());
        message.payer !== undefined && (obj.payer = message.payer);
        message.granter !== undefined && (obj.granter = message.granter);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseFee };
        message.amount = [];
        if (object.amount !== undefined && object.amount !== null) {
            for (const e of object.amount) {
                message.amount.push(coin_1.Coin.fromPartial(e));
            }
        }
        if (object.gasLimit !== undefined && object.gasLimit !== null) {
            message.gasLimit = object.gasLimit;
        }
        else {
            message.gasLimit = long_1.default.UZERO;
        }
        if (object.payer !== undefined && object.payer !== null) {
            message.payer = object.payer;
        }
        else {
            message.payer = "";
        }
        if (object.granter !== undefined && object.granter !== null) {
            message.granter = object.granter;
        }
        else {
            message.granter = "";
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