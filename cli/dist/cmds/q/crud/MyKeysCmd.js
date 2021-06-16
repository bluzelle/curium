"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
var sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'myKeys <address> <uuid>';
exports.desc = 'Read all keys in uuid owned by given address';
var builder = function (yargs) {
    return yargs
        .help();
};
exports.builder = builder;
var handler = function (argv) {
    return sdk_helpers_1.getQuerySdk(argv.node)
        .then(function (sdk) { return sdk.db.q.MyKeys({
        address: argv.address,
        uuid: argv.uuid
    }); })
        .then(function (data) { return data.keys; })
        .then(console.log)
        .catch(console.log);
};
exports.handler = handler;
