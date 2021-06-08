import {Argv} from "yargs";
import {getSdk} from "../../../../../sdk/ts/test/helpers/client-helpers/sdk-helpers";
import {QueryKeysRequest} from "../../../../../sdk/ts/src/codec/crud/query";

export const command = 'keys <uuid>'
export const desc = 'Read all keys in uuid from the database'
export const builder = (yargs: Argv) => {
    return yargs
        .help()
}
export const handler = (argv: QueryKeysRequest) => {
    return getSdk()
        .then(sdk => sdk.db.q.Keys({
            uuid: argv.uuid
        }))
        .then(data => data.keys)
        .then(console.log)
}