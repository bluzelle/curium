import {bluzelle, BluzelleSdk} from "@bluzelle/sdk-js";
import {memoize} from 'lodash'

export const getSdk = memoize<Promise<BluzelleSdk>>(() => bluzelle({
    mnemonic:  "talent cheap sure then normal quote want follow electric lesson deputy health faint nuclear beach okay isolate salute umbrella list current garage throw shoe",
    url: "http://localhost:26657",
    gasPrice: 0.002,
    maxGas: 1000000000
}));