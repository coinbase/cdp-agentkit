import * as abitype from 'abitype'
import type * as Abi from './Abi.js'
import * as AbiItem from './AbiItem.js'
import * as AbiParameters from './AbiParameters.js'
import type * as Errors from './Errors.js'
import * as Hex from './Hex.js'
import type * as internal from './internal/abiFunction.js'
import type * as AbiItem_internal from './internal/abiItem.js'
import type * as AbiParameters_internal from './internal/abiParameters.js'
import type { IsNarrowable } from './internal/types.js'

/** Root type for an {@link ox#AbiItem.AbiItem} with a `function` type. */
export type AbiFunction = abitype.AbiFunction & {
  hash?: Hex.Hex | undefined
  overloads?: readonly AbiFunction[] | undefined
}

/**
 * Extracts an {@link ox#AbiFunction.AbiFunction} item from an {@link ox#Abi.Abi}, given a name.
 *
 * @example
 * ```ts twoslash
 * import { Abi, AbiFunction } from 'ox'
 *
 * const abi = Abi.from([
 *   'function foo(string)',
 *   'function bar(uint256)',
 * ])
 *
 * type Foo = AbiFunction.FromAbi<typeof abi, 'foo'>
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
> = abitype.ExtractAbiFunction<abi, name>

/**
 * Extracts the names of all {@link ox#AbiFunction.AbiFunction} items in an {@link ox#Abi.Abi}.
 *
 * @example
 * ```ts twoslash
 * import { Abi, AbiFunction } from 'ox'
 *
 * const abi = Abi.from([
 *   'function foo(string)',
 *   'function bar(uint256)',
 * ])
 *
 * type names = AbiFunction.Name<typeof abi>
 * //   ^?
 *
 *
 * ```
 */
export type Name<abi extends Abi.Abi | readonly unknown[] = Abi.Abi> =
  abi extends Abi.Abi ? ExtractNames<abi> : string

export type ExtractNames<
  abi extends Abi.Abi,
  abiStateMutability extends
    abitype.AbiStateMutability = abitype.AbiStateMutability,
> = abitype.ExtractAbiFunctionNames<abi, abiStateMutability>

/**
 * ABI-decodes function arguments according to the ABI Item's input types (`inputs`).
 *
 * @example
 * ```ts twoslash
 * import { AbiFunction } from 'ox'
 *
 * const approve = AbiFunction.from('function approve(address, uint256)')
 *
 * const data = AbiFunction.encodeData(
 *   approve,
 *   ['0xd8da6bf26964af9d7eed9e03e53415d37aa96045', 69420n]
 * )
 * // '0x095ea7b3000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa960450000000000000000000000000000000000000000000000000000000000010f2c'
 *
 * const input = AbiFunction.decodeData(approve, data) // [!code focus]
 * // @log: ['0xd8da6bf26964af9d7eed9e03e53415d37aa96045', 69420n]
 * ```
 *
 * @param abiFunction - The ABI Item to decode.
 * @param data - The data to decode.
 */
export function decodeData<const abiItem extends AbiFunction>(
  abiFunction: abiItem | AbiFunction,
  data: Hex.Hex,
): decodeData.ReturnType<abiItem> {
  const { overloads } = abiFunction

  if (Hex.size(data) < 4) throw new AbiItem.InvalidSelectorSizeError({ data })
  if (abiFunction.inputs.length === 0) return undefined

  const item = overloads
    ? fromAbi([abiFunction, ...overloads], data as never)
    : abiFunction

  if (Hex.size(data) <= 4) return undefined
  return AbiParameters.decode(item.inputs, Hex.slice(data, 4))
}

export declare namespace decodeData {
  type ReturnType<abiFunction extends AbiFunction = AbiFunction> = IsNarrowable<
    abiFunction,
    AbiFunction
  > extends true
    ? abiFunction['inputs'] extends readonly []
      ? undefined
      :
          | AbiParameters_internal.ToPrimitiveTypes<abiFunction['inputs']>
          | (abiFunction['overloads'] extends readonly AbiFunction[]
              ? AbiParameters_internal.ToPrimitiveTypes<
                  abiFunction['overloads'][number]['inputs']
                >
              : never)
    : unknown

  type ErrorType =
    | fromAbi.ErrorType
    | AbiParameters.decode.ErrorType
    | Hex.size.ErrorType
    | Hex.slice.ErrorType
    | Errors.GlobalErrorType
}

