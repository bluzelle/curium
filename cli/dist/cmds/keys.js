"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const path_1 = require("path");
exports.command = 'keys <method>';
exports.desc = 'generate keys';
const builder = (yargs) => {
    return yargs
        .commandDir(path_1.join(__dirname, `keys`))
        .help()
        .demandCommand()
        .recommendCommands();
};
exports.builder = builder;
const handler = (argv) => {
};
exports.handler = handler;
//# sourceMappingURL=keys.js.map