"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
var sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'rename <uuid> <key> <newKey>';
exports.desc = 'Rename a key-value from the database';
var builder = function (yargs) {
    return yargs
        .positional('uuid', {
        description: 'distinct database identifier',
        type: 'string'
    })
        .positional('key', {
        description: 'existing key',
        type: 'string',
    })
        .positional('newKey', {
        description: 'new key name',
        type: 'string'
    })
        .help();
};
exports.builder = builder;
var handler = function (argv) {
    return sdk_helpers_1.getSdkByName(argv.from, argv.gasPrice, argv.gas, argv.node)
        .then(function (x) { return x; })
        .then(function (sdk) {
        return sdk.db.tx.Rename({
            creator: sdk.db.address,
            uuid: argv.uuid,
            key: argv.key,
            newKey: argv.newKey
        });
    })
        .then(function () { return console.log("Key: " + argv.key + " was renamed to " + argv.newKey + " in uuid: " + argv.uuid); })
        .catch(function (e) { return console.log(e); });
};
exports.handler = handler;
