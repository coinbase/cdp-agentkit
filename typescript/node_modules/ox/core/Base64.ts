import * as Bytes from './Bytes.js'
import type * as Errors from './Errors.js'
import * as Hex from './Hex.js'

const encoder = /*#__PURE__*/ new TextEncoder()
const decoder = /*#__PURE__*/ new TextDecoder()

const integerToCharacter = /*#__PURE__*/ Object.fromEntries(
  Array.from(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  ).map((a, i) => [i, a.charCodeAt(0)]),
)

const characterToInteger = /*#__PURE__*/ {
  ...Object.fromEntries(
    Array.from(
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    ).map((a, i) => [a.charCodeAt(0), i]),
  ),
  ['='.charCodeAt(0)]: 0,
  ['-'.charCodeAt(0)]: 62,
  ['_'.charCodeAt(0)]: 63,
} as Record<number, number>

/**
 * Encodes a {@link ox#Bytes.Bytes} to a Base64-encoded string (with optional padding and/or URL-safe characters).
 *
 * @example
 * ```ts twoslash
 * import { Base64, Bytes } from 'ox'
 *
 * const value = Base64.fromBytes(Bytes.fromString('hello world'))
 * // @log: 'aGVsbG8gd29ybGQ='
 * ```
 *
 * @example
 * ### No Padding
 *
 * Turn off [padding of encoded data](https://datatracker.ietf.org/doc/html/rfc4648#section-3.2) with the `pad` option:
 *
 * ```ts twoslash
 * import { Base64, Bytes } from 'ox'
 *
 * const value = Base64.fromBytes(Bytes.fromString('hello world'), { pad: false })
 * // @log: 'aGVsbG8gd29ybGQ'
 * ```
 *
 * ### URL-safe Encoding
 *
 * Turn on [URL-safe encoding](https://datatracker.ietf.org/doc/html/rfc4648#section-5) (Base64 URL) with the `url` option:
 *
 * ```ts twoslash
 * import { Base64, Bytes } from 'ox'
 *
 * const value = Base64.fromBytes(Bytes.fromString('hello wod'), { url: true })
 * // @log: 'aGVsbG8gd29_77-9ZA=='
 * ```
 *
 * @param value - The byte array to encode.
 * @param options - Encoding options.
 * @returns The Base64 encoded string.
 */
export function fromBytes(value: Bytes.Bytes, options: fromBytes.Options = {}) {
  const { pad = true, url = false } = options

  const encoded = new Uint8Array(Math.ceil(value.length / 3) * 4)

  for (let i = 0, j = 0; j < value.length; i += 4, j += 3) {
    const y = (value[j]! << 16) + (value[j + 1]! << 8) + (value[j + 2]! | 0)
    encoded[i] = integerToCharacter[y >> 18]!
    encoded[i + 1] = integerToCharacter[(y >> 12) & 0x3f]!
    encoded[i + 2] = integerToCharacter[(y >> 6) & 0x3f]!
    encoded[i + 3] = integerToCharacter[y & 0x3f]!
  }

  const k = value.length % 3
  const end = Math.floor(value.length / 3) * 4 + (k && k + 1)
  let base64 = decoder.decode(new Uint8Array(encoded.buffer, 0, end))
  if (pad && k === 1) base64 += '=='
  if (pad && k === 2) base64 += '='
  if (url) base64 = base64.replaceAll('+', '-').replaceAll('/', '_')
  return base64
}

export declare namespace fromBytes {
  type Options = {
    /**
     * Whether to [pad](https://datatracker.ietf.org/doc/html/rfc4648#section-3.2) the Base64 encoded string.
     *
     * @default true
     */
    pad?: boolean | undefined
    /**
     * Whether to Base64 encode with [URL safe characters](https://datatracker.ietf.org/doc/html/rfc4648#section-5).
     *
     * @default false
     */
    url?: boolean | undefined
  }

  type ErrorType = Errors.GlobalErrorType
}

fromBytes.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromBytes.ErrorType

/**
 * Encodes a {@link ox#Hex.Hex} to a Base64-encoded string (with optional padding and/or URL-safe characters).
 *
 * @example
 * ```ts twoslash
 * import { Base64, Hex } from 'ox'
 *
 * const value = Base64.fromHex(Hex.fromString('hello world'))
 * // @log: 'aGVsbG8gd29ybGQ='
 * ```
 *
 * @example
 * ### No Padding
 *
 * Turn off [padding of encoded data](https://datatracker.ietf.org/doc/html/rfc4648#section-3.2) with the `pad` option:
 *
 * ```ts twoslash
 * import { Base64, Hex } from 'ox'
 *
 * const value = Base64.fromHex(Hex.fromString('hello world'), { pad: false })
 * // @log: 'aGVsbG8gd29ybGQ'
 * ```
 *
 * ### URL-safe Encoding
 *
 * Turn on [URL-safe encoding](https://datatracker.ietf.org/doc/html/rfc4648#section-5) (Base64 URL) with the `url` option:
 *
 * ```ts twoslash
 * import { Base64, Hex } from 'ox'
 *
 * const value = Base64.fromHex(Hex.fromString('hello wod'), { url: true })
 * // @log: 'aGVsbG8gd29_77-9ZA=='
 * ```
 *
 * @param value - The hex value to encode.
 * @param options - Encoding options.
 * @returns The Base64 encoded string.
 */
export function fromHex(value: Hex.Hex, options: fromHex.Options = {}) {
  return fromBytes(Bytes.fromHex(value), options)
}

