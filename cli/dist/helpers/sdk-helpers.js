"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readUserMnemonic = exports.decodeBufferFromFile = exports.getQuerySdk = exports.getSdkByName = void 0;
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var sdk_js_1 = require("@bluzelle/sdk-js");
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
    return Promise.resolve(new TextDecoder().decode(buf));
};
exports.decodeBufferFromFile = decodeBufferFromFile;
var readUserMnemonic = function (user) {
    return fs_1.promises.readFile(path_1.default.resolve(__dirname, process.env.HOME + "/.curium/cli/" + user + ".info"))
        .then(exports.decodeBufferFromFile)
        .catch(function (e) { return e.toString().match(/no such file or directory/) ? function () { throw user + " not in local keyring, please add it"; }() : function () { throw e; }(); });
};
exports.readUserMnemonic = readUserMnemonic;
