"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
var util_1 = require("util");
var sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'create <uuid> <key> <value> <lease>';
exports.desc = 'Create a key-value from the database';
var builder = function (yargs) {
    return yargs
        .usage('create [uuid] [key] [value] [lease]')
        .help();
};
exports.builder = builder;
var handler = function (argv) {
    return sdk_helpers_1.getSdkByName(argv.from, argv.gas_price, argv.gas, argv.node)
        .then(function (sdk) {
        return sdk.db.tx.Create({
            creator: sdk.db.address,
            uuid: argv.uuid,
            key: argv.key,
            value: new util_1.TextEncoder().encode(argv.value),
            lease: { days: 0, years: 0, minutes: 0, seconds: parseInt(argv.lease), hours: 0 },
            metadata: new Uint8Array()
        });
    })
        .then(console.log.bind(null, "KEY-VALUE SUCCESSFULLY CREATED"));
};
exports.handler = handler;
