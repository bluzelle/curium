"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consensus = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "tendermint.version";
const baseConsensus = { block: long_1.default.UZERO, app: long_1.default.UZERO };
exports.Consensus = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.block.isZero()) {
            writer.uint32(8).uint64(message.block);
        }
        if (!message.app.isZero()) {
            writer.uint32(16).uint64(message.app);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseConsensus };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.block = reader.uint64();
                    break;
                case 2:
                    message.app = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseConsensus };
        if (object.block !== undefined && object.block !== null) {
            message.block = long_1.default.fromString(object.block);
        }
        else {
            message.block = long_1.default.UZERO;
        }
        if (object.app !== undefined && object.app !== null) {
            message.app = long_1.default.fromString(object.app);
        }
        else {
            message.app = long_1.default.UZERO;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.block !== undefined &&
            (obj.block = (message.block || long_1.default.UZERO).toString());
        message.app !== undefined &&
            (obj.app = (message.app || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseConsensus };
        if (object.block !== undefined && object.block !== null) {
            message.block = object.block;
        }
        else {
            message.block = long_1.default.UZERO;
        }
        if (object.app !== undefined && object.app !== null) {
            message.app = object.app;
        }
        else {
            message.app = long_1.default.UZERO;
        }
        return message;
    },
};
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=types.js.map