export declare namespace fromHex {
  type Options = {
    /**
     * Whether to [pad](https://datatracker.ietf.org/doc/html/rfc4648#section-3.2) the Base64 encoded string.
     *
     * @default true
     */
    pad?: boolean | undefined
    /**
     * Whether to Base64 encode with [URL safe characters](https://datatracker.ietf.org/doc/html/rfc4648#section-5).
     *
     * @default false
     */
    url?: boolean | undefined
  }

  type ErrorType = fromBytes.ErrorType | Errors.GlobalErrorType
}

fromHex.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromHex.ErrorType

/**
 * Encodes a string to a Base64-encoded string (with optional padding and/or URL-safe characters).
 *
 * @example
 * ```ts twoslash
 * import { Base64 } from 'ox'
 *
 * const value = Base64.fromString('hello world')
 * // @log: 'aGVsbG8gd29ybGQ='
 * ```
 *
 * @example
 * ### No Padding
 *
 * Turn off [padding of encoded data](https://datatracker.ietf.org/doc/html/rfc4648#section-3.2) with the `pad` option:
 *
 * ```ts twoslash
 * import { Base64 } from 'ox'
 *
 * const value = Base64.fromString('hello world', { pad: false })
 * // @log: 'aGVsbG8gd29ybGQ'
 * ```
 *
 * ### URL-safe Encoding
 *
 * Turn on [URL-safe encoding](https://datatracker.ietf.org/doc/html/rfc4648#section-5) (Base64 URL) with the `url` option:
 *
 * ```ts twoslash
 * import { Base64 } from 'ox'
 *
 * const value = Base64.fromString('hello wod', { url: true })
 * // @log: 'aGVsbG8gd29_77-9ZA=='
 * ```
 *
 * @param value - The string to encode.
 * @param options - Encoding options.
 * @returns The Base64 encoded string.
 */
export function fromString(value: string, options: fromString.Options = {}) {
  return fromBytes(Bytes.fromString(value), options)
}

export declare namespace fromString {
  type Options = {
    /**
     * Whether to [pad](https://datatracker.ietf.org/doc/html/rfc4648#section-3.2) the Base64 encoded string.
     *
     * @default true
     */
    pad?: boolean | undefined
    /**
     * Whether to Base64 encode with [URL safe characters](https://datatracker.ietf.org/doc/html/rfc4648#section-5).
     *
     * @default false
     */
    url?: boolean | undefined
  }

  type ErrorType = fromBytes.ErrorType | Errors.GlobalErrorType
}

fromString.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromString.ErrorType

/**
 * Decodes a Base64-encoded string (with optional padding and/or URL-safe characters) to {@link ox#Bytes.Bytes}.
 *
 * @example
 * ```ts twoslash
 * import { Base64, Bytes } from 'ox'
 *
 * const value = Base64.toBytes('aGVsbG8gd29ybGQ=')
 * // @log: Uint8Array([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100])
 * ```
 *
 * @param value - The string, hex value, or byte array to encode.
 * @returns The Base64 decoded {@link ox#Bytes.Bytes}.
 */
export function toBytes(value: string): Bytes.Bytes {
  const base64 = value.replace(/=+$/, '')

  const size = base64.length

  const decoded = new Uint8Array(size + 3)
  encoder.encodeInto(base64 + '===', decoded)

  for (let i = 0, j = 0; i < base64.length; i += 4, j += 3) {
    const x =
      (characterToInteger[decoded[i]!]! << 18) +
      (characterToInteger[decoded[i + 1]!]! << 12) +
      (characterToInteger[decoded[i + 2]!]! << 6) +
      characterToInteger[decoded[i + 3]!]!
    decoded[j] = x >> 16
    decoded[j + 1] = (x >> 8) & 0xff
    decoded[j + 2] = x & 0xff
  }

  const decodedSize = (size >> 2) * 3 + (size % 4 && (size % 4) - 1)
  return new Uint8Array(decoded.buffer, 0, decodedSize)
}

export declare namespace toBytes {
  type ErrorType = Errors.GlobalErrorType
}

toBytes.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toBytes.ErrorType

/**
 * Decodes a Base64-encoded string (with optional padding and/or URL-safe characters) to {@link ox#Hex.Hex}.
 *
 * @example
 * ```ts twoslash
 * import { Base64, Hex } from 'ox'
 *
 * const value = Base64.toHex('aGVsbG8gd29ybGQ=')
 * // @log: 0x68656c6c6f20776f726c64
 * ```
 *
 * @param value - The string, hex value, or byte array to encode.
 * @returns The Base64 decoded {@link ox#Hex.Hex}.
 */
export function toHex(value: string): Hex.Hex {
  return Hex.fromBytes(toBytes(value))
}

export declare namespace toHex {
  type ErrorType = toBytes.ErrorType | Errors.GlobalErrorType
}

toHex.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toHex.ErrorType

/**
 * Decodes a Base64-encoded string (with optional padding and/or URL-safe characters) to a string.
 *
 * @example
 * ```ts twoslash
 * import { Base64 } from 'ox'
 *
 * const value = Base64.toString('aGVsbG8gd29ybGQ=')
 * // @log: 'hello world'
 * ```
 *
 * @param value - The string, hex value, or byte array to encode.
 * @returns The Base64 decoded string.
 */
export function toString(value: string): string {
  return Bytes.toString(toBytes(value))
}

export declare namespace toString {
  type ErrorType = toBytes.ErrorType | Errors.GlobalErrorType
}

toString.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toString.ErrorType
