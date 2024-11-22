import * as abitype from 'abitype'
import type * as Abi from './Abi.js'
import * as Errors from './Errors.js'
import * as Hash from './Hash.js'
import * as Hex from './Hex.js'
import * as internal from './internal/abiItem.js'
import type { UnionCompute } from './internal/types.js'

/** Root type for an item on an {@link ox#Abi.Abi}. */
export type AbiItem = Abi.Abi[number]

/**
 * Extracts an {@link ox#AbiItem.AbiItem} item from an {@link ox#Abi.Abi}, given a name.
 *
 * @example
 * ```ts twoslash
 * import { Abi, AbiItem } from 'ox'
 *
 * const abi = Abi.from([
 *   'error Foo(string)',
 *   'function foo(string)',
 *   'event Bar(uint256)',
 * ])
 *
 * type Foo = AbiItem.FromAbi<typeof abi, 'Foo'>
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
> = Extract<abi[number], { name: name }>

/**
 * Extracts the names of all {@link ox#AbiItem.AbiItem} items in an {@link ox#Abi.Abi}.
 *
 * @example
 * ```ts twoslash
 * import { Abi, AbiItem } from 'ox'
 *
 * const abi = Abi.from([
 *   'error Foo(string)',
 *   'function foo(string)',
 *   'event Bar(uint256)',
 * ])
 *
 * type names = AbiItem.Name<typeof abi>
 * //   ^?
 *
 * ```
 */
export type Name<abi extends Abi.Abi | readonly unknown[] = Abi.Abi> =
  abi extends Abi.Abi ? ExtractNames<abi> : string

export type ExtractNames<abi extends Abi.Abi> = Extract<
  abi[number],
  { name: string }
>['name']

/**
 * Formats an {@link ox#AbiItem.AbiItem} into a **Human Readable ABI Item**.
 *
 * @example
 * ```ts twoslash
 * import { AbiItem } from 'ox'
 *
 * const formatted = AbiItem.format({
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
 * @param abiItem - The ABI Item to format.
 * @returns The formatted ABI Item  .
 */
export function format<const abiItem extends AbiItem>(
  abiItem: abiItem | AbiItem,
): abitype.FormatAbiItem<abiItem> {
  return abitype.formatAbiItem(abiItem) as never
}

export declare namespace format {
  type ErrorType = Errors.GlobalErrorType
}

format.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as format.ErrorType

/**
 * Parses an arbitrary **JSON ABI Item** or **Human Readable ABI Item** into a typed {@link ox#AbiItem.AbiItem}.
 *
 * @example
 * ### JSON ABIs
 *
 * ```ts twoslash
 * import { AbiItem } from 'ox'
 *
 * const abiItem = AbiItem.from({
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
 * abiItem
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
 * import { AbiItem } from 'ox'
 *
 * const abiItem = AbiItem.from(
 *   'function approve(address spender, uint256 amount) returns (bool)' // [!code hl]
 * )
 *
 * abiItem
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
 * import { AbiItem } from 'ox'
 *
 * const abiItem = AbiItem.from([
 *   'struct Foo { address spender; uint256 amount; }', // [!code hl]
 *   'function approve(Foo foo) returns (bool)',
 * ])
 *
 * abiItem
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
 * @param abiItem - The ABI Item to parse.
 * @returns The typed ABI Item.
 */
export function from<
  const abiItem extends AbiItem | string | readonly string[],
>(
  abiItem: (abiItem | AbiItem | string | readonly string[]) &
    (
      | (abiItem extends string ? internal.Signature<abiItem> : never)
      | (abiItem extends readonly string[]
          ? internal.Signatures<abiItem>
          : never)
      | AbiItem
    ),
  options: from.Options = {},
): from.ReturnType<abiItem> {
  const { prepare = true } = options
  const item = (() => {
    if (Array.isArray(abiItem)) return abitype.parseAbiItem(abiItem)
    if (typeof abiItem === 'string')
      return abitype.parseAbiItem(abiItem as never)
    return abiItem
  })() as AbiItem
  return {
    ...item,
    ...(prepare ? { hash: getSignatureHash(item) } : {}),
  } as never
}

