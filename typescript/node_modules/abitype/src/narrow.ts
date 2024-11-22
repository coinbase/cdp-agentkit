/**
 * Infers embedded primitive type of any type
 *
 * @param T - Type to infer
 * @returns Embedded type of {@link type}
 *
 * @example
 * type Result = Narrow<['foo', 'bar', 1]>
 */
// s/o https://twitter.com/hd_nvim/status/1578567206190780417
export type Narrow<type> =
  | (unknown extends type ? unknown : never)
  | (type extends Function ? type : never)
  | (type extends bigint | boolean | number | string ? type : never)
  | (type extends [] ? [] : never)
  | { [K in keyof type]: Narrow<type[K]> }

/**
 * Infers embedded primitive type of any type
 * Same as `as const` but without setting the object as readonly and without needing the user to use it.
 *
 * @param value - Value to infer
 * @returns Value with embedded type inferred
 *
 * @example
 * const result = narrow(['foo', 'bar', 1])
 */
export function narrow<type>(value: Narrow<type>) {
  return value
}
