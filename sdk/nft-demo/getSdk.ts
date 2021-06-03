import {bluzelle, BluzelleSdk} from "@bluzelle/sdk-js";
import {memoize} from 'lodash'

export const getSdk = memoize<() => Promise<BluzelleSdk>>(() => bluzelle({
    mnemonic:  "horse monkey slice castle credit plug test such private fly snake creek sure shadow jazz secret miracle waste until empower proof waste dirt erode",
    url: "http://localhost:26657",
    gasPrice: 0.002,
    maxGas: 1000000000
}));