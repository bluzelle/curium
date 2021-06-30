import {Argv,} from "yargs";
import {TextEncoder} from "util";
import {Flags, getSdkByName} from "../../../helpers/sdk-helpers";
import {KeyValue, KeyValueLease} from "@bluzelle/sdk-js/lib/codec/crud/KeyValue";
import {Lease} from "@bluzelle/sdk-js/lib/codec/crud/lease";


export const command = 'multiupdate <uuid> <keyvalues..>'
export const desc = 'Update multiple key values'
export const builder = (yargs: Argv) => {
    return yargs
        .positional('uuid', {
            description: 'distinct database identifier',
            type: 'string'
        })
        .positional('keyvalues', {
            description: 'sequential triplets [key1] [value1] [lease1] ... [keyN] [valueN] [leaseN]',
        })
        .help()
}
export const handler = (argv: {uuid: string, keyvalues: string[]} & Flags) => {
    return getSdkByName(argv.from, argv.gasPrice, argv.gas, argv.node)
        .then(sdk =>
            parseKeyValues(argv.keyvalues)
                .then(keyValues => sdk.db.tx.MultiUpdate({
                    creator: sdk.db.address,
                    uuid: argv.uuid,
                    keyValues
                }))
        )
        .then(() => console.log(`Given set of key-values successfully updated in uuid: ${argv.uuid}`))
}

const parseKeyValues = (keyValueLeases: string[]): Promise<KeyValueLease[]> => {
    let parsedKeyValues: KeyValueLease[] = []
    if (keyValueLeases.length % 3 == 0 ) {
        for (let i = 0; i < keyValueLeases.length; i+=3 ) {
            let keyValueLease: KeyValueLease = {
                key: keyValueLeases[i],
                value: new TextEncoder().encode(keyValueLeases[i + 1]),
                lease: {seconds: parseInt(keyValueLeases[i + 2])} as Lease
            }

            parsedKeyValues.push(keyValueLease)
        }
        return Promise.resolve(parsedKeyValues)
    }

    throw "invalid set of key-value-leases inputted"
}