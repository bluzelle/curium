import {Argv} from "yargs";
import {getSdk} from "../../../../../sdk/ts/test/helpers/client-helpers/sdk-helpers";
import {QueryKeyValuesRequest} from "../../../../../sdk/ts/src/codec/crud/query";
import {KeyValue} from "../../../../../sdk/ts/src/codec/crud/KeyValue";

export const command = 'keyValues <uuid>'
export const desc = 'Read all keys-values in uuid from the database'
export const builder = (yargs: Argv) => {
    return yargs
        .help()
}
export const handler = (argv: QueryKeyValuesRequest) => {
    return getSdk()
        .then(sdk => sdk.db.q.KeyValues({
            uuid: argv.uuid
        }))
        .then(data => data.keyValues.map((KV: KeyValue) => ({...KV, value: new TextDecoder().decode(KV.value)})))
        .then(console.log)
}