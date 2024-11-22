import { type AbiEvent, type AbiFunction } from 'abitype';
import type { ErrorType } from '../../errors/utils.js';
import { type NormalizeSignatureErrorType } from './normalizeSignature.js';
export type ToSignatureErrorType = NormalizeSignatureErrorType | ErrorType;
/**
 * Returns the signature for a given function or event definition.
 *
 * @example
 * const signature = toSignature('function ownerOf(uint256 tokenId)')
 * // 'ownerOf(uint256)'
 *
 * @example
 * const signature_3 = toSignature({
 *   name: 'ownerOf',
 *   type: 'function',
 *   inputs: [{ name: 'tokenId', type: 'uint256' }],
 *   outputs: [],
 *   stateMutability: 'view',
 * })
 * // 'ownerOf(uint256)'
 */
export declare const toSignature: (def: string | AbiFunction | AbiEvent) => string;
//# sourceMappingURL=toSignature.d.ts.map