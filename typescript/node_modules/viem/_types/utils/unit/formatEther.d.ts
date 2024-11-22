import { type FormatUnitsErrorType } from './formatUnits.js';
export type FormatEtherErrorType = FormatUnitsErrorType;
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
export declare function formatEther(wei: bigint, unit?: 'wei' | 'gwei'): string;
//# sourceMappingURL=formatEther.d.ts.map