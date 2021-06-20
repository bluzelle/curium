import {bluzelle, BluzelleSdk} from "@bluzelle/sdk-js";
import {memoize} from 'lodash'

export const getBz = memoize(() => bluzelle({
    url: "http://localhost:26657",
    mnemonic: "dog share enter erode that canal curious good truly main era army shed deposit upper actor wing appear off soft avoid glow benefit silent",
    gasPrice: 0.002,
    maxGas: 1000000000
}))