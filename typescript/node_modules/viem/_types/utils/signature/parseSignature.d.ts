import type { ErrorType } from '../../errors/utils.js';
import type { Hex } from '../../types/misc.js';
import { type NumberToHexErrorType } from '../../utils/encoding/toHex.js';
export type ParseSignatureErrorType = NumberToHexErrorType | ErrorType;
/**
 * @description Parses a hex formatted signature into a structured signature.
 *
 * @param signatureHex Signature in hex format.
 * @returns The structured signature.
 *
 * @example
 * parseSignature('0x6e100a352ec6ad1b70802290e18aeed190704973570f3b8ed42cb9808e2ea6bf4a90a229a244495b41890987806fcbd2d5d23fc0dbe5f5256c2613c039d76db81c')
 * // { r: '0x...', s: '0x...', v: 28n }
 */
export declare function parseSignature(signatureHex: Hex): {
    r: `0x${string}`;
    s: `0x${string}`;
    v: bigint;
    yParity: number;
} | {
    r: `0x${string}`;
    s: `0x${string}`;
    yParity: number;
    v?: never;
};
//# sourceMappingURL=parseSignature.d.ts.map