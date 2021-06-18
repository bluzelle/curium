"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
var sdk_js_1 = require("@bluzelle/sdk-js");
var sdk_helpers_1 = require("../../helpers/sdk-helpers");
var readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
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
    return makeCliDir()
        .then(function () { return promptForMnemonic(argv.recover); })
        .then(function (mnemonic) { return createUserFile(argv.user, mnemonic); })
        .then(function () { return sdk_helpers_1.readUserMnemonic(argv.user); })
        .then(console.log)
        .catch(function (e) { return console.log(e); });
};
exports.handler = handler;
var promptForMnemonic = function (recover) {
    return recover ? new Promise(function (resolve) { return readline.question("Please provide BIP39 mnemonic\n", function (mnemonic) {
        readline.close();
        return resolve(mnemonic);
    }); }) : Promise.resolve(sdk_js_1.newMnemonic());
};
var createUserFile = function (user, mnemonic) {
    return fs_1.promises.writeFile(path_1.default.resolve(__dirname, process.env.HOME + "/.curium/cli/" + user + ".info"), mnemonic, { flag: 'wx' })
        .catch(function (e) { return e.stack.match(/already exists/) ? function () { throw "User already exists"; }() : e; });
};
var makeCliDir = function () {
    return fs_1.promises.mkdir(path_1.default.resolve(__dirname, process.env.HOME + "/.curium/cli"))
        .catch(function (e) { return e.stack.match(/already exists/) ? {} : e; });
};
