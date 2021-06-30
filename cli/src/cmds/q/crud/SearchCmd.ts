import {Argv} from "yargs";
import {getQuerySdk} from "../../../helpers/sdk-helpers";
import {QuerySearchRequest} from "@bluzelle/sdk-js/lib/codec/crud/query";
import {KeyValue} from "@bluzelle/sdk-js/lib/codec/crud/KeyValue";
import Long from 'long'

export const command = 'search <uuid> <prefix> [startkey] [limit]'
export const desc = 'Search uuid according to given search string'
export const builder = (yargs: Argv) => {
    return yargs
        .positional('uuid', {
            description: 'distinct database identifier',
            type: 'string'
        })
        .positional('prefix', {
            description: 'string to search by key in database',
            type: 'string',
            alias: 'searchString'
        })
        .positional('startkey', {
            description: 'start key to begin pagination',
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
export const handler = (argv: QuerySearchRequest & {startkey: string, limit: number} & {node: string}) => {
    return getQuerySdk(argv.node)
        .then(sdk => sdk.db.q.Search({
            uuid: argv.uuid,
            searchString: argv.searchString,
            pagination: {
                limit: Long.fromInt(argv.limit),
                startKey: argv.startkey
            }
        }))
        .then(data => data.keyValues.map((KV: KeyValue) => ({...KV, value: new TextDecoder().decode(KV.value)})))
        .then(console.log)

}