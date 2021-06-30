"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const sdk_helpers_1 = require("../../../helpers/sdk-helpers");
const long_1 = __importDefault(require("long"));
exports.command = 'search <uuid> <prefix> [startkey] [limit]';
exports.desc = 'Search uuid according to given search string';
const builder = (yargs) => {
    return yargs
        .positional('uuid', {
        description: 'distinct database identifier',
        type: 'string'
    })
        .positional('prefix', {
        description: 'string to search by key in database',
        type: 'string',
        alias: 'searchString'
    })
        .positional('startkey', {
        description: 'start key to begin pagination (non-inclusive)',
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
        .then(sdk => sdk.db.q.Search({
        uuid: argv.uuid,
        searchString: argv.searchString,
        pagination: {
            limit: long_1.default.fromInt(argv.limit),
            startKey: argv.startkey
        }
    }))
        .then(data => data.keyValues.map((KV) => ({ ...KV, value: new TextDecoder().decode(KV.value) })))
        .then(console.log);
};
exports.handler = handler;
//# sourceMappingURL=SearchCmd.js.map