"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptoKeyToBytes = exports.bytesToCryptoKey = exports.utf8ToBase64 = exports.base64ToUtf8 = exports.base64ToBase64Url = exports.base64UrlToBase64 = exports.bytesToBase64Url = exports.base64UrlToBytes = exports.hexToBytes = exports.bytesToHex = void 0;
const utils_1 = require("@noble/hashes/utils");
function bytesToHex(bytes) {
    return `0x${(0, utils_1.bytesToHex)(bytes)}`;
}
exports.bytesToHex = bytesToHex;
function hexToBytes(value) {
    return (0, utils_1.hexToBytes)(value.slice(2));
}
exports.hexToBytes = hexToBytes;
function base64UrlToBytes(base64Url) {
    const base64 = base64UrlToBase64(base64Url);
    const utf8 = base64ToUtf8(base64);
    return Uint8Array.from(utf8, (c) => c.charCodeAt(0));
}
exports.base64UrlToBytes = base64UrlToBytes;
function bytesToBase64Url(bytes) {
    const base64 = utf8ToBase64(String.fromCharCode(...bytes));
    return base64ToBase64Url(base64);
}
exports.bytesToBase64Url = bytesToBase64Url;
function base64UrlToBase64(base64Url) {
    return base64Url.replaceAll('-', '+').replaceAll('_', '/');
}
exports.base64UrlToBase64 = base64UrlToBase64;
function base64ToBase64Url(base64) {
    return base64.replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}
exports.base64ToBase64Url = base64ToBase64Url;
function base64ToUtf8(base64) {
    return atob(base64);
}
exports.base64ToUtf8 = base64ToUtf8;
function utf8ToBase64(base64) {
    return btoa(base64);
}
exports.utf8ToBase64 = utf8ToBase64;
async function bytesToCryptoKey(bytes) {
    return await crypto.subtle.importKey('spki', bytes, {
        name: 'ECDSA',
        namedCurve: 'P-256',
        hash: 'SHA-256',
    }, true, ['verify']);
}
exports.bytesToCryptoKey = bytesToCryptoKey;
async function cryptoKeyToBytes(key) {
    return new Uint8Array(await crypto.subtle.exportKey('raw', key));
}
exports.cryptoKeyToBytes = cryptoKeyToBytes;
//# sourceMappingURL=utils.js.map