"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
var sdk_helpers_1 = require("../../helpers/sdk-helpers");
exports.command = 'add <user>';
exports.desc = 'Add key to local system and generate mnemonic';
var builder = function (yargs) {
    return yargs
        .option('recover', {
        describe: 'recover account by providing mnemonic',
        type: 'boolean',
        default: false
    })
        .positional('user', {
        describe: 'name of user account to create',
        type: 'string'
    })
        .help();
};
exports.builder = builder;
var handler = function (argv) {
    return sdk_helpers_1.makeCliDir()
        .then(function () { return sdk_helpers_1.promptForMnemonic(argv.recover); })
        .then(function (mnemonic) { return sdk_helpers_1.createUserFile(argv.user, mnemonic); })
        .then(function () { return sdk_helpers_1.readUserMnemonic(argv.user); })
        .then(console.log)
        .catch(function (e) { return console.log(e); });
};
exports.handler = handler;
