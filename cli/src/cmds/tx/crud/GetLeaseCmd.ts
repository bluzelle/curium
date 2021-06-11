import {Argv,} from "yargs";
import {getSdkByName} from "../../../helpers/sdk-helpers";

export const command = 'getLease <uuid> <key>'
export const desc = 'Get remaining leasetime in seconds of a key-value from the database'
export const builder = (yargs: Argv) => {
    return yargs
        .usage('getLease [uuid] [key]')
        .help()
}
export const handler = (argv: {uuid: string, key: string, from: string, gas: string, gas_price: string, node: string}) => {
    return getSdkByName(argv.from, argv.gas_price, argv.gas, argv.node)
        .then(sdk =>
            sdk.db.tx.GetLease({
                creator: sdk.db.address,
                uuid: argv.uuid,
                key: argv.key,
            })
        )
        .then(resp => resp)
        .then(console.log)
}