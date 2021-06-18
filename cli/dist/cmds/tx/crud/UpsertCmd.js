"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
var util_1 = require("util");
var sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'upsert <uuid> <key> <value> <lease>';
exports.desc = 'Upsert a key-value from the database';
var builder = function (yargs) {
    return yargs
        .positional('uuid', {
        description: 'distinct database identifier',
        type: 'string'
    })
        .positional('key', {
        description: 'key to upsert, existing or not',
        type: 'string'
    })
        .positional('value', {
        description: 'value to upsert',
        type: 'string'
    })
        .positional('lease', {
        description: 'life-span of key-value in seconds',
        type: 'number'
    })
        .help();
};
exports.builder = builder;
var handler = function (argv) {
    return sdk_helpers_1.getSdkByName(argv.from, argv.gasPrice, argv.gas, argv.node)
        .then(function (sdk) {
        return sdk.db.tx.Upsert({
            creator: sdk.db.address,
            uuid: argv.uuid,
            key: argv.key,
            value: new util_1.TextEncoder().encode(argv.value),
            lease: { days: 0, years: 0, minutes: 0, seconds: argv.lease, hours: 0 },
            metadata: new Uint8Array()
        });
    })
        .then(function () { return console.log("Key: " + argv.key + ", value: " + argv.value + " successfully upserted in uuid: " + argv.uuid); })
        .catch(function (e) { return console.log(e); });
};
exports.handler = handler;
