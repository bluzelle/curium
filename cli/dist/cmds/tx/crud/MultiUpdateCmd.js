"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const util_1 = require("util");
const sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'multiupdate <uuid> <keyvalues..>';
exports.desc = 'Update multiple key values';
const builder = (yargs) => {
    return yargs
        .positional('uuid', {
        description: 'distinct database identifier',
        type: 'string'
    })
        .positional('keyvalues', {
        description: 'sequential triplets [key1] [value1] [lease1] ... [keyN] [valueN] [leaseN]',
    })
        .help();
};
exports.builder = builder;
const handler = (argv) => {
    return sdk_helpers_1.getSdkByName(argv.from, argv.gasPrice, argv.gas, argv.node)
        .then(sdk => parseKeyValues(argv.keyvalues)
        .then(keyValues => sdk.db.tx.MultiUpdate({
        creator: sdk.db.address,
        uuid: argv.uuid,
        keyValues
    })))
        .then(() => console.log(`Given set of key-values successfully updated in uuid: ${argv.uuid}`));
};
exports.handler = handler;
const parseKeyValues = (keyValueLeases) => {
    let parsedKeyValues = [];
    if (keyValueLeases.length % 3 == 0) {
        for (let i = 0; i < keyValueLeases.length; i += 3) {
            let keyValueLease = {
                key: keyValueLeases[i],
                value: new util_1.TextEncoder().encode(keyValueLeases[i + 1]),
                lease: { seconds: parseInt(keyValueLeases[i + 2]) }
            };
            parsedKeyValues.push(keyValueLease);
        }
        return Promise.resolve(parsedKeyValues);
    }
    throw "invalid set of key-value-leases inputted";
};
//# sourceMappingURL=MultiUpdateCmd.js.map