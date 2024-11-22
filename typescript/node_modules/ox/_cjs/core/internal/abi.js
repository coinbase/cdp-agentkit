"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSignatures = isSignatures;
function isSignatures(value) {
    for (const item of value) {
        if (typeof item !== 'string')
            return false;
    }
    return true;
}
//# sourceMappingURL=abi.js.map