/**
 * ABI-decodes a function's result according to the ABI Item's output types (`outputs`).
 *
 * :::tip
 *
 * This function is typically used to decode contract function return values (e.g. the response of an `eth_call` or the `input` property of a Transaction).
 *
 * See the [End-to-end Example](#end-to-end).
 *
 * :::
 *
 * @example
 * ```ts twoslash
 * import { AbiFunction } from 'ox'
 *
 * const data = '0x000000000000000000000000000000000000000000000000000000000000002a'
 *
 * const totalSupply = AbiFunction.from('function totalSupply() returns (uint256)')
 *
 * const output = AbiFunction.decodeResult(totalSupply, data)
 * // @log: 42n
 * ```
 *
 * @example
 * You can extract an ABI Function from a JSON ABI with {@link ox#AbiFunction.(fromAbi:function)}:
 *
 * ```ts twoslash
 * // @noErrors
 * import { Abi, AbiFunction } from 'ox'
 *
 * const data = '0x000000000000000000000000000000000000000000000000000000000000002a'
 *
 * const erc20Abi = Abi.from([...]) // [!code hl]
 * const totalSupply = AbiFunction.fromAbi(erc20Abi, 'totalSupply') // [!code hl]
 *
 * const output = AbiFunction.decodeResult(totalSupply, data)
 * // @log: 42n
 * ```
 *
 * @example
 * ### End-to-end
 *
 * Below is an end-to-end example of using `AbiFunction.decodeResult` to decode the result of a `balanceOf` contract call on the [Wagmi Mint Example contract](https://etherscan.io/address/0xfba3912ca04dd458c843e2ee08967fc04f3579c2).
 *
 * ```ts twoslash
 * import 'ox/window'
 * import { Abi, AbiFunction } from 'ox'
 *
 * // 1. Extract the Function from the Contract's ABI.
 * const abi = Abi.from([
 *   // ...
 *   {
 *     name: 'balanceOf',
 *     type: 'function',
 *     inputs: [{ name: 'account', type: 'address' }],
 *     outputs: [{ name: 'balance', type: 'uint256' }],
 *     stateMutability: 'view',
 *   },
 *   // ...
 * ])
 * const balanceOf = AbiFunction.fromAbi(abi, 'balanceOf')
 *
 * // 2. Encode the Function Input.
 * const data = AbiFunction.encodeData(
 *   balanceOf,
 *   ['0xd2135CfB216b74109775236E36d4b433F1DF507B']
 * )
 *
 * // 3. Perform the Contract Call.
 * const response = await window.ethereum!.request({
 *   method: 'eth_call',
 *   params: [
 *     {
 *       data,
 *       to: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2',
 *     },
 *   ],
 * })
 *
 * // 4. Decode the Function Output. // [!code focus]
 * const balance = AbiFunction.decodeResult(balanceOf, response) // [!code focus]
 * // @log: 42n
 * ```
 *
 * :::note
 *
 * For simplicity, the above example uses `window.ethereum.request`, but you can use any
 * type of JSON-RPC interface.
 *
 * :::
 *
 * @param abiFunction - ABI Function to decode
 * @param data - ABI-encoded function output
 * @param options - Decoding options
 * @returns Decoded function output
 */
export function decodeResult<
  const abiFunction extends AbiFunction,
  as extends 'Object' | 'Array' = 'Array',
>(
  abiFunction: abiFunction | AbiFunction,
  data: Hex.Hex,
  options: decodeResult.Options<as> = {},
): decodeResult.ReturnType<abiFunction, as> {
  const values = AbiParameters.decode(abiFunction.outputs, data, options)
  if (values && Object.keys(values).length === 0) return undefined
  if (values && Object.keys(values).length === 1) {
    if (Array.isArray(values)) return values[0]
    return Object.values(values)[0]
  }
  return values
}

export declare namespace decodeResult {
  type Options<as extends 'Object' | 'Array'> = {
    /**
     * Whether the decoded values should be returned as an `Object` or `Array`.
     *
     * @default "Array"
     */
    as?: as | 'Array' | 'Object' | undefined
  }

  type ReturnType<
    abiFunction extends AbiFunction = AbiFunction,
    as extends 'Object' | 'Array' = 'Array',
  > = IsNarrowable<abiFunction, AbiFunction> extends true
    ? abiFunction['outputs'] extends readonly []
      ? undefined
      : abiFunction['outputs'] extends readonly [
            infer type extends abitype.AbiParameter,
          ]
        ? abitype.AbiParameterToPrimitiveType<type>
        : AbiParameters.decode.ReturnType<
              abiFunction['outputs'],
              as
            > extends infer types
          ? types extends readonly []
            ? undefined
            : types extends readonly [infer type]
              ? type
              : types
          : never
    : unknown

