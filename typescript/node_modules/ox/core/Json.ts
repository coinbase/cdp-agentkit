import type * as Errors from './Errors.js'

const bigIntSuffix = /*#__PURE__*/ '#__bigint'

/**
 * Parses a JSON string, with support for `bigint`.
 *
 * @example
 * ```ts twoslash
 * import { Json } from 'ox'
 *
 * const json = Json.parse('{"foo":"bar","baz":"69420694206942069420694206942069420694206942069420#__bigint"}')
 * // @log: {
 * // @log:   foo: 'bar',
 * // @log:   baz: 69420694206942069420694206942069420694206942069420n
 * // @log: }
 * ```
 *
 * @param string - The value to parse.
 * @param reviver - A function that transforms the results.
 * @returns The parsed value.
 */
export function parse(
  string: string,
  reviver?: ((this: any, key: string, value: any) => any) | undefined,
) {
  return JSON.parse(string, (key, value_) => {
    const value = value_
    if (typeof value === 'string' && value.endsWith(bigIntSuffix))
      return BigInt(value.slice(0, -bigIntSuffix.length))
    return typeof reviver === 'function' ? reviver(key, value) : value
  })
}

export declare namespace parse {
  type ErrorType = Errors.GlobalErrorType
}

parse.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as parse.ErrorType

/**
 * Stringifies a value to its JSON representation, with support for `bigint`.
 *
 * @example
 * ```ts twoslash
 * import { Json } from 'ox'
 *
 * const json = Json.stringify({
 *   foo: 'bar',
 *   baz: 69420694206942069420694206942069420694206942069420n,
 * })
 * // @log: '{"foo":"bar","baz":"69420694206942069420694206942069420694206942069420#__bigint"}'
 * ```
 *
 * @param value - The value to stringify.
 * @param replacer - A function that transforms the results. It is passed the key and value of the property, and must return the value to be used in the JSON string. If this function returns `undefined`, the property is not included in the resulting JSON string.
 * @param space - A string or number that determines the indentation of the JSON string. If it is a number, it indicates the number of spaces to use as indentation; if it is a string (e.g. `'\t'`), it uses the string as the indentation character.
 * @returns The JSON string.
 */
export function stringify(
  value: any,
  replacer?: ((this: any, key: string, value: any) => any) | null | undefined,
  space?: string | number | undefined,
) {
  return JSON.stringify(
    value,
    (key, value) => {
      if (typeof replacer === 'function') return replacer(key, value)
      if (typeof value === 'bigint') return value.toString() + bigIntSuffix
      return value
    },
    space,
  )
}

export declare namespace stringify {
  type ErrorType = Errors.GlobalErrorType
}

stringify.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as stringify.ErrorType
