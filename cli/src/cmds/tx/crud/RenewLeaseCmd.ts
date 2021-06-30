import {Argv,} from "yargs";
import {Flags, getSdkByName} from "../../../helpers/sdk-helpers";
import {Lease} from "@bluzelle/sdk-js/lib/codec/hackathon-crud/lease";

export const command = 'renewlease <uuid> <key> <lease>'
export const desc = 'Renew lease of a key-value in the database'
export const builder = (yargs: Argv) => {
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
        .help()
}
export const handler = (argv: {uuid: string, key: string, lease: number} & Flags) => {
    return getSdkByName(argv.from, argv.gasPrice, argv.gas, argv.node)
        .then(x => x)
        .then(sdk =>
            sdk.db.tx.RenewLease({
                creator: sdk.db.address,
                uuid: argv.uuid,
                key: argv.key,
                lease: {seconds: argv.lease} as Lease
            })
        )
        .then(() => console.log(`Lease renewed for ${argv.lease} seconds for Key: ${argv.key} in uuid: ${argv.uuid}`))
}