  type ErrorType = AbiParameters.decode.ErrorType | Errors.GlobalErrorType
}

/**
 * ABI-encodes function arguments (`inputs`), prefixed with the 4 byte function selector.
 *
 * :::tip
 *
 * This function is typically used to encode a contract function and its arguments for contract calls (e.g. `data` parameter of an `eth_call` or `eth_sendTransaction`).
 *
 * See the [End-to-end Example](#end-to-end).
 *
 * :::
 *
 * @example
 * ```ts twoslash
 * import { AbiFunction } from 'ox'
 *
 * const approve = AbiFunction.from('function approve(address, uint256)')
 *
 * const data = AbiFunction.encodeData( // [!code focus]
 *   approve, // [!code focus]
 *   ['0xd8da6bf26964af9d7eed9e03e53415d37aa96045', 69420n] // [!code focus]
 * ) // [!code focus]
 * // @log: '0x095ea7b3000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa960450000000000000000000000000000000000000000000000000000000000010f2c'
 * ```
 *
 * @example
 * You can extract an ABI Function from a JSON ABI with {@link ox#AbiFunction.(fromAbi:function)}:
 *
 * ```ts twoslash
 * // @noErrors
 * import { Abi, AbiFunction } from 'ox'
 *
 * const erc20Abi = Abi.from([...]) // [!code hl]
 * const approve = AbiFunction.fromAbi(erc20Abi, 'approve') // [!code hl]
 *
 * const data = AbiFunction.encodeData(
 *   approve,
 *   ['0xd8da6bf26964af9d7eed9e03e53415d37aa96045', 69420n]
 * )
 * // @log: '0x095ea7b3000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa960450000000000000000000000000000000000000000000000000000000000010f2c'
 * ```
 *
 * @example
 * ### End-to-end
 *
 * Below is an end-to-end example of using `AbiFunction.encodeData` to encode the input of a `balanceOf` contract call on the [Wagmi Mint Example contract](https://etherscan.io/address/0xfba3912ca04dd458c843e2ee08967fc04f3579c2).
 *
 * ```ts twoslash
 * import 'ox/window'
 * import { Abi, AbiFunction } from 'ox'
 *
 * // 1. Extract the Function from the Contract's ABI.
 * const abi = Abi.from([
 *   // ...
 *   {
 *     name: 'balanceOf',
 *     type: 'function',
 *     inputs: [{ name: 'account', type: 'address' }],
 *     outputs: [{ name: 'balance', type: 'uint256' }],
 *     stateMutability: 'view',
 *   },
 *   // ...
 * ])
 * const balanceOf = AbiFunction.fromAbi(abi, 'balanceOf')
 *
 * // 2. Encode the Function Input. // [!code focus]
 * const data = AbiFunction.encodeData( // [!code focus]
 *   balanceOf, // [!code focus]
 *   ['0xd2135CfB216b74109775236E36d4b433F1DF507B'] // [!code focus]
 * ) // [!code focus]
 *
 * // 3. Perform the Contract Call.
 * const response = await window.ethereum!.request({
 *   method: 'eth_call',
 *   params: [
 *     {
 *       data,
 *       to: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2',
 *     },
 *   ],
 * })
 *
 * // 4. Decode the Function Output.
 * const balance = AbiFunction.decodeResult(balanceOf, response)
 * ```
 *
 * :::note
 *
 * For simplicity, the above example uses `window.ethereum.request`, but you can use any
 * type of JSON-RPC interface.
 *
 * :::
 *
 * @param abiFunction - ABI Function to encode
 * @param args - Function arguments
 * @returns ABI-encoded function name and arguments
 */
export function encodeData<const abiFunction extends AbiFunction>(
  abiFunction: abiFunction | AbiFunction,
  ...args: encodeData.Args<abiFunction>
): Hex.Hex {
  const { overloads } = abiFunction

  const item = overloads
    ? (fromAbi([abiFunction as AbiFunction, ...overloads], abiFunction.name, {
        args: (args as any)[0],
      }) as AbiFunction)
    : abiFunction

  const selector = getSelector(item)

  const data =
    args.length > 0
      ? AbiParameters.encode(item.inputs, (args as any)[0])
      : undefined

  return data ? Hex.concat(selector, data) : selector
}

