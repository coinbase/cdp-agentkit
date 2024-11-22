import * as abitype from 'abitype'
import type * as Abi from './Abi.js'
import * as AbiItem from './AbiItem.js'
import * as AbiParameters from './AbiParameters.js'
import type * as Errors from './Errors.js'
import * as Hex from './Hex.js'
import type * as internal from './internal/abiError.js'
import type * as AbiItem_internal from './internal/abiItem.js'
import type { IsNarrowable, IsNever } from './internal/types.js'

/** Root type for an {@link ox#AbiItem.AbiItem} with an `error` type. */
export type AbiError = abitype.AbiError & {
  hash?: Hex.Hex | undefined
  overloads?: readonly AbiError[] | undefined
}

/** @internal */
export function decode<
  const abiError extends AbiError,
  as extends 'Object' | 'Array' = 'Array',
>(
  abiError: abiError,
  data: Hex.Hex,
  options?: decode.Options<as> | undefined,
): decode.ReturnType<abiError, as>
/**
 * ABI-decodes the provided error input (`inputs`).
 *
 * :::tip
 *
 * This function is typically used to decode contract function reverts (e.g. a JSON-RPC error response).
 *
 * See the [End-to-end Example](#end-to-end).
 *
 * :::
 *
 * @example
 * ```ts twoslash
 * import { AbiError } from 'ox'
 *
 * const error = AbiError.from('error InvalidSignature(uint r, uint s, uint8 yParity)')
 *
 * const value = AbiError.decode(error, '0xecde634900000000000000000000000000000000000000000000000000000000000001a400000000000000000000000000000000000000000000000000000000000000450000000000000000000000000000000000000000000000000000000000000001')
 * // @log: [420n, 69n, 1]
 * ```
 *
 * @example
 * You can extract an ABI Error from a JSON ABI with {@link ox#AbiError.(fromAbi:function)}:
 *
 * ```ts twoslash
 * // @noErrors
 * import { Abi, AbiError } from 'ox'
 *
 * const abi = Abi.from([...]) // [!code hl]
 * const error = AbiError.fromAbi(abi, 'InvalidSignature') // [!code hl]
 *
 * const value = AbiError.decode(error, '0xecde634900000000000000000000000000000000000000000000000000000000000001a400000000000000000000000000000000000000000000000000000000000000450000000000000000000000000000000000000000000000000000000000000001')
 * // @log: [420n, 69n, 1]
 * ```
 *
 * @example
 * You can pass the error `data` to the `name` property of {@link ox#AbiError.(fromAbi:function)} to extract and infer the error by its 4-byte selector:
 *
 * ```ts twoslash
 * // @noErrors
 * import { Abi, AbiError } from 'ox'
 *
 * const data = '0xecde634900000000000000000000000000000000000000000000000000000000000001a400000000000000000000000000000000000000000000000000000000000000450000000000000000000000000000000000000000000000000000000000000001'
 *
 * const abi = Abi.from([...])
 * const error = AbiError.fromAbi(abi, data) // [!code hl]
 *
 * const value = AbiError.decode(error, data)
 * // @log: [420n, 69n, 1]
 * ```
 *
 * @example
 * ### End-to-end
 *
 * Below is an end-to-end example of using `AbiError.decode` to decode the revert error of an `approve` contract call on the [Wagmi Mint Example contract](https://etherscan.io/address/0xfba3912ca04dd458c843e2ee08967fc04f3579c2).
 *
 * ```ts twoslash
 * // @noErrors
 * import 'ox/window'
 * import { Abi, AbiError, AbiFunction } from 'ox'
 *
 * // 1. Extract the Function from the Contract's ABI.
 * const abi = Abi.from([
 *   // ...
 *   {
 *     inputs: [
 *       { name: 'to', type: 'address' },
 *       { name: 'tokenId', type: 'uint256' },
 *     ],
 *     name: 'approve',
 *     outputs: [],
 *     stateMutability: 'nonpayable',
 *     type: 'function',
 *   },
 *   // ...
 * ])
 * const approve = AbiFunction.fromAbi(abi, 'approve')
 *
 * // 2. Encode the Function Input.
 * const data = AbiFunction.encodeData(
 *   approve,
 *   ['0xd8da6bf26964af9d7eed9e03e53415d37aa96045', 69420n]
 * )
 *
 * try {
 *   // 3. Attempt to perform the the Contract Call.
 *   await window.ethereum!.request({
 *     method: 'eth_call',
 *     params: [
 *       {
 *         data,
 *         to: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2',
 *       },
 *     ],
 *   })
 * } catch (e) { // [!code focus]
 *   // 4. Extract and decode the Error. // [!code focus]
 *   const error = AbiError.fromAbi(abi, e.data) // [!code focus]
 *   const value = AbiError.decode(error, e.data) // [!code focus]
 *   console.error(`${error.name}(${value})`) // [!code focus]
 * // @error:   Error(ERC721: approve caller is not owner nor approved for all)
 * } // [!code focus]
 * ```
 *
 * :::note
 *
 * For simplicity, the above example uses `window.ethereum.request`, but you can use any
 * type of JSON-RPC interface.
 *
 * :::
 *
 * @param abiError - The ABI Error to decode.
 * @param data - The error data.
 * @param options - Decoding options.
 * @returns The decoded error.
 */
