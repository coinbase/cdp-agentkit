import type { ErrorType } from '../../errors/utils.js';
import type { ByteArray, Hex } from '../../types/misc.js';
import { type IsHexErrorType } from './isHex.js';
export type SizeErrorType = IsHexErrorType | ErrorType;
/**
 * @description Retrieves the size of the value (in bytes).
 *
 * @param value The value (hex or byte array) to retrieve the size of.
 * @returns The size of the value (in bytes).
 */
export declare function size(value: Hex | ByteArray): number;
//# sourceMappingURL=size.d.ts.map