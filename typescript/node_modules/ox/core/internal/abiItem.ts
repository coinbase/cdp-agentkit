import type * as abitype from 'abitype'
import type * as Abi from '../Abi.js'
import type * as AbiItem from '../AbiItem.js'
import type * as AbiParameters from '../AbiParameters.js'
import * as Address from '../Address.js'
import * as Errors from '../Errors.js'
import type {
  Compute,
  IsNever,
  IsUnion,
  TypeErrorMessage,
  UnionToTuple,
} from './types.js'

/** @internal */
export type ExtractArgs<
  abi extends Abi.Abi | readonly unknown[] = Abi.Abi,
  name extends AbiItem.Name<abi> = AbiItem.Name<abi>,
> = abitype.AbiParametersToPrimitiveTypes<
  AbiItem.FromAbi<abi extends Abi.Abi ? abi : Abi.Abi, name>['inputs'],
  'inputs'
> extends infer args
  ? [args] extends [never]
    ? readonly unknown[]
    : args
  : readonly unknown[]

/** @internal */
export type ExtractForArgs<
  abi extends Abi.Abi,
  name extends AbiItem.Name<abi>,
  args extends ExtractArgs<abi, name>,
> = IsUnion<name> extends true
  ? {
      [key in keyof abi]: abi[key] extends { name: name } ? abi[key] : never
    }[number]
  : AbiItem.FromAbi<abi, name> extends infer abiItem extends AbiItem.AbiItem & {
        inputs: readonly abitype.AbiParameter[]
      }
    ? IsUnion<abiItem> extends true // narrow overloads using `args` by converting to tuple and filtering out overloads that don't match
      ? UnionToTuple<abiItem> extends infer abiItems extends
          readonly (AbiItem.AbiItem & {
            inputs: readonly abitype.AbiParameter[]
          })[]
        ? IsNever<TupleToUnion<abiItems, abi, name, args>> extends true
          ? Compute<
              abiItems[0] & {
                readonly overloads: UnionToTuple<
                  Exclude<abiItems[number], abiItems[0]>
                >
              }
            >
          : TupleToUnion<abiItems, abi, name, args> // convert back to union (removes `never` tuple entries: `['foo', never, 'bar'][number]` => `'foo' | 'bar'`)
        : never
      : abiItem
    : never

/** @internal */
export type TupleToUnion<
  abiItems extends readonly {
    inputs: readonly abitype.AbiParameter[]
  }[],
  abi extends Abi.Abi,
  name extends AbiItem.Name<abi>,
  args extends ExtractArgs<abi, name>,
> = {
  [k in keyof abiItems]: (
    readonly [] extends args
      ? readonly [] // fallback to `readonly []` if `args` has no value (e.g. `args` property not provided)
      : args
  ) extends abitype.AbiParametersToPrimitiveTypes<
    abiItems[k]['inputs'],
    'inputs'
  >
    ? abiItems[k]
    : never
}[number]

/** @internal */
export type ErrorSignature<
  name extends string = string,
  parameters extends string = string,
> = `error ${name}(${parameters})`

/** @internal */
export type IsErrorSignature<signature extends string> =
  signature extends ErrorSignature<infer name> ? IsName<name> : false

/** @internal */
export type EventSignature<
  name extends string = string,
  parameters extends string = string,
> = `event ${name}(${parameters})`

/** @internal */
export type IsEventSignature<signature extends string> =
  signature extends EventSignature<infer name> ? IsName<name> : false

/** @internal */
export type FunctionSignature<
  name extends string = string,
  tail extends string = string,
> = `function ${name}(${tail}`
export type IsFunctionSignature<signature> =
  signature extends FunctionSignature<infer name>
    ? IsName<name> extends true
      ? signature extends ValidFunctionSignatures
        ? true
        : // Check that `Parameters` is not absorbing other types (e.g. `returns`)
          signature extends `function ${string}(${infer parameters})`
          ? parameters extends InvalidFunctionParameters
            ? false
            : true
          : false
      : false
    : false
/** @internal */
export type Scope = 'public' | 'external' // `internal` or `private` functions wouldn't make it to ABI so can ignore

/** @internal */
export type Returns = `returns (${string})` | `returns(${string})`

