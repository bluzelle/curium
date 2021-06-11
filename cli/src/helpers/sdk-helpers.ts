
import {promises} from "fs";
import path from "path";
import {bluzelle, BluzelleSdk} from "@bluzelle/sdk-js";

export const getSdkByName = (name: string, gasPrice: string, gas: string, url: string): Promise<BluzelleSdk> => {
    return promises.readFile(path.resolve(__dirname, `${process.env.HOME}/.curium/${name}.txt`))
        .then(mnemonic => bluzelle({
            gasPrice: parseFloat(gasPrice),
            maxGas: parseInt(gas),
            url,
            mnemonic: mnemonic.toString()
        }))
}

export const getQuerySdk = (url: string): Promise<BluzelleSdk> =>
    bluzelle({
        gasPrice: 0,
        maxGas: 0,
        url,
        mnemonic: bluzelle.newMnemonic()

    })