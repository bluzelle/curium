"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bluzelle = exports.API = void 0;
var bluzelle_node_1 = require("./bluzelle-node");
Object.defineProperty(exports, "API", { enumerable: true, get: function () { return bluzelle_node_1.API; } });
var bluzelle_node_2 = require("./bluzelle-node");
Object.defineProperty(exports, "bluzelle", { enumerable: true, get: function () { return bluzelle_node_2.bluzelle; } });
const bluzelle_node_3 = require("./bluzelle-node");
typeof window === "undefined" || (window.bluzelle = bluzelle_node_3.bluzelle);
//# sourceMappingURL=bluzelle-js.js.map