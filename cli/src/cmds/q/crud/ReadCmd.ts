import {getSdk} from "../../../../../sdk/ts/test/helpers/client-helpers/sdk-helpers";
import {Arguments, Argv} from "yargs";
import {QueryReadRequest} from "../../../../../sdk/ts/src/codec/crud/query";

export const command = 'read <uuid> <key>'
export const desc = 'Read a key-value from the database'
export const builder = (yargs: Argv) => {
    return yargs
        .help()
}
export const handler = (argv: QueryReadRequest) => {
    return getSdk()
        .then(sdk => sdk.db.q.Read({
            uuid: argv.uuid,
            key: argv.key
        }))
        .then(data => new TextDecoder().decode(data.value))
        .then(console.log)
}