export declare namespace from {
  type Options = {
    /**
     * Whether or not to prepare the extracted item (optimization for encoding performance).
     * When `true`, the `hash` property is computed and included in the returned value.
     *
     * @default true
     */
    prepare?: boolean | undefined
  }

  type ReturnType<abiItem extends AbiItem | string | readonly string[]> =
    abiItem extends string
      ? abitype.ParseAbiItem<abiItem>
      : abiItem extends readonly string[]
        ? abitype.ParseAbiItem<abiItem>
        : abiItem

  type ErrorType = Errors.GlobalErrorType
}

from.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as from.ErrorType

/**
 * Extracts an {@link ox#AbiItem.AbiItem} from an {@link ox#Abi.Abi} given a name and optional arguments.
 *
 * @example
 * ABI Items can be extracted by their name using the `name` option:
 *
 * ```ts twoslash
 * import { Abi, AbiItem } from 'ox'
 *
 * const abi = Abi.from([
 *   'function foo()',
 *   'event Transfer(address owner, address to, uint256 tokenId)',
 *   'function bar(string a) returns (uint256 x)',
 * ])
 *
 * const item = AbiItem.fromAbi(abi, 'Transfer') // [!code focus]
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
 * ABI Items can be extract by their selector when {@link ox#Hex.Hex} is provided to `name`.
 *
 * ```ts twoslash
 * import { Abi, AbiItem } from 'ox'
 *
 * const abi = Abi.from([
 *   'function foo()',
 *   'event Transfer(address owner, address to, uint256 tokenId)',
 *   'function bar(string a) returns (uint256 x)',
 * ])
 * const item = AbiItem.fromAbi(abi, '0x095ea7b3') // [!code focus]
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
 *
 *
 *
 *
 * ```
 *
 * :::note
 *
 * Extracting via a hex selector is useful when extracting an ABI Item from an `eth_call` RPC response,
 * a Transaction `input`, or from Event Log `topics`.
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
  const args extends internal.ExtractArgs<abi, name> | undefined = undefined,
  //
  allNames = Name<abi>,
>(
  abi: abi | Abi.Abi | readonly unknown[],
  name: Hex.Hex | (name extends allNames ? name : never),
  options?: fromAbi.Options<abi, name, args>,
): fromAbi.ReturnType<abi, name, args> {
  const { args = [], prepare = true } = (options ??
    {}) as unknown as fromAbi.Options

  const isSelector = Hex.validate(name, { strict: false })
  const abiItems = (abi as Abi.Abi).filter((abiItem) => {
    if (isSelector) {
      if (abiItem.type === 'function' || abiItem.type === 'error')
        return getSelector(abiItem) === Hex.slice(name, 0, 4)
      if (abiItem.type === 'event') return getSignatureHash(abiItem) === name
      return false
    }
    return 'name' in abiItem && abiItem.name === name
  })

  if (abiItems.length === 0) throw new NotFoundError({ name: name as string })
  if (abiItems.length === 1)
    return {
      ...abiItems[0],
      ...(prepare ? { hash: getSignatureHash(abiItems[0]!) } : {}),
    } as never

  let matchedAbiItem: AbiItem | undefined = undefined
  for (const abiItem of abiItems) {
    if (!('inputs' in abiItem)) continue
    if (!args || args.length === 0) {
      if (!abiItem.inputs || abiItem.inputs.length === 0)
        return {
          ...abiItem,
          ...(prepare ? { hash: getSignatureHash(abiItem) } : {}),
        } as never
      continue
    }
    if (!abiItem.inputs) continue
    if (abiItem.inputs.length === 0) continue
    if (abiItem.inputs.length !== args.length) continue
    const matched = args.every((arg, index) => {
      const abiParameter = 'inputs' in abiItem && abiItem.inputs![index]
      if (!abiParameter) return false
      return internal.isArgOfType(arg, abiParameter)
    })
    if (matched) {
      // Check for ambiguity against already matched parameters (e.g. `address` vs `bytes20`).
      if (
        matchedAbiItem &&
        'inputs' in matchedAbiItem &&
        matchedAbiItem.inputs
      ) {
        const ambiguousTypes = internal.getAmbiguousTypes(
          abiItem.inputs,
          matchedAbiItem.inputs,
          args as readonly unknown[],
        )
        if (ambiguousTypes)
          throw new AmbiguityError(
            {
              abiItem,
              type: ambiguousTypes[0]!,
            },
            {
              abiItem: matchedAbiItem,
              type: ambiguousTypes[1]!,
            },
          )
      }

      matchedAbiItem = abiItem
    }
  }

  const abiItem = (() => {
    if (matchedAbiItem) return matchedAbiItem
    const [abiItem, ...overloads] = abiItems
    return { ...abiItem!, overloads }
  })()

  if (!abiItem) throw new NotFoundError({ name: name as string })
  return {
    ...abiItem,
    ...(prepare ? { hash: getSignatureHash(abiItem) } : {}),
  } as never
}

export declare namespace fromAbi {
  type Options<
    abi extends Abi.Abi | readonly unknown[] = Abi.Abi,
    name extends Name<abi> = Name<abi>,
    args extends
      | internal.ExtractArgs<abi, name>
      | undefined = internal.ExtractArgs<abi, name>,
    ///
    allArgs = internal.ExtractArgs<abi, name>,
  > = {
    /**
     * Whether or not to prepare the extracted item (optimization for encoding performance).
     * When `true`, the `hash` property is computed and included in the returned value.
     *
     * @default true
     */
    prepare?: boolean | undefined
  } & UnionCompute<
    readonly [] extends allArgs
      ? {
          args?:
            | allArgs // show all options
            // infer value, widen inferred value of `args` conditionally to match `allArgs`
            | (abi extends Abi.Abi
                ? args extends allArgs
                  ? internal.Widen<args>
                  : never
                : never)
            | undefined
        }
      : {
          args?:
            | allArgs // show all options
            | (internal.Widen<args> & (args extends allArgs ? unknown : never)) // infer value, widen inferred value of `args` match `allArgs` (e.g. avoid union `args: readonly [123n] | readonly [bigint]`)
            | undefined
        }
  >

  type ReturnType<
    abi extends Abi.Abi | readonly unknown[] = Abi.Abi,
    name extends Name<abi> = Name<abi>,
    args extends
      | internal.ExtractArgs<abi, name>
      | undefined = internal.ExtractArgs<abi, name>,
    fallback = AbiItem,
  > = abi extends Abi.Abi
    ? Abi.Abi extends abi
      ? fallback
      : internal.ExtractForArgs<
          abi,
          name,
          args extends internal.ExtractArgs<abi, name>
            ? args
            : internal.ExtractArgs<abi, name>
        >
    : fallback

  type ErrorType = Errors.GlobalErrorType
}

