import type { ErrorType } from '../../errors/utils.js';
import type { Hex } from '../../types/misc.js';
export type IsHexErrorType = ErrorType;
export declare function isHex(value: unknown, { strict }?: {
    strict?: boolean | undefined;
}): value is Hex;
//# sourceMappingURL=isHex.d.ts.map