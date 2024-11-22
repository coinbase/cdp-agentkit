import type { AbiEventParameter, AbiParameter } from '../abi.js'
import { execTyped } from '../regex.js'
import type { IsNarrowable, Join } from '../types.js'
import type { AssertName } from './types/signatures.js'

/**
 * Formats {@link AbiParameter} to human-readable ABI parameter.
 *
 * @param abiParameter - ABI parameter
 * @returns Human-readable ABI parameter
 *
 * @example
 * type Result = FormatAbiParameter<{ type: 'address'; name: 'from'; }>
 * //   ^? type Result = 'address from'
 */
export type FormatAbiParameter<
  abiParameter extends AbiParameter | AbiEventParameter,
> = abiParameter extends {
  name?: infer name extends string
  type: `tuple${infer array}`
  components: infer components extends readonly AbiParameter[]
  indexed?: infer indexed extends boolean
}
  ? FormatAbiParameter<
      {
        type: `(${Join<
          {
            [key in keyof components]: FormatAbiParameter<
              {
                type: components[key]['type']
              } & (IsNarrowable<components[key]['name'], string> extends true
                ? { name: components[key]['name'] }
                : unknown) &
                (components[key] extends { components: readonly AbiParameter[] }
                  ? { components: components[key]['components'] }
                  : unknown)
            >
          },
          ', '
        >})${array}`
      } & (IsNarrowable<name, string> extends true ? { name: name } : unknown) &
        (IsNarrowable<indexed, boolean> extends true
          ? { indexed: indexed }
          : unknown)
    >
  : `${abiParameter['type']}${abiParameter extends { indexed: true }
      ? ' indexed'
      : ''}${abiParameter['name'] extends infer name extends string
      ? name extends ''
        ? ''
        : ` ${AssertName<name>}`
      : ''}`

// https://regexr.com/7f7rv
const tupleRegex = /^tuple(?<array>(\[(\d*)\])*)$/

/**
 * Formats {@link AbiParameter} to human-readable ABI parameter.
 *
 * @param abiParameter - ABI parameter
 * @returns Human-readable ABI parameter
 *
 * @example
 * const result = formatAbiParameter({ type: 'address', name: 'from' })
 * //    ^? const result: 'address from'
 */
export function formatAbiParameter<
  const abiParameter extends AbiParameter | AbiEventParameter,
>(abiParameter: abiParameter): FormatAbiParameter<abiParameter> {
  type Result = FormatAbiParameter<abiParameter>

  let type = abiParameter.type
  if (tupleRegex.test(abiParameter.type) && 'components' in abiParameter) {
    type = '('
    const length = abiParameter.components.length as number
    for (let i = 0; i < length; i++) {
      const component = abiParameter.components[i]!
      type += formatAbiParameter(component)
      if (i < length - 1) type += ', '
    }
    const result = execTyped<{ array?: string }>(tupleRegex, abiParameter.type)
    type += `)${result?.array ?? ''}`
    return formatAbiParameter({
      ...abiParameter,
      type,
    }) as Result
  }
  // Add `indexed` to type if in `abiParameter`
  if ('indexed' in abiParameter && abiParameter.indexed)
    type = `${type} indexed`
  // Return human-readable ABI parameter
  if (abiParameter.name) return `${type} ${abiParameter.name}` as Result
  return type as Result
}
