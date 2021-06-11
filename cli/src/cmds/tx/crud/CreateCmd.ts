
import {Argv,} from "yargs";
import {TextEncoder} from "util";
import {getSdkByName} from "../../../helpers/sdk-helpers";


export const getCrudCmdType = (cmd: string, msgTypes: Record<string, any>): any =>
    msgTypes[cmd];

export const command = 'create <uuid> <key> <value> <lease>'
export const desc = 'Create a key-value from the database'
export const builder = (yargs: Argv) => {
    return yargs
        .command('uuid', 'uuid to create key-value in')
        .option('from', {
            describe: 'payer address',
            type: "string"
        })
        .option('gas', {
            describe: 'maximum gas willing to consume',
            type: "string"
        })
        .option('gas_price', {
            describe: 'minimum gas price in ubnt i.e. 0.02ubnt',
            type: "string"
        })
        .option('node', {
            describe: 'node to connect to',
            type: 'string'
        })
        .demandOption(['from', 'gas', 'gas_price', 'node'], 'Must fill transaction details')
        .help()
        .argv
}
export const handler = (argv: {uuid: string, key: string, value: string, from: string, gas: string, gas_price: string, node: string}) => {
    return getSdkByName(argv.from, argv.gas_price, argv.gas, argv.node)
        .then(x => x)
        .then(sdk =>
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid: argv.uuid,
                key: argv.key,
                value: new TextEncoder().encode(argv.value),
                lease: {days: 0, years: 0, minutes: 0, seconds: 0, hours: 0},
                metadata: new Uint8Array()
            })
        )
        .then(console.log.bind(null, "KEY-VALUE SUCCESSFULLY CREATED"))
        .catch(x => x)
}