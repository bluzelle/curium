import {Argv} from "yargs";
import {getQuerySdk} from "../../../helpers/sdk-helpers";
import {QueryHasRequest} from "@bluzelle/sdk-js/lib/codec/crud/query";

export const command = 'has <uuid> <key>'
export const desc = 'Check if the specified key exists in given uuid'
export const builder = (yargs: Argv) => {
    return yargs
        .positional('uuid', {
            description: 'distinct database identifier',
            type: 'string'
        })
        .positional('key', {
            description: 'key to read',
            type: 'string'
        })
        .help()
}
export const handler = (argv: QueryHasRequest & {node: string}) => {
    return getQuerySdk(argv.node)
        .then(sdk => sdk.db.q.Has({
            uuid: argv.uuid,
            key: argv.key
        }))
        .then(data => data.has)
        .then(console.log)
        .catch(console.log)
}