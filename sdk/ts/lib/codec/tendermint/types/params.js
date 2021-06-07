"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashedParams = exports.VersionParams = exports.ValidatorParams = exports.EvidenceParams = exports.BlockParams = exports.ConsensusParams = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const duration_1 = require("../../google/protobuf/duration");
exports.protobufPackage = "tendermint.types";
const baseConsensusParams = {};
exports.ConsensusParams = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.block !== undefined) {
            exports.BlockParams.encode(message.block, writer.uint32(10).fork()).ldelim();
        }
        if (message.evidence !== undefined) {
            exports.EvidenceParams.encode(message.evidence, writer.uint32(18).fork()).ldelim();
        }
        if (message.validator !== undefined) {
            exports.ValidatorParams.encode(message.validator, writer.uint32(26).fork()).ldelim();
        }
        if (message.version !== undefined) {
            exports.VersionParams.encode(message.version, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseConsensusParams };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.block = exports.BlockParams.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.evidence = exports.EvidenceParams.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.validator = exports.ValidatorParams.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.version = exports.VersionParams.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseConsensusParams };
        if (object.block !== undefined && object.block !== null) {
            message.block = exports.BlockParams.fromJSON(object.block);
        }
        else {
            message.block = undefined;
        }
        if (object.evidence !== undefined && object.evidence !== null) {
            message.evidence = exports.EvidenceParams.fromJSON(object.evidence);
        }
        else {
            message.evidence = undefined;
        }
        if (object.validator !== undefined && object.validator !== null) {
            message.validator = exports.ValidatorParams.fromJSON(object.validator);
        }
        else {
            message.validator = undefined;
        }
        if (object.version !== undefined && object.version !== null) {
            message.version = exports.VersionParams.fromJSON(object.version);
        }
        else {
            message.version = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.block !== undefined &&
            (obj.block = message.block
                ? exports.BlockParams.toJSON(message.block)
                : undefined);
        message.evidence !== undefined &&
            (obj.evidence = message.evidence
                ? exports.EvidenceParams.toJSON(message.evidence)
                : undefined);
        message.validator !== undefined &&
            (obj.validator = message.validator
                ? exports.ValidatorParams.toJSON(message.validator)
                : undefined);
        message.version !== undefined &&
            (obj.version = message.version
                ? exports.VersionParams.toJSON(message.version)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseConsensusParams };
        if (object.block !== undefined && object.block !== null) {
            message.block = exports.BlockParams.fromPartial(object.block);
        }
        else {
            message.block = undefined;
        }
        if (object.evidence !== undefined && object.evidence !== null) {
            message.evidence = exports.EvidenceParams.fromPartial(object.evidence);
        }
        else {
            message.evidence = undefined;
        }
        if (object.validator !== undefined && object.validator !== null) {
            message.validator = exports.ValidatorParams.fromPartial(object.validator);
        }
        else {
            message.validator = undefined;
        }
        if (object.version !== undefined && object.version !== null) {
            message.version = exports.VersionParams.fromPartial(object.version);
        }
        else {
            message.version = undefined;
        }
        return message;
    },
};
const baseBlockParams = { maxBytes: long_1.default.ZERO, maxGas: long_1.default.ZERO };
exports.BlockParams = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.maxBytes.isZero()) {
            writer.uint32(8).int64(message.maxBytes);
        }
        if (!message.maxGas.isZero()) {
            writer.uint32(16).int64(message.maxGas);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseBlockParams };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.maxBytes = reader.int64();
                    break;
                case 2:
                    message.maxGas = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseBlockParams };
        if (object.maxBytes !== undefined && object.maxBytes !== null) {
            message.maxBytes = long_1.default.fromString(object.maxBytes);
        }
        else {
            message.maxBytes = long_1.default.ZERO;
        }
        if (object.maxGas !== undefined && object.maxGas !== null) {
            message.maxGas = long_1.default.fromString(object.maxGas);
        }
        else {
            message.maxGas = long_1.default.ZERO;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.maxBytes !== undefined &&
            (obj.maxBytes = (message.maxBytes || long_1.default.ZERO).toString());
        message.maxGas !== undefined &&
            (obj.maxGas = (message.maxGas || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseBlockParams };
        if (object.maxBytes !== undefined && object.maxBytes !== null) {
            message.maxBytes = object.maxBytes;
        }
        else {
            message.maxBytes = long_1.default.ZERO;
        }
        if (object.maxGas !== undefined && object.maxGas !== null) {
            message.maxGas = object.maxGas;
        }
        else {
            message.maxGas = long_1.default.ZERO;
        }
        return message;
    },
};
const baseEvidenceParams = {
    maxAgeNumBlocks: long_1.default.ZERO,
    maxBytes: long_1.default.ZERO,
};
exports.EvidenceParams = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.maxAgeNumBlocks.isZero()) {
            writer.uint32(8).int64(message.maxAgeNumBlocks);
        }
        if (message.maxAgeDuration !== undefined) {
            duration_1.Duration.encode(message.maxAgeDuration, writer.uint32(18).fork()).ldelim();
        }
        if (!message.maxBytes.isZero()) {
            writer.uint32(24).int64(message.maxBytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseEvidenceParams };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.maxAgeNumBlocks = reader.int64();
                    break;
                case 2:
                    message.maxAgeDuration = duration_1.Duration.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.maxBytes = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseEvidenceParams };
        if (object.maxAgeNumBlocks !== undefined &&
            object.maxAgeNumBlocks !== null) {
            message.maxAgeNumBlocks = long_1.default.fromString(object.maxAgeNumBlocks);
        }
        else {
            message.maxAgeNumBlocks = long_1.default.ZERO;
        }
        if (object.maxAgeDuration !== undefined && object.maxAgeDuration !== null) {
            message.maxAgeDuration = duration_1.Duration.fromJSON(object.maxAgeDuration);
        }
        else {
            message.maxAgeDuration = undefined;
        }
        if (object.maxBytes !== undefined && object.maxBytes !== null) {
            message.maxBytes = long_1.default.fromString(object.maxBytes);
        }
        else {
            message.maxBytes = long_1.default.ZERO;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.maxAgeNumBlocks !== undefined &&
            (obj.maxAgeNumBlocks = (message.maxAgeNumBlocks || long_1.default.ZERO).toString());
        message.maxAgeDuration !== undefined &&
            (obj.maxAgeDuration = message.maxAgeDuration
                ? duration_1.Duration.toJSON(message.maxAgeDuration)
                : undefined);
        message.maxBytes !== undefined &&
            (obj.maxBytes = (message.maxBytes || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseEvidenceParams };
        if (object.maxAgeNumBlocks !== undefined &&
            object.maxAgeNumBlocks !== null) {
            message.maxAgeNumBlocks = object.maxAgeNumBlocks;
        }
        else {
            message.maxAgeNumBlocks = long_1.default.ZERO;
        }
        if (object.maxAgeDuration !== undefined && object.maxAgeDuration !== null) {
            message.maxAgeDuration = duration_1.Duration.fromPartial(object.maxAgeDuration);
        }
        else {
            message.maxAgeDuration = undefined;
        }
        if (object.maxBytes !== undefined && object.maxBytes !== null) {
            message.maxBytes = object.maxBytes;
        }
        else {
            message.maxBytes = long_1.default.ZERO;
        }
        return message;
    },
};
const baseValidatorParams = { pubKeyTypes: "" };
exports.ValidatorParams = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.pubKeyTypes) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseValidatorParams };
        message.pubKeyTypes = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pubKeyTypes.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseValidatorParams };
        message.pubKeyTypes = [];
        if (object.pubKeyTypes !== undefined && object.pubKeyTypes !== null) {
            for (const e of object.pubKeyTypes) {
                message.pubKeyTypes.push(String(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.pubKeyTypes) {
            obj.pubKeyTypes = message.pubKeyTypes.map((e) => e);
        }
        else {
            obj.pubKeyTypes = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseValidatorParams };
        message.pubKeyTypes = [];
        if (object.pubKeyTypes !== undefined && object.pubKeyTypes !== null) {
            for (const e of object.pubKeyTypes) {
                message.pubKeyTypes.push(e);
            }
        }
        return message;
    },
};
const baseVersionParams = { appVersion: long_1.default.UZERO };
exports.VersionParams = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.appVersion.isZero()) {
            writer.uint32(8).uint64(message.appVersion);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseVersionParams };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.appVersion = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseVersionParams };
        if (object.appVersion !== undefined && object.appVersion !== null) {
            message.appVersion = long_1.default.fromString(object.appVersion);
        }
        else {
            message.appVersion = long_1.default.UZERO;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.appVersion !== undefined &&
            (obj.appVersion = (message.appVersion || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseVersionParams };
        if (object.appVersion !== undefined && object.appVersion !== null) {
            message.appVersion = object.appVersion;
        }
        else {
            message.appVersion = long_1.default.UZERO;
        }
        return message;
    },
};
const baseHashedParams = {
    blockMaxBytes: long_1.default.ZERO,
    blockMaxGas: long_1.default.ZERO,
};
exports.HashedParams = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.blockMaxBytes.isZero()) {
            writer.uint32(8).int64(message.blockMaxBytes);
        }
        if (!message.blockMaxGas.isZero()) {
            writer.uint32(16).int64(message.blockMaxGas);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseHashedParams };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.blockMaxBytes = reader.int64();
                    break;
                case 2:
                    message.blockMaxGas = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseHashedParams };
        if (object.blockMaxBytes !== undefined && object.blockMaxBytes !== null) {
            message.blockMaxBytes = long_1.default.fromString(object.blockMaxBytes);
        }
        else {
            message.blockMaxBytes = long_1.default.ZERO;
        }
        if (object.blockMaxGas !== undefined && object.blockMaxGas !== null) {
            message.blockMaxGas = long_1.default.fromString(object.blockMaxGas);
        }
        else {
            message.blockMaxGas = long_1.default.ZERO;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.blockMaxBytes !== undefined &&
            (obj.blockMaxBytes = (message.blockMaxBytes || long_1.default.ZERO).toString());
        message.blockMaxGas !== undefined &&
            (obj.blockMaxGas = (message.blockMaxGas || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseHashedParams };
        if (object.blockMaxBytes !== undefined && object.blockMaxBytes !== null) {
            message.blockMaxBytes = object.blockMaxBytes;
        }
        else {
            message.blockMaxBytes = long_1.default.ZERO;
        }
        if (object.blockMaxGas !== undefined && object.blockMaxGas !== null) {
            message.blockMaxGas = object.blockMaxGas;
        }
        else {
            message.blockMaxGas = long_1.default.ZERO;
        }
        return message;
    },
};
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=params.js.map