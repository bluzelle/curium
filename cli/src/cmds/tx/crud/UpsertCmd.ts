import {Argv,} from "yargs";
import {TextEncoder} from "util";
import {getSdkByName} from "../../../helpers/sdk-helpers";


export const getCrudCmdType = (cmd: string, msgTypes: Record<string, any>): any =>
    msgTypes[cmd];

export const command = 'upsert <uuid> <key> <value> <lease>'
export const desc = 'Upsert a key-value from the database'
export const builder = (yargs: Argv) => {
    return yargs
        .usage('upsert [uuid] [key] [value] [lease]')
        .help()
}
export const handler = (argv: {uuid: string, key: string, value: string, lease: string, from: string, gas: string, gas_price: string, node: string}) => {
    return getSdkByName(argv.from, argv.gas_price, argv.gas, argv.node)
        .then(sdk =>
            sdk.db.tx.Upsert({
                creator: sdk.db.address,
                uuid: argv.uuid,
                key: argv.key,
                value: new TextEncoder().encode(argv.value),
                lease: {days: 0, years: 0, minutes: 0, seconds: parseInt(argv.lease), hours: 0},
                metadata: new Uint8Array()
            })
        )
        .then(console.log.bind(null, "KEY-VALUE SUCCESSFULLY UPSERTED"))
}