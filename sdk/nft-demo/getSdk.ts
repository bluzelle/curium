import {bluzelle, BluzelleSdk} from "@bluzelle/sdk-js";
import {memoize} from 'lodash'
import {passThrough, passThroughAwait} from "promise-passthrough";
import delay from "delay";

export const getUrl = (prodPort: number, devPort: number, path: string = '') =>
    process.env.NODE_ENV === 'development' ? `http://localhost:${devPort}${path}` : `https://client.sentry.testnet.private.bluzelle.com:${prodPort}${path}`;


export const getSdk = memoize<() => Promise<BluzelleSdk>>(() =>
    getMnemonic()
        .then(passThroughAwait(() => delay(5000)))
        .then(mnemonic =>
            bluzelle({
                mnemonic,
                url: getUrl(26657, 26657),
                gasPrice: 0.002,
                maxGas: 1000000000
            })
        )
);

const getMnemonic = (): Promise<string> =>
    fetch(getUrl(1317, 1317,'/mint'))
        .then(x => x.json())
        .then(x => x.result.mnemonic)
        .then(passThrough(mnemonic => console.log('MNEMONIC: ', mnemonic)))
