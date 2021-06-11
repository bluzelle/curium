"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
var sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'read <uuid> <key>';
exports.desc = 'Read a key-value from the database';
var builder = function (yargs) {
    return yargs
        .help();
};
exports.builder = builder;
var handler = function (argv) {
    return sdk_helpers_1.getQuerySdk()
        .then(function (sdk) { return sdk.db.q.Read({
        uuid: argv.uuid,
        key: argv.key
    }); })
        .then(function (data) { return new TextDecoder().decode(data.value); })
        .then(console.log);
};
exports.handler = handler;
