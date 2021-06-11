import {Argv,} from "yargs";
import {getSdkByName} from "../../../helpers/sdk-helpers";

export const command = 'keyValues <uuid>'
export const desc = 'Read all key-values in specified uuid'
export const builder = (yargs: Argv) => {
    return yargs
        .usage('keyValues [uuid]')
        .help()
}
export const handler = (argv: {uuid: string, from: string, gas: string, gas_price: string, node: string}) => {
    return getSdkByName(argv.from, argv.gas_price, argv.gas, argv.node)
        .then(x => x)
        .then(sdk =>
            sdk.db.tx.KeyValues({
                creator: sdk.db.address,
                uuid: argv.uuid,
            })
        )
        .then(resp => resp.keyValues.map(kv => ({...kv, value: new TextDecoder().decode(kv.value)})))
        .then(console.log)
}