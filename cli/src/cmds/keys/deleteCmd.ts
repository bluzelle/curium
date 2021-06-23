import {Argv} from "yargs";

import {removeUserFile} from "../../helpers/sdk-helpers";



export const command = 'delete <user>'
export const desc = 'Remove key to local system and generate mnemonic'
export const builder = (yargs: Argv) => {
    return yargs
        .positional('user', {
            describe: 'name of user account to create',
            type: 'string'
        })
        .help()
}
export const handler = (argv: { user: string }) =>
    removeUserFile(argv.user)
        .then(() => console.log(`Removed ${argv.user} from local keyring`))
        .then(() => process.exit())