// Almost all valid function signatures, except `function ${string}(${infer parameters})` since `parameters` can absorb returns
/** @internal */
export type ValidFunctionSignatures =
  | `function ${string}()`
  // basic
  | `function ${string}() ${Returns}`
  | `function ${string}() ${abitype.AbiStateMutability}`
  | `function ${string}() ${Scope}`
  // combinations
  | `function ${string}() ${abitype.AbiStateMutability} ${Returns}`
  | `function ${string}() ${Scope} ${Returns}`
  | `function ${string}() ${Scope} ${abitype.AbiStateMutability}`
  | `function ${string}() ${Scope} ${abitype.AbiStateMutability} ${Returns}`
  // Parameters
  | `function ${string}(${string}) ${Returns}`
  | `function ${string}(${string}) ${abitype.AbiStateMutability}`
  | `function ${string}(${string}) ${Scope}`
  | `function ${string}(${string}) ${abitype.AbiStateMutability} ${Returns}`
  | `function ${string}(${string}) ${Scope} ${Returns}`
  | `function ${string}(${string}) ${Scope} ${abitype.AbiStateMutability}`
  | `function ${string}(${string}) ${Scope} ${abitype.AbiStateMutability} ${Returns}`

/** @internal */
export type StructSignature<
  name extends string = string,
  properties extends string = string,
> = `struct ${name} {${properties}}`

/** @internal */
export type IsStructSignature<signature extends string> =
  signature extends StructSignature<infer name> ? IsName<name> : false

/** @internal */
export type ConstructorSignature<tail extends string = string> =
  `constructor(${tail}`

/** @internal */
export type IsConstructorSignature<signature> =
  signature extends ConstructorSignature
    ? signature extends ValidConstructorSignatures
      ? true
      : false
    : false

/** @internal */
export type ValidConstructorSignatures =
  | `constructor(${string})`
  | `constructor(${string}) payable`

/** @internal */
export type FallbackSignature<abiStateMutability extends '' | ' payable' = ''> =
  `fallback() external${abiStateMutability}`

/** @internal */
export type ReceiveSignature = 'receive() external payable'

// TODO: Maybe use this for signature validation one day
// https://twitter.com/devanshj__/status/1610423724708343808
/** @internal */
export type IsSignature<type extends string> =
  | (IsErrorSignature<type> extends true ? true : never)
  | (IsEventSignature<type> extends true ? true : never)
  | (IsFunctionSignature<type> extends true ? true : never)
  | (IsStructSignature<type> extends true ? true : never)
  | (IsConstructorSignature<type> extends true ? true : never)
  | (type extends FallbackSignature ? true : never)
  | (type extends ReceiveSignature ? true : never) extends infer condition
  ? [condition] extends [never]
    ? false
    : true
  : false

/** @internal */
export type Signature<
  string1 extends string,
  string2 extends string | unknown = unknown,
> = IsSignature<string1> extends true
  ? string1
  : string extends string1 // if exactly `string` (not narrowed), then pass through as valid
    ? string1
    : TypeErrorMessage<`Signature "${string1}" is invalid${string2 extends string
        ? ` at position ${string2}`
        : ''}.`>

/** @internal */
export type Signatures<signatures extends readonly string[]> = {
  [key in keyof signatures]: Signature<signatures[key], key>
}

/** @internal */
export type IsName<name extends string> = name extends ''
  ? false
  : ValidateName<name> extends name
    ? true
    : false

/** @internal */
export type ValidateName<
  name extends string,
  checkCharacters extends boolean = false,
> = name extends `${string}${' '}${string}`
  ? TypeErrorMessage<`Identifier "${name}" cannot contain whitespace.`>
  : IsSolidityKeyword<name> extends true
    ? TypeErrorMessage<`"${name}" is a protected Solidity keyword.`>
    : name extends `${number}`
      ? TypeErrorMessage<`Identifier "${name}" cannot be a number string.`>
      : name extends `${number}${string}`
        ? TypeErrorMessage<`Identifier "${name}" cannot start with a number.`>
        : checkCharacters extends true
          ? IsValidCharacter<name> extends true
            ? name
            : TypeErrorMessage<`"${name}" contains invalid character.`>
          : name

/** @internal */
export type IsSolidityKeyword<type extends string> =
  type extends SolidityKeywords ? true : false

/** @internal */
export type SolidityKeywords =
  | 'after'
  | 'alias'
  | 'anonymous'
  | 'apply'
  | 'auto'
  | 'byte'
  | 'calldata'
  | 'case'
  | 'catch'
  | 'constant'
  | 'copyof'
  | 'default'
  | 'defined'
  | 'error'
  | 'event'
  | 'external'
  | 'false'
  | 'final'
  | 'function'
  | 'immutable'
  | 'implements'
  | 'in'
  | 'indexed'
  | 'inline'
  | 'internal'
  | 'let'
  | 'mapping'
  | 'match'
  | 'memory'
  | 'mutable'
  | 'null'
  | 'of'
  | 'override'
  | 'partial'
  | 'private'
  | 'promise'
  | 'public'
  | 'pure'
  | 'reference'
  | 'relocatable'
  | 'return'
  | 'returns'
  | 'sizeof'
  | 'static'
  | 'storage'
  | 'struct'
  | 'super'
  | 'supports'
  | 'switch'
  | 'this'
  | 'true'
  | 'try'
  | 'typedef'
  | 'typeof'
  | 'var'
  | 'view'
  | 'virtual'
  | `address${`[${string}]` | ''}`
  | `bool${`[${string}]` | ''}`
  | `string${`[${string}]` | ''}`
  | `tuple${`[${string}]` | ''}`
  | `bytes${number | ''}${`[${string}]` | ''}`
  | `${'u' | ''}int${number | ''}${`[${string}]` | ''}`

