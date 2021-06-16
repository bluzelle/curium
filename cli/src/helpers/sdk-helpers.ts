
import {promises} from "fs";
import path from "path";
import {bluzelle, BluzelleSdk} from "@bluzelle/sdk-js";

export const getSdkByName = (name: string, gasPrice: string, gas: string, url: string): Promise<BluzelleSdk> => {
    return promises.readFile(path.resolve(__dirname, `${process.env.HOME}/.curium/cli/Users`))
        .then(decodeBufferFromFile)
        .then(parseToJsonObject)
        .then(usersRecord => usersRecord[name])
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

export const decodeBufferFromFile = (buf: Buffer): Promise<string> =>
    Promise.resolve(new TextDecoder().decode(buf))

export const parseToJsonObject = (jsonString: string): Promise<any> =>
    Promise.resolve(JSON.parse(jsonString))