export declare namespace encodeData {
  type Args<abiFunction extends AbiFunction = AbiFunction> = IsNarrowable<
    abiFunction,
    AbiFunction
  > extends true
    ?
        | (abitype.AbiParametersToPrimitiveTypes<
            abiFunction['inputs']
          > extends readonly []
            ? []
            : [abitype.AbiParametersToPrimitiveTypes<abiFunction['inputs']>])
        | (abiFunction['overloads'] extends readonly AbiFunction[]
            ? [
                abitype.AbiParametersToPrimitiveTypes<
                  abiFunction['overloads'][number]['inputs']
                >,
              ]
            : [])
    : readonly unknown[]

  type ErrorType = Errors.GlobalErrorType
}

encodeData.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as encodeData.ErrorType

/**
 * ABI-encodes a function's result (`outputs`).
 *
 * @example
 * ```ts twoslash
 * import { AbiFunction } from 'ox'
 *
 * const totalSupply = AbiFunction.from('function totalSupply() returns (uint256)')
 * const output = AbiFunction.decodeResult(totalSupply, '0x000000000000000000000000000000000000000000000000000000000000002a')
 * // 42n
 *
 * const data = AbiFunction.encodeResult(totalSupply, 42n) // [!code focus]
 * // @log: '0x000000000000000000000000000000000000000000000000000000000000002a'
 * ```
 *
 * @param abiFunction - The ABI item to encode the function output for.
 * @param output - The function output to encode.
 * @param options - Encoding options.
 * @returns The encoded function output.
 */
export function encodeResult<
  const abiFunction extends AbiFunction,
  as extends 'Object' | 'Array' = 'Array',
>(
  abiFunction: abiFunction | AbiFunction,
  output: encodeResult.Output<abiFunction, as>,
  options: encodeResult.Options<as> = {},
): Hex.Hex {
  const { as = 'Array' } = options

  const values = (() => {
    if (abiFunction.outputs.length === 1) return [output]
    if (Array.isArray(output)) return output
    if (as === 'Object') return Object.values(output as any)
    return [output]
  })()

  return AbiParameters.encode(abiFunction.outputs, values)
}

export declare namespace encodeResult {
  type Output<
    abiFunction extends AbiFunction = AbiFunction,
    as extends 'Object' | 'Array' = 'Array',
  > = abiFunction['outputs'] extends readonly []
    ? never
    : abiFunction['outputs']['length'] extends 1
      ? AbiParameters_internal.ToPrimitiveTypes<abiFunction['outputs']>[0]
      : as extends 'Object'
        ? AbiParameters_internal.ToObject<abiFunction['outputs']>
        : AbiParameters_internal.ToPrimitiveTypes<abiFunction['outputs']>

  type Options<as extends 'Object' | 'Array'> = {
    as?: as | 'Object' | 'Array' | undefined
  }

  type ErrorType = AbiParameters.encode.ErrorType | Errors.GlobalErrorType
}

/**
 * Formats an {@link ox#AbiFunction.AbiFunction} into a **Human Readable ABI Function**.
 *
 * @example
 * ```ts twoslash
 * import { AbiFunction } from 'ox'
 *
 * const formatted = AbiFunction.format({
 *   type: 'function',
 *   name: 'approve',
 *   stateMutability: 'nonpayable',
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
 *   outputs: [{ type: 'bool' }],
 * })
 *
 * formatted
 * //    ^?
 *
 *
 * ```
 *
 * @param abiFunction - The ABI Function to format.
 * @returns The formatted ABI Function.
 */
export function format<const abiFunction extends AbiFunction>(
  abiFunction: abiFunction | AbiFunction,
): abitype.FormatAbiItem<abiFunction> {
  return abitype.formatAbiItem(abiFunction) as never
}

export declare namespace format {
  type ErrorType = Errors.GlobalErrorType
}

format.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as format.ErrorType

