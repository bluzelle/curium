import {Argv} from "yargs";

import {
    createUserFile, getAccountInfoFromMnemonic,
    makeCliDir,
    readUserMnemonic
} from "../../helpers/sdk-helpers";
import {bluzelle, newMnemonic} from "@bluzelle/sdk-js";



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
    let yourMnemonic: string
    return makeCliDir()
        .then(() => promptForMnemonic(argv.recover))
        .then(mnemonic => createUserFile(argv.user, mnemonic, promptToOverrideUser))
        .then(() => readUserMnemonic(argv.user))
        .then(mnemonic => yourMnemonic = mnemonic)
        .then(getAccountInfoFromMnemonic)
        .then(info => ({...info, mnemonic: yourMnemonic}))
        .then(console.log)
        .then(() => process.exit())
}


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

export const promptForMnemonic = (recover: boolean): Promise<string> =>
    recover? new Promise((resolve) => readline.question("Please provide BIP39 mnemonic\n", (mnemonic: string) => {
        readline.pause()
        return resolve(mnemonic)
    })) : Promise.resolve(newMnemonic())

export const promptToOverrideUser = (): Promise<boolean> =>
    new Promise((resolve) => readline.question("User already exists, would you like to override? [y/N]\n", (ans: string) => {
        readline.pause();
        return resolve(ans.trim().toLowerCase() === 'y')
    }))

