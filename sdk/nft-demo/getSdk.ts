import {bluzelle, BluzelleSdk} from "@bluzelle/sdk-js";
import {memoize} from 'lodash'

export const getSdk = memoize<() => Promise<BluzelleSdk>>(() => bluzelle({
    mnemonic:  "act rally resist draft disease relax source tiger pumpkin civil sorry magic yard discover hurdle roast admit comfort nephew radio joke surface universe silly",
    url: "https://client.sentry.testnet.private.bluzelle.com:26657",
    gasPrice: 0.002,
    maxGas: 1000000000
}));