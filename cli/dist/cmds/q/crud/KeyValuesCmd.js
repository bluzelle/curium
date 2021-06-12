"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
var sdk_helpers_1 = require("../../../helpers/sdk-helpers");
exports.command = 'keyValues <uuid>';
exports.desc = 'Read all keys-values in uuid from the database';
var builder = function (yargs) {
    return yargs
        .help();
};
exports.builder = builder;
var handler = function (argv) {
    return sdk_helpers_1.getQuerySdk(argv.node)
        .then(function (sdk) { return sdk.db.q.KeyValues({
        uuid: argv.uuid
    }); })
        .then(function (data) { return data.keyValues.map(function (KV) { return (__assign(__assign({}, KV), { value: new TextDecoder().decode(KV.value) })); }); })
        .then(console.log);
};
exports.handler = handler;