export function decode(
  abiError: AbiError,
  data: Hex.Hex,
  options?: decode.Options | undefined,
): unknown | readonly unknown[] | undefined
/** @internal */
export function decode(
  abiError: AbiError,
  data: Hex.Hex,
  options: decode.Options = {},
): decode.ReturnType {
  if (Hex.size(data) < 4) throw new AbiItem.InvalidSelectorSizeError({ data })
  if (abiError.inputs.length === 0) return undefined

  const values = AbiParameters.decode(
    abiError.inputs,
    Hex.slice(data, 4),
    options,
  )
  if (values && Object.keys(values).length === 1) {
    if (Array.isArray(values)) return values[0]
    return Object.values(values)[0]
  }
  return values
}

export declare namespace decode {
  type Options<as extends 'Object' | 'Array' = 'Array'> = {
    /**
     * Whether the decoded values should be returned as an `Object` or `Array`.
     *
     * @default "Array"
     */
    as?: as | 'Array' | 'Object' | undefined
  }

  type ReturnType<
    abiError extends AbiError = AbiError,
    as extends 'Object' | 'Array' = 'Array',
  > = IsNarrowable<abiError, AbiError> extends true
    ? abiError['inputs'] extends readonly []
      ? undefined
      : abiError['inputs'] extends readonly [
            infer type extends abitype.AbiParameter,
          ]
        ? abitype.AbiParameterToPrimitiveType<type>
        : AbiParameters.decode.ReturnType<
              abiError['inputs'],
              as
            > extends infer types
          ? types extends readonly []
            ? undefined
            : types extends readonly [infer type]
              ? type
              : types
          : never
    : unknown | readonly unknown[] | undefined

  type ErrorType =
    | AbiParameters.decode.ErrorType
    | Hex.size.ErrorType
    | AbiItem.InvalidSelectorSizeError
    | Errors.GlobalErrorType
}

/**
 * ABI-encodes the provided error input (`inputs`), prefixed with the 4 byte error selector.
 *
 * @example
 * ```ts twoslash
 * import { AbiError } from 'ox'
 *
 * const error = AbiError.from(
 *   'error InvalidSignature(uint r, uint s, uint8 yParity)'
 * )
 *
 * const data = AbiError.encode( // [!code focus]
 *   error, // [!code focus]
 *   [1n, 2n, 0] // [!code focus]
 * ) // [!code focus]
 * // @log: '0x095ea7b3000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa960450000000000000000000000000000000000000000000000000000000000010f2c'
 * ```
 *
 * @example
 * You can extract an ABI Error from a JSON ABI with {@link ox#AbiError.(fromAbi:function)}:
 *
 * ```ts twoslash
 * // @noErrors
 * import { Abi, AbiError } from 'ox'
 *
 * const abi = Abi.from([ // [!code hl]
 *   // ... // [!code hl]
 *   { // [!code hl]
 *     name: 'InvalidSignature', // [!code hl]
 *     type: 'error', // [!code hl]
 *     inputs: [ // [!code hl]
 *       { name: 'r', type: 'uint256' }, // [!code hl]
 *       { name: 's', type: 'uint256' }, // [!code hl]
 *       { name: 'yParity', type: 'uint8' }, // [!code hl]
 *     ], // [!code hl]
 *   }, // [!code hl]
 *   // ... // [!code hl]
 * ]) // [!code hl]
 * const error = AbiError.fromAbi(abi, 'InvalidSignature') // [!code hl]
 *
 * const data = AbiError.encode(
 *   error,
 *   ['0xd8da6bf26964af9d7eed9e03e53415d37aa96045', 69420n]
 * )
 * // @log: '0x095ea7b3000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa960450000000000000000000000000000000000000000000000000000000000010f2c'
 * ```
 *
 * @param abiError - ABI Error to encode
 * @param args - Error arguments
 * @returns ABI-encoded error name and arguments
 */
