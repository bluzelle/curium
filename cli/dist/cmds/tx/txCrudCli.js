"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
var path_1 = require("path");
exports.command = 'crud <method>';
exports.desc = 'transaction crud method';
var builder = function (yargs) {
    return yargs
        .commandDir(path_1.join(__dirname, "crud"))
        .option('from', {
        describe: 'payer address',
        type: "string"
    })
        .option('gas', {
        describe: 'maximum gas willing to consume',
        type: "string"
    })
        .option('gas_price', {
        describe: 'minimum gas price in ubnt i.e. 0.002ubnt',
        type: "string"
    })
        .option('node', {
        describe: 'node to connect to',
        type: 'string'
    })
        .demandOption(['from', 'gas', 'gas_price', 'node'], 'Must fill transaction details')
        .help()
        .demandCommand();
};
exports.builder = builder;
var handler = function (argv) {
};
exports.handler = handler;
