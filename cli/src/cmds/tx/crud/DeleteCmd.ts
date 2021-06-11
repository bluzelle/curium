import {Argv,} from "yargs";
import {getSdkByName} from "../../../helpers/sdk-helpers";

export const command = 'delete <uuid> <key>'
export const desc = 'remove a key-value from the database'
export const builder = (yargs: Argv) => {
    return yargs
        .usage('delete [uuid] [key]')
        .help()
}
export const handler = (argv: {uuid: string, key: string, from: string, gas: string, gas_price: string, node: string}) => {
    return getSdkByName(argv.from, argv.gas_price, argv.gas, argv.node)
        .then(x => x)
        .then(sdk =>
            sdk.db.tx.Delete({
                creator: sdk.db.address,
                uuid: argv.uuid,
                key: argv.key,
            })
        )
        .then(console.log.bind(null, "KEY-VALUE SUCCESSFULLY DELETED"))
}