import type * as Address from './Address.js'
import type * as Errors from './Errors.js'
import * as Hex from './Hex.js'
import type { Compute } from './internal/types.js'

/** A Log as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/receipt.yaml). */
export type Log<
  pending extends boolean = false,
  bigintType = bigint,
  numberType = number,
> = Compute<{
  /** The address from which this log originated */
  address: Address.Address
  /** Hash of block containing this log or `null` if pending */
  blockHash: pending extends true ? null : Hex.Hex
  /** Number of block containing this log or `null` if pending */
  blockNumber: pending extends true ? null : bigintType
  /** Contains the non-integered arguments of the log */
  data: Hex.Hex
  /** Index of this log within its block or `null` if pending */
  logIndex: pending extends true ? null : numberType
  /** List of topics associated with this log */
  topics: [Hex.Hex, ...(readonly Hex.Hex[])]
  /** Hash of the transaction that created this log or `null` if pending */
  transactionHash: pending extends true ? null : Hex.Hex
  /** Index of the transaction that created this log or `null` if pending */
  transactionIndex: pending extends true ? null : numberType
  /** `true` if this filter has been destroyed and is invalid */
  removed: boolean
}>

/** An RPC Log as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/receipt.yaml). */
export type Rpc<pending extends boolean = false> = Log<
  pending,
  Hex.Hex,
  Hex.Hex
>

/**
 * Converts a {@link ox#Log.Rpc} to an {@link ox#Log.Log}.
 *
 * @example
 * ```ts twoslash
 * import { Log } from 'ox'
 *
 * const log = Log.fromRpc({
 *   address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2',
 *   topics: [
 *     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
 *     '0x0000000000000000000000000000000000000000000000000000000000000000',
 *     '0x0000000000000000000000000c04d9e9278ec5e4d424476d3ebec70cb5d648d1',
 *     '0x000000000000000000000000000000000000000000000000000000000000025b',
 *   ],
 *   data: '0x',
 *   blockHash:
 *     '0xabe69134e80a12f6a93d0aa18215b5b86c2fb338bae911790ca374a8716e01a4',
 *   blockNumber: '0x12d846c',
 *   transactionHash:
 *     '0xcfa52db0bc2cb5bdcb2c5bd8816df7a2f018a0e3964ab1ef4d794cf327966e93',
 *   transactionIndex: '0x91',
 *   logIndex: '0x10f',
 *   removed: false,
 * })
 * // @log: {
 * // @log:   address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2',
 * // @log:   blockHash: '0xabe69134e80a12f6a93d0aa18215b5b86c2fb338bae911790ca374a8716e01a4',
 * // @log:   blockNumber: 19760236n,
 * // @log:   data: '0x',
 * // @log:   logIndex: 271,
 * // @log:   removed: false,
 * // @log:   topics: [
 * // @log:     "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
 * // @log:     "0x0000000000000000000000000000000000000000000000000000000000000000",
 * // @log:     "0x0000000000000000000000000c04d9e9278ec5e4d424476d3ebec70cb5d648d1",
 * // @log:     "0x000000000000000000000000000000000000000000000000000000000000025b",
 * // @log:   transactionHash:
 * // @log:     '0xcfa52db0bc2cb5bdcb2c5bd8816df7a2f018a0e3964ab1ef4d794cf327966e93',
 * // @log:   transactionIndex: 145,
 * // @log: }
 * ```
 *
 * @example
 * ### End-to-end
 *
 * Below is an example of how to use `Log.fromRpc` to instantiate a {@link ox#Log.Log} from an RPC log.
 *
 * ```ts twoslash
 * import 'ox/window'
 * import { AbiEvent, Hex, Log } from 'ox'
 *
 * const transfer = AbiEvent.from(
 *   'event Transfer(address indexed from, address indexed to, uint256 indexed value)',
 * )
 *
 * const { topics } = AbiEvent.encode(transfer)
 *
 * const logs = await window.ethereum!.request({
 *   method: 'eth_getLogs',
 *   params: [
 *     {
 *       address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2',
 *       fromBlock: Hex.fromNumber(19760235n),
 *       toBlock: Hex.fromNumber(19760240n),
 *       topics,
 *     },
 *   ],
 * })
 *
 * const log = Log.fromRpc(logs[0]) // [!code focus]
 * // @log: {
 * // @log:   address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2',
 * // @log:   blockHash: '0xabe69134e80a12f6a93d0aa18215b5b86c2fb338bae911790ca374a8716e01a4',
 * // @log:   blockNumber: 19760236n,
 * // @log:   data: '0x',
 * // @log:   logIndex: 271,
 * // @log:   removed: false,
 * // @log:   topics: [
 * // @log:     "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
 * // @log:     "0x0000000000000000000000000000000000000000000000000000000000000000",
 * // @log:     "0x0000000000000000000000000c04d9e9278ec5e4d424476d3ebec70cb5d648d1",
 * // @log:     "0x000000000000000000000000000000000000000000000000000000000000025b",
 * // @log:   transactionHash:
 * // @log:     '0xcfa52db0bc2cb5bdcb2c5bd8816df7a2f018a0e3964ab1ef4d794cf327966e93',
 * // @log:   transactionIndex: 145,
 * // @log: }
 * ```
 *
 * :::note
 *
 * For simplicity, the above example uses `window.ethereum.request`, but you can use any
 * type of JSON-RPC interface.
 *
 * :::
 *
 * @param log - The RPC log to convert.
 * @returns An instantiated {@link ox#Log.Log}.
 */
