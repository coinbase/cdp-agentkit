import { etherUnits } from '../../constants/unit.js';
import { parseUnits } from './parseUnits.js';
/**
 * Converts a string representation of ether to numerical wei.
 *
 * - Docs: https://viem.sh/docs/utilities/parseEther
 *
 * @example
 * import { parseEther } from 'viem'
 *
 * parseEther('420')
 * // 420000000000000000000n
 */
export function parseEther(ether, unit = 'wei') {
    return parseUnits(ether, etherUnits[unit]);
}
//# sourceMappingURL=parseEther.js.map