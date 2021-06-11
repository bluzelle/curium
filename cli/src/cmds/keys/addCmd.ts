import {Argv} from "yargs";

import path from "path";
import {promises} from "fs";
import {newMnemonic} from "@bluzelle/sdk-js";

export const command = 'add <user>'
export const desc = 'Add key to local system and generate mnemonic'
export const builder = (yargs: Argv) => {
    return yargs
        .help()
}
export const handler = async (argv: {user: string})  => {
    await console.log("WRITTEN")
    return promises.appendFile(path.resolve(__dirname, `${process.env.HOME}/.curium/${argv.user}.txt`), newMnemonic(), {flag: 'ax'})
        .then(console.log.bind(null, "FINISHED"))
        .then(() => promises.readFile(path.resolve(__dirname, `${process.env.HOME}/.curium/${argv.user}.txt`), null))
        .then(buf => new TextDecoder().decode(buf))
        .then(console.log)
        .catch(() => {
            console.log(`${argv.user} already exists`)
        })

}