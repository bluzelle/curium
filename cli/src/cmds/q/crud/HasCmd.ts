import {Argv} from "yargs";
import {getSdk} from "../../../../../sdk/ts/test/helpers/client-helpers/sdk-helpers";
import {QueryHasRequest} from "../../../../../sdk/ts/src/codec/crud/query";

export const command = 'has <uuid> <key>'
export const desc = 'Check if the specified key exists in given uuid'
export const builder = (yargs: Argv) => {
    return yargs
        .help()
}
export const handler = (argv: QueryHasRequest) => {
    return getSdk()
        .then(sdk => sdk.db.q.Has({
            uuid: argv.uuid,
            key: argv.key
        }))
        .then(data => data.has)
        .then(console.log)
}