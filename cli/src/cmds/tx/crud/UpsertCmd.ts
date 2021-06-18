import {Argv,} from "yargs";
import {TextEncoder} from "util";
import {Flags, getSdkByName} from "../../../helpers/sdk-helpers";

export const command = 'upsert <uuid> <key> <value> <lease>'
export const desc = 'Upsert a key-value from the database'
export const builder = (yargs: Argv) => {
    return yargs
        .positional('uuid', {
            description: 'distinct database identifier',
            type: 'string'
        })
        .positional('key', {
            description: 'key to upsert, existing or not',
            type: 'string'
        })
        .positional('value', {
            description: 'value to upsert',
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
            sdk.db.tx.Upsert({
                creator: sdk.db.address,
                uuid: argv.uuid,
                key: argv.key,
                value: new TextEncoder().encode(argv.value),
                lease: {days: 0, years: 0, minutes: 0, seconds: argv.lease, hours: 0},
                metadata: new Uint8Array()
            })
        )
        .then(() => console.log(`Key: ${argv.key}, value: ${argv.value} successfully upserted in uuid: ${argv.uuid}`))
}