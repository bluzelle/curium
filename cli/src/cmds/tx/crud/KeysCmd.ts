import {Argv,} from "yargs";
import {getSdkByName} from "../../../helpers/sdk-helpers";

export const command = 'keys <uuid>'
export const desc = 'Read all keys in specified uuid'
export const builder = (yargs: Argv) => {
    return yargs
        .usage('keys [uuid]')
        .help()
}
export const handler = (argv: {uuid: string, from: string, gas: string, gas_price: string, node: string}) => {
    return getSdkByName(argv.from, argv.gas_price, argv.gas, argv.node)
        .then(x => x)
        .then(sdk =>
            sdk.db.tx.Keys({
                creator: sdk.db.address,
                uuid: argv.uuid,
            })
        )
        .then(resp => ({...resp, pagination: {
            nextKey: resp.pagination?.nextKey,
                total: resp.pagination?.total.toInt()
            }}))
        .then(console.log)
}