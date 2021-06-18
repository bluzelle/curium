"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
var sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'getNShortestLeases <uuid> <num>';
exports.desc = 'Query remaining lease time of [num] shortest leases in [uuid]';
var builder = function (yargs) {
    return yargs
        .positional('uuid', {
        description: 'distinct database identifier',
        type: 'string'
    })
        .positional('num', {
        description: 'number of keyLease objects to return',
        type: "number"
    })
        .help();
};
exports.builder = builder;
var handler = function (argv) {
    return sdk_helpers_1.getQuerySdk(argv.node)
        .then(function (sdk) { return sdk.db.q.GetNShortestLeases({
        uuid: argv.uuid,
        num: argv.num
    }); })
        .then(console.log)
        .catch(console.log);
};
exports.handler = handler;
