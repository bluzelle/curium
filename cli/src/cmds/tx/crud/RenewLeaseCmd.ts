import {Argv,} from "yargs";
import {getSdkByName} from "../../../helpers/sdk-helpers";
import {Lease} from "@bluzelle/sdk-js/lib/codec/hackathon-crud/lease";

export const command = 'renewLease <uuid> <key> <lease>'
export const desc = 'Renew lease of a key-value in the database'
export const builder = (yargs: Argv) => {
    return yargs
        .usage('renewLease [uuid] [key] [lease]')
        .help()
}
export const handler = (argv: {uuid: string, key: string, lease: string, from: string, gas: string, gas_price: string, node: string}) => {
    return getSdkByName(argv.from, argv.gas_price, argv.gas, argv.node)
        .then(x => x)
        .then(sdk =>
            sdk.db.tx.RenewLease({
                creator: sdk.db.address,
                uuid: argv.uuid,
                key: argv.key,
                lease: {seconds: parseInt(argv.lease)} as Lease
            })
        )
        .then(() => console.log(`Lease renewed for ${argv.lease} seconds for Key: ${argv.key} in uuid: ${argv.uuid}`))
        .catch(e => console.log(e))
}