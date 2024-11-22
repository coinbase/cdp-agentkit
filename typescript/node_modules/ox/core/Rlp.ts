import * as Bytes from './Bytes.js'
import * as Errors from './Errors.js'
import * as Hex from './Hex.js'
import * as Cursor from './internal/cursor.js'
import type { ExactPartial, RecursiveArray } from './internal/types.js'

/**
 * Decodes a Recursive-Length Prefix (RLP) value into a {@link ox#Bytes.Bytes} value.
 *
 * @example
 * ```ts twoslash
 * import { Rlp } from 'ox'
 * Rlp.toBytes('0x8b68656c6c6f20776f726c64')
 * // Uint8Array([139, 104, 101, 108, 108, 111,  32, 119, 111, 114, 108, 100])
 * ```
 *
 * @param value - The value to decode.
 * @returns The decoded {@link ox#Bytes.Bytes} value.
 */
export function toBytes(
  value: Bytes.Bytes | Hex.Hex,
): RecursiveArray<Bytes.Bytes> {
  return to(value, 'Bytes')
}

export declare namespace toBytes {
  type ErrorType = to.ErrorType
}

toBytes.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toBytes.ErrorType

/**
 * Decodes a Recursive-Length Prefix (RLP) value into a {@link ox#Hex.Hex} value.
 *
 * @example
 * ```ts twoslash
 * import { Rlp } from 'ox'
 * Rlp.toHex('0x8b68656c6c6f20776f726c64')
 * // 0x68656c6c6f20776f726c64
 * ```
 *
 * @param value - The value to decode.
 * @returns The decoded {@link ox#Hex.Hex} value.
 */
export function toHex(value: Bytes.Bytes | Hex.Hex): RecursiveArray<Hex.Hex> {
  return to(value, 'Hex')
}

export declare namespace toHex {
  type ErrorType = to.ErrorType
}

toHex.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toHex.ErrorType

/////////////////////////////////////////////////////////////////////////////////
// Internal
/////////////////////////////////////////////////////////////////////////////////

/** @internal */
export function to<
  value extends Bytes.Bytes | Hex.Hex,
  to extends 'Hex' | 'Bytes',
>(value: value, to: to | 'Hex' | 'Bytes'): to.ReturnType<to> {
  const to_ = to ?? (typeof value === 'string' ? 'Hex' : 'Bytes')

  const bytes = (() => {
    if (typeof value === 'string') {
      if (value.length > 3 && value.length % 2 !== 0)
        throw new Hex.InvalidLengthError(value)
      return Bytes.fromHex(value)
    }
    return value as Bytes.Bytes
  })()

  const cursor = Cursor.create(bytes, {
    recursiveReadLimit: Number.POSITIVE_INFINITY,
  })
  const result = decodeRlpCursor(cursor, to_)

  return result as to.ReturnType<to>
}

/** @internal */
export declare namespace to {
  type ReturnType<to extends 'Hex' | 'Bytes' = 'Hex' | 'Bytes'> =
    | (to extends 'Bytes' ? RecursiveArray<Bytes.Bytes> : never)
    | (to extends 'Hex' ? RecursiveArray<Hex.Hex> : never)

  type ErrorType =
    | Bytes.fromHex.ErrorType
    | decodeRlpCursor.ErrorType
    | Cursor.create.ErrorType
    | Hex.InvalidLengthError
    | Errors.GlobalErrorType
}

/** @internal */
to.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as to.ErrorType

/** @internal */
export function decodeRlpCursor<to extends 'Hex' | 'Bytes' = 'Hex'>(
  cursor: Cursor.Cursor,
  to: to | 'Hex' | 'Bytes' | undefined = 'Hex',
): decodeRlpCursor.ReturnType<to> {
  if (cursor.bytes.length === 0)
    return (
      to === 'Hex' ? Hex.fromBytes(cursor.bytes) : cursor.bytes
    ) as decodeRlpCursor.ReturnType<to>

  const prefix = cursor.readByte()
  if (prefix < 0x80) cursor.decrementPosition(1)

  // bytes
  if (prefix < 0xc0) {
    const length = readLength(cursor, prefix, 0x80)
    const bytes = cursor.readBytes(length)
    return (
      to === 'Hex' ? Hex.fromBytes(bytes) : bytes
    ) as decodeRlpCursor.ReturnType<to>
  }

  // list
  const length = readLength(cursor, prefix, 0xc0)
  return readList(cursor, length, to) as {} as decodeRlpCursor.ReturnType<to>
}

