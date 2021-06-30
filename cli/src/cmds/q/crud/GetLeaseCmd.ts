import {Argv} from "yargs";
import {getQuerySdk} from "../../../helpers/sdk-helpers";
import {QueryGetLeaseRequest} from "@bluzelle/sdk-js/lib/codec/crud/query";

export const command = 'getlease <uuid> <key>'
export const desc = 'Query remaining lease time on given key in specified uuid'
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
export const handler = (argv: QueryGetLeaseRequest & {node: string}) => {
    return getQuerySdk(argv.node)
        .then(sdk => sdk.db.q.GetLease({
            uuid: argv.uuid,
            key: argv.key
        }))
        .then(console.log)

}