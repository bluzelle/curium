import {Argv} from "yargs";

import {getQuerySdk} from "../../../helpers/sdk-helpers";
import {QueryMyKeysRequest} from "@bluzelle/sdk-js/lib/codec/crud/query";
import Long from 'long'

export const command = 'mykeys <address> <uuid> [startkey] [limit]'
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
export const handler = (argv: QueryMyKeysRequest & {startkey: string, limit: number} & {node: string}) => {
    return getQuerySdk(argv.node)
        .then(sdk => sdk.db.q.MyKeys({
            address: argv.address,
            uuid: argv.uuid,
            pagination: {
                startKey: argv.startkey,
                limit: Long.fromInt(argv.limit)
            }
        }))
        .then(data => data.keys)
        .then(console.log)

}