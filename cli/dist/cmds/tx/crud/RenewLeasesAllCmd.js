"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
var sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'renewLeasesAll <uuid> <lease>';
exports.desc = 'Renew leases of all key-values in uuid';
var builder = function (yargs) {
    return yargs
        .usage('renewLeasesAll [uuid] [lease]')
        .help();
};
exports.builder = builder;
var handler = function (argv) {
    return sdk_helpers_1.getSdkByName(argv.from, argv.gas_price, argv.gas, argv.node)
        .then(function (x) { return x; })
        .then(function (sdk) {
        return sdk.db.tx.RenewLeasesAll({
            creator: sdk.db.address,
            uuid: argv.uuid,
            lease: { seconds: parseInt(argv.lease) }
        });
    })
        .then(function () { return console.log("Leases renewed for " + argv.lease + " seconds in uuid: " + argv.uuid); })
        .catch(function (e) { return console.log(e); });
};
exports.handler = handler;
