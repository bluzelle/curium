
import {Argv} from "yargs";

import {getQuerySdk} from "../../../helpers/sdk-helpers";
import {QueryReadRequest} from "@bluzelle/sdk-js/lib/codec/crud/query";

export const command = 'read <uuid> <key>'
export const desc = 'Read a key-value from the database'
export const builder = (yargs: Argv) => {
    return yargs
        .positional('uuid', {
            description: 'distinct database identifier',
            type: 'string',
        })
        .positional('key', {
            description: 'key to read',
            type: 'string',
        })
        .help()
}
export const handler = (argv: QueryReadRequest & {node: string}): Promise<void> => {
    return getQuerySdk(argv.node)
        .then(sdk => sdk.db.q.Read({
            uuid: argv.uuid.toString(),
            key: argv.key.toString()
        }))
        .then(data => new TextDecoder().decode(data.value))
        .then(console.log)

}