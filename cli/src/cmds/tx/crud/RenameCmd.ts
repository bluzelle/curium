import {Argv,} from "yargs";
import {Flags, getSdkByName} from "../../../helpers/sdk-helpers";

export const command = 'rename <uuid> <key> <newKey>'
export const desc = 'Rename a key-value from the database'
export const builder = (yargs: Argv) => {
    return yargs
        .positional('uuid', {
            description: 'distinct database identifier',
            type: 'string'
        })
        .positional('key', {
            description: 'existing key',
            type: 'string',

        })
        .positional('newKey', {
            description: 'new key name',
            type: 'string'
        })
        .help()
}
export const handler = (argv: {uuid: string, key: string, newKey: string} & Flags) => {
    return getSdkByName(argv.from, argv.gasPrice, argv.gas, argv.node)
        .then(x => x)
        .then(sdk =>
            sdk.db.tx.Rename({
                creator: sdk.db.address,
                uuid: argv.uuid,
                key: argv.key,
                newKey: argv.newKey
            })
        )
        .then(() => console.log(`Key: ${argv.key} was renamed to ${argv.newKey} in uuid: ${argv.uuid}`))
}