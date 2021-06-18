"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'renewLease <uuid> <key> <lease>';
exports.desc = 'Renew lease of a key-value in the database';
const builder = (yargs) => {
    return yargs
        .positional('uuid', {
        description: 'distinct database identifier',
        type: 'string'
    })
        .positional('key', {
        description: 'key to renew lease',
        type: 'string'
    })
        .positional('lease', {
        description: 'new life-span of key-value in seconds',
        type: 'number'
    })
        .help();
};
exports.builder = builder;
const handler = (argv) => {
    return sdk_helpers_1.getSdkByName(argv.from, argv.gasPrice, argv.gas, argv.node)
        .then(x => x)
        .then(sdk => sdk.db.tx.RenewLease({
        creator: sdk.db.address,
        uuid: argv.uuid,
        key: argv.key,
        lease: { seconds: argv.lease }
    }))
        .then(() => console.log(`Lease renewed for ${argv.lease} seconds for Key: ${argv.key} in uuid: ${argv.uuid}`));
};
exports.handler = handler;
//# sourceMappingURL=RenewLeaseCmd.js.map