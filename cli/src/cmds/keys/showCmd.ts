import {Argv} from "yargs";

import {
    getUserInfo,

} from "../../helpers/sdk-helpers";


export const command = 'show <user>'
export const desc = 'Show key info of specified user'
export const builder = (yargs: Argv) => {
    return yargs
        .positional('user', {
            describe: 'name of user',
            type: 'string'
        })
        .option('address', {
            describe: 'return the bluzelle address',
            alias: 'a',
            type: 'boolean',
            default: false
    })
        .help()
}
export const handler = (argv: { user: string, address: boolean }) => {
    return getUserInfo(argv.user)
        .then(info => argv.address? info.address : info)
        .then(console.log)
        .then(() => process.exit())
}






