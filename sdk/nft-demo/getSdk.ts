import {bluzelle, BluzelleSdk} from "@bluzelle/sdk-js";
import {memoize} from 'lodash'
import {passThrough, passThroughAwait} from "promise-passthrough";
import delay from "delay";

export const getSdk = memoize<() => Promise<BluzelleSdk>>(() =>
    getMnemonic()
        .then(passThroughAwait(() => delay(5000)))
        .then(mnemonic =>
            bluzelle({
                mnemonic,
                url: "https://client.sentry.testnet.private.bluzelle.com:26657",
                gasPrice: 0.002,
                maxGas: 1000000000
            })
        )
);

const getMnemonic = (): Promise<string> =>
    fetch('https://client.sentry.testnet.private.bluzelle.com:1317/mint')
        .then(x => x.json())
        .then(x => x.result.mnemonic)
        .then(passThrough(mnemonic => console.log('MNEMONIC: ', mnemonic)))
