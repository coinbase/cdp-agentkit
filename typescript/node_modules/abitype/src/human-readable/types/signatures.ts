import type { AbiStateMutability } from '../../abi.js'
import type { Error } from '../../types.js'

export type ErrorSignature<
  name extends string = string,
  parameters extends string = string,
> = `error ${name}(${parameters})`
export type IsErrorSignature<signature extends string> =
  signature extends ErrorSignature<infer name> ? IsName<name> : false
export type EventSignature<
  name extends string = string,
  parameters extends string = string,
> = `event ${name}(${parameters})`
export type IsEventSignature<signature extends string> =
  signature extends EventSignature<infer name> ? IsName<name> : false

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
export type Scope = 'public' | 'external' // `internal` or `private` functions wouldn't make it to ABI so can ignore
type Returns = `returns (${string})` | `returns(${string})`
// Almost all valid function signatures, except `function ${string}(${infer parameters})` since `parameters` can absorb returns
type ValidFunctionSignatures =
  | `function ${string}()`
  // basic
  | `function ${string}() ${Returns}`
  | `function ${string}() ${AbiStateMutability}`
  | `function ${string}() ${Scope}`
  // combinations
  | `function ${string}() ${AbiStateMutability} ${Returns}`
  | `function ${string}() ${Scope} ${Returns}`
  | `function ${string}() ${Scope} ${AbiStateMutability}`
  | `function ${string}() ${Scope} ${AbiStateMutability} ${Returns}`
  // Parameters
  | `function ${string}(${string}) ${Returns}`
  | `function ${string}(${string}) ${AbiStateMutability}`
  | `function ${string}(${string}) ${Scope}`
  | `function ${string}(${string}) ${AbiStateMutability} ${Returns}`
  | `function ${string}(${string}) ${Scope} ${Returns}`
  | `function ${string}(${string}) ${Scope} ${AbiStateMutability}`
  | `function ${string}(${string}) ${Scope} ${AbiStateMutability} ${Returns}`

export type StructSignature<
  name extends string = string,
  properties extends string = string,
> = `struct ${name} {${properties}}`
export type IsStructSignature<signature extends string> =
  signature extends StructSignature<infer name> ? IsName<name> : false

type ConstructorSignature<tail extends string = string> = `constructor(${tail}`
export type IsConstructorSignature<signature> =
  signature extends ConstructorSignature
    ? signature extends ValidConstructorSignatures
      ? true
      : false
    : false
type ValidConstructorSignatures =
  | `constructor(${string})`
  | `constructor(${string}) payable`

export type FallbackSignature<abiStateMutability extends '' | ' payable' = ''> =
  `fallback() external${abiStateMutability}`

export type ReceiveSignature = 'receive() external payable'

// TODO: Maybe use this for signature validation one day
// https://twitter.com/devanshj__/status/1610423724708343808
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

export type Signature<
  string1 extends string,
  string2 extends string | unknown = unknown,
> = IsSignature<string1> extends true
  ? string1
  : string extends string1 // if exactly `string` (not narrowed), then pass through as valid
    ? string1
    : Error<`Signature "${string1}" is invalid${string2 extends string
        ? ` at position ${string2}`
        : ''}.`>

export type Signatures<signatures extends readonly string[]> = {
  [key in keyof signatures]: Signature<signatures[key], key>
}

export type Modifier = 'calldata' | 'indexed' | 'memory' | 'storage'
export type FunctionModifier = Extract<
  Modifier,
  'calldata' | 'memory' | 'storage'
>
export type EventModifier = Extract<Modifier, 'indexed'>

export type IsName<name extends string> = name extends ''
  ? false
  : ValidateName<name> extends name
    ? true
    : false

export type AssertName<name extends string> =
  ValidateName<name> extends infer invalidName extends string[]
    ? `[${invalidName[number]}]`
    : name

export type ValidateName<
  name extends string,
  checkCharacters extends boolean = false,
> = name extends `${string}${' '}${string}`
  ? Error<`Identifier "${name}" cannot contain whitespace.`>
  : IsSolidityKeyword<name> extends true
    ? Error<`"${name}" is a protected Solidity keyword.`>
    : name extends `${number}`
      ? Error<`Identifier "${name}" cannot be a number string.`>
      : name extends `${number}${string}`
        ? Error<`Identifier "${name}" cannot start with a number.`>
        : checkCharacters extends true
          ? IsValidCharacter<name> extends true
            ? name
            : Error<`"${name}" contains invalid character.`>
          : name

export type IsSolidityKeyword<type extends string> =
  type extends SolidityKeywords ? true : false

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

export type IsValidCharacter<character extends string> =
  character extends `${ValidCharacters}${infer tail}`
    ? tail extends ''
      ? true
      : IsValidCharacter<tail>
    : false

// biome-ignore format: no formatting
type ValidCharacters =
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
type InvalidFunctionParameters =
  | `${string}${MangledReturns} (${string}`
  | `${string}) ${MangledReturns}${string}`
  | `${string})${string}${MangledReturns}${string}(${string}`
// r_e_t_u_r_n_s
type MangledReturns =
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
