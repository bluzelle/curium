"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const sdk_helpers_1 = require("../../helpers/sdk-helpers");
exports.command = 'list';
exports.desc = 'Show all keys stored on local file system';
const builder = (yargs) => {
    return yargs
        .help();
};
exports.builder = builder;
const handler = () => {
    return sdk_helpers_1.readCliDir()
        .then(x => x)
        .then(console.log)
        .then(x => x);
};
exports.handler = handler;
//# sourceMappingURL=listCmd.js.map