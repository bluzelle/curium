import {Argv} from "yargs";
import {getQuerySdk} from "../../../helpers/sdk-helpers";
import { QueryGetNShortestLeasesRequest} from "@bluzelle/sdk-js/lib/codec/crud/query";

export const command = 'getnshortestleases <uuid> <num>'
export const desc = 'Query remaining lease time of [num] shortest leases in [uuid]'
export const builder = (yargs: Argv) => {
    return yargs
        .positional('uuid', {
            description: 'distinct database identifier',
            type: 'string'
        })
        .positional('num', {
            description: 'number of keyLease objects to return',
            type: "number"
        })
        .help()
}
export const handler = (argv: QueryGetNShortestLeasesRequest & {node: string}) => {
    return getQuerySdk(argv.node)
        .then(sdk => sdk.db.q.GetNShortestLeases({
            uuid: argv.uuid,
            num: argv.num
        }))
        .then(console.log)

}