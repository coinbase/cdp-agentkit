"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compactSignatureToSignature = compactSignatureToSignature;
const toBytes_js_1 = require("../encoding/toBytes.js");
const toHex_js_1 = require("../encoding/toHex.js");
function compactSignatureToSignature({ r, yParityAndS, }) {
    const yParityAndS_bytes = (0, toBytes_js_1.hexToBytes)(yParityAndS);
    const yParity = yParityAndS_bytes[0] & 0x80 ? 1 : 0;
    const s = yParityAndS_bytes;
    if (yParity === 1)
        s[0] &= 0x7f;
    return { r, s: (0, toHex_js_1.bytesToHex)(s), yParity };
}
//# sourceMappingURL=compactSignatureToSignature.js.map