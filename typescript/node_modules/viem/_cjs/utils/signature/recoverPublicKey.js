"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoverPublicKey = recoverPublicKey;
const isHex_js_1 = require("../data/isHex.js");
const fromHex_js_1 = require("../encoding/fromHex.js");
const toHex_js_1 = require("../encoding/toHex.js");
async function recoverPublicKey({ hash, signature, }) {
    const hashHex = (0, isHex_js_1.isHex)(hash) ? hash : (0, toHex_js_1.toHex)(hash);
    const { secp256k1 } = await Promise.resolve().then(() => require('@noble/curves/secp256k1'));
    const signature_ = (() => {
        if (typeof signature === 'object' && 'r' in signature && 's' in signature) {
            const { r, s, v, yParity } = signature;
            const yParityOrV = Number(yParity ?? v);
            const recoveryBit = toRecoveryBit(yParityOrV);
            return new secp256k1.Signature((0, fromHex_js_1.hexToBigInt)(r), (0, fromHex_js_1.hexToBigInt)(s)).addRecoveryBit(recoveryBit);
        }
        const signatureHex = (0, isHex_js_1.isHex)(signature) ? signature : (0, toHex_js_1.toHex)(signature);
        const yParityOrV = (0, fromHex_js_1.hexToNumber)(`0x${signatureHex.slice(130)}`);
        const recoveryBit = toRecoveryBit(yParityOrV);
        return secp256k1.Signature.fromCompact(signatureHex.substring(2, 130)).addRecoveryBit(recoveryBit);
    })();
    const publicKey = signature_
        .recoverPublicKey(hashHex.substring(2))
        .toHex(false);
    return `0x${publicKey}`;
}
function toRecoveryBit(yParityOrV) {
    if (yParityOrV === 0 || yParityOrV === 1)
        return yParityOrV;
    if (yParityOrV === 27)
        return 0;
    if (yParityOrV === 28)
        return 1;
    throw new Error('Invalid yParityOrV value');
}
//# sourceMappingURL=recoverPublicKey.js.map