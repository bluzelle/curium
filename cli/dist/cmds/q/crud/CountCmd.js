"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
var sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'count <uuid>';
exports.desc = 'Query total number of key-values in given uuid';
var builder = function (yargs) {
    return yargs
        .help();
};
exports.builder = builder;
var handler = function (argv) {
    return sdk_helpers_1.getQuerySdk()
        // .then(sdk => sdk.db.q.Count({
        //     uuid: argv.uuid
        // }))
        // .then(data => data.count)
        .then(console.log);
};
exports.handler = handler;
