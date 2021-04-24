"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryClientImpl = exports.QueryAllCrudValueResponse = exports.QueryAllCrudValueRequest = exports.QueryGetCrudValueResponse = exports.QueryGetCrudValueRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const CrudValue_1 = require("../crud/CrudValue");
const pagination_1 = require("../cosmos/base/query/v1beta1/pagination");
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "bluzelle.curium.crud";
const baseQueryGetCrudValueRequest = { uuid: "", key: "" };
exports.QueryGetCrudValueRequest = {
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
        const reader = input instanceof Uint8Array ? new minimal_1.default.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetCrudValueRequest,
        };
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
        const message = {
            ...baseQueryGetCrudValueRequest,
        };
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
        const message = {
            ...baseQueryGetCrudValueRequest,
        };
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
const baseQueryGetCrudValueResponse = {};
exports.QueryGetCrudValueResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.CrudValue !== undefined) {
            CrudValue_1.CrudValue.encode(message.CrudValue, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.default.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryGetCrudValueResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.CrudValue = CrudValue_1.CrudValue.decode(reader, reader.uint32());
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
            ...baseQueryGetCrudValueResponse,
        };
        if (object.CrudValue !== undefined && object.CrudValue !== null) {
            message.CrudValue = CrudValue_1.CrudValue.fromJSON(object.CrudValue);
        }
        else {
            message.CrudValue = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.CrudValue !== undefined &&
            (obj.CrudValue = message.CrudValue
                ? CrudValue_1.CrudValue.toJSON(message.CrudValue)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryGetCrudValueResponse,
        };
        if (object.CrudValue !== undefined && object.CrudValue !== null) {
            message.CrudValue = CrudValue_1.CrudValue.fromPartial(object.CrudValue);
        }
        else {
            message.CrudValue = undefined;
        }
        return message;
    },
};
const baseQueryAllCrudValueRequest = { uuid: "" };
exports.QueryAllCrudValueRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.uuid !== "") {
            writer.uint32(10).string(message.uuid);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.default.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryAllCrudValueRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.uuid = reader.string();
                    break;
                case 2:
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
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
            ...baseQueryAllCrudValueRequest,
        };
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = String(object.uuid);
        }
        else {
            message.uuid = "";
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromJSON(object.pagination);
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
                ? pagination_1.PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAllCrudValueRequest,
        };
        if (object.uuid !== undefined && object.uuid !== null) {
            message.uuid = object.uuid;
        }
        else {
            message.uuid = "";
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryAllCrudValueResponse = {};
exports.QueryAllCrudValueResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.CrudValue) {
            CrudValue_1.CrudValue.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.default.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryAllCrudValueResponse,
        };
        message.CrudValue = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.CrudValue.push(CrudValue_1.CrudValue.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
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
            ...baseQueryAllCrudValueResponse,
        };
        message.CrudValue = [];
        if (object.CrudValue !== undefined && object.CrudValue !== null) {
            for (const e of object.CrudValue) {
                message.CrudValue.push(CrudValue_1.CrudValue.fromJSON(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.CrudValue) {
            obj.CrudValue = message.CrudValue.map((e) => e ? CrudValue_1.CrudValue.toJSON(e) : undefined);
        }
        else {
            obj.CrudValue = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? pagination_1.PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryAllCrudValueResponse,
        };
        message.CrudValue = [];
        if (object.CrudValue !== undefined && object.CrudValue !== null) {
            for (const e of object.CrudValue) {
                message.CrudValue.push(CrudValue_1.CrudValue.fromPartial(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    CrudValue(request) {
        const data = exports.QueryGetCrudValueRequest.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.crud.Query", "CrudValue", data);
        return promise.then((data) => exports.QueryGetCrudValueResponse.decode(new minimal_1.default.Reader(data)));
    }
    CrudValueAll(request) {
        const data = exports.QueryAllCrudValueRequest.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.crud.Query", "CrudValueAll", data);
        return promise.then((data) => exports.QueryAllCrudValueResponse.decode(new minimal_1.default.Reader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=query.js.map