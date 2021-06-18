import {Argv,} from "yargs";
import {Flags, getSdkByName} from "../../../helpers/sdk-helpers";

export const command = 'deleteAll <uuid>'
export const desc = 'Remove all key-values from specified uuid'
export const builder = (yargs: Argv) => {
    return yargs
        .positional('uuid', {
            description: 'distinct database identifier to clear',
            type: 'string'
        })
        .help()
}
export const handler = (argv: {uuid: string} & Flags) => {
    return getSdkByName(argv.from, argv.gasPrice, argv.gas, argv.node)
        .then(x => x)
        .then(sdk =>
            sdk.db.tx.DeleteAll({
                creator: sdk.db.address,
                uuid: argv.uuid,
            })
        )
        .then(() => console.log(`Uuid: ${argv.uuid} has been cleared`))
        .catch(e => console.log(e))
}