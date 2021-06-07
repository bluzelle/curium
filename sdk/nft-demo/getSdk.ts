import {bluzelle, BluzelleSdk} from "@bluzelle/sdk-js";
import {memoize} from 'lodash'

export const getSdk = memoize<() => Promise<BluzelleSdk>>(() => bluzelle({
    mnemonic:  "fold anxiety volcano carry car source inner number world wild tilt then loan weapon maze rug install youth novel pepper negative supreme hollow spoil",
    url: "http://nft2.bluzelle.com:26657",
    gasPrice: 0.002,
    maxGas: 1000000000
}));