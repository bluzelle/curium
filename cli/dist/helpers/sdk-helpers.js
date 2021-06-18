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
exports.makeCliDir = exports.createUserFile = exports.decryptMnemonic = exports.encryptMnemonic = exports.readUserMnemonic = exports.decodeBufferFromFile = exports.getQuerySdk = exports.getSdkByName = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const sdk_js_1 = require("@bluzelle/sdk-js");
const CryptoJS = __importStar(require("crypto-js"));
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
    .catch(e => e.toString().match(/no such file or directory/) ? function () { throw `${user} not in local keyring, please add it`; }() : function () { throw e; }());
exports.readUserMnemonic = readUserMnemonic;
const encryptMnemonic = (mnemonic) => Promise.resolve(CryptoJS.AES.encrypt(mnemonic, "cli").toString());
exports.encryptMnemonic = encryptMnemonic;
const decryptMnemonic = (mnemonic) => Promise.resolve(CryptoJS.AES.decrypt(mnemonic, "cli").toString(CryptoJS.enc.Utf8));
exports.decryptMnemonic = decryptMnemonic;
const createUserFile = (user, mnemonic) => exports.encryptMnemonic(mnemonic)
    .then(encodedMnemonic => fs_1.promises.writeFile(path_1.default.resolve(__dirname, `${process.env.HOME}/.curium/cli/${user}.info`), encodedMnemonic, { flag: 'wx' }))
    .catch(e => e.stack.match(/already exists/) ? function () { throw "User already exists"; }() : e);
exports.createUserFile = createUserFile;
const makeCliDir = () => fs_1.promises.mkdir(path_1.default.resolve(__dirname, `${process.env.HOME}/.curium/cli`))
    .catch(e => e.stack.match(/already exists/) ? {} : e);
exports.makeCliDir = makeCliDir;
//# sourceMappingURL=sdk-helpers.js.map