"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptForMnemonic = exports.handler = exports.builder = exports.desc = exports.command = void 0;
const sdk_helpers_1 = require("../../helpers/sdk-helpers");
const sdk_js_1 = require("@bluzelle/sdk-js");
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
    return sdk_helpers_1.makeCliDir()
        .then(() => exports.promptForMnemonic(argv.recover))
        .then(mnemonic => sdk_helpers_1.createUserFile(argv.user, mnemonic))
        .then(() => sdk_helpers_1.readUserMnemonic(argv.user))
        .then(console.log);
};
exports.handler = handler;
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const promptForMnemonic = (recover) => recover ? new Promise((resolve) => readline.question("Please provide BIP39 mnemonic\n", (mnemonic) => {
    readline.close();
    return resolve(mnemonic);
})) : Promise.resolve(sdk_js_1.newMnemonic());
exports.promptForMnemonic = promptForMnemonic;
//# sourceMappingURL=addCmd.js.map