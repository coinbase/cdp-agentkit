import type { ErrorType } from '../../errors/utils.js';
import { type ParseUnitsErrorType } from './parseUnits.js';
export type ParseGweiErrorType = ParseUnitsErrorType | ErrorType;
/**
 * Converts a string representation of gwei to numerical wei.
 *
 * - Docs: https://viem.sh/docs/utilities/parseGwei
 *
 * @example
 * import { parseGwei } from 'viem'
 *
 * parseGwei('420')
 * // 420000000000n
 */
export declare function parseGwei(ether: string, unit?: 'wei'): bigint;
//# sourceMappingURL=parseGwei.d.ts.map