export function fromRpc<
  const log extends Rpc<boolean>,
  pending extends boolean = false,
>(
  log: log | Rpc<boolean>,
  _options: fromRpc.Options<pending> = {},
): Log<pending> {
  return {
    ...log,
    blockNumber: log.blockNumber ? BigInt(log.blockNumber) : null,
    logIndex: log.logIndex ? Number(log.logIndex) : null,
    transactionIndex: log.transactionIndex
      ? Number(log.transactionIndex)
      : null,
  } as Log<pending>
}

export declare namespace fromRpc {
  type Options<pending extends boolean = false> = {
    pending?: pending | boolean | undefined
  }

  type ErrorType = Errors.GlobalErrorType
}

fromRpc.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromRpc.ErrorType

/**
 * Converts a {@link ox#Log.Log} to a {@link ox#Log.Rpc}.
 *
 * @example
 * ```ts twoslash
 * import { Log } from 'ox'
 *
 * const log = Log.toRpc({
 *   address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2',
 *   blockHash:
 *     '0xabe69134e80a12f6a93d0aa18215b5b86c2fb338bae911790ca374a8716e01a4',
 *   blockNumber: 19760236n,
 *   data: '0x',
 *   logIndex: 271,
 *   removed: false,
 *   topics: [
 *     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
 *     '0x0000000000000000000000000000000000000000000000000000000000000000',
 *     '0x0000000000000000000000000c04d9e9278ec5e4d424476d3ebec70cb5d648d1',
 *     '0x000000000000000000000000000000000000000000000000000000000000025b',
 *   ],
 *   transactionHash:
 *     '0xcfa52db0bc2cb5bdcb2c5bd8816df7a2f018a0e3964ab1ef4d794cf327966e93',
 *   transactionIndex: 145,
 * })
 * // @log: {
 * // @log:   address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2',
 * // @log:   blockHash: '0xabe69134e80a12f6a93d0aa18215b5b86c2fb338bae911790ca374a8716e01a4',
 * // @log:   blockNumber: '0x012d846c',
 * // @log:   data: '0x',
 * // @log:   logIndex: '0x010f',
 * // @log:   removed: false,
 * // @log:   topics: [
 * // @log:     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
 * // @log:     '0x0000000000000000000000000000000000000000000000000000000000000000',
 * // @log:     '0x0000000000000000000000000c04d9e9278ec5e4d424476d3ebec70cb5d648d1',
 * // @log:     '0x000000000000000000000000000000000000000000000000000000000000025b',
 * // @log:   ],
 * // @log:   transactionHash:
 * // @log:     '0xcfa52db0bc2cb5bdcb2c5bd8816df7a2f018a0e3964ab1ef4d794cf327966e93',
 * // @log:   transactionIndex: '0x91',
 * // @log: }
 * ```
 *
 * @param log - The log to convert.
 * @returns An RPC log.
 */
export function toRpc<
  const log extends Log<boolean>,
  pending extends boolean = false,
>(log: log, _options: toRpc.Options<pending> = {}): Rpc<pending> {
  return {
    address: log.address,
    blockHash: log.blockHash,
    blockNumber:
      typeof log.blockNumber === 'bigint'
        ? Hex.fromNumber(log.blockNumber)
        : null,
    data: log.data,
    logIndex:
      typeof log.logIndex === 'number' ? Hex.fromNumber(log.logIndex) : null,
    topics: log.topics,
    transactionHash: log.transactionHash,
    transactionIndex:
      typeof log.transactionIndex === 'number'
        ? Hex.fromNumber(log.transactionIndex)
        : null,
    removed: log.removed,
  } as Rpc as never
}

export declare namespace toRpc {
  type Options<pending extends boolean = false> = {
    pending?: pending | boolean | undefined
  }

  type ErrorType = Errors.GlobalErrorType
}

toRpc.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toRpc.ErrorType
