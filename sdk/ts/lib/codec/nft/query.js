"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryClientImpl = exports.QueryAllNftResponse = exports.QueryAllNftRequest = exports.QueryGetNftResponse = exports.QueryGetNftRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const nft_1 = require("../nft/nft");
const pagination_1 = require("../cosmos/base/query/v1beta1/pagination");
exports.protobufPackage = "bluzelle.curium.nft";
const baseQueryGetNftRequest = { id: long_1.default.UZERO };
exports.QueryGetNftRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.id.isZero()) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetNftRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetNftRequest };
        if (object.id !== undefined && object.id !== null) {
            message.id = long_1.default.fromString(object.id);
        }
        else {
            message.id = long_1.default.UZERO;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined &&
            (obj.id = (message.id || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetNftRequest };
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = long_1.default.UZERO;
        }
        return message;
    },
};
const baseQueryGetNftResponse = {};
exports.QueryGetNftResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.Nft !== undefined) {
            nft_1.Nft.encode(message.Nft, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryGetNftResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Nft = nft_1.Nft.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryGetNftResponse };
        if (object.Nft !== undefined && object.Nft !== null) {
            message.Nft = nft_1.Nft.fromJSON(object.Nft);
        }
        else {
            message.Nft = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.Nft !== undefined &&
            (obj.Nft = message.Nft ? nft_1.Nft.toJSON(message.Nft) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryGetNftResponse };
        if (object.Nft !== undefined && object.Nft !== null) {
            message.Nft = nft_1.Nft.fromPartial(object.Nft);
        }
        else {
            message.Nft = undefined;
        }
        return message;
    },
};
const baseQueryAllNftRequest = {};
exports.QueryAllNftRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllNftRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
        const message = { ...baseQueryAllNftRequest };
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
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? pagination_1.PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllNftRequest };
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryAllNftResponse = {};
exports.QueryAllNftResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.Nft) {
            nft_1.Nft.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryAllNftResponse };
        message.Nft = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Nft.push(nft_1.Nft.decode(reader, reader.uint32()));
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
        const message = { ...baseQueryAllNftResponse };
        message.Nft = [];
        if (object.Nft !== undefined && object.Nft !== null) {
            for (const e of object.Nft) {
                message.Nft.push(nft_1.Nft.fromJSON(e));
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
        if (message.Nft) {
            obj.Nft = message.Nft.map((e) => (e ? nft_1.Nft.toJSON(e) : undefined));
        }
        else {
            obj.Nft = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? pagination_1.PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryAllNftResponse };
        message.Nft = [];
        if (object.Nft !== undefined && object.Nft !== null) {
            for (const e of object.Nft) {
                message.Nft.push(nft_1.Nft.fromPartial(e));
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
    Nft(request) {
        const data = exports.QueryGetNftRequest.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.nft.Query", "Nft", data);
        return promise.then((data) => exports.QueryGetNftResponse.decode(new minimal_1.default.Reader(data)));
    }
    NftAll(request) {
        const data = exports.QueryAllNftRequest.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.nft.Query", "NftAll", data);
        return promise.then((data) => exports.QueryAllNftResponse.decode(new minimal_1.default.Reader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=query.js.map