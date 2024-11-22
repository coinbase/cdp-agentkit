import { equalBytes } from '@noble/curves/abstract/utils'
import * as Errors from './Errors.js'
import * as Hex from './Hex.js'
import * as Json from './Json.js'
import * as internal from './internal/bytes.js'
import * as internal_hex from './internal/hex.js'

const decoder = /*#__PURE__*/ new TextDecoder()
const encoder = /*#__PURE__*/ new TextEncoder()

/** Root type for a Bytes array. */
export type Bytes = Uint8Array

/**
 * Asserts if the given value is {@link ox#Bytes.Bytes}.
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * Bytes.assert('abc')
 * // @error: Bytes.InvalidBytesTypeError:
 * // @error: Value `"abc"` of type `string` is an invalid Bytes value.
 * // @error: Bytes values must be of type `Uint8Array`.
 * ```
 *
 * @param value - Value to assert.
 */
export function assert(value: unknown): asserts value is Bytes {
  if (value instanceof Uint8Array) return
  if (!value) throw new InvalidBytesTypeError(value)
  if (typeof value !== 'object') throw new InvalidBytesTypeError(value)
  if (!('BYTES_PER_ELEMENT' in value)) throw new InvalidBytesTypeError(value)
  if (value.BYTES_PER_ELEMENT !== 1 || value.constructor.name !== 'Uint8Array')
    throw new InvalidBytesTypeError(value)
}

export declare namespace assert {
  type ErrorType = InvalidBytesTypeError | Errors.GlobalErrorType
}

/* v8 ignore next */
assert.parseError = (error: unknown) => error as assert.ErrorType

/**
 * Concatenates two or more {@link ox#Bytes.Bytes}.
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * const bytes = Bytes.concat(
 *   Bytes.from([1]),
 *   Bytes.from([69]),
 *   Bytes.from([420, 69]),
 * )
 * // @log: Uint8Array [ 1, 69, 420, 69 ]
 * ```
 *
 * @param values - Values to concatenate.
 * @returns Concatenated {@link ox#Bytes.Bytes}.
 */
export function concat(...values: readonly Bytes[]): Bytes {
  let length = 0
  for (const arr of values) {
    length += arr.length
  }
  const result = new Uint8Array(length)
  for (let i = 0, index = 0; i < values.length; i++) {
    const arr = values[i]
    result.set(arr!, index)
    index += arr!.length
  }
  return result
}

export declare namespace concat {
  type ErrorType = Errors.GlobalErrorType
}

/* v8 ignore next */
concat.parseError = (error: unknown) => error as concat.ErrorType

/**
 * Instantiates a {@link ox#Bytes.Bytes} value from a `Uint8Array`, a hex string, or an array of unsigned 8-bit integers.
 *
 * :::tip
 *
 * To instantiate from a **Boolean**, **String**, or **Number**, use one of the following:
 *
 * - `Bytes.fromBoolean`
 *
 * - `Bytes.fromString`
 *
 * - `Bytes.fromNumber`
 *
 * :::
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Bytes } from 'ox'
 *
 * const data = Bytes.from([255, 124, 5, 4])
 * // @log: Uint8Array([255, 124, 5, 4])
 *
 * const data = Bytes.from('0xdeadbeef')
 * // @log: Uint8Array([222, 173, 190, 239])
 * ```
 *
 * @param value - Value to convert.
 * @returns A {@link ox#Bytes.Bytes} instance.
 */
export function from(value: Hex.Hex | Bytes | readonly number[]): Bytes {
  if (value instanceof Uint8Array) return value
  if (typeof value === 'string') return fromHex(value)
  return fromArray(value)
}

export declare namespace from {
  type ErrorType =
    | fromHex.ErrorType
    | fromArray.ErrorType
    | Errors.GlobalErrorType
}

from.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as from.ErrorType

/**
 * Converts an array of unsigned 8-bit integers into {@link ox#Bytes.Bytes}.
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * const data = Bytes.fromArray([255, 124, 5, 4])
 * // @log: Uint8Array([255, 124, 5, 4])
 * ```
 *
 * @param value - Value to convert.
 * @returns A {@link ox#Bytes.Bytes} instance.
 */
