"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializePublicKey = exports.parsePublicKey = exports.parseCredentialPublicKey = void 0;
const utils_1 = require("@noble/curves/abstract/utils");
const utils_js_1 = require("./utils.js");
async function parseCredentialPublicKey(cPublicKey) {
    const base64Url = (0, utils_js_1.bytesToBase64Url)(new Uint8Array(cPublicKey));
    const bytes = (0, utils_js_1.base64UrlToBytes)(base64Url);
    const cryptoKey = await (0, utils_js_1.bytesToCryptoKey)(bytes);
    const publicKey = await (0, utils_js_1.cryptoKeyToBytes)(cryptoKey);
    return parsePublicKey(publicKey);
}
exports.parseCredentialPublicKey = parseCredentialPublicKey;
function parsePublicKey(publicKey) {
    const bytes = typeof publicKey === 'string' ? (0, utils_js_1.hexToBytes)(publicKey) : publicKey;
    const offset = bytes.length === 65 ? 1 : 0;
    const x = bytes.slice(offset, 32 + offset);
    const y = bytes.slice(32 + offset, 64 + offset);
    return {
        prefix: bytes.length === 65 ? bytes[0] : undefined,
        x: BigInt((0, utils_js_1.bytesToHex)(x)),
        y: BigInt((0, utils_js_1.bytesToHex)(y)),
    };
}
exports.parsePublicKey = parsePublicKey;
function serializePublicKey(publicKey, options = {}) {
    const { compressed = false, to = 'hex' } = options;
    const result = Uint8Array.from([
        ...(publicKey.prefix && !compressed ? [publicKey.prefix] : []),
        ...(0, utils_1.numberToBytesBE)(publicKey.x, 32),
        ...(0, utils_1.numberToBytesBE)(publicKey.y, 32),
    ]);
    return (to === 'hex' ? (0, utils_js_1.bytesToHex)(result) : result);
}
exports.serializePublicKey = serializePublicKey;
//# sourceMappingURL=publicKey.js.map