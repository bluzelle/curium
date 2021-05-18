import {bluzelle, BluzelleSdk} from "@bluzelle/sdk-js";
import {memoize} from 'lodash'

export const getSdk = memoize<() => Promise<BluzelleSdk>>(() => bluzelle({
    mnemonic:  "shell output flower talent burst salad fox wreck actress huge real blur welcome frozen tape exit wheel curve kid intact utility target rice maze",
    url: "http://localhost:26657",
    gasPrice: 0.002,
    maxGas: 1000000000
}));