export function fromArray(value: readonly number[] | Uint8Array): Bytes {
  return value instanceof Uint8Array ? value : new Uint8Array(value)
}

export declare namespace fromArray {
  type ErrorType = Errors.GlobalErrorType
}

fromArray.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromArray.ErrorType

/**
 * Encodes a boolean value into {@link ox#Bytes.Bytes}.
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * const data = Bytes.fromBoolean(true)
 * // @log: Uint8Array([1])
 * ```
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * const data = Bytes.fromBoolean(true, { size: 32 })
 * // @log: Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1])
 * ```
 *
 * @param value - Boolean value to encode.
 * @param options - Encoding options.
 * @returns Encoded {@link ox#Bytes.Bytes}.
 */
export function fromBoolean(value: boolean, options: fromBoolean.Options = {}) {
  const { size } = options
  const bytes = new Uint8Array(1)
  bytes[0] = Number(value)
  if (typeof size === 'number') {
    internal.assertSize(bytes, size)
    return padLeft(bytes, size)
  }
  return bytes
}

export declare namespace fromBoolean {
  type Options = {
    /** Size of the output bytes. */
    size?: number | undefined
  }

  type ErrorType =
    | internal.assertSize.ErrorType
    | padLeft.ErrorType
    | Errors.GlobalErrorType
}

fromBoolean.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromBoolean.ErrorType

/**
 * Encodes a {@link ox#Hex.Hex} value into {@link ox#Bytes.Bytes}.
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * const data = Bytes.fromHex('0x48656c6c6f20776f726c6421')
 * // @log: Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33])
 * ```
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * const data = Bytes.fromHex('0x48656c6c6f20776f726c6421', { size: 32 })
 * // @log: Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
 * ```
 *
 * @param value - {@link ox#Hex.Hex} value to encode.
 * @param options - Encoding options.
 * @returns Encoded {@link ox#Bytes.Bytes}.
 */
export function fromHex(value: Hex.Hex, options: fromHex.Options = {}): Bytes {
  const { size } = options

  if (value.length % 2) throw new Hex.InvalidLengthError(value)

  let hex = value
  if (size) {
    internal_hex.assertSize(value, size)
    hex = Hex.padRight(value, size)
  }

  const hexString = hex.slice(2) as string

  const length = hexString.length / 2
  const bytes = new Uint8Array(length)
  for (let index = 0, j = 0; index < length; index++) {
    const nibbleLeft = internal.charCodeToBase16(hexString.charCodeAt(j++))
    const nibbleRight = internal.charCodeToBase16(hexString.charCodeAt(j++))
    if (nibbleLeft === undefined || nibbleRight === undefined) {
      throw new Errors.BaseError(
        `Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`,
      )
    }
    bytes[index] = nibbleLeft * 16 + nibbleRight
  }
  return bytes
}

export declare namespace fromHex {
  type Options = {
    /** Size of the output bytes. */
    size?: number | undefined
  }

  type ErrorType =
    | internal_hex.assertSize.ErrorType
    | Hex.padRight.ErrorType
    | Hex.InvalidLengthError
    | Errors.GlobalErrorType
}

/* v8 ignore next */
fromHex.parseError = (error: unknown) => error as fromHex.ErrorType

/**
 * Encodes a number value into {@link ox#Bytes.Bytes}.
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * const data = Bytes.fromNumber(420)
 * // @log: Uint8Array([1, 164])
 * ```
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * const data = Bytes.fromNumber(420, { size: 4 })
 * // @log: Uint8Array([0, 0, 1, 164])
 * ```
 *
 * @param value - Number value to encode.
 * @param options - Encoding options.
 * @returns Encoded {@link ox#Bytes.Bytes}.
 */
export function fromNumber(
  value: bigint | number,
  options?: fromNumber.Options | undefined,
) {
  const hex = Hex.fromNumber(value, options)
  return fromHex(hex)
}

export declare namespace fromNumber {
  export type Options = Hex.fromNumber.Options

  export type ErrorType =
    | Hex.fromNumber.ErrorType
    | fromHex.ErrorType
    | Errors.GlobalErrorType
}

fromNumber.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromNumber.ErrorType

