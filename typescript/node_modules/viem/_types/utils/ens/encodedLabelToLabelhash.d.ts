import type { ErrorType } from '../../errors/utils.js';
import type { Hex } from '../../types/misc.js';
import { type IsHexErrorType } from '../data/isHex.js';
export type EncodedLabelToLabelhashErrorType = IsHexErrorType | ErrorType;
export declare function encodedLabelToLabelhash(label: string): Hex | null;
//# sourceMappingURL=encodedLabelToLabelhash.d.ts.map