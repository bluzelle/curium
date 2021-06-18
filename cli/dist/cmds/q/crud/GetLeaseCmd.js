"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
var sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'getLease <uuid> <key>';
exports.desc = 'Query remaining lease time on given key in specified uuid';
var builder = function (yargs) {
    return yargs
        .positional('uuid', {
        description: 'distinct database identifier',
        type: 'string'
    })
        .positional('key', {
        description: 'key to read',
        type: 'string'
    })
        .help();
};
exports.builder = builder;
var handler = function (argv) {
    return sdk_helpers_1.getQuerySdk(argv.node)
        .then(function (sdk) { return sdk.db.q.GetLease({
        uuid: argv.uuid,
        key: argv.key
    }); })
        .then(console.log)
        .catch(console.log);
};
exports.handler = handler;
