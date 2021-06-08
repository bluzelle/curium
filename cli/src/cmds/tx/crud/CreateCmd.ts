import {defaultLease, getSdk} from "../../../../../sdk/ts/test/helpers/client-helpers/sdk-helpers";
import {Argv} from "yargs";
import * as CrudMsgTypes from "../../../../../sdk/ts/lib/codec/crud/tx";
import {TextEncoder} from "util";
import {bluzelle} from "../../../../../sdk/ts/src/bz-sdk/bz-sdk";


export const getCrudCmdType = (cmd: string, msgTypes: Record<string, any>): any =>
    msgTypes[cmd];

export const command = 'crud Create [uuid] [key] [value]'
export const desc = 'Create a key-value from the database'
export const builder = (yargs: Argv) => {
    return yargs
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
        .demandOption(['from', 'gas', 'gas_price'], 'Must fill transaction details')
        .help()
        .argv
}
export const handler = (argv: {uuid: string, key: string, value: string, from: string, gas: string, gas_price: string}) => {
    return bluzelle({
        gasPrice: parseFloat(argv.gas_price),
        maxGas: parseInt(argv.gas),
        url: "http://localhost:26657"
    })
        .then(sdk =>
            sdk.db.tx.Create({
                creator: sdk.db.address,
                uuid: argv.uuid,
                key: argv.key,
                value: new TextEncoder().encode(argv.value),
                lease: defaultLease,
                metadata: new Uint8Array()
            })
        )
        .then(x => x)
        .then(console.log.bind(null, "KEY-VALUE SUCCESSFULLY CREATED"))
}