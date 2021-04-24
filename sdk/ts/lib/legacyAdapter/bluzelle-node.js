"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bluzelle = exports.API = void 0;
const API_1 = require("./API");
var API_2 = require("./API");
Object.defineProperty(exports, "API", { enumerable: true, get: function () { return API_2.API; } });
const bluzelle = (config) => new API_1.API(config);
exports.bluzelle = bluzelle;
//# sourceMappingURL=bluzelle-node.js.map