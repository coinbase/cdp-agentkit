import type * as Address from './Address.js'
import type * as Block from './Block.js'
import type * as Errors from './Errors.js'
import * as Hex from './Hex.js'
import type { Compute } from './internal/types.js'

/** A Filter as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/filter.yaml). */
export type Filter<bigintType = bigint> = Compute<{
  /** Address to filter for logs. */
  address?: Address.Address | readonly Address.Address[] | null | undefined
  /** Block number or tag to filter logs from. */
  fromBlock?: Block.Number<bigintType> | Block.Tag | undefined
  /** Block number or tag to filter logs to. */
  toBlock?: Block.Number<bigintType> | Block.Tag | undefined
  /** Topics to filter for logs. */
  topics?: Topics | undefined
}>

/** RPC representation of a {@link ox#Filter.Filter}. */
export type Rpc = Filter<Hex.Hex>

/** Set of Filter topics. */
export type Topics = readonly Topic[]

/**
 * A filter topic.
 *
 * - `null`: Matches any topic.
 * - `Hex`: Matches if the topic is equal.
 * - `Hex[]`: Matches if the topic is in the array.
 */
export type Topic = Hex.Hex | readonly Hex.Hex[] | null

/**
 * Converts a {@link ox#Filter.Rpc} to an {@link ox#Filter.Filter}.
 *
 * @example
 * ```ts twoslash
 * import { Filter } from 'ox'
 *
 * const filter = Filter.fromRpc({
 *   address: '0xd3cda913deb6f67967b99d671a681250403edf27',
 *   fromBlock: 'latest',
 *   toBlock: '0x010f2c',
 *   topics: [
 *     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
 *     null,
 *     '0x0000000000000000000000000c04d9e9278ec5e4d424476d3ebec70cb5d648d1',
 *   ],
 * })
 * // @log: {
 * // @log:   address: '0xd3cda913deb6f67967b99d671a681250403edf27',
 * // @log:   fromBlock: 'latest',
 * // @log:   toBlock: 69420n,
 * // @log:   topics: [
 * // @log:     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
 * // @log:     null,
 * // @log:     '0x0000000000000000000000000c04d9e9278ec5e4d424476d3ebec70cb5d648d1',
 * // @log:   ],
 * // @log: }
 * ```
 *
 * @param filter - The RPC filter to convert.
 * @returns An instantiated {@link ox#Filter.Filter}.
 */
export function fromRpc(filter: Rpc): Filter {
  const { fromBlock, toBlock } = filter
  return {
    ...filter,
    ...(fromBlock && {
      fromBlock: Hex.validate(fromBlock, { strict: false })
        ? BigInt(fromBlock)
        : fromBlock,
    }),
    ...(toBlock && {
      toBlock: Hex.validate(toBlock, { strict: false })
        ? BigInt(toBlock)
        : toBlock,
    }),
  } as Filter
}

export declare namespace fromRpc {
  type ErrorType = Errors.GlobalErrorType
}

fromRpc.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromRpc.ErrorType

/**
 * Converts a {@link ox#Filter.Filter} to a {@link ox#Filter.Rpc}.
 *
 * @example
 * ```ts twoslash
 * import { AbiEvent, Filter } from 'ox'
 *
 * const transfer = AbiEvent.from('event Transfer(address indexed, address indexed, uint256)')
 * const { topics } = AbiEvent.encode(transfer)
 *
 * const filter = Filter.toRpc({
 *   address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2',
 *   topics,
 * })
 * // @log: {
 * // @log:   address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2',
 * // @log:   topics: [
 * // @log:     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
 * // @log:   ],
 * // @log: }
 * ```
 *
 * @param filter - The filter to convert.
 * @returns An RPC filter.
 */
export function toRpc(filter: Filter): Rpc {
  const { address, topics, fromBlock, toBlock } = filter
  return {
    ...(address && { address }),
    ...(topics && { topics }),
    ...(typeof fromBlock !== 'undefined'
      ? {
          fromBlock:
            typeof fromBlock === 'bigint'
              ? Hex.fromNumber(fromBlock)
              : fromBlock,
        }
      : {}),
    ...(typeof toBlock !== 'undefined'
      ? {
          toBlock:
            typeof toBlock === 'bigint' ? Hex.fromNumber(toBlock) : toBlock,
        }
      : {}),
  }
}

export declare namespace toRpc {
  type ErrorType = Errors.GlobalErrorType
}

toRpc.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toRpc.ErrorType