/**
 * Encodes a string into {@link ox#Bytes.Bytes}.
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * const data = Bytes.fromString('Hello world!')
 * // @log: Uint8Array([72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 33])
 * ```
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * const data = Bytes.fromString('Hello world!', { size: 32 })
 * // @log: Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
 * ```
 *
 * @param value - String to encode.
 * @param options - Encoding options.
 * @returns Encoded {@link ox#Bytes.Bytes}.
 */
export function fromString(
  value: string,
  options: fromString.Options = {},
): Bytes {
  const { size } = options

  const bytes = encoder.encode(value)
  if (typeof size === 'number') {
    internal.assertSize(bytes, size)
    return padRight(bytes, size)
  }
  return bytes
}

export declare namespace fromString {
  type Options = {
    /** Size of the output bytes. */
    size?: number | undefined
  }

  type ErrorType =
    | internal.assertSize.ErrorType
    | padRight.ErrorType
    | Errors.GlobalErrorType
}

fromString.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromString.ErrorType

/**
 * Checks if two {@link ox#Bytes.Bytes} values are equal.
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * Bytes.isEqual(Bytes.from([1]), Bytes.from([1]))
 * // @log: true
 *
 * Bytes.isEqual(Bytes.from([1]), Bytes.from([2]))
 * // @log: false
 * ```
 *
 * @param bytesA - First {@link ox#Bytes.Bytes} value.
 * @param bytesB - Second {@link ox#Bytes.Bytes} value.
 * @returns `true` if the two values are equal, otherwise `false`.
 */
export function isEqual(bytesA: Bytes, bytesB: Bytes) {
  return equalBytes(bytesA, bytesB)
}

export declare namespace isEqual {
  type ErrorType = Errors.GlobalErrorType
}

/* v8 ignore next */
isEqual.parseError = (error: unknown) => error as isEqual.ErrorType

/**
 * Pads a {@link ox#Bytes.Bytes} value to the left with zero bytes until it reaches the given `size` (default: 32 bytes).
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * Bytes.padLeft(Bytes.from([1]), 4)
 * // @log: Uint8Array([0, 0, 0, 1])
 * ```
 *
 * @param value - {@link ox#Bytes.Bytes} value to pad.
 * @param size - Size to pad the {@link ox#Bytes.Bytes} value to.
 * @returns Padded {@link ox#Bytes.Bytes} value.
 */
export function padLeft(
  value: Bytes,
  size?: number | undefined,
): padLeft.ReturnType {
  return internal.pad(value, { dir: 'left', size })
}

export declare namespace padLeft {
  type ReturnType = internal.pad.ReturnType
  type ErrorType = internal.pad.ErrorType | Errors.GlobalErrorType
}

/* v8 ignore next */
padLeft.parseError = (error: unknown) => error as padLeft.ErrorType

/**
 * Pads a {@link ox#Bytes.Bytes} value to the right with zero bytes until it reaches the given `size` (default: 32 bytes).
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * Bytes.padRight(Bytes.from([1]), 4)
 * // @log: Uint8Array([1, 0, 0, 0])
 * ```
 *
 * @param value - {@link ox#Bytes.Bytes} value to pad.
 * @param size - Size to pad the {@link ox#Bytes.Bytes} value to.
 * @returns Padded {@link ox#Bytes.Bytes} value.
 */
export function padRight(
  value: Bytes,
  size?: number | undefined,
): padRight.ReturnType {
  return internal.pad(value, { dir: 'right', size })
}

export declare namespace padRight {
  type ReturnType = internal.pad.ReturnType
  type ErrorType = internal.pad.ErrorType | Errors.GlobalErrorType
}

/* v8 ignore next */
padRight.parseError = (error: unknown) => error as padRight.ErrorType

/**
 * Generates random {@link ox#Bytes.Bytes} of the specified length.
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * const bytes = Bytes.random(32)
 * // @log: Uint8Array([... x32])
 * ```
 *
 * @param length - Length of the random {@link ox#Bytes.Bytes} to generate.
 * @returns Random {@link ox#Bytes.Bytes} of the specified length.
 */
export function random(length: number): Bytes {
  return crypto.getRandomValues(new Uint8Array(length))
}

export declare namespace random {
  type ErrorType = Errors.GlobalErrorType
}

/* v8 ignore next */
random.parseError = (error: unknown) => error as random.ErrorType

