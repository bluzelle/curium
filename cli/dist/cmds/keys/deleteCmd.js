"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const sdk_helpers_1 = require("../../helpers/sdk-helpers");
exports.command = 'delete <user>';
exports.desc = 'Remove key to local system and generate mnemonic';
const builder = (yargs) => {
    return yargs
        .positional('user', {
        describe: 'name of user account to create',
        type: 'string'
    })
        .help();
};
exports.builder = builder;
const handler = (argv) => sdk_helpers_1.removeUserFile(argv.user)
    .then(() => console.log(`Removed ${argv.user} from local keyring`))
    .then(() => process.exit());
exports.handler = handler;
//# sourceMappingURL=deleteCmd.js.map