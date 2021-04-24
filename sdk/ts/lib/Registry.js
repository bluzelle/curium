"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMessageType = exports.myRegistry = void 0;
const proto_signing_1 = require("@cosmjs/proto-signing");
const stargate_1 = require("@cosmjs/stargate");
const lodash_1 = require("lodash");
const registryTypes = [...stargate_1.defaultRegistryTypes];
exports.myRegistry = new proto_signing_1.Registry(registryTypes);
exports.addMessageType = lodash_1.memoize((typeUrl, type) => {
    registryTypes.push([typeUrl, type]);
    exports.myRegistry = new proto_signing_1.Registry(registryTypes);
});
//# sourceMappingURL=Registry.js.map