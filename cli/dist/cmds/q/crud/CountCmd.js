"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'count <uuid>';
exports.desc = 'Query total number of key-values in given uuid';
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
        .then(sdk => sdk.db.q.Count({
        uuid: argv.uuid
    }))
        .then(data => data.count)
        .then(console.log);
};
exports.handler = handler;
//# sourceMappingURL=CountCmd.js.map