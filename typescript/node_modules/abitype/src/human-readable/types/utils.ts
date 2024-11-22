import type {
  AbiParameter,
  AbiStateMutability,
  AbiType,
  SolidityFixedArrayRange,
} from '../../abi.js'
import type { ResolvedRegister } from '../../register.js'
import type { Error, IsUnknown, Merge, Pretty, Trim } from '../../types.js'
import type {
  ErrorSignature,
  EventModifier,
  EventSignature,
  FallbackSignature,
  FunctionModifier,
  FunctionSignature,
  IsConstructorSignature,
  IsErrorSignature,
  IsEventSignature,
  IsFunctionSignature,
  Modifier,
  ReceiveSignature,
  Scope,
  ValidateName,
} from './signatures.js'
import type { StructLookup } from './structs.js'

export type ParseSignature<
  signature extends string,
  structs extends StructLookup | unknown = unknown,
> =
  | (IsErrorSignature<signature> extends true
      ? signature extends ErrorSignature<infer name, infer parameters>
        ? {
            readonly name: name
            readonly type: 'error'
            readonly inputs: ParseAbiParameters<
              SplitParameters<parameters>,
              { structs: structs }
            >
          }
        : never
      : never)
  | (IsEventSignature<signature> extends true
      ? signature extends EventSignature<infer name, infer parameters>
        ? {
            readonly name: name
            readonly type: 'event'
            readonly inputs: ParseAbiParameters<
              SplitParameters<parameters>,
              { modifier: EventModifier; structs: structs }
            >
          }
        : never
      : never)
  | (IsFunctionSignature<signature> extends true
      ? signature extends FunctionSignature<infer name, infer tail>
        ? {
            readonly name: name
            readonly type: 'function'
            readonly stateMutability: _ParseFunctionParametersAndStateMutability<signature>['StateMutability']
            readonly inputs: ParseAbiParameters<
              SplitParameters<
                _ParseFunctionParametersAndStateMutability<signature>['Inputs']
              >,
              { modifier: FunctionModifier; structs: structs }
            >
            readonly outputs: tail extends
              | `${string}returns (${infer returns})`
              | `${string}returns(${infer returns})`
              ? ParseAbiParameters<
                  SplitParameters<returns>,
                  { modifier: FunctionModifier; structs: structs }
                >
              : readonly []
          }
        : never
      : never)
  | (IsConstructorSignature<signature> extends true
      ? {
          readonly type: 'constructor'
          readonly stateMutability: _ParseConstructorParametersAndStateMutability<signature>['StateMutability']
          readonly inputs: ParseAbiParameters<
            SplitParameters<
              _ParseConstructorParametersAndStateMutability<signature>['Inputs']
            >,
            { structs: structs }
          >
        }
      : never)
  | (signature extends FallbackSignature<infer stateMutability>
      ? {
          readonly type: 'fallback'
          readonly stateMutability: stateMutability extends `${string}payable`
            ? 'payable'
            : 'nonpayable'
        }
      : never)
  | (signature extends ReceiveSignature
      ? {
          readonly type: 'receive'
          readonly stateMutability: 'payable'
        }
      : never)

type ParseOptions = {
  modifier?: Modifier
  structs?: StructLookup | unknown
}
type DefaultParseOptions = object

export type ParseAbiParameters<
  signatures extends readonly string[],
  options extends ParseOptions = DefaultParseOptions,
> = signatures extends ['']
  ? readonly []
  : readonly [
      ...{
        [key in keyof signatures]: ParseAbiParameter<signatures[key], options>
      },
    ]

export type ParseAbiParameter<
  signature extends string,
  options extends ParseOptions = DefaultParseOptions,
