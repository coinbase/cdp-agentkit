import type * as Errors from '../Errors.js'
import * as Hex from '../Hex.js'

/** @internal */
export function assertSize(hex: Hex.Hex, size_: number): void {
  if (Hex.size(hex) > size_)
    throw new Hex.SizeOverflowError({
      givenSize: Hex.size(hex),
      maxSize: size_,
    })
}

/** @internal */
export declare namespace assertSize {
  type ErrorType =
    | Hex.size.ErrorType
    | Hex.SizeOverflowError
    | Errors.GlobalErrorType
}

/** @internal */
export function assertStartOffset(value: Hex.Hex, start?: number | undefined) {
  if (typeof start === 'number' && start > 0 && start > Hex.size(value) - 1)
    throw new Hex.SliceOffsetOutOfBoundsError({
      offset: start,
      position: 'start',
      size: Hex.size(value),
    })
}

export declare namespace assertStartOffset {
  type ErrorType =
    | Hex.SliceOffsetOutOfBoundsError
    | Hex.size.ErrorType
    | Errors.GlobalErrorType
}

/** @internal */
export function assertEndOffset(
  value: Hex.Hex,
  start?: number | undefined,
  end?: number | undefined,
) {
  if (
    typeof start === 'number' &&
    typeof end === 'number' &&
    Hex.size(value) !== end - start
  ) {
    throw new Hex.SliceOffsetOutOfBoundsError({
      offset: end,
      position: 'end',
      size: Hex.size(value),
    })
  }
}

export declare namespace assertEndOffset {
  type ErrorType =
    | Hex.SliceOffsetOutOfBoundsError
    | Hex.size.ErrorType
    | Errors.GlobalErrorType
}

/** @internal */
export function pad(hex_: Hex.Hex, options: pad.Options = {}) {
  const { dir, size = 32 } = options

  if (size === 0) return hex_

  const hex = hex_.replace('0x', '')
  if (hex.length > size * 2)
    throw new Hex.SizeExceedsPaddingSizeError({
      size: Math.ceil(hex.length / 2),
      targetSize: size,
      type: 'Hex',
    })

  return `0x${hex[dir === 'right' ? 'padEnd' : 'padStart'](size * 2, '0')}` as Hex.Hex
}

/** @internal */
export declare namespace pad {
  type Options = {
    dir?: 'left' | 'right' | undefined
    size?: number | undefined
  }
  type ErrorType = Hex.SizeExceedsPaddingSizeError | Errors.GlobalErrorType
}

/** @internal */
export function trim(
  value: Hex.Hex,
  options: trim.Options = {},
): trim.ReturnType {
  const { dir = 'left' } = options

  let data = value.replace('0x', '')

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

  if (data.length === 1 && dir === 'right') data = `${data}0`
  return `0x${data.length % 2 === 1 ? `0${data}` : data}` as trim.ReturnType
}

/** @internal */
export declare namespace trim {
  type Options = {
    dir?: 'left' | 'right' | undefined
  }

  type ReturnType = Hex.Hex

  type ErrorType = Errors.GlobalErrorType
}
