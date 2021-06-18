"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'delete <uuid> <key>';
exports.desc = 'Remove a key-value from the database';
const builder = (yargs) => {
    return yargs
        .positional('uuid', {
        description: 'distinct database identifier',
        type: 'string'
    })
        .positional('key', {
        description: 'key to delete',
        type: 'string'
    })
        .help();
};
exports.builder = builder;
const handler = (argv) => {
    return sdk_helpers_1.getSdkByName(argv.from, argv.gasPrice, argv.gas, argv.node)
        .then(x => x)
        .then(sdk => sdk.db.tx.Delete({
        creator: sdk.db.address,
        uuid: argv.uuid,
        key: argv.key,
    }))
        .then(() => console.log(`Key: ${argv.key} was deleted from uuid: ${argv.uuid}`));
};
exports.handler = handler;
//# sourceMappingURL=DeleteCmd.js.map