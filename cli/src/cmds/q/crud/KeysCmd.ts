import {Argv} from "yargs";
import {getQuerySdk} from "../../../helpers/sdk-helpers";
import {QueryKeysRequest} from "@bluzelle/sdk-js/lib/codec/crud/query";
import Long from 'long'

export const command = 'keys <uuid> [startkey] [limit]'
export const desc = 'Read all keys in uuid from the database'
export const builder = (yargs: Argv) => {
    return yargs
        .positional('uuid', {
            description: 'distinct database identifier',
            type: 'string'
        })
        .positional('startkey', {
            description: 'start key to begin pagination (non-inclusive)',
            type: 'string',
            default: ''
        })
        .positional('limit', {
            description: 'max number of keys to return',
            type: 'number',
            default: 100
        })
        .help()
}
export const handler = (argv: QueryKeysRequest & {startkey: string, limit: number} & {node: string}) => {
    return getQuerySdk(argv.node)
        .then(sdk => sdk.db.q.Keys({
            uuid: argv.uuid,
            pagination: {
                startKey: argv.startkey,
                limit: Long.fromInt(argv.limit)
            }
        }))
        .then(data => data.keys)
        .then(console.log)

}