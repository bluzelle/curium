import {Argv} from "yargs";

import {
    getUserInfo,

} from "../../helpers/sdk-helpers";


export const command = 'show <user>'
export const desc = 'Show key info of specified user or bluzelle address'
export const builder = (yargs: Argv) => {
    return yargs
        .positional('user', {
            describe: 'name of user or bluzelle address',
            type: 'string'
        })
        .help()
}
export const handler = (argv: { user: string }) => {
    return getUserInfo(argv.user)
        .then(console.log)
        .then(() => process.exit())
}






