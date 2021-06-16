"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
var sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'has <uuid> <key>';
exports.desc = 'Check if the specified key exists in given uuid';
var builder = function (yargs) {
    return yargs
        .help();
};
exports.builder = builder;
var handler = function (argv) {
    return sdk_helpers_1.getQuerySdk(argv.node)
        .then(function (sdk) { return sdk.db.q.Has({
        uuid: argv.uuid,
        key: argv.key
    }); })
        .then(function (data) { return data.has; })
        .then(console.log)
        .catch(console.log);
};
exports.handler = handler;
