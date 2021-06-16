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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
var sdk_js_1 = require("@bluzelle/sdk-js");
var sdk_helpers_1 = require("../../helpers/sdk-helpers");
var readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
exports.command = 'add <user>';
exports.desc = 'Add key to local system and generate mnemonic';
var builder = function (yargs) {
    return yargs
        .help();
};
exports.builder = builder;
var handler = function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, makeCliDir()
                .then(function () { return createUserFile(argv.user); })
                .then(function () { return readUserMnemonic(argv.user); })
                .then(console.log)
                .catch(function (e) {
                console.log(e);
            })];
    });
}); };
exports.handler = handler;
var writeNewUser = function (username, mnemonic) {
    if (mnemonic === void 0) { mnemonic = sdk_js_1.newMnemonic(); }
    return fs_1.promises.readFile(path_1.default.resolve(__dirname, process.env.HOME + "/.curium/"))
        .then(sdk_helpers_1.decodeBufferFromFile)
        .then(sdk_helpers_1.parseToJsonObject)
        .then(function (x) { return x; })
        .then(function (x) { return (__assign({}, x)); })
        .then(function (x) { return x; })
        .then(function (curUsers) { return (__assign({}, curUsers)); })
        .then(function (curUsers) { return fs_1.promises.appendFile(path_1.default.resolve(__dirname, process.env.HOME + "/.curium/Users"), JSON.stringify(curUsers), { flag: 'w+' }); });
};
var readUserMnemonic = function (user) {
    return fs_1.promises.readFile(path_1.default.resolve(__dirname, process.env.HOME + "/.curium/cli/" + user + ".info"))
        .then(sdk_helpers_1.decodeBufferFromFile);
};
var promptForMnemonic = function () {
    return new Promise(function (resolve) { return readline.question("Please provide BIP39 mnemonic", function (mnemonic) {
        readline.close();
        return resolve(mnemonic);
    }); });
};
var createUserFile = function (user, mnemonic) {
    if (mnemonic === void 0) { mnemonic = sdk_js_1.newMnemonic(); }
    return fs_1.promises.access(path_1.default.resolve(__dirname, process.env.HOME + "/.curium/cli/" + user + ".info"))
        .catch(function (e) { return e.stack.match(/no such file/) ?
        fs_1.promises.writeFile(path_1.default.resolve(__dirname, process.env.HOME + "/.curium/cli/" + user + ".info"), mnemonic, { flag: 'wx' })
        :
            function () { throw e; }(); });
};
var makeCliDir = function () {
    return fs_1.promises.mkdir(path_1.default.resolve(__dirname, process.env.HOME + "/.curium/cli"), { mode:  });
};
