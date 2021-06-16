"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseToJsonObject = exports.decodeBufferFromFile = exports.getQuerySdk = exports.getSdkByName = void 0;
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var sdk_js_1 = require("@bluzelle/sdk-js");
var getSdkByName = function (name, gasPrice, gas, url) {
    return fs_1.promises.readFile(path_1.default.resolve(__dirname, process.env.HOME + "/.curium/cli/Users"))
        .then(exports.decodeBufferFromFile)
        .then(exports.parseToJsonObject)
        .then(function (usersRecord) { return usersRecord[name]; })
        .then(function (mnemonic) { return sdk_js_1.bluzelle({
        gasPrice: parseFloat(gasPrice),
        maxGas: parseInt(gas),
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
var parseToJsonObject = function (jsonString) {
    return Promise.resolve(JSON.parse(jsonString));
};
exports.parseToJsonObject = parseToJsonObject;
