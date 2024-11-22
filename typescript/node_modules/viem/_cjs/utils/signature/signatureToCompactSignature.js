"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signatureToCompactSignature = signatureToCompactSignature;
const toBytes_js_1 = require("../encoding/toBytes.js");
const toHex_js_1 = require("../encoding/toHex.js");
function signatureToCompactSignature(signature) {
    const { r, s, v, yParity } = signature;
    const yParity_ = Number(yParity ?? v - 27n);
    let yParityAndS = s;
    if (yParity_ === 1) {
        const bytes = (0, toBytes_js_1.hexToBytes)(s);
        bytes[0] |= 0x80;
        yParityAndS = (0, toHex_js_1.bytesToHex)(bytes);
    }
    return { r, yParityAndS };
}
//# sourceMappingURL=signatureToCompactSignature.js.map