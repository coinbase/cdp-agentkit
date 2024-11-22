import type { ErrorType } from '../../errors/utils.js';
import type { Hex } from '../../types/misc.js';
import { type ToBytesErrorType } from '../../utils/encoding/toBytes.js';
import { type Sha256ErrorType } from '../../utils/hash/sha256.js';
import { type BytecodeLengthExceedsMaxSizeErrorType, type BytecodeLengthInWordsMustBeOddErrorType, type BytecodeLengthMustBeDivisibleBy32ErrorType } from '../errors/bytecode.js';
export type HashBytecodeErrorType = BytecodeLengthExceedsMaxSizeErrorType | BytecodeLengthInWordsMustBeOddErrorType | BytecodeLengthMustBeDivisibleBy32ErrorType | Sha256ErrorType | ToBytesErrorType | ErrorType;
export declare function hashBytecode(bytecode: Hex): Uint8Array;
//# sourceMappingURL=hashBytecode.d.ts.map