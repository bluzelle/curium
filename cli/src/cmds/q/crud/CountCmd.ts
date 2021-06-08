import {Argv} from "yargs";
import {getSdk} from "../../../../../sdk/ts/test/helpers/client-helpers/sdk-helpers";
import {QueryCountRequest} from "../../../../../sdk/ts/src/codec/crud/query";

export const command = 'count <uuid>'
export const desc = 'Query total number of key-values in given uuid'
export const builder = (yargs: Argv) => {
    return yargs
        .help()
}
export const handler = (argv: QueryCountRequest) => {
    return getSdk()
        .then(sdk => sdk.db.q.Count({
            uuid: argv.uuid,
        }))
        .then(data => data.count)
        .then(console.log)
}