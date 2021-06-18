import {Arguments, Argv} from "yargs";
import {join} from "path";

export const command = 'crud <method>'
export const desc = 'query crud method'

export const builder = (yargs: Argv) => {
    return yargs
        .commandDir(join(__dirname,`crud`))
        .option('node', {
            describe: 'node to connect to',
            type: 'string',
            default: 'https://client.sentry.testnet.private.bluzelle.com:26657'
        })
        .help()
        .demandCommand()
}
export const handler = (argv: Arguments) => {

}
