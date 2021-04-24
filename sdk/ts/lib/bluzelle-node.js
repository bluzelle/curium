"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bluzelle = exports.mnemonicToAddress = exports.API = void 0;
const API_1 = require("./API");
var API_2 = require("./API");
Object.defineProperty(exports, "API", { enumerable: true, get: function () { return API_2.API; } });
var API_3 = require("./API");
Object.defineProperty(exports, "mnemonicToAddress", { enumerable: true, get: function () { return API_3.mnemonicToAddress; } });
const bluzelle = (config) => new API_1.API(config);
exports.bluzelle = bluzelle;
//# sourceMappingURL=bluzelle-node.js.map