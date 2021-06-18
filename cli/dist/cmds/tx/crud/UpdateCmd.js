"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const util_1 = require("util");
const sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'update <uuid> <key> <value> <lease>';
exports.desc = 'Update a key-value from the database';
const builder = (yargs) => {
    return yargs
        .positional('uuid', {
        description: 'distinct database identifier',
        type: 'string'
    })
        .positional('key', {
        description: 'key to update',
        type: 'string'
    })
        .positional('value', {
        description: 'new value to update to',
        type: 'string'
    })
        .positional('lease', {
        description: 'life-span of key-value in seconds',
        type: 'number'
    })
        .help();
};
exports.builder = builder;
const handler = (argv) => {
    return sdk_helpers_1.getSdkByName(argv.from, argv.gasPrice, argv.gas, argv.node)
        .then(sdk => sdk.db.tx.Update({
        creator: sdk.db.address,
        uuid: argv.uuid,
        key: argv.key,
        value: new util_1.TextEncoder().encode(argv.value),
        lease: { days: 0, years: 0, minutes: 0, seconds: argv.lease, hours: 0 },
        metadata: new Uint8Array()
    }))
        .then(() => console.log(`Key: ${argv.key}, value: ${argv.value} successfully updated in uuid: ${argv.uuid}`));
};
exports.handler = handler;
//# sourceMappingURL=UpdateCmd.js.map