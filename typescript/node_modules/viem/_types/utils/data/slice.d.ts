import { type SliceOffsetOutOfBoundsErrorType } from '../../errors/data.js';
import type { ErrorType } from '../../errors/utils.js';
import type { ByteArray, Hex } from '../../types/misc.js';
import { type IsHexErrorType } from './isHex.js';
import { type SizeErrorType } from './size.js';
export type SliceReturnType<value extends ByteArray | Hex> = value extends Hex ? Hex : ByteArray;
export type SliceErrorType = IsHexErrorType | SliceBytesErrorType | SliceHexErrorType | ErrorType;
/**
 * @description Returns a section of the hex or byte array given a start/end bytes offset.
 *
 * @param value The hex or byte array to slice.
 * @param start The start offset (in bytes).
 * @param end The end offset (in bytes).
 */
export declare function slice<value extends ByteArray | Hex>(value: value, start?: number | undefined, end?: number | undefined, { strict }?: {
    strict?: boolean | undefined;
}): SliceReturnType<value>;
export type AssertStartOffsetErrorType = SliceOffsetOutOfBoundsErrorType | SizeErrorType | ErrorType;
export type AssertEndOffsetErrorType = SliceOffsetOutOfBoundsErrorType | SizeErrorType | ErrorType;
export type SliceBytesErrorType = AssertStartOffsetErrorType | AssertEndOffsetErrorType | ErrorType;
/**
 * @description Returns a section of the byte array given a start/end bytes offset.
 *
 * @param value The byte array to slice.
 * @param start The start offset (in bytes).
 * @param end The end offset (in bytes).
 */
export declare function sliceBytes(value_: ByteArray, start?: number | undefined, end?: number | undefined, { strict }?: {
    strict?: boolean | undefined;
}): ByteArray;
export type SliceHexErrorType = AssertStartOffsetErrorType | AssertEndOffsetErrorType | ErrorType;
/**
 * @description Returns a section of the hex value given a start/end bytes offset.
 *
 * @param value The hex value to slice.
 * @param start The start offset (in bytes).
 * @param end The end offset (in bytes).
 */
export declare function sliceHex(value_: Hex, start?: number | undefined, end?: number | undefined, { strict }?: {
    strict?: boolean | undefined;
}): Hex;
//# sourceMappingURL=slice.d.ts.map