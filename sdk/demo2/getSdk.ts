import {bluzelle, BluzelleSdk} from "@bluzelle/sdk-js";
import {memoize} from 'lodash'

export const getSdk = memoize<() => Promise<BluzelleSdk>>(() => bluzelle({
    mnemonic:  "once tomorrow animal post expire enough resource human modify multiply yellow next ugly true enjoy rookie mechanic agent report beauty simple miss lake involve",
    url: "http://localhost:26657",
    gasPrice: 0.002,
    maxGas: 1000000000
}));