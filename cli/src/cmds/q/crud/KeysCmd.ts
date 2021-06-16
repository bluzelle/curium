import {Argv} from "yargs";
import {getQuerySdk} from "../../../helpers/sdk-helpers";
import {QueryKeysRequest} from "@bluzelle/sdk-js/lib/codec/crud/query";

export const command = 'keys <uuid>'
export const desc = 'Read all keys in uuid from the database'
export const builder = (yargs: Argv) => {
    return yargs
        .help()
}
export const handler = (argv: QueryKeysRequest & {node: string}) => {
    return getQuerySdk(argv.node)
        .then(sdk => sdk.db.q.Keys({
            uuid: argv.uuid
        }))
        .then(data => data.keys)
        .then(console.log)
        .catch(console.log)
}