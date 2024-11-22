"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const p256_1 = require("@noble/curves/p256");
const utils_1 = require("@noble/hashes/utils");
const publicKey_js_1 = require("./publicKey.js");
const sign_js_1 = require("./sign.js");
const utils_js_1 = require("./utils.js");
async function verify(parameters) {
    const { hash, webauthn } = parameters;
    const { authenticatorData, challengeIndex, clientDataJSON, typeIndex, userVerificationRequired, } = webauthn;
    const authenticatorDataBytes = (0, utils_js_1.hexToBytes)(authenticatorData);
    if (authenticatorDataBytes.length < 37)
        return false;
    const flag = authenticatorDataBytes[32];
    if ((flag & 0x01) !== 0x01)
        return false;
    if (userVerificationRequired && (flag & 0x04) !== 0x04)
        return false;
    if ((flag & 0x08) !== 0x08 && (flag & 0x10) === 0x10)
        return false;
    const type = '"type":"webauthn.get"';
    if (type !== clientDataJSON.slice(Number(typeIndex), type.length + 1))
        return false;
    const match = clientDataJSON
        .slice(Number(challengeIndex))
        .match(/^"challenge":"(.*?)"/);
    if (!match)
        return false;
    const [_, challenge] = match;
    if ((0, utils_js_1.bytesToHex)((0, utils_js_1.base64UrlToBytes)(challenge)) !== hash)
        return false;
    const clientDataJSONHash = new Uint8Array(await crypto.subtle.digest('SHA-256', (0, utils_1.utf8ToBytes)(clientDataJSON)));
    const messageHash = new Uint8Array(await crypto.subtle.digest('SHA-256', (0, utils_1.concatBytes)((0, utils_js_1.hexToBytes)(authenticatorData), clientDataJSONHash)));
    const publicKey = (0, publicKey_js_1.parsePublicKey)(parameters.publicKey);
    const signature = (0, sign_js_1.parseSignature)(parameters.signature);
    const recovered_0 = new p256_1.secp256r1.Signature(signature.r, signature.s)
        .addRecoveryBit(0)
        .recoverPublicKey(messageHash);
    const recovered_1 = new p256_1.secp256r1.Signature(signature.r, signature.s)
        .addRecoveryBit(1)
        .recoverPublicKey(messageHash);
    return ((recovered_0.x === publicKey.x && recovered_0.y === publicKey.y) ||
        (recovered_1.x === publicKey.x && recovered_1.y === publicKey.y));
}
exports.verify = verify;
//# sourceMappingURL=verify.js.map