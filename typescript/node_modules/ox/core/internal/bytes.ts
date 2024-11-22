import * as Bytes from '../Bytes.js'
import type * as Errors from '../Errors.js'

/** @internal */
export function assertSize(bytes: Bytes.Bytes, size_: number): void {
  if (Bytes.size(bytes) > size_)
    throw new Bytes.SizeOverflowError({
      givenSize: Bytes.size(bytes),
      maxSize: size_,
    })
}

/** @internal */
export declare namespace assertSize {
  type ErrorType =
    | Bytes.size.ErrorType
    | Bytes.SizeOverflowError
    | Errors.GlobalErrorType
}

/** @internal */
export function assertStartOffset(
  value: Bytes.Bytes,
  start?: number | undefined,
) {
  if (typeof start === 'number' && start > 0 && start > Bytes.size(value) - 1)
    throw new Bytes.SliceOffsetOutOfBoundsError({
      offset: start,
      position: 'start',
      size: Bytes.size(value),
    })
}

export declare namespace assertStartOffset {
  export type ErrorType =
    | Bytes.SliceOffsetOutOfBoundsError
    | Bytes.size.ErrorType
    | Errors.GlobalErrorType
}

/** @internal */
export function assertEndOffset(
  value: Bytes.Bytes,
  start?: number | undefined,
  end?: number | undefined,
) {
  if (
    typeof start === 'number' &&
    typeof end === 'number' &&
    Bytes.size(value) !== end - start
  ) {
    throw new Bytes.SliceOffsetOutOfBoundsError({
      offset: end,
      position: 'end',
      size: Bytes.size(value),
    })
  }
}

/** @internal */
export declare namespace assertEndOffset {
  type ErrorType =
    | Bytes.SliceOffsetOutOfBoundsError
    | Bytes.size.ErrorType
    | Errors.GlobalErrorType
}

/** @internal */
export const charCodeMap = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102,
} as const

/** @internal */
export function charCodeToBase16(char: number) {
  if (char >= charCodeMap.zero && char <= charCodeMap.nine)
    return char - charCodeMap.zero
  if (char >= charCodeMap.A && char <= charCodeMap.F)
    return char - (charCodeMap.A - 10)
  if (char >= charCodeMap.a && char <= charCodeMap.f)
    return char - (charCodeMap.a - 10)
  return undefined
}

/** @internal */
export function pad(bytes: Bytes.Bytes, options: pad.Options = {}) {
  const { dir, size = 32 } = options
  if (size === 0) return bytes
  if (bytes.length > size)
    throw new Bytes.SizeExceedsPaddingSizeError({
      size: bytes.length,
      targetSize: size,
      type: 'Bytes',
    })
  const paddedBytes = new Uint8Array(size)
  for (let i = 0; i < size; i++) {
    const padEnd = dir === 'right'
    paddedBytes[padEnd ? i : size - i - 1] =
      bytes[padEnd ? i : bytes.length - i - 1]!
  }
  return paddedBytes
}

/** @internal */
export declare namespace pad {
  type Options = {
    dir?: 'left' | 'right' | undefined
    size?: number | undefined
  }

  type ReturnType = Bytes.Bytes

  type ErrorType = Bytes.SizeExceedsPaddingSizeError | Errors.GlobalErrorType
}

/** @internal */
export function trim(
  value: Bytes.Bytes,
  options: trim.Options = {},
): trim.ReturnType {
  const { dir = 'left' } = options

  let data = value

  let sliceLength = 0
  for (let i = 0; i < data.length - 1; i++) {
    if (data[dir === 'left' ? i : data.length - i - 1]!.toString() === '0')
      sliceLength++
    else break
  }
  data =
    dir === 'left'
      ? data.slice(sliceLength)
      : data.slice(0, data.length - sliceLength)

  return data as trim.ReturnType
}

/** @internal */
export declare namespace trim {
  type Options = {
    dir?: 'left' | 'right' | undefined
  }

  type ReturnType = Bytes.Bytes

  type ErrorType = Errors.GlobalErrorType
}
