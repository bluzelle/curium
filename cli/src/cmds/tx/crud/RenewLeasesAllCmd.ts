import {Argv,} from "yargs";
import {getSdkByName} from "../../../helpers/sdk-helpers";
import {Lease} from "@bluzelle/sdk-js/lib/codec/hackathon-crud/lease";

export const command = 'renewLeasesAll <uuid> <lease>'
export const desc = 'Renew leases of all key-values in uuid'
export const builder = (yargs: Argv) => {
    return yargs
        .usage('renewLeasesAll [uuid] [lease]')
        .help()
}
export const handler = (argv: {uuid: string, lease: string, from: string, gas: string, gas_price: string, node: string}) => {
    return getSdkByName(argv.from, argv.gas_price, argv.gas, argv.node)
        .then(x => x)
        .then(sdk =>
            sdk.db.tx.RenewLeasesAll({
                creator: sdk.db.address,
                uuid: argv.uuid,
                lease: {seconds: parseInt(argv.lease)} as Lease
            })
        )
        .then(() => console.log(`Leases renewed for ${argv.lease} seconds in uuid: ${argv.uuid}`))
        .catch(e => console.log(e))
}