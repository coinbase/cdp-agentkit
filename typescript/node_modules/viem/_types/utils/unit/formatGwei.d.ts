import { type FormatUnitsErrorType } from './formatUnits.js';
export type FormatGweiErrorType = FormatUnitsErrorType;
/**
 * Converts numerical wei to a string representation of gwei.
 *
 * - Docs: https://viem.sh/docs/utilities/formatGwei
 *
 * @example
 * import { formatGwei } from 'viem'
 *
 * formatGwei(1000000000n)
 * // '1'
 */
export declare function formatGwei(wei: bigint, unit?: 'wei'): string;
//# sourceMappingURL=formatGwei.d.ts.map