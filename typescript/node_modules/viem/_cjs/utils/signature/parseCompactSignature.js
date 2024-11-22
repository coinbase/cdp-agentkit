"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCompactSignature = parseCompactSignature;
const secp256k1_1 = require("@noble/curves/secp256k1");
const toHex_js_1 = require("../encoding/toHex.js");
function parseCompactSignature(signatureHex) {
    const { r, s } = secp256k1_1.secp256k1.Signature.fromCompact(signatureHex.slice(2, 130));
    return {
        r: (0, toHex_js_1.numberToHex)(r, { size: 32 }),
        yParityAndS: (0, toHex_js_1.numberToHex)(s, { size: 32 }),
    };
}
//# sourceMappingURL=parseCompactSignature.js.map