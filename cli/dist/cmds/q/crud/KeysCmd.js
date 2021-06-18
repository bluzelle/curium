"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'keys <uuid>';
exports.desc = 'Read all keys in uuid from the database';
const builder = (yargs) => {
    return yargs
        .positional('uuid', {
        description: 'distinct database identifier',
        type: 'string'
    })
        .help();
};
exports.builder = builder;
const handler = (argv) => {
    return sdk_helpers_1.getQuerySdk(argv.node)
        .then(sdk => sdk.db.q.Keys({
        uuid: argv.uuid
    }))
        .then(data => data.keys)
        .then(console.log);
};
exports.handler = handler;
//# sourceMappingURL=KeysCmd.js.map