import {Arguments, Argv} from "yargs";
import {join} from "path";


export const command = 'q <module>'
export const desc = 'query method for specified module'
export const aliases = ['query']
export const builder = (yargs: Argv) => {
    return yargs
        .commandDir(join(__dirname,`q`))
        .help()
        .demandCommand()
        .recommendCommands()
}
export const handler = (argv: Arguments) => {

}
