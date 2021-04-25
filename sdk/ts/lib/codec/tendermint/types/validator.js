"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleValidator = exports.Validator = exports.ValidatorSet = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const keys_1 = require("../../tendermint/crypto/keys");
exports.protobufPackage = "tendermint.types";
const baseValidatorSet = { totalVotingPower: long_1.default.ZERO };
exports.ValidatorSet = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.validators) {
            exports.Validator.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.proposer !== undefined) {
            exports.Validator.encode(message.proposer, writer.uint32(18).fork()).ldelim();
        }
        if (!message.totalVotingPower.isZero()) {
            writer.uint32(24).int64(message.totalVotingPower);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseValidatorSet };
        message.validators = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validators.push(exports.Validator.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.proposer = exports.Validator.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.totalVotingPower = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseValidatorSet };
        message.validators = [];
        if (object.validators !== undefined && object.validators !== null) {
            for (const e of object.validators) {
                message.validators.push(exports.Validator.fromJSON(e));
            }
        }
        if (object.proposer !== undefined && object.proposer !== null) {
            message.proposer = exports.Validator.fromJSON(object.proposer);
        }
        else {
            message.proposer = undefined;
        }
        if (object.totalVotingPower !== undefined &&
            object.totalVotingPower !== null) {
            message.totalVotingPower = long_1.default.fromString(object.totalVotingPower);
        }
        else {
            message.totalVotingPower = long_1.default.ZERO;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.validators) {
            obj.validators = message.validators.map((e) => e ? exports.Validator.toJSON(e) : undefined);
        }
        else {
            obj.validators = [];
        }
        message.proposer !== undefined &&
            (obj.proposer = message.proposer
                ? exports.Validator.toJSON(message.proposer)
                : undefined);
        message.totalVotingPower !== undefined &&
            (obj.totalVotingPower = (message.totalVotingPower || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseValidatorSet };
        message.validators = [];
        if (object.validators !== undefined && object.validators !== null) {
            for (const e of object.validators) {
                message.validators.push(exports.Validator.fromPartial(e));
            }
        }
        if (object.proposer !== undefined && object.proposer !== null) {
            message.proposer = exports.Validator.fromPartial(object.proposer);
        }
        else {
            message.proposer = undefined;
        }
        if (object.totalVotingPower !== undefined &&
            object.totalVotingPower !== null) {
            message.totalVotingPower = object.totalVotingPower;
        }
        else {
            message.totalVotingPower = long_1.default.ZERO;
        }
        return message;
    },
};
const baseValidator = {
    votingPower: long_1.default.ZERO,
    proposerPriority: long_1.default.ZERO,
};
exports.Validator = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.address.length !== 0) {
            writer.uint32(10).bytes(message.address);
        }
        if (message.pubKey !== undefined) {
            keys_1.PublicKey.encode(message.pubKey, writer.uint32(18).fork()).ldelim();
        }
        if (!message.votingPower.isZero()) {
            writer.uint32(24).int64(message.votingPower);
        }
        if (!message.proposerPriority.isZero()) {
            writer.uint32(32).int64(message.proposerPriority);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseValidator };
        message.address = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.bytes();
                    break;
                case 2:
                    message.pubKey = keys_1.PublicKey.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.votingPower = reader.int64();
                    break;
                case 4:
                    message.proposerPriority = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseValidator };
        message.address = new Uint8Array();
        if (object.address !== undefined && object.address !== null) {
            message.address = bytesFromBase64(object.address);
        }
        if (object.pubKey !== undefined && object.pubKey !== null) {
            message.pubKey = keys_1.PublicKey.fromJSON(object.pubKey);
        }
        else {
            message.pubKey = undefined;
        }
        if (object.votingPower !== undefined && object.votingPower !== null) {
            message.votingPower = long_1.default.fromString(object.votingPower);
        }
        else {
            message.votingPower = long_1.default.ZERO;
        }
        if (object.proposerPriority !== undefined &&
            object.proposerPriority !== null) {
            message.proposerPriority = long_1.default.fromString(object.proposerPriority);
        }
        else {
            message.proposerPriority = long_1.default.ZERO;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined &&
            (obj.address = base64FromBytes(message.address !== undefined ? message.address : new Uint8Array()));
        message.pubKey !== undefined &&
            (obj.pubKey = message.pubKey
                ? keys_1.PublicKey.toJSON(message.pubKey)
                : undefined);
        message.votingPower !== undefined &&
            (obj.votingPower = (message.votingPower || long_1.default.ZERO).toString());
        message.proposerPriority !== undefined &&
            (obj.proposerPriority = (message.proposerPriority || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseValidator };
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        else {
            message.address = new Uint8Array();
        }
        if (object.pubKey !== undefined && object.pubKey !== null) {
            message.pubKey = keys_1.PublicKey.fromPartial(object.pubKey);
        }
        else {
            message.pubKey = undefined;
        }
        if (object.votingPower !== undefined && object.votingPower !== null) {
            message.votingPower = object.votingPower;
        }
        else {
            message.votingPower = long_1.default.ZERO;
        }
        if (object.proposerPriority !== undefined &&
            object.proposerPriority !== null) {
            message.proposerPriority = object.proposerPriority;
        }
        else {
            message.proposerPriority = long_1.default.ZERO;
        }
        return message;
    },
};
const baseSimpleValidator = { votingPower: long_1.default.ZERO };
exports.SimpleValidator = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.pubKey !== undefined) {
            keys_1.PublicKey.encode(message.pubKey, writer.uint32(10).fork()).ldelim();
        }
        if (!message.votingPower.isZero()) {
            writer.uint32(16).int64(message.votingPower);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseSimpleValidator };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pubKey = keys_1.PublicKey.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.votingPower = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseSimpleValidator };
        if (object.pubKey !== undefined && object.pubKey !== null) {
            message.pubKey = keys_1.PublicKey.fromJSON(object.pubKey);
        }
        else {
            message.pubKey = undefined;
        }
        if (object.votingPower !== undefined && object.votingPower !== null) {
            message.votingPower = long_1.default.fromString(object.votingPower);
        }
        else {
            message.votingPower = long_1.default.ZERO;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.pubKey !== undefined &&
            (obj.pubKey = message.pubKey
                ? keys_1.PublicKey.toJSON(message.pubKey)
                : undefined);
        message.votingPower !== undefined &&
            (obj.votingPower = (message.votingPower || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseSimpleValidator };
        if (object.pubKey !== undefined && object.pubKey !== null) {
            message.pubKey = keys_1.PublicKey.fromPartial(object.pubKey);
        }
        else {
            message.pubKey = undefined;
        }
        if (object.votingPower !== undefined && object.votingPower !== null) {
            message.votingPower = object.votingPower;
        }
        else {
            message.votingPower = long_1.default.ZERO;
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
//# sourceMappingURL=validator.js.map