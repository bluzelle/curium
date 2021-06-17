
import {promises} from "fs";
import path from "path";
import {bluzelle, BluzelleSdk} from "@bluzelle/sdk-js";

export const getSdkByName = (name: string, gasPrice: string, gas: number, url: string): Promise<BluzelleSdk> =>
    readUserMnemonic(name)
        .then(mnemonic => bluzelle({
            gasPrice: parseFloat(gasPrice),
            maxGas: gas,
            url,
            mnemonic: mnemonic.toString()
        }));


export const getQuerySdk = (url: string): Promise<BluzelleSdk> =>
    bluzelle({
        gasPrice: 0,
        maxGas: 0,
        url,
        mnemonic: bluzelle.newMnemonic()

    });

export const decodeBufferFromFile = (buf: Buffer): Promise<string> =>
    Promise.resolve(new TextDecoder().decode(buf));

export const readUserMnemonic = (user: string): Promise<string> =>
    promises.readFile(path.resolve(__dirname, `${process.env.HOME}/.curium/cli/${user}.info`))
        .then(decodeBufferFromFile)
        .catch(e => e.toString().match(/no such file or directory/)? function(){throw `${user} not in local keyring, please add it`}() : function(){throw e}())