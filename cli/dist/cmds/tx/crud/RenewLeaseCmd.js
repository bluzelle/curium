"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
var sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'renewLease <uuid> <key> <lease>';
exports.desc = 'Renew lease of a key-value in the database';
var builder = function (yargs) {
    return yargs
        .usage('renewLease [uuid] [key] [lease]')
        .help();
};
exports.builder = builder;
var handler = function (argv) {
    return sdk_helpers_1.getSdkByName(argv.from, argv.gas_price, argv.gas, argv.node)
        .then(function (x) { return x; })
        .then(function (sdk) {
        return sdk.db.tx.RenewLease({
            creator: sdk.db.address,
            uuid: argv.uuid,
            key: argv.key,
            lease: { seconds: parseInt(argv.lease) }
        });
    })
        .then(function () { return console.log("Lease renewed for " + argv.lease + " seconds for Key: " + argv.key + " in uuid: " + argv.uuid); })
        .catch(function (e) { return console.log(e); });
};
exports.handler = handler;
