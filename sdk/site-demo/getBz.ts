import {bluzelle, BluzelleSdk} from "@bluzelle/sdk-js";
import {memoize} from 'lodash'

export const getBz = memoize(() => bluzelle({
   url: "https://client.sentry.testnet.private.bluzelle.com:26657",
   mnemonic: "wink garment more rally beach before regret digital high like mandate blast labor happy few rib match valve state piece assist dentist trumpet dry",
    gasPrice: 0.002,
    maxGas: 1000000000
}))