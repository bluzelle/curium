"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'has <uuid> <key>';
exports.desc = 'Check if the specified key exists in given uuid';
const builder = (yargs) => {
    return yargs
        .positional('uuid', {
        description: 'distinct database identifier',
        type: 'string'
    })
        .positional('key', {
        description: 'key to read',
        type: 'string'
    })
        .help();
};
exports.builder = builder;
const handler = (argv) => {
    return sdk_helpers_1.getQuerySdk(argv.node)
        .then(sdk => sdk.db.q.Has({
        uuid: argv.uuid,
        key: argv.key
    }))
        .then(data => data.has)
        .then(console.log);
};
exports.handler = handler;
//# sourceMappingURL=HasCmd.js.map