/**
 * Retrieves the size of a {@link ox#Bytes.Bytes} value.
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * Bytes.size(Bytes.from([1, 2, 3, 4]))
 * // @log: 4
 * ```
 *
 * @param value - {@link ox#Bytes.Bytes} value.
 * @returns Size of the {@link ox#Bytes.Bytes} value.
 */
export function size(value: Bytes): number {
  return value.length
}

export declare namespace size {
  export type ErrorType = Errors.GlobalErrorType
}

/* v8 ignore next */
size.parseError = (error: unknown) => error as size.ErrorType

/**
 * Returns a section of a {@link ox#Bytes.Bytes} value given a start/end bytes offset.
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * Bytes.slice(
 *   Bytes.from([1, 2, 3, 4, 5, 6, 7, 8, 9]),
 *   1,
 *   4,
 * )
 * // @log: Uint8Array([2, 3, 4])
 * ```
 *
 * @param value - The {@link ox#Bytes.Bytes} value.
 * @param start - Start offset.
 * @param end - End offset.
 * @param options - Slice options.
 * @returns Sliced {@link ox#Bytes.Bytes} value.
 */
export function slice(
  value: Bytes,
  start?: number | undefined,
  end?: number | undefined,
  options: slice.Options = {},
): Bytes {
  const { strict } = options
  internal.assertStartOffset(value, start)
  const value_ = value.slice(start, end)
  if (strict) internal.assertEndOffset(value_, start, end)
  return value_
}

export declare namespace slice {
  type Options = {
    /** Asserts that the sliced value is the same size as the given start/end offsets. */
    strict?: boolean | undefined
  }

  export type ErrorType =
    | internal.assertStartOffset.ErrorType
    | internal.assertEndOffset.ErrorType
    | Errors.GlobalErrorType
}

/* v8 ignore next */
slice.parseError = (error: unknown) => error as slice.ErrorType

/**
 * Decodes a {@link ox#Bytes.Bytes} into a bigint.
 *
 * @example
 * ```ts
 * import { Bytes } from 'ox'
 *
 * Bytes.toBigInt(Bytes.from([1, 164]))
 * // @log: 420n
 * ```
 *
 * @param bytes - The {@link ox#Bytes.Bytes} to decode.
 * @param options - Decoding options.
 * @returns Decoded bigint.
 */
export function toBigInt(bytes: Bytes, options: toBigInt.Options = {}): bigint {
  const { size } = options
  if (typeof size !== 'undefined') internal.assertSize(bytes, size)
  const hex = Hex.fromBytes(bytes, options)
  return Hex.toBigInt(hex, options)
}

export declare namespace toBigInt {
  type Options = {
    /** Whether or not the number of a signed representation. */
    signed?: boolean | undefined
    /** Size of the bytes. */
    size?: number | undefined
  }

  type ErrorType =
    | Hex.fromBytes.ErrorType
    | Hex.toBigInt.ErrorType
    | Errors.GlobalErrorType
}

toBigInt.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toBigInt.ErrorType

/**
 * Decodes a {@link ox#Bytes.Bytes} into a boolean.
 *
 * @example
 * ```ts
 * import { Bytes } from 'ox'
 *
 * Bytes.toBoolean(Bytes.from([1]))
 * // @log: true
 * ```
 *
 * @param bytes - The {@link ox#Bytes.Bytes} to decode.
 * @param options - Decoding options.
 * @returns Decoded boolean.
 */
export function toBoolean(
  bytes: Bytes,
  options: toBoolean.Options = {},
): boolean {
  const { size } = options
  let bytes_ = bytes
  if (typeof size !== 'undefined') {
    internal.assertSize(bytes_, size)
    bytes_ = trimLeft(bytes_)
  }
  if (bytes_.length > 1 || bytes_[0]! > 1)
    throw new InvalidBytesBooleanError(bytes_)
  return Boolean(bytes_[0])
}

export declare namespace toBoolean {
  type Options = {
    /** Size of the bytes. */
    size?: number | undefined
  }

  type ErrorType =
    | internal.assertSize.ErrorType
    | trimLeft.ErrorType
    | Errors.GlobalErrorType
}

toBoolean.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toBoolean.ErrorType

