import type { Hex } from './types.js';
export declare function bytesToHex(bytes: Uint8Array): Hex;
export declare function hexToBytes(value: Hex): Uint8Array;
export declare function base64UrlToBytes(base64Url: string): Uint8Array;
export declare function bytesToBase64Url(bytes: Uint8Array): string;
export declare function base64UrlToBase64(base64Url: string): string;
export declare function base64ToBase64Url(base64: string): string;
export declare function base64ToUtf8(base64: string): string;
export declare function utf8ToBase64(base64: string): string;
export declare function bytesToCryptoKey(bytes: Uint8Array): Promise<any>;
export declare function cryptoKeyToBytes(key: CryptoKey): Promise<Uint8Array>;
//# sourceMappingURL=utils.d.ts.map