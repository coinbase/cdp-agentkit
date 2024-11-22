import { slice } from '../data/slice.js';
import { toSignatureHash, } from './toSignatureHash.js';
/**
 * Returns the function selector for a given function definition.
 *
 * @example
 * const selector = toFunctionSelector('function ownerOf(uint256 tokenId)')
 * // 0x6352211e
 */
export const toFunctionSelector = (fn) => slice(toSignatureHash(fn), 0, 4);
//# sourceMappingURL=toFunctionSelector.js.map