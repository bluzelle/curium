import {localChain} from "../../config"
import {bluzelle, BluzelleSdk, DbSdk} from "../../../src/bz-sdk/bz-sdk";
import {range} from "lodash";
import {Lease} from "../../../src/codec/crud/lease";
import delay from "delay";
import {passThroughAwait} from "promise-passthrough";

global.fetch = require('node-fetch')


export const DEFAULT_TIMEOUT = 800000;
export const defaultLease: Lease = {minutes: 0, seconds: 0, years: 0, hours: 1, days: 0}
export const zeroLease: Lease = {minutes: 0, seconds: 0, years: 0, hours: 0, days: 0}
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';

export const getSdk = (mnemonic: string): Promise<BluzelleSdk> => {
    return bluzelle({
        //mnemonic: "urge crisp birth cotton rely reflect demise carry donor nut daughter ankle spoil breeze usual name absurd stumble typical early announce before machine street",
        mnemonic,
        url: 'http://localhost:26667',
        //url: 'https://client.sentry.testnet.private.bluzelle.com:26657',
        gasPrice: 0.002,
        maxGas: 1000000000
    })
}

export const getMintedAccount = (): Promise<any> => {
    return delay(10000)
        .then(() => fetch('https://client.sentry.testnet.private.bluzelle.com:26657/mint'))
        .then(resp => resp.json())
        .then(obj => obj.result)
        .then(passThroughAwait(() => delay(10000)))
}

export const checkBalance = (address: string): Promise<boolean> => {
    return fetch(`http://localhost:1327/bank/balances/${address}`)
        .then(resp => resp.json())
        .then(resp => !!resp.result[0]?.amount)
}

export const convertBase64ToString = (base64Encoded: string): string =>
    Buffer.from(base64Encoded, 'base64').toString()

export const convertStringtoBase64 = (ascii: string): string =>
    Buffer.from(ascii).toString('base64')

export const parseJSONCliStdout = ({stdout}: { stdout: string }): any =>
    JSON.parse(stdout)

export const parseJSONCliStderr = ({stderr}: { stderr: string }): any =>
    JSON.parse(stderr)

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

export const encodeKeyValues = (keyValues: { key: string, value: string, lease?: Lease }[]): { key: string, value: Uint8Array, lease: Lease }[] =>
    keyValues
        .map(({key, value, lease}) => ({key, value: encodeData(value), lease: lease || defaultLease}))

