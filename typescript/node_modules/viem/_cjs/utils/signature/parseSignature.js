"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSignature = parseSignature;
const secp256k1_1 = require("@noble/curves/secp256k1");
const toHex_js_1 = require("../../utils/encoding/toHex.js");
function parseSignature(signatureHex) {
    const { r, s } = secp256k1_1.secp256k1.Signature.fromCompact(signatureHex.slice(2, 130));
    const yParityOrV = Number(`0x${signatureHex.slice(130)}`);
    const [v, yParity] = (() => {
        if (yParityOrV === 0 || yParityOrV === 1)
            return [undefined, yParityOrV];
        if (yParityOrV === 27)
            return [BigInt(yParityOrV), 0];
        if (yParityOrV === 28)
            return [BigInt(yParityOrV), 1];
        throw new Error('Invalid yParityOrV value');
    })();
    if (typeof v !== 'undefined')
        return {
            r: (0, toHex_js_1.numberToHex)(r, { size: 32 }),
            s: (0, toHex_js_1.numberToHex)(s, { size: 32 }),
            v,
            yParity,
        };
    return {
        r: (0, toHex_js_1.numberToHex)(r, { size: 32 }),
        s: (0, toHex_js_1.numberToHex)(s, { size: 32 }),
        yParity,
    };
}
//# sourceMappingURL=parseSignature.js.map