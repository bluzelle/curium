"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.aliases = exports.desc = exports.command = void 0;
const path_1 = require("path");
exports.command = 'tx <module>';
exports.desc = 'transaction method';
exports.aliases = ['transaction'];
const builder = (yargs) => {
    return yargs.commandDir(path_1.join(__dirname, 'tx'))
        .help()
        .demandCommand()
        .recommendCommands();
};
exports.builder = builder;
const handler = (argv) => {
};
exports.handler = handler;
//# sourceMappingURL=tx.js.map