fromAbi.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromAbi.ErrorType

/**
 * Computes the [4-byte selector](https://solidity-by-example.org/function-selector/) for an {@link ox#AbiItem.AbiItem}.
 *
 * Useful for computing function selectors for calldata.
 *
 * @example
 * ```ts twoslash
 * import { AbiItem } from 'ox'
 *
 * const selector = AbiItem.getSelector('function ownerOf(uint256 tokenId)')
 * // @log: '0x6352211e'
 * ```
 *
 * @example
 * ```ts twoslash
 * import { AbiItem } from 'ox'
 *
 * const selector = AbiItem.getSelector({
 *   inputs: [{ type: 'uint256' }],
 *   name: 'ownerOf',
 *   outputs: [],
 *   stateMutability: 'view',
 *   type: 'function'
 * })
 * // @log: '0x6352211e'
 * ```
 *
 * @param abiItem - The ABI item to compute the selector for. Can be a signature or an ABI item for an error, event, function, etc.
 * @returns The first 4 bytes of the {@link ox#Hash.(keccak256:function)} hash of the function signature.
 */
export function getSelector(abiItem: string | AbiItem): Hex.Hex {
  return Hex.slice(getSignatureHash(abiItem), 0, 4)
}

export declare namespace getSelector {
  type ErrorType =
    | getSignatureHash.ErrorType
    | Hex.slice.ErrorType
    | Errors.GlobalErrorType
}