export function encode<const abiError extends AbiError>(
  abiError: abiError,
  ...args: encode.Args<abiError>
): encode.ReturnType {
  const selector = getSelector(abiError)

  const data =
    args.length > 0
      ? AbiParameters.encode(abiError.inputs, (args as any)[0])
      : undefined

  return data ? Hex.concat(selector, data) : selector
}

export declare namespace encode {
  type Args<abiError extends AbiError = AbiError> = IsNarrowable<
    abiError,
    AbiError
  > extends true
    ? abitype.AbiParametersToPrimitiveTypes<
        abiError['inputs']
      > extends readonly []
      ? []
      : [abitype.AbiParametersToPrimitiveTypes<abiError['inputs']>]
    : readonly unknown[]

  type ReturnType = Hex.Hex

  type ErrorType = Errors.GlobalErrorType
}

encode.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as encode.ErrorType

/**
 * Formats an {@link ox#AbiError.AbiError} into a **Human Readable ABI Error**.
 *
 * @example
 * ```ts twoslash
 * import { AbiError } from 'ox'
 *
 * const formatted = AbiError.format({
 *   type: 'error',
 *   name: 'Example',
 *   inputs: [
 *     {
 *       name: 'spender',
 *       type: 'address',
 *     },
 *     {
 *       name: 'amount',
 *       type: 'uint256',
 *     },
 *   ],
 * })
 *
 * formatted
 * //    ^?
 *
 *
 * ```
 *
 * @param abiError - The ABI Error to format.
 * @returns The formatted ABI Error.
 */
export function format<const abiError extends AbiError>(
  abiError: abiError | AbiError,
): abitype.FormatAbiItem<abiError> {
  return abitype.formatAbiItem(abiError) as never
}

export declare namespace format {
  type ErrorType = Errors.GlobalErrorType
}

format.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as format.ErrorType

/**
 * Parses an arbitrary **JSON ABI Error** or **Human Readable ABI Error** into a typed {@link ox#AbiError.AbiError}.
 *
 * @example
 * ### JSON ABIs
 *
 * ```ts twoslash
 * import { AbiError } from 'ox'
 *
 * const badSignatureVError = AbiError.from({
 *   inputs: [{ name: 'v', type: 'uint8' }],
 *   name: 'BadSignatureV',
 *   type: 'error',
 * })
 *
 * badSignatureVError
 * //^?
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * ```
 *
 * @example
 * ### Human Readable ABIs
 *
 * A Human Readable ABI can be parsed into a typed ABI object:
 *
 * ```ts twoslash
 * import { AbiError } from 'ox'
 *
 * const badSignatureVError = AbiError.from(
 *   'error BadSignatureV(uint8 v)' // [!code hl]
 * )
 *
 * badSignatureVError
 * //^?
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * ```
 *
 * @example
 * It is possible to specify `struct`s along with your definitions:
 *
 * ```ts twoslash
 * import { AbiError } from 'ox'
 *
 * const badSignatureVError = AbiError.from([
 *   'struct Signature { uint8 v; }', // [!code hl]
 *   'error BadSignatureV(Signature signature)',
 * ])
 *
 * badSignatureVError
 * //^?
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * ```
 *
 *
 *
 * @param abiError - The ABI Error to parse.
 * @returns Typed ABI Error.
 */
export function from<
  const abiError extends AbiError | string | readonly string[],
