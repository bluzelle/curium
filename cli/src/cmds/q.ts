import {Arguments, Argv} from "yargs";
import {join} from "path";


export const command = 'q <module>'
export const desc = 'query method'
export const aliases = ['query']
export const builder = (yargs: Argv) => {
    return yargs
        .commandDir(join(__dirname,`q`))
        .help()
        .demandCommand()
}
export const handler = (argv: Arguments) => {

}
