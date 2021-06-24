"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const sdk_helpers_1 = require("../../helpers/sdk-helpers");
exports.command = 'show <user>';
exports.desc = 'Show key info of specified user';
const builder = (yargs) => {
    return yargs
        .positional('user', {
        describe: 'name of user',
        type: 'string'
    })
        .option('address', {
        describe: 'return the bluzelle address',
        alias: 'a',
        type: 'boolean',
        default: false
    })
        .help();
};
exports.builder = builder;
const handler = (argv) => {
    return sdk_helpers_1.getUserInfo(argv.user)
        .then(info => argv.address ? info.address : info)
        .then(console.log)
        .then(() => process.exit());
};
exports.handler = handler;
//# sourceMappingURL=showCmd.js.map