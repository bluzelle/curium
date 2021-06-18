import {Argv,} from "yargs";
import {Flags, getSdkByName} from "../../../helpers/sdk-helpers";

export const command = 'delete <uuid> <key>'
export const desc = 'Remove a key-value from the database'
export const builder = (yargs: Argv) => {
    return yargs
        .positional('uuid', {
            description: 'distinct database identifier',
            type: 'string'
        })
        .positional('key', {
            description: 'key to delete',
            type: 'string'
        })
        .help()
}
export const handler = (argv: {uuid: string, key: string} & Flags) => {
    return getSdkByName(argv.from, argv.gasPrice, argv.gas, argv.node)
        .then(x => x)
        .then(sdk =>
            sdk.db.tx.Delete({
                creator: sdk.db.address,
                uuid: argv.uuid,
                key: argv.key,
            })
        )
        .then(() => console.log(`Key: ${argv.key} was deleted from uuid: ${argv.uuid}`))
        .catch(e => console.log(e))
}