/* v8 ignore next */
getSelector.parseError = (error: unknown) => error as getSelector.ErrorType

/**
 * Computes the stringified signature for a given {@link ox#AbiItem.AbiItem}.
 *
 * @example
 * ```ts twoslash
 * import { AbiItem } from 'ox'
 *
 * const signature = AbiItem.getSignature('function ownerOf(uint256 tokenId)')
 * // @log: 'ownerOf(uint256)'
 * ```
 *
 * @example
 * ```ts twoslash
 * import { AbiItem } from 'ox'
 *
 * const signature = AbiItem.getSignature({
 *   name: 'ownerOf',
 *   type: 'function',
 *   inputs: [{ name: 'tokenId', type: 'uint256' }],
 *   outputs: [],
 *   stateMutability: 'view',
 * })
 * // @log: 'ownerOf(uint256)'
 * ```
 *
 * @param abiItem - The ABI Item to compute the signature for.
 * @returns The stringified signature of the ABI Item.
 */
export function getSignature(abiItem: string | AbiItem): string {
  const signature = (() => {
    if (typeof abiItem === 'string') return abiItem
    return abitype.formatAbiItem(abiItem)
  })()
  return internal.normalizeSignature(signature)
}

export declare namespace getSignature {
  type ErrorType =
    | internal.normalizeSignature.ErrorType
    | Errors.GlobalErrorType
}

/* v8 ignore next */
getSignature.parseError = (error: unknown) => error as getSignature.ErrorType

/**
 * Computes the signature hash for an {@link ox#AbiItem.AbiItem}.
 *
 * Useful for computing Event Topic values.
 *
 * @example
 * ```ts twoslash
 * import { AbiItem } from 'ox'
 *
 * const hash = AbiItem.getSignatureHash('event Transfer(address indexed from, address indexed to, uint256 amount)')
 * // @log: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
 * ```
 *
 * @example
 * ```ts twoslash
 * import { AbiItem } from 'ox'
 *
 * const hash = AbiItem.getSignatureHash({
 *   name: 'Transfer',
 *   type: 'event',
 *   inputs: [
 *     { name: 'from', type: 'address', indexed: true },
 *     { name: 'to', type: 'address', indexed: true },
 *     { name: 'amount', type: 'uint256', indexed: false },
 *   ],
 * })
 * // @log: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
 * ```
 *
 * @param abiItem - The ABI Item to compute the signature hash for.
 * @returns The {@link ox#Hash.(keccak256:function)} hash of the ABI item's signature.
 */
export function getSignatureHash(abiItem: string | AbiItem): Hex.Hex {
  if (typeof abiItem !== 'string' && 'hash' in abiItem && abiItem.hash)
    return abiItem.hash as Hex.Hex
  return Hash.keccak256(Hex.fromString(getSignature(abiItem)))
}

export declare namespace getSignatureHash {
  type ErrorType =
    | getSignature.ErrorType
    | Hash.keccak256.ErrorType
    | Hex.fromString.ErrorType
    | Errors.GlobalErrorType
}

getSignatureHash.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as getSignatureHash.ErrorType

/**
 * Throws when ambiguous types are found on overloaded ABI items.
 *
 * @example
 * ```ts twoslash
 * import { Abi, AbiFunction } from 'ox'
 *
 * const foo = Abi.from(['function foo(address)', 'function foo(bytes20)'])
 * AbiFunction.fromAbi(foo, 'foo', {
 *   args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'],
 * })
 * // @error: AbiItem.AmbiguityError: Found ambiguous types in overloaded ABI Items.
 * // @error: `bytes20` in `foo(bytes20)`, and
 * // @error: `address` in `foo(address)`
 * // @error: These types encode differently and cannot be distinguished at runtime.
 * // @error: Remove one of the ambiguous items in the ABI.
 * ```
 *
 * ### Solution
 *
 * Remove one of the ambiguous types from the ABI.
 *
 * ```ts twoslash
 * import { Abi, AbiFunction } from 'ox'
 *
 * const foo = Abi.from([
 *   'function foo(address)',
 *   'function foo(bytes20)' // [!code --]
 * ])
 * AbiFunction.fromAbi(foo, 'foo', {
 *   args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'],
 * })
 * // @error: AbiItem.AmbiguityError: Found ambiguous types in overloaded ABI Items.
 * // @error: `bytes20` in `foo(bytes20)`, and
 * // @error: `address` in `foo(address)`
 * // @error: These types encode differently and cannot be distinguished at runtime.
 * // @error: Remove one of the ambiguous items in the ABI.
 * ```
 */
