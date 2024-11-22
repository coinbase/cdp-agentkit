import { formatAbiItem } from 'abitype';
import { normalizeSignature, } from './normalizeSignature.js';
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
export const toSignature = (def) => {
    const def_ = (() => {
        if (typeof def === 'string')
            return def;
        return formatAbiItem(def);
    })();
    return normalizeSignature(def_);
};
//# sourceMappingURL=toSignature.js.map