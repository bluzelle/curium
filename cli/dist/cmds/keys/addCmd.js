"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const sdk_helpers_1 = require("../../helpers/sdk-helpers");
exports.command = 'add <user>';
exports.desc = 'Add key to local system and generate mnemonic';
const builder = (yargs) => {
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
const handler = (argv) => {
    let yourMnemonic;
    return sdk_helpers_1.makeCliDir()
        .then(() => sdk_helpers_1.promptForMnemonic(argv.recover))
        .then(mnemonic => sdk_helpers_1.createUserFile(argv.user, mnemonic))
        .then(() => sdk_helpers_1.readUserMnemonic(argv.user))
        .then(mnemonic => yourMnemonic = mnemonic)
        .then(sdk_helpers_1.getAccountInfoFromMnemonic)
        .then(info => ({ ...info, mnemonic: yourMnemonic }))
        .then(console.log)
        .then(() => process.exit());
};
exports.handler = handler;
//# sourceMappingURL=addCmd.js.map