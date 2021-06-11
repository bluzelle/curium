"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
var sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'getLease <uuid> <key>';
exports.desc = 'Get remaining leasetime in seconds of a key-value from the database';
var builder = function (yargs) {
    return yargs
        .usage('getLease [uuid] [key]')
        .help();
};
exports.builder = builder;
var handler = function (argv) {
    return sdk_helpers_1.getSdkByName(argv.from, argv.gas_price, argv.gas, argv.node)
        .then(function (sdk) {
        return sdk.db.tx.GetLease({
            creator: sdk.db.address,
            uuid: argv.uuid,
            key: argv.key,
        });
    })
        .then(function (resp) { return resp; })
        .then(console.log);
};
exports.handler = handler;
