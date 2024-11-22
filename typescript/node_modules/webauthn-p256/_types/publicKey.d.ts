import type { Hex, PublicKey } from './types.js';
/**
 * Parses a public key into x and y coordinates from the public key
 * defined on the credential.
 */
export declare function parseCredentialPublicKey(cPublicKey: ArrayBuffer): Promise<PublicKey>;
/**
 * Parses a serialized public key into x and y coordinates.
 */
export declare function parsePublicKey(publicKey: Hex | Uint8Array): PublicKey;
export type SerializePublicKeyOptions<to extends 'hex' | 'bytes' = 'hex'> = {
    compressed?: boolean | undefined;
    to?: to | 'bytes' | 'hex' | undefined;
};
/**
 * Serializes a public key into a hex string or bytes.
 */
export declare function serializePublicKey<to extends 'hex' | 'bytes' = 'hex'>(publicKey: PublicKey, options?: SerializePublicKeyOptions<to>): to extends 'hex' ? Hex : Uint8Array;
//# sourceMappingURL=publicKey.d.ts.map