/** @internal */
export type IsValidCharacter<character extends string> =
  character extends `${ValidCharacters}${infer tail}`
    ? tail extends ''
      ? true
      : IsValidCharacter<tail>
    : false

// biome-ignore format: no formatting
/** @internal */
export type ValidCharacters =
  // uppercase letters
  | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
  // lowercase letters
  | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'
  // numbers
  | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  // special characters
  | '_' | '$'

// Template string inference can absorb `returns`:
// type Result = `function foo(string) return s (uint256)` extends `function ${string}(${infer Parameters})` ? Parameters : never
// //   ^? type Result = "string ) return s (uint256"
// So we need to validate against `returns` keyword with all combinations of whitespace
/** @internal */
export type InvalidFunctionParameters =
  | `${string}${MangledReturns} (${string}`
  | `${string}) ${MangledReturns}${string}`
  | `${string})${string}${MangledReturns}${string}(${string}`

// r_e_t_u_r_n_s
/** @internal */
export type MangledReturns =
  // Single
  | `r${string}eturns`
  | `re${string}turns`
  | `ret${string}urns`
  | `retu${string}rns`
  | `retur${string}ns`
  | `return${string}s`
  // Double
  // `r_e*`
  | `r${string}e${string}turns`
  | `r${string}et${string}urns`
  | `r${string}etu${string}rns`
  | `r${string}etur${string}ns`
  | `r${string}eturn${string}s`
  // `re_t*`
  | `re${string}t${string}urns`
  | `re${string}tu${string}rns`
  | `re${string}tur${string}ns`
  | `re${string}turn${string}s`
  // `ret_u*`
  | `ret${string}u${string}rns`
  | `ret${string}ur${string}ns`
  | `ret${string}urn${string}s`
  // `retu_r*`
  | `retu${string}r${string}ns`
  | `retu${string}rn${string}s`
  // `retur_n*`
  | `retur${string}n${string}s`
  // Triple
  // `r_e_t*`
  | `r${string}e${string}t${string}urns`
  | `r${string}e${string}tu${string}rns`
  | `r${string}e${string}tur${string}ns`
  | `r${string}e${string}turn${string}s`
  // `re_t_u*`
  | `re${string}t${string}u${string}rns`
  | `re${string}t${string}ur${string}ns`
  | `re${string}t${string}urn${string}s`
  // `ret_u_r*`
  | `ret${string}u${string}r${string}ns`
  | `ret${string}u${string}rn${string}s`
  // `retu_r_n*`
  | `retu${string}r${string}n${string}s`
  // Quadruple
  // `r_e_t_u*`
  | `r${string}e${string}t${string}u${string}rns`
  | `r${string}e${string}t${string}ur${string}ns`
  | `r${string}e${string}t${string}urn${string}s`
  // `re_t_u_r*`
  | `re${string}t${string}u${string}r${string}ns`
  | `re${string}t${string}u${string}rn${string}s`
  // `ret_u_r_n*`
  | `ret${string}u${string}r${string}n${string}s`
  // Quintuple
  // `r_e_t_u_r*`
  | `r${string}e${string}t${string}u${string}r${string}ns`
  | `r${string}e${string}t${string}u${string}rn${string}s`
  // `re_t_u_r_n*`
  | `re${string}t${string}u${string}r${string}n${string}s`
  // Sextuple
  // `r_e_t_u_r_n_s`
  | `r${string}e${string}t${string}u${string}r${string}n${string}s`

/** @internal */
export type Widen<type> =
  | ([unknown] extends [type] ? unknown : never)
  | (type extends Function ? type : never)
  | (type extends abitype.ResolvedRegister['bigIntType'] ? bigint : never)
  | (type extends boolean ? boolean : never)
  | (type extends abitype.ResolvedRegister['intType'] ? number : never)
  | (type extends string
      ? type extends abitype.ResolvedRegister['addressType']
        ? abitype.ResolvedRegister['addressType']
        : type extends abitype.ResolvedRegister['bytesType']['inputs']
          ? abitype.ResolvedRegister['bytesType']
          : string
      : never)
  | (type extends readonly [] ? readonly [] : never)
  | (type extends Record<string, unknown>
      ? { [K in keyof type]: Widen<type[K]> }
      : never)
  | (type extends { length: number }
      ? {
          [K in keyof type]: Widen<type[K]>
        } extends infer Val extends readonly unknown[]
        ? readonly [...Val]
        : never
      : never)

