import {Argv} from "yargs";
import {readCliDir} from "../../helpers/sdk-helpers";


export const command = 'list'
export const desc = 'Show all keys stored on local file system'
export const builder = (yargs: Argv) => {
    return yargs
        .help()
}
export const handler = () => {
    return readCliDir()
        .then(x => x)
        .then(console.log)
        .then(x => x)
}


