import {getSdk} from "../../../../sdk/ts/test/helpers/client-helpers/sdk-helpers";
import {Argv} from "yargs";

export const command = 'crud <method> <uuid> <key>'
export const desc = 'Do a crud create'
export const builder = {}
export const handler = (argv: {method: string, uuid: string, key: string}) => {
    return getSdk()
        .then(sdk => sdk.db.q.Read({
            uuid: argv.uuid,
            key: argv.key
        }))
        .then(data => new TextDecoder().decode(data.value))
        .then(console.log)
}