"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const sdk_helpers_1 = require("../../helpers/sdk-helpers");
const addCmd_1 = require("./addCmd");
exports.command = 'list';
exports.desc = 'Add key to local system and generate mnemonic';
const builder = (yargs) => {
    return yargs
        .help();
};
exports.builder = builder;
const handler = (argv) => {
    return sdk_helpers_1.makeCliDir()
        .then(() => addCmd_1.promptForMnemonic(argv.recover))
        .then(mnemonic => sdk_helpers_1.createUserFile(argv.user, mnemonic))
        .then(() => sdk_helpers_1.readUserMnemonic(argv.user))
        .then(console.log);
};
exports.handler = handler;
//# sourceMappingURL=listCmd.js.map