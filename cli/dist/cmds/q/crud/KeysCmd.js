"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
var sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'keys <uuid>';
exports.desc = 'Read all keys in uuid from the database';
var builder = function (yargs) {
    return yargs
        .positional('uuid', {
        description: 'distinct database identifier',
        type: 'string'
    })
        .help();
};
exports.builder = builder;
var handler = function (argv) {
    return sdk_helpers_1.getQuerySdk(argv.node)
        .then(function (sdk) { return sdk.db.q.Keys({
        uuid: argv.uuid
    }); })
        .then(function (data) { return data.keys; })
        .then(console.log)
        .catch(console.log);
};
exports.handler = handler;
