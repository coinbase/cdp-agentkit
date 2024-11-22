import { InvalidBytesBooleanError } from '../../errors/encoding.js';
import { trim } from '../data/trim.js';
import { assertSize, hexToBigInt, hexToNumber, } from './fromHex.js';
import { bytesToHex } from './toHex.js';
/**
 * Decodes a byte array into a UTF-8 string, hex value, number, bigint or boolean.
 *
 * - Docs: https://viem.sh/docs/utilities/fromBytes
 * - Example: https://viem.sh/docs/utilities/fromBytes#usage
 *
 * @param bytes Byte array to decode.
 * @param toOrOpts Type to convert to or options.
 * @returns Decoded value.
 *
 * @example
 * import { fromBytes } from 'viem'
 * const data = fromBytes(new Uint8Array([1, 164]), 'number')
 * // 420
 *
 * @example
 * import { fromBytes } from 'viem'
 * const data = fromBytes(
 *   new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]),
 *   'string'
 * )
 * // 'Hello world'
 */
export function fromBytes(bytes, toOrOpts) {
    const opts = typeof toOrOpts === 'string' ? { to: toOrOpts } : toOrOpts;
    const to = opts.to;
    if (to === 'number')
        return bytesToNumber(bytes, opts);
    if (to === 'bigint')
        return bytesToBigInt(bytes, opts);
    if (to === 'boolean')
        return bytesToBool(bytes, opts);
    if (to === 'string')
        return bytesToString(bytes, opts);
    return bytesToHex(bytes, opts);
}
/**
 * Decodes a byte array into a bigint.
 *
 * - Docs: https://viem.sh/docs/utilities/fromBytes#bytestobigint
 *
 * @param bytes Byte array to decode.
 * @param opts Options.
 * @returns BigInt value.
 *
 * @example
 * import { bytesToBigInt } from 'viem'
 * const data = bytesToBigInt(new Uint8Array([1, 164]))
 * // 420n
 */
export function bytesToBigInt(bytes, opts = {}) {
    if (typeof opts.size !== 'undefined')
        assertSize(bytes, { size: opts.size });
    const hex = bytesToHex(bytes, opts);
    return hexToBigInt(hex, opts);
}
/**
 * Decodes a byte array into a boolean.
 *
 * - Docs: https://viem.sh/docs/utilities/fromBytes#bytestobool
 *
 * @param bytes Byte array to decode.
 * @param opts Options.
 * @returns Boolean value.
 *
 * @example
 * import { bytesToBool } from 'viem'
 * const data = bytesToBool(new Uint8Array([1]))
 * // true
 */
export function bytesToBool(bytes_, opts = {}) {
    let bytes = bytes_;
    if (typeof opts.size !== 'undefined') {
        assertSize(bytes, { size: opts.size });
        bytes = trim(bytes);
    }
    if (bytes.length > 1 || bytes[0] > 1)
        throw new InvalidBytesBooleanError(bytes);
    return Boolean(bytes[0]);
}
/**
 * Decodes a byte array into a number.
 *
 * - Docs: https://viem.sh/docs/utilities/fromBytes#bytestonumber
 *
 * @param bytes Byte array to decode.
 * @param opts Options.
 * @returns Number value.
 *
 * @example
 * import { bytesToNumber } from 'viem'
 * const data = bytesToNumber(new Uint8Array([1, 164]))
 * // 420
 */
export function bytesToNumber(bytes, opts = {}) {
    if (typeof opts.size !== 'undefined')
        assertSize(bytes, { size: opts.size });
    const hex = bytesToHex(bytes, opts);
    return hexToNumber(hex, opts);
}
/**
 * Decodes a byte array into a UTF-8 string.
 *
 * - Docs: https://viem.sh/docs/utilities/fromBytes#bytestostring
 *
 * @param bytes Byte array to decode.
 * @param opts Options.
 * @returns String value.
 *
 * @example
 * import { bytesToString } from 'viem'
 * const data = bytesToString(new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]))
 * // 'Hello world'
 */
export function bytesToString(bytes_, opts = {}) {
    let bytes = bytes_;
    if (typeof opts.size !== 'undefined') {
        assertSize(bytes, { size: opts.size });
        bytes = trim(bytes, { dir: 'right' });
    }
    return new TextDecoder().decode(bytes);
}
//# sourceMappingURL=fromBytes.js.map