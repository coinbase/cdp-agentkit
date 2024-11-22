"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeSignature = exports.parseSignature = exports.parseAsn1Signature = exports.getCredentialSignRequestOptions = exports.sign = void 0;
const utils_1 = require("@noble/curves/abstract/utils");
const p256_1 = require("@noble/curves/p256");
const utils_js_1 = require("./utils.js");
async function sign(parameters) {
    const { getFn = window.navigator.credentials.get.bind(window.navigator.credentials), ...rest } = parameters;
    const options = getCredentialSignRequestOptions(rest);
    try {
        const credential = (await getFn(options));
        if (!credential)
            throw new Error('credential request failed.');
        const response = credential.response;
        const clientDataJSON = String.fromCharCode(...new Uint8Array(response.clientDataJSON));
        const challengeIndex = clientDataJSON.indexOf('"challenge"');
        const typeIndex = clientDataJSON.indexOf('"type"');
        const signature = parseAsn1Signature((0, utils_js_1.base64UrlToBytes)((0, utils_js_1.bytesToBase64Url)(new Uint8Array(response.signature))));
        return {
            signature: serializeSignature(signature),
            webauthn: {
                authenticatorData: (0, utils_js_1.bytesToHex)(new Uint8Array(response.authenticatorData)),
                clientDataJSON,
                challengeIndex,
                typeIndex,
                userVerificationRequired: options.publicKey.userVerification === 'required',
            },
            raw: credential,
        };
    }
    catch (error) {
        throw new Error('credential request failed.', { cause: error });
    }
}
exports.sign = sign;
function getCredentialSignRequestOptions(parameters) {
    const { credentialId, hash, rpId = window.location.hostname, userVerification = 'required', } = parameters;
    const challenge = (0, utils_js_1.base64UrlToBytes)((0, utils_js_1.bytesToBase64Url)((0, utils_js_1.hexToBytes)(hash)));
    return {
        publicKey: {
            ...(credentialId
                ? {
                    allowCredentials: [
                        {
                            id: (0, utils_js_1.base64UrlToBytes)(credentialId),
                            type: 'public-key',
                        },
                    ],
                }
                : {}),
            challenge,
            rpId,
            userVerification,
        },
    };
}
exports.getCredentialSignRequestOptions = getCredentialSignRequestOptions;
function parseAsn1Signature(bytes) {
    const r_start = bytes[4] === 0 ? 5 : 4;
    const r_end = r_start + 32;
    const s_start = bytes[r_end + 2] === 0 ? r_end + 3 : r_end + 2;
    const r = BigInt((0, utils_js_1.bytesToHex)(bytes.slice(r_start, r_end)));
    const s = BigInt((0, utils_js_1.bytesToHex)(bytes.slice(s_start)));
    const n = p256_1.p256.CURVE.n;
    return {
        r,
        s: s > n / 2n ? n - s : s,
    };
}
exports.parseAsn1Signature = parseAsn1Signature;
function parseSignature(signature) {
    const bytes = typeof signature === 'string' ? (0, utils_js_1.hexToBytes)(signature) : signature;
    const r = bytes.slice(0, 32);
    const s = bytes.slice(32, 64);
    return {
        r: BigInt((0, utils_js_1.bytesToHex)(r)),
        s: BigInt((0, utils_js_1.bytesToHex)(s)),
    };
}
exports.parseSignature = parseSignature;
function serializeSignature(signature, options = {}) {
    const { to = 'hex' } = options;
    const result = new Uint8Array([
        ...(0, utils_1.numberToBytesBE)(signature.r, 32),
        ...(0, utils_1.numberToBytesBE)(signature.s, 32),
    ]);
    return (to === 'hex' ? (0, utils_js_1.bytesToHex)(result) : result);
}
exports.serializeSignature = serializeSignature;
//# sourceMappingURL=sign.js.map