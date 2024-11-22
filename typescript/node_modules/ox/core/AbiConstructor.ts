import * as abitype from 'abitype'
import type * as Abi from './Abi.js'
import * as AbiItem from './AbiItem.js'
import * as AbiParameters from './AbiParameters.js'
import type * as Errors from './Errors.js'
import * as Hex from './Hex.js'
import type * as internal from './internal/abiConstructor.js'
import type { IsNarrowable } from './internal/types.js'

/** Root type for an {@link ox#AbiItem.AbiItem} with a `constructor` type. */
export type AbiConstructor = abitype.AbiConstructor

/** @internal */
export function decode<const abiConstructor extends AbiConstructor>(
  abiConstructor: abiConstructor,
  options: decode.Options,
): decode.ReturnType<abiConstructor>
/**
 * ABI-decodes the provided constructor input (`inputs`).
 *
 * @example
 * ```ts twoslash
 * import { AbiConstructor } from 'ox'
 *
 * const constructor = AbiConstructor.from('constructor(address, uint256)')
 *
 * const bytecode = '0x...'
 *
 * const data = AbiConstructor.encode(constructor, {
 *   bytecode,
 *   args: ['0xd8da6bf26964af9d7eed9e03e53415d37aa96045', 123n],
 * })
 *
 * const decoded = AbiConstructor.decode(constructor, { // [!code focus]
 *   bytecode, // [!code focus]
 *   data, // [!code focus]
 * }) // [!code focus]
 * ```
 *
 * @param abiConstructor - The ABI Constructor to decode.
 * @param options - Decoding options.
 * @returns The decoded constructor inputs.
 */
export function decode(
  abiConstructor: AbiConstructor,
  options: decode.Options,
): readonly unknown[] | undefined
/** @internal */
export function decode(
  abiConstructor: AbiConstructor,
  options: decode.Options,
): decode.ReturnType {
  const { bytecode } = options
  if (abiConstructor.inputs.length === 0) return undefined
  const data = options.data.replace(bytecode, '0x') as Hex.Hex
  return AbiParameters.decode(abiConstructor.inputs, data)
}

export declare namespace decode {
  interface Options {
    /** The bytecode of the contract. */
    bytecode: Hex.Hex
    /** The encoded constructor. */
    data: Hex.Hex
  }

  type ReturnType<abiConstructor extends AbiConstructor = AbiConstructor> =
    | (abiConstructor['inputs']['length'] extends 0
        ? undefined
        : abitype.AbiParametersToPrimitiveTypes<abiConstructor['inputs']>)
    | (IsNarrowable<abiConstructor, AbiConstructor> extends true
        ? never
        : undefined)

  type ErrorType = Errors.GlobalErrorType
}

decode.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as decode.ErrorType

/**
 * ABI-encodes the provided constructor input (`inputs`).
 *
 * @example
 * ```ts twoslash
 * import { AbiConstructor } from 'ox'
 *
 * const constructor = AbiConstructor.from('constructor(address, uint256)')
 *
 * const data = AbiConstructor.encode(constructor, {
 *   bytecode: '0x...',
 *   args: ['0xd8da6bf26964af9d7eed9e03e53415d37aa96045', 123n],
 * })
 * ```
 *
 * @example
 * ### End-to-end
 *
 * Below is an end-to-end example of using `AbiConstructor.encode` to encode the constructor of a contract and deploy it.
 *
 * ```ts twoslash
 * import 'ox/window'
 * import { AbiConstructor, Hex } from 'ox'
 *
 * // 1. Instantiate the ABI Constructor.
 * const constructor = AbiConstructor.from(
 *   'constructor(address owner, uint256 amount)',
 * )
 *
 * // 2. Encode the ABI Constructor.
 * const data = AbiConstructor.encode(constructor, {
 *   bytecode: '0x...',
 *   args: ['0xd8da6bf26964af9d7eed9e03e53415d37aa96045', 123n],
 * })
 *
 * // 3. Deploy the contract.
 * const hash = await window.ethereum!.request({
 *   method: 'eth_sendTransaction',
 *   params: [{ data }],
 * })
 * ```
 *
 * :::note
 *
 * For simplicity, the above example uses `window.ethereum.request`, but you can use any
 * type of JSON-RPC interface.
 *
 * :::
 *
 * @param abiConstructor - The ABI Constructor to encode.
 * @param options - Encoding options.
 * @returns The encoded constructor.
 */
export function encode<const abiConstructor extends AbiConstructor>(
  abiConstructor: abiConstructor,
  options: encode.Options<abiConstructor>,
): encode.ReturnType {
  const { bytecode, args } = options
  return Hex.concat(
    bytecode,
    abiConstructor.inputs?.length && args?.length
      ? AbiParameters.encode(abiConstructor.inputs, args as readonly unknown[])
      : '0x',
  )
}

export declare namespace encode {
  type Options<
    abiConstructor extends AbiConstructor = AbiConstructor,
    ///
    args extends abitype.AbiParametersToPrimitiveTypes<
      abiConstructor['inputs']
    > = abitype.AbiParametersToPrimitiveTypes<abiConstructor['inputs']>,
  > = {
    /** The bytecode of the contract. */
    bytecode: Hex.Hex
    /** The constructor arguments to encode. */
    args?: args | undefined
  } & (readonly [] extends args
    ? {}
    : {
        /** The constructor arguments to encode. */
        args: args
      })

