"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'renewleasesall <uuid> <lease>';
exports.desc = 'Renew leases of all key-values in uuid';
const builder = (yargs) => {
    return yargs
        .positional('uuid', {
        description: 'distinct database identifier',
        type: 'string'
    })
        .positional('lease', {
        description: 'new life-span of all key-values in seconds',
        type: 'number'
    })
        .help();
};
exports.builder = builder;
const handler = (argv) => {
    return sdk_helpers_1.getSdkByName(argv.from, argv.gasPrice, argv.gas, argv.node)
        .then(x => x)
        .then(sdk => sdk.db.tx.RenewLeasesAll({
        creator: sdk.db.address,
        uuid: argv.uuid,
        lease: { seconds: argv.lease }
    }))
        .then(() => console.log(`Leases renewed for ${argv.lease} seconds in uuid: ${argv.uuid}`));
};
exports.handler = handler;
//# sourceMappingURL=RenewLeasesAllCmd.js.map