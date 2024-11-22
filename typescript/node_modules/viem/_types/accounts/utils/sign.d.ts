import type { ErrorType } from '../../errors/utils.js';
import type { ByteArray, Hex, Signature } from '../../types/misc.js';
import { type NumberToHexErrorType } from '../../utils/encoding/toHex.js';
type To = 'object' | 'bytes' | 'hex';
export type SignParameters<to extends To = 'object'> = {
    hash: Hex;
    privateKey: Hex;
    to?: to | To | undefined;
};
export type SignReturnType<to extends To = 'object'> = (to extends 'object' ? Signature : never) | (to extends 'bytes' ? ByteArray : never) | (to extends 'hex' ? Hex : never);
export type SignErrorType = NumberToHexErrorType | ErrorType;
/**
 * Sets extra entropy for signing functions.
 */
export declare function setSignEntropy(entropy: true | Hex): void;
/**
 * @description Signs a hash with a given private key.
 *
 * @param hash The hash to sign.
 * @param privateKey The private key to sign with.
 *
 * @returns The signature.
 */
export declare function sign<to extends To = 'object'>({ hash, privateKey, to, }: SignParameters<to>): Promise<SignReturnType<to>>;
export {};
//# sourceMappingURL=sign.d.ts.map