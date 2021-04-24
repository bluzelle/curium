"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = void 0;
const assert = (test, message) => {
    if (!test) {
        throw new Error(message);
    }
};
exports.assert = assert;
//# sourceMappingURL=Assert.js.map