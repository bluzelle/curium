import {Argv,} from "yargs";
import {getSdkByName} from "../../../helpers/sdk-helpers";

export const command = 'deleteAll <uuid>'
export const desc = 'remove all key-values from specified uuid'
export const builder = (yargs: Argv) => {
    return yargs
        .usage('deleteAll [uuid]')
        .help()
}
export const handler = (argv: {uuid: string, from: string, gas: string, gas_price: string, node: string}) => {
    return getSdkByName(argv.from, argv.gas_price, argv.gas, argv.node)
        .then(x => x)
        .then(sdk =>
            sdk.db.tx.DeleteAll({
                creator: sdk.db.address,
                uuid: argv.uuid,
            })
        )
        .then(console.log.bind(null, `${argv.uuid} HAS BEEN CLEARED SUCCESSFULLY`))
}