  type ReturnType = Hex.Hex

  type ErrorType =
    | Hex.concat.ErrorType
    | AbiParameters.encode.ErrorType
    | Errors.GlobalErrorType
}

encode.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as encode.ErrorType

/** @internal */
export function format<const abiConstructor extends AbiConstructor>(
  abiConstructor: abiConstructor,
): format.ReturnType<abiConstructor>
/**
 * Formats an {@link ox#AbiConstructor.AbiConstructor} into a **Human Readable ABI Function**.
 *
 * @example
 * ```ts twoslash
 * import { AbiConstructor } from 'ox'
 *
 * const formatted = AbiConstructor.format({
 *   inputs: [
 *     { name: 'owner', type: 'address' },
 *   ],
 *   payable: false,
 *   stateMutability: 'nonpayable',
 *   type: 'constructor',
 * })
 *
 * formatted
 * //    ^?
 *
 *
 * ```
 *
 * @param abiConstructor - The ABI Constructor to format.
 * @returns The formatted ABI Constructor.
 */
export function format(abiConstructor: AbiConstructor): string
/** @internal */
export function format(abiConstructor: AbiConstructor): format.ReturnType {
  return abitype.formatAbiItem(abiConstructor)
}

export declare namespace format {
  type ReturnType<abiConstructor extends AbiConstructor = AbiConstructor> =
    abitype.FormatAbiItem<abiConstructor>

  type ErrorType = Errors.GlobalErrorType
}

format.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as format.ErrorType

/** @internal */
export function from<
  const abiConstructor extends AbiConstructor | string | readonly string[],
>(
  abiConstructor: (abiConstructor | string | readonly string[]) &
    (
      | (abiConstructor extends string
          ? internal.Signature<abiConstructor>
          : never)
      | (abiConstructor extends readonly string[]
          ? internal.Signatures<abiConstructor>
          : never)
      | AbiConstructor
    ),
): from.ReturnType<abiConstructor>
/**
 * Parses an arbitrary **JSON ABI Constructor** or **Human Readable ABI Constructor** into a typed {@link ox#AbiConstructor.AbiConstructor}.
 *
 * @example
 * ### JSON ABIs
 *
 * ```ts twoslash
 * import { AbiConstructor } from 'ox'
 *
 * const constructor = AbiConstructor.from({
 *   inputs: [
 *     { name: 'owner', type: 'address' },
 *   ],
 *   payable: false,
 *   stateMutability: 'nonpayable',
 *   type: 'constructor',
 * })
 *
 * constructor
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
 * import { AbiConstructor } from 'ox'
 *
 * const constructor = AbiConstructor.from(
 *   'constructor(address owner)' // [!code hl]
 * )
 *
 * constructor
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
 * import { AbiConstructor } from 'ox'
 *
 * const constructor = AbiConstructor.from([
 *   'struct Foo { address owner; uint256 amount; }', // [!code hl]
 *   'constructor(Foo foo)',
 * ])
 *
 * constructor
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
 * @param abiConstructor - The ABI Constructor to parse.
 * @returns Typed ABI Constructor.
 */
export function from(
  abiConstructor: AbiConstructor | string | readonly string[],
): AbiConstructor
/** @internal */
export function from(
  abiConstructor: AbiConstructor | string | readonly string[],
): from.ReturnType {
  return AbiItem.from(abiConstructor as AbiConstructor)
}

export declare namespace from {
  type ReturnType<
    abiConstructor extends
      | AbiConstructor
      | string
      | readonly string[] = AbiConstructor,
  > = AbiItem.from.ReturnType<abiConstructor>

  type ErrorType = AbiItem.from.ErrorType | Errors.GlobalErrorType
}

from.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as from.ErrorType

/** @internal */
export function fromAbi<const abi extends Abi.Abi | readonly unknown[]>(
  abi: abi | Abi.Abi | readonly unknown[],
): fromAbi.ReturnType<abi>
/**
 * Extracts an {@link ox#AbiConstructor.AbiConstructor} from an {@link ox#Abi.Abi} given a name and optional arguments.
 *
 * @example
 * ### Extracting by Name
 *
 * ABI Events can be extracted by their name using the `name` option:
 *
 * ```ts twoslash
 * import { Abi, AbiConstructor } from 'ox'
 *
 * const abi = Abi.from([
 *   'constructor(address owner)',
 *   'function foo()',
 *   'event Transfer(address owner, address to, uint256 tokenId)',
 *   'function bar(string a) returns (uint256 x)',
 * ])
 *
 * const item = AbiConstructor.fromAbi(abi) // [!code focus]
 * //    ^?
 *
 *
 *
 *
 *
 *
 * ```
 *
 * @returns The ABI constructor.
 */
export function fromAbi(abi: Abi.Abi | readonly unknown[]): AbiConstructor
/** @internal */
export function fromAbi(abi: Abi.Abi | readonly unknown[]): fromAbi.ReturnType {
  const item = (abi as Abi.Abi).find((item) => item.type === 'constructor')
  if (!item) throw new AbiItem.NotFoundError({ name: 'constructor' })
  return item
}

export declare namespace fromAbi {
  type ReturnType<abi extends Abi.Abi | readonly unknown[] = Abi.Abi> = Extract<
    abi[number],
    { type: 'constructor' }
  >

  type ErrorType = AbiItem.NotFoundError | Errors.GlobalErrorType
}

fromAbi.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromAbi.ErrorType
