"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyRegistry = exports.addMessageType = exports.myRegistry = exports.registryTypes = void 0;
const proto_signing_1 = require("@cosmjs/proto-signing");
const stargate_1 = require("@cosmjs/stargate");
const lodash_1 = require("lodash");
exports.registryTypes = [...stargate_1.defaultRegistryTypes];
exports.myRegistry = new proto_signing_1.Registry(exports.registryTypes);
exports.addMessageType = lodash_1.memoize((typeUrl, type) => {
    exports.registryTypes.push([typeUrl, type]);
    exports.myRegistry = new proto_signing_1.Registry(exports.registryTypes);
});
const getMyRegistry = () => exports.myRegistry;
exports.getMyRegistry = getMyRegistry;
//# sourceMappingURL=Registry.js.map