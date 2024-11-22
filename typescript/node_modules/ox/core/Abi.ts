import * as abitype from 'abitype'
import type * as Errors from './Errors.js'
import * as internal from './internal/abi.js'
import type * as AbiItem_internal from './internal/abiItem.js'

/** Root type for an ABI. */
export type Abi = abitype.Abi

/** @internal */
export function format<const abi extends Abi>(abi: abi): format.ReturnType<abi>
/**
 * Formats an {@link ox#Abi.Abi} into a **Human Readable ABI**.
 *
 * @example
 * ```ts twoslash
 * import { Abi } from 'ox'
 *
 * const formatted = Abi.format([{
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
 * }])
 *
 * formatted
 * //    ^?
 *
 *
 *
 * ```
 *
 * @param abi - The ABI to format.
 * @returns The formatted ABI.
 */
export function format(abi: Abi | readonly unknown[]): readonly string[]
/** @internal */
export function format(abi: Abi | readonly unknown[]): format.ReturnType {
  return abitype.formatAbi(abi) as never
}

export declare namespace format {
  type ReturnType<abi extends Abi | readonly unknown[] = Abi> =
    abitype.FormatAbi<abi>

  type ErrorType = Errors.GlobalErrorType
}

format.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as format.ErrorType

/** @internal */
export function from<const abi extends Abi | readonly string[]>(
  abi: abi &
    (abi extends readonly string[]
      ? AbiItem_internal.Signatures<abi>
      : unknown),
): from.ReturnType<abi>
/**
 * Parses an arbitrary **JSON ABI** or **Human Readable ABI** into a typed {@link ox#Abi.Abi}.
 *
 * @example
 * ### JSON ABIs
 *
 * ```ts twoslash
 * import { Abi } from 'ox'
 *
 * const abi = Abi.from([{
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
 * }])
 *
 * abi
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
 *
 *
 * ```
 *
 * @example
 * ### Human Readable ABIs
 *
 * ```ts twoslash
 * import { Abi } from 'ox'
 *
 * const abi = Abi.from([
 *   'function approve(address spender, uint256 amount) returns (bool)'
 * ])
 *
 * abi
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
 *
 *
 * ```
 *
 * @param abi - The ABI to parse.
 * @returns The typed ABI.
 */
export function from(abi: Abi | readonly string[]): Abi
/** @internal */
export function from(abi: Abi | readonly string[]): from.ReturnType {
  if (internal.isSignatures(abi)) return abitype.parseAbi(abi)
  return abi
}

export declare namespace from {
  type ReturnType<
    abi extends Abi | readonly string[] | readonly unknown[] = Abi,
  > = abi extends readonly string[] ? abitype.ParseAbi<abi> : abi

  type ErrorType = Errors.GlobalErrorType
}

from.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as from.ErrorType
