"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.aliases = exports.desc = exports.command = void 0;
var path_1 = require("path");
exports.command = 'q <module>';
exports.desc = 'query method';
exports.aliases = ['query'];
var builder = function (yargs) {
    return yargs
        .commandDir(path_1.join(__dirname, "q"))
        .help()
        .demandCommand();
};
exports.builder = builder;
var handler = function (argv) {
};
exports.handler = handler;
