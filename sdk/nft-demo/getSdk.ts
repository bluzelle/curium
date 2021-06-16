import {bluzelle, BluzelleSdk} from "@bluzelle/sdk-js";
import {memoize} from 'lodash'

export const getSdk = memoize<() => Promise<BluzelleSdk>>(() => bluzelle({
    mnemonic:  "spray february raccoon spawn group angry able health special effort humor radio misery ability spin leopard girl visa clay topic earth arch cargo panel",
    url: "https://client.sentry.testnet.private.bluzelle.com:26657",
    gasPrice: 0.002,
    maxGas: 1000000000
}));