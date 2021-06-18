"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'search <uuid> <searchString>';
exports.desc = 'Search uuid according to given search string';
const builder = (yargs) => {
    return yargs
        .positional('uuid', {
        description: 'distinct database identifier',
        type: 'string'
    })
        .positional('searchString', {
        description: 'string to search by key in database',
        type: 'string'
    })
        .help();
};
exports.builder = builder;
const handler = (argv) => {
    return sdk_helpers_1.getQuerySdk(argv.node)
        .then(sdk => sdk.db.q.Search({
        uuid: argv.uuid,
        searchString: argv.searchString
    }))
        .then(data => data.keyValues.map((KV) => ({ ...KV, value: new TextDecoder().decode(KV.value) })))
        .then(console.log);
};
exports.handler = handler;
//# sourceMappingURL=SearchCmd.js.map