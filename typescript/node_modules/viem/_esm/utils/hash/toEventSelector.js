import { toSignatureHash, } from './toSignatureHash.js';
/**
 * Returns the event selector for a given event definition.
 *
 * @example
 * const selector = toEventSelector('Transfer(address indexed from, address indexed to, uint256 amount)')
 * // 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
 */
export const toEventSelector = toSignatureHash;
//# sourceMappingURL=toEventSelector.js.map