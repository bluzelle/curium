import {bluzelle, BluzelleSdk} from "@bluzelle/sdk-js";
import {memoize} from 'lodash'

export const getSdk = memoize<() => Promise<BluzelleSdk>>(() => bluzelle({
    mnemonic:  "shift base upon protect coconut twelve cigar craft symbol horse acid distance doctor ugly another pledge auto owner amateur spatial resist cactus mansion helmet",
    url: "http://nft2.bluzelle.com:26657",
    gasPrice: 0.002,
    maxGas: 1000000000
}));