export class AmbiguityError extends Errors.BaseError {
  override readonly name = 'AbiItem.AmbiguityError'
  constructor(
    x: { abiItem: Abi.Abi[number]; type: string },
    y: { abiItem: Abi.Abi[number]; type: string },
  ) {
    super('Found ambiguous types in overloaded ABI Items.', {
      metaMessages: [
        // TODO: abitype to add support for signature-formatted ABI items.
        `\`${x.type}\` in \`${internal.normalizeSignature(abitype.formatAbiItem(x.abiItem))}\`, and`,
        `\`${y.type}\` in \`${internal.normalizeSignature(abitype.formatAbiItem(y.abiItem))}\``,
        '',
        'These types encode differently and cannot be distinguished at runtime.',
        'Remove one of the ambiguous items in the ABI.',
      ],
    })
  }
}

/**
 * Throws when an ABI item is not found in the ABI.
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Abi, AbiFunction } from 'ox'
 *
 * const foo = Abi.from([
 *   'function foo(address)',
 *   'function bar(uint)'
 * ])
 * AbiFunction.fromAbi(foo, 'baz')
 * // @error: AbiItem.NotFoundError: ABI function with name "baz" not found.
 * ```
 *
 * ### Solution
 *
 * Ensure the ABI item exists on the ABI.
 *
 * ```ts twoslash
 * // @noErrors
 * import { Abi, AbiFunction } from 'ox'
 *
 * const foo = Abi.from([
 *   'function foo(address)',
 *   'function bar(uint)',
 *   'function baz(bool)' // [!code ++]
 * ])
 * AbiFunction.fromAbi(foo, 'baz')
 * ```
 */
export class NotFoundError extends Errors.BaseError {
  override readonly name = 'AbiItem.NotFoundError'
  constructor({
    name,
    data,
    type = 'item',
  }: {
    name?: string | undefined
    data?: Hex.Hex | undefined
    type?: string | undefined
  }) {
    const selector = (() => {
      if (name) return ` with name "${name}"`
      if (data) return ` with data "${data}"`
      return ''
    })()
    super(`ABI ${type}${selector} not found.`)
  }
}

/**
 * Throws when the selector size is invalid.
 *
 * @example
 * ```ts twoslash
 * import { Abi, AbiFunction } from 'ox'
 *
 * const foo = Abi.from([
 *   'function foo(address)',
 *   'function bar(uint)'
 * ])
 * AbiFunction.fromAbi(foo, '0xaaa')
 * // @error: AbiItem.InvalidSelectorSizeError: Selector size is invalid. Expected 4 bytes. Received 2 bytes ("0xaaa").
 * ```
 *
 * ### Solution
 *
 * Ensure the selector size is 4 bytes.
 *
 * ```ts twoslash
 * // @noErrors
 * import { Abi, AbiFunction } from 'ox'
 *
 * const foo = Abi.from([
 *   'function foo(address)',
 *   'function bar(uint)'
 * ])
 * AbiFunction.fromAbi(foo, '0x7af82b1a')
 * ```
 */
export class InvalidSelectorSizeError extends Errors.BaseError {
  override readonly name = 'AbiItem.InvalidSelectorSizeError'
  constructor({ data }: { data: Hex.Hex }) {
    super(
      `Selector size is invalid. Expected 4 bytes. Received ${Hex.size(data)} bytes ("${data}").`,
    )
  }
}
