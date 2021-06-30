"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'getnshortestleases <uuid> <num>';
exports.desc = 'Query remaining lease time of [num] shortest leases in [uuid]';
const builder = (yargs) => {
    return yargs
        .positional('uuid', {
        description: 'distinct database identifier',
        type: 'string'
    })
        .positional('num', {
        description: 'number of keyLease objects to return',
        type: "number"
    })
        .help();
};
exports.builder = builder;
const handler = (argv) => {
    return sdk_helpers_1.getQuerySdk(argv.node)
        .then(sdk => sdk.db.q.GetNShortestLeases({
        uuid: argv.uuid,
        num: argv.num
    }))
        .then(console.log);
};
exports.handler = handler;
//# sourceMappingURL=GetNShortestLeasesCmd.js.map