import yargs, {Argv} from "yargs";
import {join} from "path";


export const command = 'tx <module>'
export const desc = 'transaction method'
export const aliases = ['transaction']
export const builder = (yargs: Argv) => {
    return yargs.commandDir(join(__dirname,'tx'),{
        extensions: ['ts']
    })
        .help()
        .demandCommand()
}
export const handler = (argv: Argv) => {

}
