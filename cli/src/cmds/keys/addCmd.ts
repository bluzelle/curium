import {Argv} from "yargs";
import path from "path";
import {promises} from "fs";
import {newMnemonic} from "@bluzelle/sdk-js";
import {decodeBufferFromFile, readUserMnemonic} from "../../helpers/sdk-helpers";

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

export const command = 'add <user>'
export const desc = 'Add key to local system and generate mnemonic'
export const builder = (yargs: Argv) => {
    return yargs
        .option('recover', {
            describe: 'recover account by providing mnemonic',
            type: 'boolean',
            default: false
        })
        .help()
}
export const handler = (argv: { user: string, recover: boolean}) => {
    return makeCliDir()
        .then(() => promptForMnemonic(argv.recover))
        .then(mnemonic => createUserFile(argv.user, mnemonic))
        .then(() => readUserMnemonic(argv.user))
        .then(console.log)
        .catch(e => console.log(e))

}




const promptForMnemonic = (recover: boolean): Promise<string> =>
    recover? new Promise((resolve) => readline.question("Please provide BIP39 mnemonic\n", (mnemonic: string) => {
        readline.close()
        return resolve(mnemonic)
    })) : Promise.resolve(newMnemonic())


const createUserFile = (user: string, mnemonic: string): Promise<void> =>
    promises.writeFile(path.resolve(__dirname, `${process.env.HOME}/.curium/cli/${user}.info`), mnemonic, {flag: 'wx'})
        .catch(e => (e.stack as string).match(/already exists/) ? function() {throw "User already exists"}() : e)


const makeCliDir = (): Promise<void> =>
    promises.mkdir(path.resolve(__dirname, `${process.env.HOME}/.curium/cli`))
        .catch(e => (e.stack as string).match(/already exists/) ? {} : e)
