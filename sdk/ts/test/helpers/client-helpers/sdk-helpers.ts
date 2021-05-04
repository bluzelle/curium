import {localChain} from "../../config"
import {bluzelle, BluzelleSdk} from "../../../src/bz-sdk/bz-sdk";
export const DEFAULT_TIMEOUT = 800000;

export const getSdk = (): Promise<BluzelleSdk> => {
    return bluzelle({
        mnemonic: localChain.mnemonic,
        url: localChain.endpoint,
        gasPrice: 0.002,
        maxGas: 100000000
    })
}

export const encodeData = (data: string): Uint8Array =>
    new TextEncoder().encode(data)

export const decodeData = (array: Uint8Array): string =>
    new TextDecoder().decode(array)

