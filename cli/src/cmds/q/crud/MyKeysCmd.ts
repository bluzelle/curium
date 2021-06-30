import {Argv} from "yargs";

import {getQuerySdk} from "../../../helpers/sdk-helpers";
import {QueryMyKeysRequest} from "@bluzelle/sdk-js/lib/codec/crud/query";

export const command = 'mykeys <address> <uuid>'
export const desc = 'Read all keys in uuid owned by given address'
export const builder = (yargs: Argv) => {
    return yargs
        .positional('uuid', {
            description: 'distinct database identifier',
            type: 'string'
        })
        .positional('address', {
            description: 'key-value creator address',
            type: 'string'
        })
        .help()
}
export const handler = (argv: QueryMyKeysRequest & {node: string}) => {
    return getQuerySdk(argv.node)
        .then(sdk => sdk.db.q.MyKeys({
            address: argv.address,
            uuid: argv.uuid
        }))
        .then(data => data.keys)
        .then(console.log)

}