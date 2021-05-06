import {localChain} from "../../config"
import {bluzelle, BluzelleSdk, DbSdk} from "../../../src/bz-sdk/bz-sdk";
import {range} from "lodash";
import {Lease} from "../../../src/codec/crud/lease";
export const DEFAULT_TIMEOUT = 800000;
export const defaultLease =  {days: 10} as Lease


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

export const createKeys = async (bz: DbSdk, count: number): Promise<{ keys: string[], values: string[] }> => {
    const keys = range(0, count).map(n => `key-${n}`);
    const values = range(0, count).map(n => `value-${n}`);
    await bz.withTransaction(() => keys.map((key, idx) => bz.tx.Create({
        creator: bz.address,
        uuid: 'uuids',
        key,
        value: encodeData(values[idx]),
        lease: defaultLease,
        metadata: new Uint8Array()
    })), {memo: ''});
    return {keys, values};
};