/**
 * Encodes a {@link ox#Bytes.Bytes} value into a {@link ox#Hex.Hex} value.
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * Bytes.toHex(Bytes.from([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]))
 * // '0x48656c6c6f20576f726c6421'
 * ```
 *
 * @param value - The {@link ox#Bytes.Bytes} to decode.
 * @param options - Options.
 * @returns Decoded {@link ox#Hex.Hex} value.
 */
export function toHex(value: Bytes, options: toHex.Options = {}): Hex.Hex {
  return Hex.fromBytes(value, options)
}

export declare namespace toHex {
  type Options = {
    /** Size of the bytes. */
    size?: number | undefined
  }

  type ErrorType = Hex.fromBytes.ErrorType | Errors.GlobalErrorType
}

/* v8 ignore next */
toHex.parseError = (error: unknown) => error as toHex.ErrorType

/**
 * Decodes a {@link ox#Bytes.Bytes} into a number.
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * Bytes.toNumber(Bytes.from([1, 164]))
 * // @log: 420
 * ```
 */
export function toNumber(bytes: Bytes, options: toNumber.Options = {}): number {
  const { size } = options
  if (typeof size !== 'undefined') internal.assertSize(bytes, size)
  const hex = Hex.fromBytes(bytes, options)
  return Hex.toNumber(hex, options)
}

export declare namespace toNumber {
  type Options = {
    /** Whether or not the number of a signed representation. */
    signed?: boolean | undefined
    /** Size of the bytes. */
    size?: number | undefined
  }

  type ErrorType =
    | Hex.fromBytes.ErrorType
    | Hex.toNumber.ErrorType
    | Errors.GlobalErrorType
}

toNumber.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toNumber.ErrorType

/**
 * Decodes a {@link ox#Bytes.Bytes} into a string.
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * const data = Bytes.toString(Bytes.from([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]))
 * // @log: 'Hello world'
 * ```
 *
 * @param bytes - The {@link ox#Bytes.Bytes} to decode.
 * @param options - Options.
 * @returns Decoded string.
 */
export function toString(bytes: Bytes, options: toString.Options = {}): string {
  const { size } = options

  let bytes_ = bytes
  if (typeof size !== 'undefined') {
    internal.assertSize(bytes_, size)
    bytes_ = trimRight(bytes_)
  }
  return decoder.decode(bytes_)
}

export declare namespace toString {
  export type Options = {
    /** Size of the bytes. */
    size?: number | undefined
  }

  export type ErrorType =
    | internal.assertSize.ErrorType
    | trimRight.ErrorType
    | Errors.GlobalErrorType
}

toString.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toString.ErrorType

/**
 * Trims leading zeros from a {@link ox#Bytes.Bytes} value.
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * Bytes.trimLeft(Bytes.from([0, 0, 0, 0, 1, 2, 3]))
 * // @log: Uint8Array([1, 2, 3])
 * ```
 *
 * @param value - {@link ox#Bytes.Bytes} value.
 * @returns Trimmed {@link ox#Bytes.Bytes} value.
 */
export function trimLeft(value: Bytes): Bytes {
  return internal.trim(value, { dir: 'left' })
}

export declare namespace trimLeft {
  type ErrorType = internal.trim.ErrorType | Errors.GlobalErrorType
}

/* v8 ignore next */
trimLeft.parseError = (error: unknown) => error as trimLeft.ErrorType

/**
 * Trims trailing zeros from a {@link ox#Bytes.Bytes} value.
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * Bytes.trimRight(Bytes.from([1, 2, 3, 0, 0, 0, 0]))
 * // @log: Uint8Array([1, 2, 3])
 * ```
 *
 * @param value - {@link ox#Bytes.Bytes} value.
 * @returns Trimmed {@link ox#Bytes.Bytes} value.
 */
export function trimRight(value: Bytes): Bytes {
  return internal.trim(value, { dir: 'right' })
}

export declare namespace trimRight {
  export type ErrorType = internal.trim.ErrorType | Errors.GlobalErrorType
}

/* v8 ignore next */
trimRight.parseError = (error: unknown) => error as trimRight.ErrorType