>(
  abiError: (abiError | AbiError | string | readonly string[]) &
    (
      | (abiError extends string ? internal.Signature<abiError> : never)
      | (abiError extends readonly string[]
          ? internal.Signatures<abiError>
          : never)
      | AbiError
    ),
  options: from.Options = {},
): from.ReturnType<abiError> {
  return AbiItem.from(abiError as AbiError, options) as never
}

export declare namespace from {
  type Options = {
    /**
     * Whether or not to prepare the extracted function (optimization for encoding performance).
     * When `true`, the `hash` property is computed and included in the returned value.
     *
     * @default true
     */
    prepare?: boolean | undefined
  }

  type ReturnType<abiError extends AbiError | string | readonly string[]> =
    AbiItem.from.ReturnType<abiError>

  type ErrorType = AbiItem.from.ErrorType | Errors.GlobalErrorType
}

from.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as from.ErrorType

/**
 * Extracts an {@link ox#AbiError.AbiError} from an {@link ox#Abi.Abi} given a name and optional arguments.
 *
 * @example
 * ### Extracting by Name
 *
 * ABI Errors can be extracted by their name using the `name` option:
 *
 * ```ts twoslash
 * import { Abi, AbiError } from 'ox'
 *
 * const abi = Abi.from([
 *   'function foo()',
 *   'error BadSignatureV(uint8 v)',
 *   'function bar(string a) returns (uint256 x)',
 * ])
 *
 * const item = AbiError.fromAbi(abi, 'BadSignatureV') // [!code focus]
 * //    ^?
 *
 *
 *
 *
 *
 *
 * ```
 *
 * @example
 * ### Extracting by Selector
 *
 * ABI Errors can be extract by their selector when {@link ox#Hex.Hex} is provided to `name`.
 *
 * ```ts twoslash
 * import { Abi, AbiError } from 'ox'
 *
 * const abi = Abi.from([
 *   'function foo()',
 *   'error BadSignatureV(uint8 v)',
 *   'function bar(string a) returns (uint256 x)',
 * ])
 * const item = AbiError.fromAbi(abi, '0x095ea7b3') // [!code focus]
 * //    ^?
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * ```
 *
 * :::note
 *
 * Extracting via a hex selector is useful when extracting an ABI Error from JSON-RPC error data.
 *
 * :::
 *
 * @param abi - The ABI to extract from.
 * @param name - The name (or selector) of the ABI item to extract.
 * @param options - Extraction options.
 * @returns The ABI item.
 */
export function fromAbi<
  const abi extends Abi.Abi | readonly unknown[],
  name extends Name<abi>,
  const args extends
    | AbiItem_internal.ExtractArgs<abi, name>
    | undefined = undefined,
  //
  allNames = Name<abi>,
>(
  abi: abi | Abi.Abi | readonly unknown[],
  name: Hex.Hex | (name extends allNames ? name : never),
  options?: AbiItem.fromAbi.Options<
    abi,
    name,
    args,
    AbiItem_internal.ExtractArgs<abi, name>
  >,
): fromAbi.ReturnType<abi, name, args> {
  if (name === 'Error') return solidityError as never
  if (name === 'Panic') return solidityPanic as never
  if (Hex.validate(name, { strict: false })) {
    const selector = Hex.slice(name, 0, 4)
    if (selector === solidityErrorSelector) return solidityError as never
    if (selector === solidityPanicSelector) return solidityPanic as never
  }

  const item = AbiItem.fromAbi(abi, name, options as any)
  if (item.type !== 'error')
    throw new AbiItem.NotFoundError({ name, type: 'error' })
  return item as never
}

export declare namespace fromAbi {
  type ReturnType<
    abi extends Abi.Abi | readonly unknown[] = Abi.Abi,
    name extends Name<abi> = Name<abi>,
    args extends
      | AbiItem_internal.ExtractArgs<abi, name>
      | undefined = AbiItem_internal.ExtractArgs<abi, name>,
  > = IsNarrowable<name, Name<abi>> extends true
    ?
        | (name extends 'Error' ? typeof solidityError : never)
        | (name extends 'Panic'
            ? typeof solidityPanic
            : never) extends infer result
      ? IsNever<result> extends true
        ? AbiItem.fromAbi.ReturnType<abi, name, args, AbiError>
        : result
      : never
    :
        | AbiItem.fromAbi.ReturnType<abi, name, args, AbiError>
        | typeof solidityError
        | typeof solidityPanic

