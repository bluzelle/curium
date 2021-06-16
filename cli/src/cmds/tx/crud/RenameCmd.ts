import {Argv,} from "yargs";
import {getSdkByName} from "../../../helpers/sdk-helpers";

export const command = 'rename <uuid> <key> <newKey>'
export const desc = 'Rename a key-value from the database'
export const builder = (yargs: Argv) => {
    return yargs
        .usage('create [uuid] [key] [newKey]')
        .help()
}
export const handler = (argv: {uuid: string, key: string, newKey: string, from: string, gas: string, gas_price: string, node: string}) => {
    return getSdkByName(argv.from, argv.gas_price, argv.gas, argv.node)
        .then(x => x)
        .then(sdk =>
            sdk.db.tx.Rename({
                creator: sdk.db.address,
                uuid: argv.uuid,
                key: argv.key,
                newKey: argv.newKey
            })
        )
        .then(() => console.log(`Key: ${argv.key} was renamed to ${argv.newKey} in uuid: ${argv.uuid}`))
        .catch(e => console.log(e))
}