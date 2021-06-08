import {Argv} from "yargs";
import {getSdk} from "../../../../../sdk/ts/test/helpers/client-helpers/sdk-helpers";
import {QuerySearchRequest} from "../../../../../sdk/ts/src/codec/crud/query";
import {KeyValue} from "../../../../../sdk/ts/src/codec/crud/KeyValue";

export const command = 'search <uuid> <searchString>'
export const desc = 'Search uuid according to given search string'
export const builder = (yargs: Argv) => {
    return yargs
        .help()
}
export const handler = (argv: QuerySearchRequest) => {
    return getSdk()
        .then(sdk => sdk.db.q.Search({
            uuid: argv.uuid,
            searchString: argv.searchString
        }))
        .then(data => data.keyValues.map((KV: KeyValue) => ({...KV, value: new TextDecoder().decode(KV.value)})))
        .then(console.log)
}