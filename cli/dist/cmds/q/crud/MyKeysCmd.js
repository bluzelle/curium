"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const sdk_helpers_1 = require("../../../helpers/sdk-helpers");
const long_1 = __importDefault(require("long"));
exports.command = 'mykeys <address> <uuid> [startkey] [limit]';
exports.desc = 'Read all keys in uuid owned by given address';
const builder = (yargs) => {
    return yargs
        .positional('uuid', {
        description: 'distinct database identifier',
        type: 'string'
    })
        .positional('address', {
        description: 'key-value creator address',
        type: 'string'
    })
        .positional('startkey', {
        description: 'start key to begin pagination (inclusive)',
        type: 'string',
        default: ''
    })
        .positional('limit', {
        description: 'max number of keys to return',
        type: 'number',
        default: 100
    })
        .help();
};
exports.builder = builder;
const handler = (argv) => {
    return sdk_helpers_1.getQuerySdk(argv.node)
        .then(sdk => sdk.db.q.MyKeys({
        address: argv.address,
        uuid: argv.uuid,
        pagination: {
            startKey: argv.startkey,
            limit: long_1.default.fromInt(argv.limit)
        }
    }))
        .then(data => data.keys)
        .then(console.log);
};
exports.handler = handler;
//# sourceMappingURL=MyKeysCmd.js.map