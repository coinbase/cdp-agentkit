import type { AbiFunction } from 'abitype';
import type { ErrorType } from '../../errors/utils.js';
import { type SliceErrorType } from '../data/slice.js';
import { type ToSignatureHashErrorType } from './toSignatureHash.js';
export type ToFunctionSelectorErrorType = ToSignatureHashErrorType | SliceErrorType | ErrorType;
/**
 * Returns the function selector for a given function definition.
 *
 * @example
 * const selector = toFunctionSelector('function ownerOf(uint256 tokenId)')
 * // 0x6352211e
 */
export declare const toFunctionSelector: (fn: string | AbiFunction) => `0x${string}`;
//# sourceMappingURL=toFunctionSelector.d.ts.map