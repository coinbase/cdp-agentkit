import { type InvalidHexBooleanErrorType, type SizeOverflowErrorType } from '../../errors/encoding.js';
import type { ErrorType } from '../../errors/utils.js';
import type { ByteArray, Hex } from '../../types/misc.js';
import { type SizeErrorType } from '../data/size.js';
import { type TrimErrorType } from '../data/trim.js';
import { type HexToBytesErrorType } from './toBytes.js';
export type AssertSizeErrorType = SizeOverflowErrorType | SizeErrorType | ErrorType;
export declare function assertSize(hexOrBytes: Hex | ByteArray, { size }: {
    size: number;
}): void;
export type FromHexParameters<to extends 'string' | 'bigint' | 'number' | 'bytes' | 'boolean'> = to | {
    /** Size (in bytes) of the hex value. */
    size?: number | undefined;
    /** Type to convert to. */
    to: to;
};
export type FromHexReturnType<to> = to extends 'string' ? string : to extends 'bigint' ? bigint : to extends 'number' ? number : to extends 'bytes' ? ByteArray : to extends 'boolean' ? boolean : never;
export type FromHexErrorType = HexToNumberErrorType | HexToBigIntErrorType | HexToBoolErrorType | HexToStringErrorType | HexToBytesErrorType | ErrorType;
/**
 * Decodes a hex string into a string, number, bigint, boolean, or byte array.
 *
 * - Docs: https://viem.sh/docs/utilities/fromHex
 * - Example: https://viem.sh/docs/utilities/fromHex#usage
 *
 * @param hex Hex string to decode.
 * @param toOrOpts Type to convert to or options.
 * @returns Decoded value.
 *
 * @example
 * import { fromHex } from 'viem'
 * const data = fromHex('0x1a4', 'number')
 * // 420
 *
 * @example
 * import { fromHex } from 'viem'
 * const data = fromHex('0x48656c6c6f20576f726c6421', 'string')
 * // 'Hello world'
 *
 * @example
 * import { fromHex } from 'viem'
 * const data = fromHex('0x48656c6c6f20576f726c64210000000000000000000000000000000000000000', {
 *   size: 32,
 *   to: 'string'
 * })
 * // 'Hello world'
 */
export declare function fromHex<to extends 'string' | 'bigint' | 'number' | 'bytes' | 'boolean'>(hex: Hex, toOrOpts: FromHexParameters<to>): FromHexReturnType<to>;
export type HexToBigIntOpts = {
    /** Whether or not the number of a signed representation. */
    signed?: boolean | undefined;
    /** Size (in bytes) of the hex value. */
    size?: number | undefined;
};
export type HexToBigIntErrorType = AssertSizeErrorType | ErrorType;
/**
 * Decodes a hex value into a bigint.
 *
 * - Docs: https://viem.sh/docs/utilities/fromHex#hextobigint
 *
 * @param hex Hex value to decode.
 * @param opts Options.
 * @returns BigInt value.
 *
 * @example
 * import { hexToBigInt } from 'viem'
 * const data = hexToBigInt('0x1a4', { signed: true })
 * // 420n
 *
 * @example
 * import { hexToBigInt } from 'viem'
 * const data = hexToBigInt('0x00000000000000000000000000000000000000000000000000000000000001a4', { size: 32 })
 * // 420n
 */
export declare function hexToBigInt(hex: Hex, opts?: HexToBigIntOpts): bigint;
export type HexToBoolOpts = {
    /** Size (in bytes) of the hex value. */
    size?: number | undefined;
};
export type HexToBoolErrorType = AssertSizeErrorType | InvalidHexBooleanErrorType | TrimErrorType | ErrorType;
/**
 * Decodes a hex value into a boolean.
 *
 * - Docs: https://viem.sh/docs/utilities/fromHex#hextobool
 *
 * @param hex Hex value to decode.
 * @param opts Options.
 * @returns Boolean value.
 *
 * @example
 * import { hexToBool } from 'viem'
 * const data = hexToBool('0x01')
 * // true
 *
 * @example
 * import { hexToBool } from 'viem'
 * const data = hexToBool('0x0000000000000000000000000000000000000000000000000000000000000001', { size: 32 })
 * // true
 */
export declare function hexToBool(hex_: Hex, opts?: HexToBoolOpts): boolean;
export type HexToNumberOpts = HexToBigIntOpts;
export type HexToNumberErrorType = HexToBigIntErrorType | ErrorType;
/**
 * Decodes a hex string into a number.
 *
 * - Docs: https://viem.sh/docs/utilities/fromHex#hextonumber
 *
 * @param hex Hex value to decode.
 * @param opts Options.
 * @returns Number value.
 *
 * @example
 * import { hexToNumber } from 'viem'
 * const data = hexToNumber('0x1a4')
 * // 420
 *
 * @example
 * import { hexToNumber } from 'viem'
 * const data = hexToBigInt('0x00000000000000000000000000000000000000000000000000000000000001a4', { size: 32 })
 * // 420
 */
export declare function hexToNumber(hex: Hex, opts?: HexToNumberOpts): number;
export type HexToStringOpts = {
    /** Size (in bytes) of the hex value. */
    size?: number | undefined;
};
export type HexToStringErrorType = AssertSizeErrorType | HexToBytesErrorType | TrimErrorType | ErrorType;
/**
 * Decodes a hex value into a UTF-8 string.
 *
 * - Docs: https://viem.sh/docs/utilities/fromHex#hextostring
 *
 * @param hex Hex value to decode.
 * @param opts Options.
 * @returns String value.
 *
 * @example
 * import { hexToString } from 'viem'
 * const data = hexToString('0x48656c6c6f20576f726c6421')
 * // 'Hello world!'
 *
 * @example
 * import { hexToString } from 'viem'
 * const data = hexToString('0x48656c6c6f20576f726c64210000000000000000000000000000000000000000', {
 *  size: 32,
 * })
 * // 'Hello world'
 */
export declare function hexToString(hex: Hex, opts?: HexToStringOpts): string;
//# sourceMappingURL=fromHex.d.ts.map