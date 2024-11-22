import { bytesToHex as bytesToHex_noble, hexToBytes as hexToBytes_noble, } from '@noble/hashes/utils';
export function bytesToHex(bytes) {
    return `0x${bytesToHex_noble(bytes)}`;
}
export function hexToBytes(value) {
    return hexToBytes_noble(value.slice(2));
}
export function base64UrlToBytes(base64Url) {
    const base64 = base64UrlToBase64(base64Url);
    const utf8 = base64ToUtf8(base64);
    return Uint8Array.from(utf8, (c) => c.charCodeAt(0));
}
export function bytesToBase64Url(bytes) {
    const base64 = utf8ToBase64(String.fromCharCode(...bytes));
    return base64ToBase64Url(base64);
}
export function base64UrlToBase64(base64Url) {
    return base64Url.replaceAll('-', '+').replaceAll('_', '/');
}
export function base64ToBase64Url(base64) {
    return base64.replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}
export function base64ToUtf8(base64) {
    return atob(base64);
}
export function utf8ToBase64(base64) {
    return btoa(base64);
}
export async function bytesToCryptoKey(bytes) {
    return await crypto.subtle.importKey('spki', bytes, {
        name: 'ECDSA',
        namedCurve: 'P-256',
        hash: 'SHA-256',
    }, true, ['verify']);
}
export async function cryptoKeyToBytes(key) {
    return new Uint8Array(await crypto.subtle.exportKey('raw', key));
}
//# sourceMappingURL=utils.js.map