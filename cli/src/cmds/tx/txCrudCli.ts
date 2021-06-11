import {Arguments, Argv} from "yargs";
import {join} from "path";

export const command = 'crud <method>'
export const desc = 'transaction crud method'

export const builder = (yargs: Argv) => {
    return yargs
        .commandDir(join(__dirname,`crud`))
        .option('from', {
            describe: 'payer address',
            type: "string"
        })
        .option('gas', {
            describe: 'maximum gas willing to consume',
            type: "string"
        })
        .option('gas_price', {
            describe: 'minimum gas price in ubnt i.e. 0.002ubnt',
            type: "string"
        })
        .option('node', {
            describe: 'node to connect to',
            type: 'string'
        })
        .demandOption(['from', 'gas', 'gas_price', 'node'], 'Must fill transaction details')
        .help()
        .demandCommand()
}
export const handler = (argv: Arguments) => {

}