"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'deleteAll <uuid>';
exports.desc = 'Remove all key-values from specified uuid';
const builder = (yargs) => {
    return yargs
        .positional('uuid', {
        description: 'distinct database identifier to clear',
        type: 'string'
    })
        .help();
};
exports.builder = builder;
const handler = (argv) => {
    return sdk_helpers_1.getSdkByName(argv.from, argv.gasPrice, argv.gas, argv.node)
        .then(x => x)
        .then(sdk => sdk.db.tx.DeleteAll({
        creator: sdk.db.address,
        uuid: argv.uuid,
    }))
        .then(() => console.log(`Uuid: ${argv.uuid} has been cleared`));
};
exports.handler = handler;
//# sourceMappingURL=DeleteAllCmd.js.map