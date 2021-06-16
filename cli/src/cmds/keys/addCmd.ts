import {Argv} from "yargs";
import path from "path";
import {promises} from "fs";
import {newMnemonic} from "@bluzelle/sdk-js";
import {privateEncrypt,privateDecrypt} from "crypto";
import {decodeBufferFromFile, parseToJsonObject} from "../../helpers/sdk-helpers";

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

export const command = 'add <user>'
export const desc = 'Add key to local system and generate mnemonic'
export const builder = (yargs: Argv) => {
    return yargs
        .help()
}
export const handler = async (argv: {user: string, recover: boolean})  => {
    return makeCliDir()
        .then(() => createUserFile(argv.user))
        .then(() => readUserMnemonic(argv.user))
        .then(console.log)
        .catch(e => {
            console.log(e)
        })

}

const writeNewUser = (username: string, mnemonic: string = newMnemonic()): Promise<void> =>
    promises.readFile(path.resolve(__dirname, `${process.env.HOME}/.curium/`))
        .then(decodeBufferFromFile)
        .then(parseToJsonObject)
        .then(x => x)
        .then(x => ({...x}))
        .then(x => x)
        .then(curUsers => ({...curUsers, }))
        .then(curUsers => promises.appendFile(path.resolve(__dirname, `${process.env.HOME}/.curium/Users`),  JSON.stringify(curUsers), {flag: 'w+'}))

const readUserMnemonic = (user: string): Promise<string> =>
    promises.readFile(path.resolve(__dirname, `${process.env.HOME}/.curium/cli/${user}.info`))
        .then(decodeBufferFromFile)


const promptForMnemonic = (): Promise<string> =>
    new Promise((resolve) => readline.question("Please provide BIP39 mnemonic", (mnemonic: string) => {
        readline.close()
        return resolve(mnemonic)
    }))


const createUserFile = (user: string, mnemonic: string = newMnemonic()): Promise<void> =>
    promises.access(path.resolve(__dirname, `${process.env.HOME}/.curium/cli/${user}.info`))
        .catch(e => (e.stack as string).match(/no such file/)?
            promises.writeFile(path.resolve(__dirname, `${process.env.HOME}/.curium/cli/${user}.info`),  mnemonic, {flag: 'wx'})
            :
            function (){throw e} ()
        )

const makeCliDir = () =>
    promises.mkdir(path.resolve(__dirname, `${process.env.HOME}/.curium/cli`), {mode:})
