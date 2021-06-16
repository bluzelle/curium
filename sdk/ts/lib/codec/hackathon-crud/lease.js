"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lease = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "bluzelle.curium.crud";
const baseLease = {
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
    years: 0,
};
exports.Lease = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.seconds !== 0) {
            writer.uint32(8).uint32(message.seconds);
        }
        if (message.minutes !== 0) {
            writer.uint32(16).uint32(message.minutes);
        }
        if (message.hours !== 0) {
            writer.uint32(24).uint32(message.hours);
        }
        if (message.days !== 0) {
            writer.uint32(32).uint32(message.days);
        }
        if (message.years !== 0) {
            writer.uint32(40).uint32(message.years);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseLease };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.seconds = reader.uint32();
                    break;
                case 2:
                    message.minutes = reader.uint32();
                    break;
                case 3:
                    message.hours = reader.uint32();
                    break;
                case 4:
                    message.days = reader.uint32();
                    break;
                case 5:
                    message.years = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseLease };
        if (object.seconds !== undefined && object.seconds !== null) {
            message.seconds = Number(object.seconds);
        }
        else {
            message.seconds = 0;
        }
        if (object.minutes !== undefined && object.minutes !== null) {
            message.minutes = Number(object.minutes);
        }
        else {
            message.minutes = 0;
        }
        if (object.hours !== undefined && object.hours !== null) {
            message.hours = Number(object.hours);
        }
        else {
            message.hours = 0;
        }
        if (object.days !== undefined && object.days !== null) {
            message.days = Number(object.days);
        }
        else {
            message.days = 0;
        }
        if (object.years !== undefined && object.years !== null) {
            message.years = Number(object.years);
        }
        else {
            message.years = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.seconds !== undefined && (obj.seconds = message.seconds);
        message.minutes !== undefined && (obj.minutes = message.minutes);
        message.hours !== undefined && (obj.hours = message.hours);
        message.days !== undefined && (obj.days = message.days);
        message.years !== undefined && (obj.years = message.years);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseLease };
        if (object.seconds !== undefined && object.seconds !== null) {
            message.seconds = object.seconds;
        }
        else {
            message.seconds = 0;
        }
        if (object.minutes !== undefined && object.minutes !== null) {
            message.minutes = object.minutes;
        }
        else {
            message.minutes = 0;
        }
        if (object.hours !== undefined && object.hours !== null) {
            message.hours = object.hours;
        }
        else {
            message.hours = 0;
        }
        if (object.days !== undefined && object.days !== null) {
            message.days = object.days;
        }
        else {
            message.days = 0;
        }
        if (object.years !== undefined && object.years !== null) {
            message.years = object.years;
        }
        else {
            message.years = 0;
        }
        return message;
    },
};
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=lease.js.map