"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
var path_1 = require("path");
exports.command = 'keys <method>';
exports.desc = 'generate keys';
var builder = function (yargs) {
    return yargs
        .commandDir(path_1.join(__dirname, "keys"))
        .option('recover', {
        describe: 'recover account by providing mnemonic',
        default: false,
        demandOption: true
    })
        .help()
        .demandCommand();
};
exports.builder = builder;
var handler = function (argv) {
};
exports.handler = handler;