/** @internal */
export declare namespace decodeRlpCursor {
  type ReturnType<to extends 'Hex' | 'Bytes' = 'Hex'> = to.ReturnType<to>
  type ErrorType =
    | Hex.fromBytes.ErrorType
    | readLength.ErrorType
    | readList.ErrorType
    | Errors.GlobalErrorType
}

/** @internal */
export function readLength(
  cursor: Cursor.Cursor,
  prefix: number,
  offset: number,
) {
  if (offset === 0x80 && prefix < 0x80) return 1
  if (prefix <= offset + 55) return prefix - offset
  if (prefix === offset + 55 + 1) return cursor.readUint8()
  if (prefix === offset + 55 + 2) return cursor.readUint16()
  if (prefix === offset + 55 + 3) return cursor.readUint24()
  if (prefix === offset + 55 + 4) return cursor.readUint32()
  throw new Errors.BaseError('Invalid RLP prefix')
}

/** @internal */
export declare namespace readLength {
  type ErrorType = Errors.BaseError | Errors.GlobalErrorType
}

/** @internal */
export function readList<to extends 'Hex' | 'Bytes'>(
  cursor: Cursor.Cursor,
  length: number,
  to: to | 'Hex' | 'Bytes',
) {
  const position = cursor.position
  const value: decodeRlpCursor.ReturnType<to>[] = []
  while (cursor.position - position < length)
    value.push(decodeRlpCursor(cursor, to))
  return value
}

/** @internal */
export declare namespace readList {
  type ErrorType = Errors.GlobalErrorType
}

type Encodable = {
  length: number
  encode(cursor: Cursor.Cursor): void
}

/**
 * Encodes a {@link ox#Bytes.Bytes} or {@link ox#Hex.Hex} value into a Recursive-Length Prefix (RLP) value.
 *
 * @example
 * ```ts twoslash
 * import { Bytes, Rlp } from 'ox'
 *
 * Rlp.from('0x68656c6c6f20776f726c64', { as: 'Hex' })
 * // @log: 0x8b68656c6c6f20776f726c64
 *
 * Rlp.from(Bytes.from([139, 104, 101, 108, 108, 111,  32, 119, 111, 114, 108, 100]), { as: 'Bytes' })
 * // @log: Uint8Array([104, 101, 108, 108, 111,  32, 119, 111, 114, 108, 100])
 * ```
 *
 * @param value - The {@link ox#Bytes.Bytes} or {@link ox#Hex.Hex} value to encode.
 * @param options - Options.
 * @returns The RLP value.
 */
export function from<as extends 'Hex' | 'Bytes'>(
  value: RecursiveArray<Bytes.Bytes> | RecursiveArray<Hex.Hex>,
  options: from.Options<as>,
): from.ReturnType<as> {
  const { as } = options

  const encodable = getEncodable(value)
  const cursor = Cursor.create(new Uint8Array(encodable.length))
  encodable.encode(cursor)

  if (as === 'Hex') return Hex.fromBytes(cursor.bytes) as from.ReturnType<as>
  return cursor.bytes as from.ReturnType<as>
}

export declare namespace from {
  type Options<as extends 'Hex' | 'Bytes'> = {
    /** The type to convert the RLP value to. */
    as: as | 'Hex' | 'Bytes'
  }

  type ReturnType<as extends 'Hex' | 'Bytes'> =
    | (as extends 'Bytes' ? Bytes.Bytes : never)
    | (as extends 'Hex' ? Hex.Hex : never)

  type ErrorType =
    | Cursor.create.ErrorType
    | Hex.fromBytes.ErrorType
    | Bytes.fromHex.ErrorType
    | Errors.GlobalErrorType
}

from.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as from.ErrorType

/**
 * Encodes a {@link ox#Bytes.Bytes} value into a Recursive-Length Prefix (RLP) value.
 *
 * @example
 * ```ts twoslash
 * import { Bytes, Rlp } from 'ox'
 *
 * Rlp.fromBytes(Bytes.from([139, 104, 101, 108, 108, 111,  32, 119, 111, 114, 108, 100]))
 * // @log: Uint8Array([104, 101, 108, 108, 111,  32, 119, 111, 114, 108, 100])
 * ```
 *
 * @param bytes - The {@link ox#Bytes.Bytes} value to encode.
 * @param options - Options.
 * @returns The RLP value.
 */
export function fromBytes<as extends 'Hex' | 'Bytes' = 'Bytes'>(
  bytes: RecursiveArray<Bytes.Bytes>,
  options: fromBytes.Options<as> = {},
): fromBytes.ReturnType<as> {
  const { as = 'Bytes' } = options
  return from(bytes, { as }) as never
}