> = (
  signature extends `(${string})${string}`
    ? _ParseTuple<signature, options>
    : // Convert string to shallow AbiParameter (structs resolved yet)
      // Check for `${Type} ${nameOrModifier}` format (e.g. `uint256 foo`, `uint256 indexed`, `uint256 indexed foo`)
      signature extends `${infer type} ${infer tail}`
      ? Trim<tail> extends infer trimmed extends string
        ? // TODO: data location modifiers only allowed for struct/array types
          { readonly type: Trim<type> } & _SplitNameOrModifier<trimmed, options>
        : never
      : // Must be `${Type}` format (e.g. `uint256`)
        { readonly type: signature }
) extends infer shallowParameter extends AbiParameter & {
  type: string
  indexed?: boolean
}
  ? // Resolve struct types
    // Starting with plain struct types (e.g. `Foo`)
    (
      shallowParameter['type'] extends keyof options['structs']
        ? {
            readonly type: 'tuple'
            readonly components: options['structs'][shallowParameter['type']]
          } & (IsUnknown<shallowParameter['name']> extends false
            ? { readonly name: shallowParameter['name'] }
            : object) &
            (shallowParameter['indexed'] extends true
              ? { readonly indexed: true }
              : object)
        : // Resolve tuple structs (e.g. `Foo[]`, `Foo[2]`, `Foo[][2]`, etc.)
          shallowParameter['type'] extends `${infer type extends string &
              keyof options['structs']}[${infer tail}]`
          ? {
              readonly type: `tuple[${tail}]`
              readonly components: options['structs'][type]
            } & (IsUnknown<shallowParameter['name']> extends false
              ? { readonly name: shallowParameter['name'] }
              : object) &
              (shallowParameter['indexed'] extends true
                ? { readonly indexed: true }
                : object)
          : // Not a struct, just return
            shallowParameter
    ) extends infer Parameter extends AbiParameter & {
      type: string
      indexed?: boolean
    }
    ? Pretty<_ValidateAbiParameter<Parameter>>
    : never
  : never

export type SplitParameters<
  signature extends string,
  result extends unknown[] = [],
  current extends string = '',
  depth extends readonly number[] = [],
> = signature extends ''
  ? current extends ''
    ? [...result] // empty string was passed in to `SplitParameters`
    : depth['length'] extends 0
      ? [...result, Trim<current>]
      : Error<`Unbalanced parentheses. "${current}" has too many opening parentheses.`>
  : signature extends `${infer char}${infer tail}`
    ? char extends ','
      ? depth['length'] extends 0
        ? SplitParameters<tail, [...result, Trim<current>], ''>
        : SplitParameters<tail, result, `${current}${char}`, depth>
      : char extends '('
        ? SplitParameters<tail, result, `${current}${char}`, [...depth, 1]>
        : char extends ')'
          ? depth['length'] extends 0
            ? Error<`Unbalanced parentheses. "${current}" has too many closing parentheses.`>
            : SplitParameters<tail, result, `${current}${char}`, Pop<depth>>
          : SplitParameters<tail, result, `${current}${char}`, depth>
    : []
type Pop<type extends readonly number[]> = type extends [...infer head, any]
  ? head
  : []

export type _ValidateAbiParameter<abiParameter extends AbiParameter> =
  // Validate `name`
  (
    abiParameter extends { name: string }
      ? ValidateName<abiParameter['name']> extends infer name
        ? name extends abiParameter['name']
          ? abiParameter
          : // Add `Error` as `name`
            Merge<abiParameter, { readonly name: name }>
        : never
      : abiParameter
  ) extends infer parameter
    ? // Validate `type` against `AbiType`
      (
        ResolvedRegister['strictAbiType'] extends true
          ? parameter extends { type: AbiType }
            ? parameter
            : Merge<
                parameter,
                {
                  readonly type: Error<`Type "${parameter extends {
                    type: string
                  }
                    ? parameter['type']
                    : string}" is not a valid ABI type.`>
                }
              >
          : parameter
      ) extends infer parameter2 extends { type: unknown }
      ? // Convert `(u)int` to `(u)int256`
        parameter2['type'] extends `${infer prefix extends
          | 'u'
          | ''}int${infer suffix extends `[${string}]` | ''}`
        ? Pretty<
            Merge<parameter2, { readonly type: `${prefix}int256${suffix}` }>
          >
        : parameter2
      : never
    : never

export type _ParseFunctionParametersAndStateMutability<
  signature extends string,
> = signature extends
  | `${infer head}returns (${string})`
  | `${infer head}returns(${string})`
  ? _ParseFunctionParametersAndStateMutability<Trim<head>>
  : signature extends `function ${string}(${infer parameters})`
    ? { Inputs: parameters; StateMutability: 'nonpayable' }
    : signature extends `function ${string}(${infer parameters}) ${infer scopeOrStateMutability extends
          | Scope
          | AbiStateMutability
          | `${Scope} ${AbiStateMutability}`}`
      ? {
          Inputs: parameters
          StateMutability: _ParseStateMutability<scopeOrStateMutability>
        }
      : signature extends `function ${string}(${infer tail}`
        ? _UnwrapNameOrModifier<tail> extends {
            nameOrModifier: infer scopeOrStateMutability extends string
            End: infer parameters
          }
          ? {
              Inputs: parameters
              StateMutability: _ParseStateMutability<scopeOrStateMutability>
            }
          : never
        : never

type _ParseStateMutability<signature extends string> =
  signature extends `${Scope} ${infer stateMutability extends AbiStateMutability}`
    ? stateMutability
    : signature extends AbiStateMutability
      ? signature
      : 'nonpayable'