/**
 * Checks if the given value is {@link ox#Bytes.Bytes}.
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * Bytes.validate('0x')
 * // @log: false
 *
 * Bytes.validate(Bytes.from([1, 2, 3]))
 * // @log: true
 * ```
 *
 * @param value - Value to check.
 * @returns `true` if the value is {@link ox#Bytes.Bytes}, otherwise `false`.
 */
export function validate(value: unknown): value is Bytes {
  try {
    assert(value)
    return true
  } catch {
    return false
  }
}

export declare namespace validate {
  export type ErrorType = Errors.GlobalErrorType
}

/* v8 ignore next */
validate.parseError = (error: unknown) => error as validate.ErrorType

/**
 * Thrown when the bytes value cannot be represented as a boolean.
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * Bytes.toBoolean(Bytes.from([5]))
 * // @error: Bytes.InvalidBytesBooleanError: Bytes value `[5]` is not a valid boolean.
 * // @error: The bytes array must contain a single byte of either a `0` or `1` value.
 * ```
 */
export class InvalidBytesBooleanError extends Errors.BaseError {
  override readonly name = 'Bytes.InvalidBytesBooleanError'

  constructor(bytes: Bytes) {
    super(`Bytes value \`${bytes}\` is not a valid boolean.`, {
      metaMessages: [
        'The bytes array must contain a single byte of either a `0` or `1` value.',
      ],
    })
  }
}

/**
 * Thrown when a value cannot be converted to bytes.
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Bytes } from 'ox'
 *
 * Bytes.from('foo')
 * // @error: Bytes.InvalidBytesTypeError: Value `foo` of type `string` is an invalid Bytes value.
 * ```
 */
export class InvalidBytesTypeError extends Errors.BaseError {
  override readonly name = 'Bytes.InvalidBytesTypeError'

  constructor(value: unknown) {
    super(
      `Value \`${typeof value === 'object' ? Json.stringify(value) : value}\` of type \`${typeof value}\` is an invalid Bytes value.`,
      {
        metaMessages: ['Bytes values must be of type `Bytes`.'],
      },
    )
  }
}

/**
 * Thrown when a size exceeds the maximum allowed size.
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * Bytes.fromString('Hello World!', { size: 8 })
 * // @error: Bytes.SizeOverflowError: Size cannot exceed `8` bytes. Given size: `12` bytes.
 * ```
 */
export class SizeOverflowError extends Errors.BaseError {
  override readonly name = 'Bytes.SizeOverflowError'

  constructor({ givenSize, maxSize }: { givenSize: number; maxSize: number }) {
    super(
      `Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`,
    )
  }
}

/**
 * Thrown when a slice offset is out-of-bounds.
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * Bytes.slice(Bytes.from([1, 2, 3]), 4)
 * // @error: Bytes.SliceOffsetOutOfBoundsError: Slice starting at offset `4` is out-of-bounds (size: `3`).
 * ```
 */
export class SliceOffsetOutOfBoundsError extends Errors.BaseError {
  override readonly name = 'Bytes.SliceOffsetOutOfBoundsError'

  constructor({
    offset,
    position,
    size,
  }: { offset: number; position: 'start' | 'end'; size: number }) {
    super(
      `Slice ${
        position === 'start' ? 'starting' : 'ending'
      } at offset \`${offset}\` is out-of-bounds (size: \`${size}\`).`,
    )
  }
}

/**
 * Thrown when a the padding size exceeds the maximum allowed size.
 *
 * @example
 * ```ts twoslash
 * import { Bytes } from 'ox'
 *
 * Bytes.padLeft(Bytes.fromString('Hello World!'), 8)
 * // @error: [Bytes.SizeExceedsPaddingSizeError: Bytes size (`12`) exceeds padding size (`8`).
 * ```
 */
export class SizeExceedsPaddingSizeError extends Errors.BaseError {
  override readonly name = 'Bytes.SizeExceedsPaddingSizeError'

  constructor({
    size,
    targetSize,
    type,
  }: {
    size: number
    targetSize: number
    type: 'Hex' | 'Bytes'
  }) {
    super(
      `${type.charAt(0).toUpperCase()}${type
        .slice(1)
        .toLowerCase()} size (\`${size}\`) exceeds padding size (\`${targetSize}\`).`,
    )
  }
}