export declare namespace fromBytes {
  type Options<as extends 'Hex' | 'Bytes' = 'Bytes'> = ExactPartial<
    from.Options<as>
  >

  type ReturnType<as extends 'Hex' | 'Bytes' = 'Bytes'> = from.ReturnType<as>

  type ErrorType = from.ErrorType | Errors.GlobalErrorType
}

fromBytes.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromBytes.ErrorType

/**
 * Encodes a {@link ox#Hex.Hex} value into a Recursive-Length Prefix (RLP) value.
 *
 * @example
 * ```ts twoslash
 * import { Rlp } from 'ox'
 *
 * Rlp.fromHex('0x68656c6c6f20776f726c64')
 * // @log: 0x8b68656c6c6f20776f726c64
 * ```
 *
 * @param hex - The {@link ox#Hex.Hex} value to encode.
 * @param options - Options.
 * @returns The RLP value.
 */
export function fromHex<as extends 'Hex' | 'Bytes' = 'Hex'>(
  hex: RecursiveArray<Hex.Hex>,
  options: fromHex.Options<as> = {},
): fromHex.ReturnType<as> {
  const { as = 'Hex' } = options
  return from(hex, { as }) as never
}

export declare namespace fromHex {
  type Options<as extends 'Hex' | 'Bytes' = 'Hex'> = ExactPartial<
    from.Options<as>
  >

  type ReturnType<as extends 'Hex' | 'Bytes' = 'Hex'> = from.ReturnType<as>

  type ErrorType = from.ErrorType | Errors.GlobalErrorType
}

fromHex.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromHex.ErrorType

/////////////////////////////////////////////////////////////////////////////////
// Internal
/////////////////////////////////////////////////////////////////////////////////

function getEncodable(
  bytes: RecursiveArray<Bytes.Bytes> | RecursiveArray<Hex.Hex>,
): Encodable {
  if (Array.isArray(bytes))
    return getEncodableList(bytes.map((x) => getEncodable(x)))
  return getEncodableBytes(bytes as any)
}

function getEncodableList(list: Encodable[]): Encodable {
  const bodyLength = list.reduce((acc, x) => acc + x.length, 0)

  const sizeOfBodyLength = getSizeOfLength(bodyLength)
  const length = (() => {
    if (bodyLength <= 55) return 1 + bodyLength
    return 1 + sizeOfBodyLength + bodyLength
  })()

  return {
    length,
    encode(cursor: Cursor.Cursor) {
      if (bodyLength <= 55) {
        cursor.pushByte(0xc0 + bodyLength)
      } else {
        cursor.pushByte(0xc0 + 55 + sizeOfBodyLength)
        if (sizeOfBodyLength === 1) cursor.pushUint8(bodyLength)
        else if (sizeOfBodyLength === 2) cursor.pushUint16(bodyLength)
        else if (sizeOfBodyLength === 3) cursor.pushUint24(bodyLength)
        else cursor.pushUint32(bodyLength)
      }
      for (const { encode } of list) {
        encode(cursor)
      }
    },
  }
}

function getEncodableBytes(bytesOrHex: Bytes.Bytes | Hex.Hex): Encodable {
  const bytes =
    typeof bytesOrHex === 'string' ? Bytes.fromHex(bytesOrHex) : bytesOrHex

  const sizeOfBytesLength = getSizeOfLength(bytes.length)
  const length = (() => {
    if (bytes.length === 1 && bytes[0]! < 0x80) return 1
    if (bytes.length <= 55) return 1 + bytes.length
    return 1 + sizeOfBytesLength + bytes.length
  })()

  return {
    length,
    encode(cursor: Cursor.Cursor) {
      if (bytes.length === 1 && bytes[0]! < 0x80) {
        cursor.pushBytes(bytes)
      } else if (bytes.length <= 55) {
        cursor.pushByte(0x80 + bytes.length)
        cursor.pushBytes(bytes)
      } else {
        cursor.pushByte(0x80 + 55 + sizeOfBytesLength)
        if (sizeOfBytesLength === 1) cursor.pushUint8(bytes.length)
        else if (sizeOfBytesLength === 2) cursor.pushUint16(bytes.length)
        else if (sizeOfBytesLength === 3) cursor.pushUint24(bytes.length)
        else cursor.pushUint32(bytes.length)
        cursor.pushBytes(bytes)
      }
    },
  }
}

function getSizeOfLength(length: number) {
  if (length < 2 ** 8) return 1
  if (length < 2 ** 16) return 2
  if (length < 2 ** 24) return 3
  if (length < 2 ** 32) return 4
  throw new Errors.BaseError('Length is too large.')
}
