import type { ErrorType } from '../../errors/utils.js';
import type { ByteArray, Hex } from '../../types/misc.js';
export type ConcatReturnType<value extends Hex | ByteArray> = value extends Hex ? Hex : ByteArray;
export type ConcatErrorType = ConcatBytesErrorType | ConcatHexErrorType | ErrorType;
export declare function concat<value extends Hex | ByteArray>(values: readonly value[]): ConcatReturnType<value>;
export type ConcatBytesErrorType = ErrorType;
export declare function concatBytes(values: readonly ByteArray[]): ByteArray;
export type ConcatHexErrorType = ErrorType;
export declare function concatHex(values: readonly Hex[]): Hex;
//# sourceMappingURL=concat.d.ts.map