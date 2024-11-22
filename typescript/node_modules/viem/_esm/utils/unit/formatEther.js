import { etherUnits } from '../../constants/unit.js';
import { formatUnits } from './formatUnits.js';
/**
 * Converts numerical wei to a string representation of ether.
 *
 * - Docs: https://viem.sh/docs/utilities/formatEther
 *
 * @example
 * import { formatEther } from 'viem'
 *
 * formatEther(1000000000000000000n)
 * // '1'
 */
export function formatEther(wei, unit = 'wei') {
    return formatUnits(wei, etherUnits[unit]);
}
//# sourceMappingURL=formatEther.js.map