/**
 * Parses an arbitrary **JSON ABI Function** or **Human Readable ABI Function** into a typed {@link ox#AbiFunction.AbiFunction}.
 *
 * @example
 * ### JSON ABIs
 *
 * ```ts twoslash
 * import { AbiFunction } from 'ox'
 *
 * const approve = AbiFunction.from({
 *   type: 'function',
 *   name: 'approve',
 *   stateMutability: 'nonpayable',
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
 *   outputs: [{ type: 'bool' }],
 * })
 *
 * approve
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
 * import { AbiFunction } from 'ox'
 *
 * const approve = AbiFunction.from(
 *   'function approve(address spender, uint256 amount) returns (bool)' // [!code hl]
 * )
 *
 * approve
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
 * import { AbiFunction } from 'ox'
 *
 * const approve = AbiFunction.from([
 *   'struct Foo { address spender; uint256 amount; }', // [!code hl]
 *   'function approve(Foo foo) returns (bool)',
 * ])
 *
 * approve
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
 * @param abiFunction - The ABI Function to parse.
 * @returns Typed ABI Function.
 */
export function from<
  const abiFunction extends AbiFunction | string | readonly string[],
>(
  abiFunction: (abiFunction | AbiFunction | string | readonly string[]) &
    (
      | (abiFunction extends string ? internal.Signature<abiFunction> : never)
      | (abiFunction extends readonly string[]
          ? internal.Signatures<abiFunction>
          : never)
      | AbiFunction
    ),
  options: from.Options = {},
): from.ReturnType<abiFunction> {
  return AbiItem.from(abiFunction as AbiFunction, options) as never
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

  type ReturnType<
    abiFunction extends AbiFunction | string | readonly string[],
  > = AbiItem.from.ReturnType<abiFunction>

  type ErrorType = AbiItem.from.ErrorType | Errors.GlobalErrorType
}

from.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as from.ErrorType

/**
 * Extracts an {@link ox#AbiFunction.AbiFunction} from an {@link ox#Abi.Abi} given a name and optional arguments.
 *
 * @example
 * ### Extracting by Name
 *
 * ABI Functions can be extracted by their name using the `name` option:
 *
 * ```ts twoslash
 * import { Abi, AbiFunction } from 'ox'
 *
 * const abi = Abi.from([
 *   'function foo()',
 *   'event Transfer(address owner, address to, uint256 tokenId)',
 *   'function bar(string a) returns (uint256 x)',
 * ])
 *
 * const item = AbiFunction.fromAbi(abi, 'foo') // [!code focus]
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
 * ABI Functions can be extract by their selector when {@link ox#Hex.Hex} is provided to `name`.
 *
 * ```ts twoslash
 * import { Abi, AbiFunction } from 'ox'
 *
 * const abi = Abi.from([
 *   'function foo()',
 *   'event Transfer(address owner, address to, uint256 tokenId)',
 *   'function bar(string a) returns (uint256 x)',
 * ])
 * const item = AbiFunction.fromAbi(abi, '0x095ea7b3') // [!code focus]
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
 * Extracting via a hex selector is useful when extracting an ABI Function from an `eth_call` RPC response or
 * from a Transaction `input`.
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
): AbiItem.fromAbi.ReturnType<abi, name, args, AbiFunction> {
  const item = AbiItem.fromAbi(abi, name, options as any)
  if (item.type !== 'function')
    throw new AbiItem.NotFoundError({ name, type: 'function' })
  return item as never
}

export declare namespace fromAbi {
  type ErrorType = AbiItem.fromAbi.ErrorType | Errors.GlobalErrorType
}

fromAbi.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromAbi.ErrorType

/**
 * Computes the [4-byte selector](https://solidity-by-example.org/function-selector/) for an {@link ox#AbiFunction.AbiFunction}.
 *
 * Useful for computing function selectors for calldata.
 *
 * @example
 * ```ts twoslash
 * import { AbiFunction } from 'ox'
 *
 * const selector = AbiFunction.getSelector('function ownerOf(uint256 tokenId)')
 * // @log: '0x6352211e'
 * ```
 *
 * @example
 * ```ts twoslash
 * import { AbiFunction } from 'ox'
 *
 * const selector = AbiFunction.getSelector({
 *   inputs: [{ type: 'uint256' }],
 *   name: 'ownerOf',
 *   outputs: [],
 *   stateMutability: 'view',
 *   type: 'function'
 * })
 * // @log: '0x6352211e'
 * ```
 *
 * @param abiItem - The ABI item to compute the selector for.
 * @returns The first 4 bytes of the {@link ox#Hash.(keccak256:function)} hash of the function signature.
 */
export function getSelector(abiItem: string | AbiFunction): Hex.Hex {
  return AbiItem.getSelector(abiItem)
}

export declare namespace getSelector {
  type ErrorType = AbiItem.getSelector.ErrorType | Errors.GlobalErrorType
}

/* v8 ignore next */
getSelector.parseError = (error: unknown) => error as getSelector.ErrorType
