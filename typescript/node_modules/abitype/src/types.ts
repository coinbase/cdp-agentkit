/**
 * Prints custom error message
 *
 * @param messages - Error message
 * @returns Custom error message
 *
 * @example
 * type Result = Error<'Custom error message'>
 * //   ^? type Result = ['Error: Custom error message']
 */
export type Error<messages extends string | string[]> = messages extends string
  ? [
      // Surrounding with array to prevent `messages` from being widened to `string`
      `Error: ${messages}`,
    ]
  : {
      [key in keyof messages]: messages[key] extends infer message extends
        string
        ? `Error: ${message}`
        : never
    }

/**
 * Filters out all members of {@link items} that are {@link item}
 *
 * @param items - Items to filter
 * @param item - Type to filter out
 * @returns Filtered items
 *
 * @example
 * type Result = Filter<['a', 'b', 'c'], 'b'>
 * //   ^? type Result = ['a', 'c']
 */
export type Filter<
  items extends readonly unknown[],
  item,
  ///
  acc extends readonly unknown[] = [],
> = items extends readonly [
  infer head,
  ...infer tail extends readonly unknown[],
]
  ? [head] extends [item]
    ? Filter<tail, item, acc>
    : Filter<tail, item, [...acc, head]>
  : readonly [...acc]

/**
 * Checks if {@link type} can be narrowed further than {@link type2}
 *
 * @param type - Type to check
 * @param type2 - Type to against
 *
 * @example
 * type Result = IsNarrowable<'foo', string>
 * //   ^? true
 */
export type IsNarrowable<type, type2> = IsUnknown<type> extends true
  ? false
  : IsNever<
        (type extends type2 ? true : false) &
          (type2 extends type ? false : true)
      > extends true
    ? false
    : true

/**
 * Checks if {@link type} is `never`
 *
 * @param type - Type to check
 *
 * @example
 * type Result = IsNever<never>
 * //   ^? type Result = true
 */
export type IsNever<type> = [type] extends [never] ? true : false

/**
 * Checks if {@link type} is `unknown`
 *
 * @param type - Type to check
 * @returns `true` if {@link type} is `unknown`, otherwise `false`
 *
 * @example
 * type Result = IsUnknown<unknown>
 * //   ^? type Result = true
 */
export type IsUnknown<type> = unknown extends type ? true : false

/**
 * Joins array into string
 *
 * @param array - Array to join
 * @param separator - Separator
 * @returns string
 *
 * @example
 * type Result = Join<['a', 'b', 'c'], '-'>
 * //   ^? type Result = 'a-b-c'
 */
export type Join<
  array extends readonly unknown[],
  separator extends string | number,
> = array extends readonly [infer head, ...infer tail]
  ? tail['length'] extends 0
    ? `${head & string}`
    : `${head & string}${separator}${Join<tail, separator>}`
  : never

/**
 * Merges two object types into new type
 *
 * @param object1 - Object to merge into
 * @param object2 - Object to merge and override keys from {@link object1}
 * @returns New object type with keys from {@link object1} and {@link object2}. If a key exists in both {@link object1} and {@link object2}, the key from {@link object2} will be used.
 *
 * @example
 * type Result = Merge<{ foo: string }, { foo: number; bar: string }>
 * //   ^? type Result = { foo: number; bar: string }
 */
export type Merge<object1, object2> = Omit<object1, keyof object2> & object2

/**
 * Makes objects destructurable.
 *
 * @param union - Union to distribute.
 *
 * @example
 * type Result = OneOf<{ foo: boolean } | { bar: boolean }>
 * //   ^? type Result = { foo: boolean; bar?: undefined; } | { bar: boolean; foo?: undefined; }
 */
export type OneOf<
  union extends object,
  ///
  allKeys extends KeyofUnion<union> = KeyofUnion<union>,
> = union extends infer item
  ? Pretty<item & { [key in Exclude<allKeys, keyof item>]?: never }>
  : never
type KeyofUnion<type> = type extends type ? keyof type : never

/**
 * Combines members of an intersection into a readable type.
 *
 * @link https://twitter.com/mattpocockuk/status/1622730173446557697?s=20&t=NdpAcmEFXY01xkqU3KO0Mg
 * @example
 * type Result = Pretty<{ a: string } | { b: string } | { c: number, d: bigint }>
 * //   ^? type Result = { a: string; b: string; c: number; d: bigint }
 */
export type Pretty<type> = { [key in keyof type]: type[key] } & unknown

/**
 * Creates range between two positive numbers using [tail recursion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#tail-recursion-elimination-on-conditional-types).
 *
 * @param start - Number to start range
 * @param stop - Number to end range
 * @returns Array with inclusive range from {@link start} to {@link stop}
 *
 * @example
 * type Result = Range<1, 3>
 * //   ^? type Result = [1, 2, 3]
 */
// From [Type Challenges](https://github.com/type-challenges/type-challenges/issues/11625)
export type Range<
  start extends number,
  stop extends number,
  ///
  result extends number[] = [],
  padding extends 0[] = [],
  current extends number = [...padding, ...result]['length'] & number,
> = current extends stop
  ? current extends start
    ? [current]
    : result extends []
      ? []
      : [...result, current]
  : current extends start
    ? Range<start, stop, [current], padding>
    : result extends []
      ? Range<start, stop, [], [...padding, 0]>
      : Range<start, stop, [...result, current], padding>

/**
 * Trims empty space from type {@link t}.
 *
 * @param t - Type to trim
 * @param chars - Characters to trim
 * @returns Trimmed type
 *
 * @example
 * type Result = Trim<'      foo  '>
 * //   ^? type Result = "foo"
 */
export type Trim<type, chars extends string = ' '> = TrimLeft<
  TrimRight<type, chars>,
  chars
>
type TrimLeft<t, chars extends string = ' '> = t extends `${chars}${infer tail}`
  ? TrimLeft<tail>
  : t
type TrimRight<
  t,
  chars extends string = ' ',
> = t extends `${infer head}${chars}` ? TrimRight<head> : t

/**
 * Create tuple of {@link type} type with {@link size} size
 *
 * @param Type - Type of tuple
 * @param Size - Size of tuple
 * @returns Tuple of {@link type} type with {@link size} size
 *
 * @example
 * type Result = Tuple<string, 2>
 * //   ^? type Result = [string, string]
 */
// https://github.com/Microsoft/TypeScript/issues/26223#issuecomment-674500430
export type Tuple<type, size extends number> = size extends size
  ? number extends size
    ? type[]
    : _TupleOf<type, size, []>
  : never
type _TupleOf<
  length,
  size extends number,
  acc extends readonly unknown[],
> = acc['length'] extends size
  ? acc
  : _TupleOf<length, size, readonly [length, ...acc]>
