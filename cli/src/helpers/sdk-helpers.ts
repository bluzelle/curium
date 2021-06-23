import {promises} from "fs";
import path from "path";
import {bluzelle, BluzelleSdk, newMnemonic} from "@bluzelle/sdk-js";
import * as CryptoJS from 'crypto-js'
import {AccountData, DirectSecp256k1HdWallet} from "@cosmjs/proto-signing";
import {Bech32} from "/Users/avendauz/bluzelle/curium/cli/node_modules/@cosmjs/encoding/build/bech32"

export type Flags = { from: string, gas: number, gasPrice: string, node: string }

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
        .catch(e => e.toString().match(/no such file or directory/) ? function () {
            throw `${user} not in local keyring, please add it`
        }() : function () {
            throw e
        }())

export const encryptMnemonic = (mnemonic: string): Promise<string> =>
    Promise.resolve(CryptoJS.AES.encrypt(mnemonic, "cli").toString());

export const decryptMnemonic = (mnemonic: string): Promise<string> =>
    Promise.resolve(CryptoJS.AES.decrypt(mnemonic, "cli").toString(CryptoJS.enc.Utf8))


export const createUserFile = (user: string, mnemonic: string, prompter: () => Promise<boolean>, flag: string = "wx") : Promise<void> =>
    encryptMnemonic(mnemonic)
        .then(encodedMnemonic => promises.writeFile(path.resolve(__dirname, `${process.env.HOME}/.curium/cli/${user}.info`), encodedMnemonic, {flag}))
        .catch(e => (e.stack as string).match(/already exists/) ?
            prompter()
                .then(bool => bool? createUserFile(user, mnemonic, prompter, 'w+') : function () {throw `${user} is already taken, aborted keys add`}())
            : e)



type DecodedAccountInfo = Omit<AccountData, 'pubkey'> & {pubkey: string}

export const makeCliDir = (): Promise<void> =>
    promises.mkdir(path.resolve(__dirname, `${process.env.HOME}/.curium/cli`))
        .catch(e => (e.stack as string).match(/already exists/) ? {} : e)

export const readCliDir = (): Promise<DecodedAccountInfo[]> => {

    return promises.readdir(path.resolve(__dirname, `${process.env.HOME}/.curium/cli`))
        .then(files => Promise.all(files.map(file => {
            let user: string
            return getUserFromFile(file)
                .then(userFromFile => user = userFromFile)
                .then(readUserMnemonic)
                .then(mnemonic => ({mnemonic, user}))
        })))
        .then(usersAndMnemonics => Promise.all(usersAndMnemonics.map(({mnemonic, user}) =>
            getAccountInfoFromMnemonic(mnemonic)
                .then(info => ({user, ...info}) as DecodedAccountInfo))))
        .catch(e => e.toString().match(/no such file or directory/) ? function () {
            throw "no keys stored"
        }() : function () {
            throw e
        }())
}

export const getUserInfo = (user: string): Promise<DecodedAccountInfo> => {
    return readUserMnemonic(user)
        .then(getAccountInfoFromMnemonic)
}

const getUserFromFile = (filename: string): Promise<string> =>
    Promise.resolve(filename.split('.info')[0])


export const getAccountInfoFromMnemonic = (mnemonic: string): Promise<DecodedAccountInfo> =>
    DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {prefix: 'bluzelle'})
        .then(wallet => wallet.getAccounts())
        .then(x => x[0])
        .then(info => ({...info, pubkey: Bech32.encode('bluzellepub', info.pubkey)}))
