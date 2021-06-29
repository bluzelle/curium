"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountInfoFromMnemonic = exports.getUserInfo = exports.readCliDir = exports.makeCliDir = exports.makeCuriumDir = exports.removeUserFile = exports.createUserFile = exports.decryptMnemonic = exports.encryptMnemonic = exports.readUserMnemonic = exports.decodeBufferFromFile = exports.getQuerySdk = exports.getSdkByName = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const sdk_js_1 = require("@bluzelle/sdk-js");
const CryptoJS = __importStar(require("crypto-js"));
const proto_signing_1 = require("@cosmjs/proto-signing");
const bech32_1 = require("/Users/avendauz/bluzelle/curium/cli/node_modules/@cosmjs/encoding/build/bech32");
const getSdkByName = (name, gasPrice, gas, url) => exports.readUserMnemonic(name)
    .then(mnemonic => sdk_js_1.bluzelle({
    gasPrice: parseFloat(gasPrice),
    maxGas: gas,
    url,
    mnemonic: mnemonic.toString()
}));
exports.getSdkByName = getSdkByName;
const getQuerySdk = (url) => sdk_js_1.bluzelle({
    gasPrice: 0,
    maxGas: 0,
    url,
    mnemonic: sdk_js_1.bluzelle.newMnemonic()
});
exports.getQuerySdk = getQuerySdk;
const decodeBufferFromFile = (buf) => Promise.resolve(new TextDecoder().decode(buf))
    .then(exports.decryptMnemonic);
exports.decodeBufferFromFile = decodeBufferFromFile;
const readUserMnemonic = (user) => fs_1.promises.readFile(path_1.default.resolve(__dirname, `${process.env.HOME}/.curium/cli/${user}.info`))
    .then(exports.decodeBufferFromFile)
    .catch(e => e.toString().match(/no such file or directory/) ? function () {
    throw `${user} not in local keyring, please add it`;
}() : function () {
    throw e;
}());
exports.readUserMnemonic = readUserMnemonic;
const encryptMnemonic = (mnemonic) => Promise.resolve(CryptoJS.AES.encrypt(mnemonic, "cli").toString());
exports.encryptMnemonic = encryptMnemonic;
const decryptMnemonic = (mnemonic) => Promise.resolve(CryptoJS.AES.decrypt(mnemonic, "cli").toString(CryptoJS.enc.Utf8));
exports.decryptMnemonic = decryptMnemonic;
const createUserFile = (user, mnemonic, prompter, flag = "wx") => exports.encryptMnemonic(mnemonic)
    .then(encodedMnemonic => fs_1.promises.writeFile(path_1.default.resolve(__dirname, `${process.env.HOME}/.curium/cli/${user}.info`), encodedMnemonic, { flag }))
    .catch(e => e.stack.match(/already exists/) ?
    prompter()
        .then(bool => bool ? exports.createUserFile(user, mnemonic, prompter, 'w+') : function () {
        throw `${user} is already taken, aborted keys add`;
    }())
    : e);
exports.createUserFile = createUserFile;
const removeUserFile = (user) => fs_1.promises.rm(path_1.default.resolve(__dirname, `${process.env.HOME}/.curium/cli/${user}.info`))
    .catch(e => e.stack.match(/no such file/) ?
    function () {
        throw `${user} does not exist in local keyring`;
    }() :
    function () {
        throw e;
    }());
exports.removeUserFile = removeUserFile;
const makeCuriumDir = () => fs_1.promises.mkdir(path_1.default.resolve(__dirname, `${process.env.HOME}/.curium`))
    .catch(e => e.stack.match(/already exists/) ? {} : e);
exports.makeCuriumDir = makeCuriumDir;
const makeCliDir = () => fs_1.promises.mkdir(path_1.default.resolve(__dirname, `${process.env.HOME}/.curium/cli`))
    .catch(e => e.stack.match(/already exists/) ? {} : e);
exports.makeCliDir = makeCliDir;
const readCliDir = () => {
    return fs_1.promises.readdir(path_1.default.resolve(__dirname, `${process.env.HOME}/.curium/cli`))
        .then(files => Promise.all(files.map(file => {
        let user;
        return getUserFromFile(file)
            .then(userFromFile => user = userFromFile)
            .then(exports.readUserMnemonic)
            .then(mnemonic => ({ mnemonic, user }));
    })))
        .then(usersAndMnemonics => Promise.all(usersAndMnemonics.map(({ mnemonic, user }) => exports.getAccountInfoFromMnemonic(mnemonic)
        .then(info => ({ user, ...info })))))
        .catch(e => e.toString().match(/no such file or directory/) ? function () {
        throw "no keys stored";
    }() : function () {
        throw e;
    }());
};
exports.readCliDir = readCliDir;
const getUserInfo = (user) => {
    return exports.readUserMnemonic(user)
        .then(exports.getAccountInfoFromMnemonic);
};
exports.getUserInfo = getUserInfo;
const getUserFromFile = (filename) => Promise.resolve(filename.split('.info')[0]);
const getAccountInfoFromMnemonic = (mnemonic) => proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: 'bluzelle' })
    .then(wallet => wallet.getAccounts())
    .then(x => x[0])
    .then(info => ({ ...info, pubkey: bech32_1.Bech32.encode('bluzellepub', info.pubkey) }));
exports.getAccountInfoFromMnemonic = getAccountInfoFromMnemonic;
//# sourceMappingURL=sdk-helpers.js.map