/** @internal */
export function normalizeSignature(signature: string): string {
  let active = true
  let current = ''
  let level = 0
  let result = ''
  let valid = false

  for (let i = 0; i < signature.length; i++) {
    const char = signature[i]!

    // If the character is a separator, we want to reactivate.
    if (['(', ')', ','].includes(char)) active = true

    // If the character is a "level" token, we want to increment/decrement.
    if (char === '(') level++
    if (char === ')') level--

    // If we aren't active, we don't want to mutate the result.
    if (!active) continue

    // If level === 0, we are at the definition level.
    if (level === 0) {
      if (char === ' ' && ['event', 'function', 'error', ''].includes(result))
        result = ''
      else {
        result += char

        // If we are at the end of the definition, we must be finished.
        if (char === ')') {
          valid = true
          break
        }
      }

      continue
    }

    // Ignore spaces
    if (char === ' ') {
      // If the previous character is a separator, and the current section isn't empty, we want to deactivate.
      if (signature[i - 1] !== ',' && current !== ',' && current !== ',(') {
        current = ''
        active = false
      }
      continue
    }

    result += char
    current += char
  }

  if (!valid) throw new Errors.BaseError('Unable to normalize signature.')

  return result
}

/** @internal */
export declare namespace normalizeSignature {
  export type ErrorType = Errors.BaseError | Errors.GlobalErrorType
}

/** @internal */
export function isArgOfType(
  arg: unknown,
  abiParameter: AbiParameters.Parameter,
): boolean {
  const argType = typeof arg
  const abiParameterType = abiParameter.type
  switch (abiParameterType) {
    case 'address':
      return Address.validate(arg as Address.Address, { strict: false })
    case 'bool':
      return argType === 'boolean'
    case 'function':
      return argType === 'string'
    case 'string':
      return argType === 'string'
    default: {
      if (abiParameterType === 'tuple' && 'components' in abiParameter)
        return Object.values(abiParameter.components).every(
          (component, index) => {
            return isArgOfType(
              Object.values(arg as unknown[] | Record<string, unknown>)[index],
              component as AbiParameters.Parameter,
            )
          },
        )

      // `(u)int<M>`: (un)signed integer type of `M` bits, `0 < M <= 256`, `M % 8 == 0`
      // https://regexr.com/6v8hp
      if (
        /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(
          abiParameterType,
        )
      )
        return argType === 'number' || argType === 'bigint'

      // `bytes<M>`: binary type of `M` bytes, `0 < M <= 32`
      // https://regexr.com/6va55
      if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(abiParameterType))
        return argType === 'string' || arg instanceof Uint8Array

      // fixed-length (`<type>[M]`) and dynamic (`<type>[]`) arrays
      // https://regexr.com/6va6i
      if (/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(abiParameterType)) {
        return (
          Array.isArray(arg) &&
          arg.every((x: unknown) =>
            isArgOfType(x, {
              ...abiParameter,
              // Pop off `[]` or `[M]` from end of type
              type: abiParameterType.replace(/(\[[0-9]{0,}\])$/, ''),
            } as AbiParameters.Parameter),
          )
        )
      }

      return false
    }
  }
}

/** @internal */
export function getAmbiguousTypes(
  sourceParameters: readonly AbiParameters.Parameter[],
  targetParameters: readonly AbiParameters.Parameter[],
  args: ExtractArgs,
): AbiParameters.Parameter['type'][] | undefined {
  for (const parameterIndex in sourceParameters) {
    const sourceParameter = sourceParameters[parameterIndex]!
    const targetParameter = targetParameters[parameterIndex]!

    if (
      sourceParameter.type === 'tuple' &&
      targetParameter.type === 'tuple' &&
      'components' in sourceParameter &&
      'components' in targetParameter
    )
      return getAmbiguousTypes(
        sourceParameter.components,
        targetParameter.components,
        (args as any)[parameterIndex],
      )

    const types = [sourceParameter.type, targetParameter.type]

    const ambiguous = (() => {
      if (types.includes('address') && types.includes('bytes20')) return true
      if (types.includes('address') && types.includes('string'))
        return Address.validate(args[parameterIndex] as Address.Address, {
          strict: false,
        })
      if (types.includes('address') && types.includes('bytes'))
        return Address.validate(args[parameterIndex] as Address.Address, {
          strict: false,
        })
      return false
    })()

    if (ambiguous) return types
  }

  return
}
