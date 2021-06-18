"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
var sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'deleteAll <uuid>';
exports.desc = 'remove all key-values from specified uuid';
var builder = function (yargs) {
    return yargs
        .positional('uuid', {
        description: 'distinct database identifier to clear',
        type: 'string'
    })
        .help();
};
exports.builder = builder;
var handler = function (argv) {
    return sdk_helpers_1.getSdkByName(argv.from, argv.gasPrice, argv.gas, argv.node)
        .then(function (x) { return x; })
        .then(function (sdk) {
        return sdk.db.tx.DeleteAll({
            creator: sdk.db.address,
            uuid: argv.uuid,
        });
    })
        .then(function () { return console.log("Uuid: " + argv.uuid + " has been cleared"); })
        .catch(function (e) { return console.log(e); });
};
exports.handler = handler;
