import {Argv} from "yargs";
import {getQuerySdk} from "../../../helpers/sdk-helpers";
import {QuerySearchRequest} from "@bluzelle/sdk-js/lib/codec/crud/query";
import {KeyValue} from "@bluzelle/sdk-js/lib/codec/crud/KeyValue";

export const command = 'search <uuid> <searchString>'
export const desc = 'Search uuid according to given search string'
export const builder = (yargs: Argv) => {
    return yargs
        .help()
}
export const handler = (argv: QuerySearchRequest) => {
    return getQuerySdk()
        .then(sdk => sdk.db.q.Search({
            uuid: argv.uuid,
            searchString: argv.searchString
        }))
        .then(data => data.keyValues.map((KV: KeyValue) => ({...KV, value: new TextDecoder().decode(KV.value)})))
        .then(console.log)
}