  type ErrorType = AbiItem.fromAbi.ErrorType | Errors.GlobalErrorType
}

fromAbi.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromAbi.ErrorType

/**
 * Computes the [4-byte selector](https://solidity-by-example.org/function-selector/) for an {@link ox#AbiError.AbiError}.
 *
 * @example
 * ```ts twoslash
 * import { AbiError } from 'ox'
 *
 * const selector = AbiError.getSelector('error BadSignatureV(uint8 v)')
 * // @log: '0x6352211e'
 * ```
 *
 * @example
 * ```ts twoslash
 * import { AbiError } from 'ox'
 *
 * const selector = AbiError.getSelector({
 *   inputs: [{ name: 'v', type: 'uint8' }],
 *   name: 'BadSignatureV',
 *   type: 'error'
 * })
 * // @log: '0x6352211e'
 * ```
 *
 * @param abiItem - The ABI item to compute the selector for.
 * @returns The first 4 bytes of the {@link ox#Hash.(keccak256:function)} hash of the error signature.
 */
export function getSelector(abiItem: string | AbiError): Hex.Hex {
  return AbiItem.getSelector(abiItem)
}

export declare namespace getSelector {
  type ErrorType = AbiItem.getSelector.ErrorType | Errors.GlobalErrorType
}

/* v8 ignore next */
getSelector.parseError = (error: unknown) => error as getSelector.ErrorType

// https://docs.soliditylang.org/en/v0.8.16/control-structures.html#panic-via-assert-and-error-via-require
export const panicReasons = {
  1: 'An `assert` condition failed.',
  17: 'Arithmetic operation resulted in underflow or overflow.',
  18: 'Division or modulo by zero (e.g. `5 / 0` or `23 % 0`).',
  33: 'Attempted to convert to an invalid type.',
  34: 'Attempted to access a storage byte array that is incorrectly encoded.',
  49: 'Performed `.pop()` on an empty array',
  50: 'Array index is out of bounds.',
  65: 'Allocated too much memory or created an array which is too large.',
  81: 'Attempted to call a zero-initialized variable of internal function type.',
} as Record<number, string>

export const solidityError = /*#__PURE__*/ from({
  inputs: [
    {
      name: 'message',
      type: 'string',
    },
  ],
  name: 'Error',
  type: 'error',
})

export const solidityErrorSelector = '0x08c379a0'

export const solidityPanic = /*#__PURE__*/ from({
  inputs: [
    {
      name: 'reason',
      type: 'uint8',
    },
  ],
  name: 'Panic',
  type: 'error',
})

export const solidityPanicSelector = '0x4e487b71'

/**
 * Extracts an {@link ox#AbiError.AbiError} item from an {@link ox#Abi.Abi}, given a name.
 *
 * @example
 * ```ts twoslash
 * import { Abi, AbiError } from 'ox'
 *
 * const abi = Abi.from([
 *   'error Foo(string)',
 *   'error Bar(uint256)',
 * ])
 *
 * type Foo = AbiError.FromAbi<typeof abi, 'Foo'>
 * //   ^?
 *
 *
 *
 *
 *
 *
 *
 *
 * ```
 */
export type FromAbi<
  abi extends Abi.Abi,
  name extends ExtractNames<abi>,
> = abitype.ExtractAbiError<abi, name>

/**
 * Extracts the names of all {@link ox#AbiError.AbiError} items in an {@link ox#Abi.Abi}.
 *
 * @example
 * ```ts twoslash
 * import { Abi, AbiError } from 'ox'
 *
 * const abi = Abi.from([
 *   'error Foo(string)',
 *   'error Bar(uint256)',
 * ])
 *
 * type names = AbiError.Name<typeof abi>
 * //   ^?
 * ```
 */
export type Name<abi extends Abi.Abi | readonly unknown[] = Abi.Abi> =
  abi extends Abi.Abi ? ExtractNames<abi> : string

export type ExtractNames<abi extends Abi.Abi> =
  | abitype.ExtractAbiErrorNames<abi>
  | 'Panic'
  | 'Error'
