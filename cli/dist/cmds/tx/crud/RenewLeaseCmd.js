"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
var sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'renewLease <uuid> <key> <lease>';
exports.desc = 'Renew lease of a key-value in the database';
var builder = function (yargs) {
    return yargs
        .positional('uuid', {
        description: 'distinct database identifier',
        type: 'string'
    })
        .positional('key', {
        description: 'key to renew lease',
        type: 'string'
    })
        .positional('lease', {
        description: 'new life-span of key-value in seconds',
        type: 'number'
    })
        .help();
};
exports.builder = builder;
var handler = function (argv) {
    return sdk_helpers_1.getSdkByName(argv.from, argv.gasPrice, argv.gas, argv.node)
        .then(function (x) { return x; })
        .then(function (sdk) {
        return sdk.db.tx.RenewLease({
            creator: sdk.db.address,
            uuid: argv.uuid,
            key: argv.key,
            lease: { seconds: argv.lease }
        });
    })
        .then(function () { return console.log("Lease renewed for " + argv.lease + " seconds for Key: " + argv.key + " in uuid: " + argv.uuid); })
        .catch(function (e) { return console.log(e); });
};
exports.handler = handler;
