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
exports.makeCliDir = exports.createUserFile = exports.promptForMnemonic = exports.decryptMnemonic = exports.encryptMnemonic = exports.readUserMnemonic = exports.decodeBufferFromFile = exports.getQuerySdk = exports.getSdkByName = void 0;
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var sdk_js_1 = require("@bluzelle/sdk-js");
var CryptoJS = __importStar(require("crypto-js"));
var readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
var getSdkByName = function (name, gasPrice, gas, url) {
    return exports.readUserMnemonic(name)
        .then(function (mnemonic) { return sdk_js_1.bluzelle({
        gasPrice: parseFloat(gasPrice),
        maxGas: gas,
        url: url,
        mnemonic: mnemonic.toString()
    }); });
};
exports.getSdkByName = getSdkByName;
var getQuerySdk = function (url) {
    return sdk_js_1.bluzelle({
        gasPrice: 0,
        maxGas: 0,
        url: url,
        mnemonic: sdk_js_1.bluzelle.newMnemonic()
    });
};
exports.getQuerySdk = getQuerySdk;
var decodeBufferFromFile = function (buf) {
    return Promise.resolve(new TextDecoder().decode(buf))
        .then(exports.decryptMnemonic);
};
exports.decodeBufferFromFile = decodeBufferFromFile;
var readUserMnemonic = function (user) {
    return fs_1.promises.readFile(path_1.default.resolve(__dirname, process.env.HOME + "/.curium/cli/" + user + ".info"))
        .then(exports.decodeBufferFromFile)
        .catch(function (e) { return e.toString().match(/no such file or directory/) ? function () { throw user + " not in local keyring, please add it"; }() : function () { throw e; }(); });
};
exports.readUserMnemonic = readUserMnemonic;
var encryptMnemonic = function (mnemonic) {
    return Promise.resolve(CryptoJS.AES.encrypt(mnemonic, "cli").toString());
};
exports.encryptMnemonic = encryptMnemonic;
var decryptMnemonic = function (mnemonic) {
    return Promise.resolve(CryptoJS.AES.decrypt(mnemonic, "cli").toString(CryptoJS.enc.Utf8));
};
exports.decryptMnemonic = decryptMnemonic;
var promptForMnemonic = function (recover) {
    return recover ? new Promise(function (resolve) { return readline.question("Please provide BIP39 mnemonic\n", function (mnemonic) {
        readline.close();
        return resolve(mnemonic);
    }); }) : Promise.resolve(sdk_js_1.newMnemonic());
};
exports.promptForMnemonic = promptForMnemonic;
var createUserFile = function (user, mnemonic) {
    return exports.encryptMnemonic(mnemonic)
        .then(function (encodedMnemonic) { return fs_1.promises.writeFile(path_1.default.resolve(__dirname, process.env.HOME + "/.curium/cli/" + user + ".info"), encodedMnemonic, { flag: 'wx' }); })
        .catch(function (e) { return e.stack.match(/already exists/) ? function () { throw "User already exists"; }() : e; });
};
exports.createUserFile = createUserFile;
var makeCliDir = function () {
    return fs_1.promises.mkdir(path_1.default.resolve(__dirname, process.env.HOME + "/.curium/cli"))
        .catch(function (e) { return e.stack.match(/already exists/) ? {} : e; });
};
exports.makeCliDir = makeCliDir;
