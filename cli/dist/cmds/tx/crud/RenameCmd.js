"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
var sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'rename <uuid> <key> <newKey>';
exports.desc = 'Rename a key-value from the database';
var builder = function (yargs) {
    return yargs
        .usage('create [uuid] [key] [newKey]')
        .help();
};
exports.builder = builder;
var handler = function (argv) {
    return sdk_helpers_1.getSdkByName(argv.from, argv.gas_price, argv.gas, argv.node)
        .then(function (x) { return x; })
        .then(function (sdk) {
        return sdk.db.tx.Rename({
            creator: sdk.db.address,
            uuid: argv.uuid,
            key: argv.key,
            newKey: argv.newKey
        });
    })
        .then(function () { return console.log("KEY-VALUE SUCCESSFULLY RENAMED"); });
};
exports.handler = handler;
