"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const path_1 = require("path");
exports.command = 'crud <method>';
exports.desc = 'query crud method';
const builder = (yargs) => {
    return yargs
        .commandDir(path_1.join(__dirname, `crud`))
        .option('node', {
        describe: 'node to connect to',
        type: 'string',
        default: 'https://client.sentry.testnet.private.bluzelle.com:26657'
    })
        .help()
        .demandCommand()
        .recommendCommands();
};
exports.builder = builder;
const handler = (argv) => {
};
exports.handler = handler;
//# sourceMappingURL=qCrudCli.js.map