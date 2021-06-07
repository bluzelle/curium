import {Argv} from "yargs";
import yargs from 'yargs'
import {join} from "path";

export const command = 'q <command>'
export const desc = 'query method'
export const builder = (yargs: Argv) => {
    return yargs.commandDir(join(__dirname,'q'),{
        extensions: ['ts']
    })
        .help()
}
export const handler = (argv: Argv) => {

}
