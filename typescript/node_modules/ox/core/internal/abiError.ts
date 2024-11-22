import type * as AbiItem_internal from './abiItem.js'
import type { TypeErrorMessage } from './types.js'

/** @internal */
export type IsSignature<signature extends string> =
  | (AbiItem_internal.IsErrorSignature<signature> extends true ? true : never)
  | (AbiItem_internal.IsStructSignature<signature> extends true
      ? true
      : never) extends infer condition
  ? [condition] extends [never]
    ? false
    : true
  : false

/** @internal */
export type Signature<
  signature extends string,
  key extends string | unknown = unknown,
> = IsSignature<signature> extends true
  ? signature
  : string extends signature // if exactly `string` (not narrowed), then pass through as valid
    ? signature
    : TypeErrorMessage<`Signature "${signature}" is invalid${key extends string
        ? ` at position ${key}`
        : ''}.`>

/** @internal */
export type Signatures<signatures extends readonly string[]> = {
  [key in keyof signatures]: Signature<signatures[key], key>
}
