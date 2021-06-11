
import {Argv} from "yargs";

import {getQuerySdk} from "../../../helpers/sdk-helpers";
import {QueryReadRequest} from "@bluzelle/sdk-js/lib/codec/crud/query";

export const command = 'read <uuid> <key>'
export const desc = 'Read a key-value from the database'
export const builder = (yargs: Argv) => {
    return yargs
        .help()
}
export const handler = (argv: QueryReadRequest) => {
    return getQuerySdk()
        .then(sdk => sdk.db.q.Read({
            uuid: argv.uuid,
            key: argv.key
        }))
        .then(data => new TextDecoder().decode(data.value))
        .then(console.log)
}