type _ParseConstructorParametersAndStateMutability<signature extends string> =
  signature extends `constructor(${infer parameters}) payable`
    ? { Inputs: parameters; StateMutability: 'payable' }
    : signature extends `constructor(${infer parameters})`
      ? { Inputs: parameters; StateMutability: 'nonpayable' }
      : never

export type _ParseTuple<
  signature extends `(${string})${string}`,
  options extends ParseOptions = DefaultParseOptions,
> = /** Tuples without name or modifier (e.g. `(string)`, `(string foo)`) */
signature extends `(${infer parameters})`
  ? {
      readonly type: 'tuple'
      readonly components: ParseAbiParameters<
        SplitParameters<parameters>,
        Omit<options, 'modifier'>
      >
    }
  : // Array or fixed-length array tuples (e.g. `(string)[]`, `(string)[5]`)
    signature extends `(${infer head})[${'' | `${SolidityFixedArrayRange}`}]`
    ? signature extends `(${head})[${infer size}]`
      ? {
          readonly type: `tuple[${size}]`
          readonly components: ParseAbiParameters<
            SplitParameters<head>,
            Omit<options, 'modifier'>
          >
        }
      : never
    : // Array or fixed-length array tuples with name and/or modifier attached (e.g. `(string)[] foo`, `(string)[5] foo`)
      signature extends `(${infer parameters})[${
          | ''
          | `${SolidityFixedArrayRange}`}] ${infer nameOrModifier}`
      ? signature extends `(${parameters})[${infer size}] ${nameOrModifier}`
        ? nameOrModifier extends `${string}) ${string}`
          ? _UnwrapNameOrModifier<nameOrModifier> extends infer parts extends {
              nameOrModifier: string
              End: string
            }
            ? {
                readonly type: 'tuple'
                readonly components: ParseAbiParameters<
                  SplitParameters<`${parameters})[${size}] ${parts['End']}`>,
                  Omit<options, 'modifier'>
                >
              } & _SplitNameOrModifier<parts['nameOrModifier'], options>
            : never
          : {
              readonly type: `tuple[${size}]`
              readonly components: ParseAbiParameters<
                SplitParameters<parameters>,
                Omit<options, 'modifier'>
              >
            } & _SplitNameOrModifier<nameOrModifier, options>
        : never
      : // Tuples with name and/or modifier attached (e.g. `(string) foo`, `(string bar) foo`)
        signature extends `(${infer parameters}) ${infer nameOrModifier}`
        ? // Check that `nameOrModifier` didn't get matched to `baz) bar) foo` (e.g. `(((string) baz) bar) foo`)
          nameOrModifier extends `${string}) ${string}`
          ? _UnwrapNameOrModifier<nameOrModifier> extends infer parts extends {
              nameOrModifier: string
              End: string
            }
            ? {
                readonly type: 'tuple'
                readonly components: ParseAbiParameters<
                  SplitParameters<`${parameters}) ${parts['End']}`>,
                  Omit<options, 'modifier'>
                >
              } & _SplitNameOrModifier<parts['nameOrModifier'], options>
            : never
          : {
              readonly type: 'tuple'
              readonly components: ParseAbiParameters<
                SplitParameters<parameters>,
                Omit<options, 'modifier'>
              >
            } & _SplitNameOrModifier<nameOrModifier, options>
        : never

// Split name and modifier (e.g. `indexed foo` => `{ name: 'foo', indexed: true }`)
export type _SplitNameOrModifier<
  signature extends string,
  options extends ParseOptions = DefaultParseOptions,
> = Trim<signature> extends infer trimmed
  ? options extends { modifier: Modifier }
    ? // TODO: Check that modifier is allowed
      trimmed extends `${infer mod extends options['modifier']} ${infer name}`
      ? Pretty<
          { readonly name: Trim<name> } & (mod extends 'indexed'
            ? { readonly indexed: true }
            : object)
        >
      : trimmed extends options['modifier']
        ? trimmed extends 'indexed'
          ? { readonly indexed: true }
          : object
        : { readonly name: trimmed }
    : { readonly name: trimmed }
  : never

// `baz) bar) foo` (e.g. `(((string) baz) bar) foo`)
export type _UnwrapNameOrModifier<
  signature extends string,
  current extends string = '',
> = signature extends `${infer head}) ${infer tail}`
  ? _UnwrapNameOrModifier<
      tail,
      `${current}${current extends '' ? '' : ') '}${head}`
    >
  : { End: Trim<current>; nameOrModifier: Trim<signature> }
