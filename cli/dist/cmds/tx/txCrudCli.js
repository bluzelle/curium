"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const path_1 = require("path");
exports.command = 'crud <method>';
exports.desc = 'transaction crud method';
const builder = (yargs) => {
    return yargs
        .commandDir(path_1.join(__dirname, `crud`))
        .option('from', {
        describe: 'payer address',
        type: "string"
    })
        .option('gas', {
        describe: 'maximum gas willing to consume',
        type: "number",
        default: 1000000000
    })
        .option('gasPrice', {
        describe: 'minimum gas price in ubnt',
        type: "string",
        default: "0.002ubnt"
    })
        .option('node', {
        describe: 'node to connect to',
        type: 'string',
        default: 'https://client.sentry.testnet.private.bluzelle.com:26657'
    })
        .demandOption(['from'])
        .recommendCommands()
        .help();
};
exports.builder = builder;
const handler = (argv) => {
};
exports.handler = handler;
//# sourceMappingURL=txCrudCli.js.map