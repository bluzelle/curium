import {Arguments, Argv} from "yargs";
import {join} from "path";

export const command = 'crud <method>'
export const desc = 'query crud method'

export const builder = (yargs: Argv) => {
    return yargs
        .commandDir(join(__dirname,`crud`),{
            extensions: ['ts']
        })
        .help()
        .demandCommand()
}
export const handler = (argv: Arguments) => {

}
