"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'read <uuid> <key>';
exports.desc = 'Read a key-value from the database';
const builder = (yargs) => {
    return yargs
        .positional('uuid', {
        description: 'distinct database identifier',
        type: 'string',
    })
        .positional('key', {
        description: 'key to read',
        type: 'string',
    })
        .help();
};
exports.builder = builder;
const handler = (argv) => {
    return sdk_helpers_1.getQuerySdk(argv.node)
        .then(sdk => sdk.db.q.Read({
        uuid: argv.uuid.toString(),
        key: argv.key.toString()
    }))
        .then(data => new TextDecoder().decode(data.value))
        .then(console.log);
    //.then(() => process.exit())
};
exports.handler = handler;
//# sourceMappingURL=ReadCmd.js.map