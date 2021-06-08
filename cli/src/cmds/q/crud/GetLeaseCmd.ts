import {Argv} from "yargs";
import {getSdk} from "../../../../../sdk/ts/test/helpers/client-helpers/sdk-helpers";
import {QueryGetLeaseRequest} from "../../../../../sdk/ts/src/codec/crud/query";

export const command = 'getLease <uuid> <key>'
export const desc = 'Query remaining lease time on given key in specified uuid'
export const builder = (yargs: Argv) => {
    return yargs
        .help()
}
export const handler = (argv: QueryGetLeaseRequest) => {
    return getSdk()
        .then(sdk => sdk.db.q.GetLease({
            uuid: argv.uuid,
            key: argv.key
        }))
        .then(data => [data.uuid, data.key, data.leaseBlocks.toInt()])
        .then(console.log)
}