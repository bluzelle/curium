import {Argv} from "yargs";

import {
    createUserFile,
    makeCliDir,
    readUserMnemonic
} from "../../helpers/sdk-helpers";
import {newMnemonic} from "@bluzelle/sdk-js";



export const command = 'add <user>'
export const desc = 'Add key to local system and generate mnemonic'
export const builder = (yargs: Argv) => {
    return yargs
        .option('recover', {
            describe: 'recover account by providing mnemonic',
            type: 'boolean',
            default: false
        })
        .positional('user', {
            describe: 'name of user account to create',
            type: 'string'
        })
        .help()
}
export const handler = (argv: { user: string, recover: boolean}) => {
    return makeCliDir()
        .then(() => promptForMnemonic(argv.recover))
        .then(mnemonic => createUserFile(argv.user, mnemonic))
        .then(() => readUserMnemonic(argv.user))
        .then(console.log)

}


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

export const promptForMnemonic = (recover: boolean): Promise<string> =>
    recover? new Promise((resolve) => readline.question("Please provide BIP39 mnemonic\n", (mnemonic: string) => {
        readline.close()
        return resolve(mnemonic)
    })) : Promise.resolve(newMnemonic())



