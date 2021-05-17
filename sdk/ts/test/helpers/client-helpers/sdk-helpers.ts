import {localChain} from "../../config"
import {bluzelle, BluzelleSdk, DbSdk} from "../../../src/bz-sdk/bz-sdk";
import {range} from "lodash";
import {Lease} from "../../../src/codec/crud/lease";


export const DEFAULT_TIMEOUT = 800000;
export const defaultLease: Lease =  {minutes: 0, seconds: 0, years: 0, hours: 1, days: 0}
export const zeroLease : Lease = {minutes: 0, seconds: 0, years: 0, hours: 0, days: 0}


export const getSdk = (): Promise<BluzelleSdk> => {
    return bluzelle({
        mnemonic: localChain.mnemonic,
        url: localChain.endpoint,
        gasPrice: 0.002,
        maxGas: 100000000
    })
}

export const encodeData = (data: string): Uint8Array =>
    new TextEncoder().encode(data)

export const decodeData = (array: Uint8Array): string =>
    new TextDecoder().decode(array)

export const createKeys = async (bz: DbSdk, count: number, uuid: string): Promise<{ keys: string[], values: string[] }> => {
    const keys = range(0, count).map(n => `key-${n}`);
    const values = range(0, count).map(n => `value-${n}`);
    await bz.withTransaction(() => keys.map((key, idx) => bz.tx.Create({
        creator: bz.address,
        uuid: uuid,
        key,
        value: encodeData(values[idx]),
        lease: defaultLease,
        metadata: new Uint8Array()
    })), {memo: ''});
    return {keys, values};
};

// export const makeKVPairs = ({keys, values}: {keys: string[], values: string[]}): {key: string, value: string}[] =>  {
//     let KV: {key: string, value: string};
//     let list: {key: string, value: string}[]
//
//     keys.
//
// }

export const newSdkClient = (sdk: BluzelleSdk): Promise<BluzelleSdk> =>

    bluzelle({
            mnemonic: bluzelle.newMnemonic(),
            url: sdk.bank.url,
            gasPrice: 0.002,
            maxGas: 300000,
        })
        .then(async (newSdk: BluzelleSdk) => {
            await sdk.bank.tx.Send({
                    fromAddress: sdk.bank.address,
                    toAddress: newSdk.bank.address,
                    amount: [{
                        amount: '1000',
                        denom: 'ubnt'
                    }]
                })
            return newSdk;
        })

export const encodeKeyValues = (keyValues: {key: string, value: string, lease?: Lease}[]): {key: string, value: Uint8Array, lease: Lease}[] =>
    keyValues
        .map(({key,value, lease}) => ({key, value: encodeData(value), lease: lease || defaultLease}))

