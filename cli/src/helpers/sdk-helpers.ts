
import {promises} from "fs";
import path from "path";
import {bluzelle, BluzelleSdk, newMnemonic} from "@bluzelle/sdk-js";
import * as CryptoJS from 'crypto-js'



export type Flags = {from: string, gas: number, gasPrice: string, node: string}

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
    Promise.resolve(new TextDecoder().decode(buf))
        .then(decryptMnemonic);

export const readUserMnemonic = (user: string): Promise<string> =>
    promises.readFile(path.resolve(__dirname, `${process.env.HOME}/.curium/cli/${user}.info`))
        .then(decodeBufferFromFile)
        .catch(e => e.toString().match(/no such file or directory/)? function(){throw `${user} not in local keyring, please add it`}() : function(){throw e}())

export const encryptMnemonic = (mnemonic: string): Promise<string> =>
    Promise.resolve(CryptoJS.AES.encrypt(mnemonic, "cli").toString());

export const decryptMnemonic = (mnemonic: string): Promise<string> =>
    Promise.resolve(CryptoJS.AES.decrypt(mnemonic, "cli").toString(CryptoJS.enc.Utf8))





export const createUserFile = (user: string, mnemonic: string): Promise<void> =>
    encryptMnemonic(mnemonic)
        .then(encodedMnemonic => promises.writeFile(path.resolve(__dirname, `${process.env.HOME}/.curium/cli/${user}.info`), encodedMnemonic, {flag: 'wx'}))
        .catch(e => (e.stack as string).match(/already exists/) ? function() {throw "User already exists"}() : e)


export const makeCliDir = (): Promise<void> =>
    promises.mkdir(path.resolve(__dirname, `${process.env.HOME}/.curium/cli`))
        .catch(e => (e.stack as string).match(/already exists/) ? {} : e)