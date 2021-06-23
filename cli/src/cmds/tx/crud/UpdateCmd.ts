
import {Argv,} from "yargs";
import {TextEncoder} from "util";
import {Flags, getSdkByName} from "../../../helpers/sdk-helpers";


export const command = 'update <uuid> <key> <value> <lease>'
export const desc = 'Update a key-value from the database'
export const builder = (yargs: Argv) => {
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
        .help()
}
export const handler = (argv: {uuid: string, key: string, value: string, lease: number} & Flags) => {
    return getSdkByName(argv.from, argv.gasPrice, argv.gas, argv.node)
        .then(sdk =>
            sdk.db.tx.Update({
                creator: sdk.db.address,
                uuid: argv.uuid,
                key: argv.key,
                value: new TextEncoder().encode(argv.value),
                lease: {days: 0, years: 0, minutes: 0, seconds: argv.lease, hours: 0},
                metadata: new Uint8Array()
            })
        )
        .then(() => console.log(`Key: ${argv.key}, Value: ${argv.value} successfully updated in uuid: ${argv.uuid}`))
}