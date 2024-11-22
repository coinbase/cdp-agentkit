import { type IntegerOutOfRangeErrorType } from '../../errors/encoding.js';
import type { ErrorType } from '../../errors/utils.js';
import type { ByteArray, Hex } from '../../types/misc.js';
import { type PadErrorType } from '../data/pad.js';
import { type AssertSizeErrorType } from './fromHex.js';
export type ToHexParameters = {
    /** The size (in bytes) of the output hex value. */
    size?: number | undefined;
};
export type ToHexErrorType = BoolToHexErrorType | BytesToHexErrorType | NumberToHexErrorType | StringToHexErrorType | ErrorType;
/**
 * Encodes a string, number, bigint, or ByteArray into a hex string
 *
 * - Docs: https://viem.sh/docs/utilities/toHex
 * - Example: https://viem.sh/docs/utilities/toHex#usage
 *
 * @param value Value to encode.
 * @param opts Options.
 * @returns Hex value.
 *
 * @example
 * import { toHex } from 'viem'
 * const data = toHex('Hello world')
 * // '0x48656c6c6f20776f726c6421'
 *
 * @example
 * import { toHex } from 'viem'
 * const data = toHex(420)
 * // '0x1a4'
 *
 * @example
 * import { toHex } from 'viem'
 * const data = toHex('Hello world', { size: 32 })
 * // '0x48656c6c6f20776f726c64210000000000000000000000000000000000000000'
 */
export declare function toHex(value: string | number | bigint | boolean | ByteArray, opts?: ToHexParameters): Hex;
export type BoolToHexOpts = {
    /** The size (in bytes) of the output hex value. */
    size?: number | undefined;
};
export type BoolToHexErrorType = AssertSizeErrorType | PadErrorType | ErrorType;
/**
 * Encodes a boolean into a hex string
 *
 * - Docs: https://viem.sh/docs/utilities/toHex#booltohex
 *
 * @param value Value to encode.
 * @param opts Options.
 * @returns Hex value.
 *
 * @example
 * import { boolToHex } from 'viem'
 * const data = boolToHex(true)
 * // '0x1'
 *
 * @example
 * import { boolToHex } from 'viem'
 * const data = boolToHex(false)
 * // '0x0'
 *
 * @example
 * import { boolToHex } from 'viem'
 * const data = boolToHex(true, { size: 32 })
 * // '0x0000000000000000000000000000000000000000000000000000000000000001'
 */
export declare function boolToHex(value: boolean, opts?: BoolToHexOpts): Hex;
export type BytesToHexOpts = {
    /** The size (in bytes) of the output hex value. */
    size?: number | undefined;
};
export type BytesToHexErrorType = AssertSizeErrorType | PadErrorType | ErrorType;
/**
 * Encodes a bytes array into a hex string
 *
 * - Docs: https://viem.sh/docs/utilities/toHex#bytestohex
 *
 * @param value Value to encode.
 * @param opts Options.
 * @returns Hex value.
 *
 * @example
 * import { bytesToHex } from 'viem'
 * const data = bytesToHex(Uint8Array.from([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33])
 * // '0x48656c6c6f20576f726c6421'
 *
 * @example
 * import { bytesToHex } from 'viem'
 * const data = bytesToHex(Uint8Array.from([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]), { size: 32 })
 * // '0x48656c6c6f20576f726c64210000000000000000000000000000000000000000'
 */
export declare function bytesToHex(value: ByteArray, opts?: BytesToHexOpts): Hex;
export type NumberToHexOpts = {
    /** Whether or not the number of a signed representation. */
    signed?: boolean | undefined;
    /** The size (in bytes) of the output hex value. */
    size: number;
} | {
    signed?: undefined;
    /** The size (in bytes) of the output hex value. */
    size?: number | undefined;
};
export type NumberToHexErrorType = IntegerOutOfRangeErrorType | PadErrorType | ErrorType;
/**
 * Encodes a number or bigint into a hex string
 *
 * - Docs: https://viem.sh/docs/utilities/toHex#numbertohex
 *
 * @param value Value to encode.
 * @param opts Options.
 * @returns Hex value.
 *
 * @example
 * import { numberToHex } from 'viem'
 * const data = numberToHex(420)
 * // '0x1a4'
 *
 * @example
 * import { numberToHex } from 'viem'
 * const data = numberToHex(420, { size: 32 })
 * // '0x00000000000000000000000000000000000000000000000000000000000001a4'
 */
export declare function numberToHex(value_: number | bigint, opts?: NumberToHexOpts): Hex;
export type StringToHexOpts = {
    /** The size (in bytes) of the output hex value. */
    size?: number | undefined;
};
export type StringToHexErrorType = BytesToHexErrorType | ErrorType;
/**
 * Encodes a UTF-8 string into a hex string
 *
 * - Docs: https://viem.sh/docs/utilities/toHex#stringtohex
 *
 * @param value Value to encode.
 * @param opts Options.
 * @returns Hex value.
 *
 * @example
 * import { stringToHex } from 'viem'
 * const data = stringToHex('Hello World!')
 * // '0x48656c6c6f20576f726c6421'
 *
 * @example
 * import { stringToHex } from 'viem'
 * const data = stringToHex('Hello World!', { size: 32 })
 * // '0x48656c6c6f20576f726c64210000000000000000000000000000000000000000'
 */
export declare function stringToHex(value_: string, opts?: StringToHexOpts): Hex;
//# sourceMappingURL=toHex.d.ts.map