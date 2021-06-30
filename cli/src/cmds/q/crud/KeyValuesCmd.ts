import {Argv} from "yargs";


import {getQuerySdk} from "../../../helpers/sdk-helpers";
import {KeyValue} from "@bluzelle/sdk-js/lib/codec/crud/KeyValue";
import {QueryKeyValuesRequest} from "@bluzelle/sdk-js/lib/codec/crud/query";
import Long from 'long'

export const command = 'keyvalues <uuid> [startkey] [limit]'
export const desc = 'Read all keys-values in uuid from the database'
export const builder = (yargs: Argv) => {
    return yargs
        .positional('uuid', {
            description: 'distinct database identifier',
            type: 'string'
        })
        .positional('startkey', {
            description: 'start key to begin pagination (inclusive)',
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
export const handler = (argv: QueryKeyValuesRequest & {startkey: string, limit: number} & {node: string}) => {
    return getQuerySdk(argv.node)
        .then(sdk => sdk.db.q.KeyValues({
            uuid: argv.uuid,
            pagination: {
                startKey: argv.startkey,
                limit: Long.fromInt(argv.limit)
            }
        }))
        .then(data => data.keyValues.map((KV: KeyValue) => ({...KV, value: new TextDecoder().decode(KV.value)})))
        .then(console.log)

}