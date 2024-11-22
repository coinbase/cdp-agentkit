import type { ErrorType } from '../../errors/utils.js';
import type { Hex } from '../../types/misc.js';
import { type IsHexErrorType } from '../data/isHex.js';
import { type SizeErrorType } from '../data/size.js';
export type IsHashErrorType = IsHexErrorType | SizeErrorType | ErrorType;
export declare function isHash(hash: string): hash is Hex;
//# sourceMappingURL=isHash.d.ts.map