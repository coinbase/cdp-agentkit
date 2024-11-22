"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSignatureHash = toSignatureHash;
const hashSignature_js_1 = require("./hashSignature.js");
const toSignature_js_1 = require("./toSignature.js");
function toSignatureHash(fn) {
    return (0, hashSignature_js_1.hashSignature)((0, toSignature_js_1.toSignature)(fn));
}
//# sourceMappingURL=toSignatureHash.js.map