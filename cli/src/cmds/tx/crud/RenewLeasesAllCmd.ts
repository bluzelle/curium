import {Argv,} from "yargs";
import {Flags, getSdkByName} from "../../../helpers/sdk-helpers";
import {Lease} from "@bluzelle/sdk-js/lib/codec/hackathon-crud/lease";

export const command = 'renewLeasesAll <uuid> <lease>'
export const desc = 'Renew leases of all key-values in uuid'
export const builder = (yargs: Argv) => {
    return yargs
        .positional('uuid', {
            description: 'distinct database identifier',
            type: 'string'
        })
        .positional('lease', {
            description: 'new life-span of all key-values in seconds',
            type: 'number'
        })
        .help()
}
export const handler = (argv: {uuid: string, lease: number} & Flags) => {
    return getSdkByName(argv.from, argv.gasPrice, argv.gas, argv.node)
        .then(x => x)
        .then(sdk =>
            sdk.db.tx.RenewLeasesAll({
                creator: sdk.db.address,
                uuid: argv.uuid,
                lease: {seconds: argv.lease} as Lease
            })
        )
        .then(() => console.log(`Leases renewed for ${argv.lease} seconds in uuid: ${argv.uuid}`))
}