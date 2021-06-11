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
exports.desc = 'Read all key-values in specified uuid';
var builder = function (yargs) {
    return yargs
        .usage('keyValues [uuid]')
        .help();
};
exports.builder = builder;
var handler = function (argv) {
    return sdk_helpers_1.getSdkByName(argv.from, argv.gas_price, argv.gas, argv.node)
        .then(function (x) { return x; })
        .then(function (sdk) {
        return sdk.db.tx.KeyValues({
            creator: sdk.db.address,
            uuid: argv.uuid,
        });
    })
        .then(function (resp) { return resp.keyValues.map(function (kv) { return (__assign(__assign({}, kv), { value: new TextDecoder().decode(kv.value) })); }); })
        .then(console.log);
};
exports.handler = handler;
