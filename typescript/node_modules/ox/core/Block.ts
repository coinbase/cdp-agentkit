import type * as Address from './Address.js'
import type * as Errors from './Errors.js'
import * as Hex from './Hex.js'
import * as Transaction from './Transaction.js'
import * as Withdrawal from './Withdrawal.js'
import type { Compute } from './internal/types.js'

/** A Block as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/block.yaml). */
export type Block<
  includeTransactions extends boolean = false,
  blockTag extends Tag = 'latest',
  bigintType = bigint,
  numberType = number,
  transaction = Transaction.Transaction<
    blockTag extends 'pending' ? true : false,
    bigintType,
    numberType
  >,
> = Compute<{
  /** Base fee per gas */
  baseFeePerGas?: bigintType | undefined
  /** Total used blob gas by all transactions in this block */
  blobGasUsed?: bigintType | undefined
  /** Difficulty for this block */
  difficulty?: bigintType | undefined
  /** Excess blob gas */
  excessBlobGas?: bigintType | undefined
  /** "Extra data" field of this block */
  extraData?: Hex.Hex | undefined
  /** Maximum gas allowed in this block */
  gasLimit: bigintType
  /** Total used gas by all transactions in this block */
  gasUsed: bigintType
  /** Block hash or `null` if pending */
  hash: blockTag extends 'pending' ? null : Hex.Hex
  /** Logs bloom filter or `null` if pending */
  logsBloom: blockTag extends 'pending' ? null : Hex.Hex
  /** Address that received this block’s mining rewards */
  miner: Address.Address
  /** Unique identifier for the block. */
  mixHash: Hex.Hex
  /** Proof-of-work hash or `null` if pending */
  nonce: blockTag extends 'pending' ? null : Hex.Hex
  /** Block number or `null` if pending */
  number: blockTag extends 'pending' ? null : bigintType
  parentBeaconBlockRoot?: Hex.Hex | undefined
  /** Parent block hash */
  parentHash: Hex.Hex
  /** Root of the this block’s receipts trie */
  receiptsRoot: Hex.Hex
  sealFields?: readonly Hex.Hex[] | undefined
  /** SHA3 of the uncles data in this block */
  sha3Uncles: Hex.Hex
  /** Size of this block in bytes */
  size: bigintType
  /** Root of this block’s final state trie */
  stateRoot: Hex.Hex
  /** Unix timestamp of when this block was collated */
  timestamp: bigintType
  /** Total difficulty of the chain until this block */
  totalDifficulty?: bigintType | undefined
  /** List of transaction objects or hashes */
  transactions: includeTransactions extends true
    ? readonly transaction[]
    : readonly Hex.Hex[]
  /** Root of this block’s transaction trie */
  transactionsRoot: Hex.Hex
  /** List of uncle hashes */
  uncles: readonly Hex.Hex[]
  /** List of withdrawal objects */
  withdrawals?:
    | readonly Withdrawal.Withdrawal<bigintType, numberType>[]
    | undefined
  /** Root of the this block’s withdrawals trie */
  withdrawalsRoot?: Hex.Hex | undefined
}>

/** A Block hash. */
export type Hash = Hex.Hex

/** A Block number. */
export type Number<bigintType = bigint> = bigintType

/** An RPC Block as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/block.yaml). */
export type Rpc<
  includeTransactions extends boolean = boolean,
  blockTag extends Tag = 'latest',
  transaction = Transaction.Rpc<blockTag extends 'pending' ? true : false>,
> = Block<includeTransactions, blockTag, Hex.Hex, Hex.Hex, transaction>

/**
 * A Block Tag as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/block.yaml).
 *
 * - `earliest`: The lowest numbered block the client has available;
 * - `finalized`: The most recent crypto-economically secure block, cannot be re-orged outside of manual intervention driven by community coordination;
 * - `safe`: The most recent block that is safe from re-orgs under honest majority and certain synchronicity assumptions;
 * - `latest`: The most recent block in the canonical chain observed by the client, this block may be re-orged out of the canonical chain even under healthy/normal conditions;
 * - `pending`: A sample next block built by the client on top of `latest` and containing the set of transactions usually taken from local mempool.
 */
export type Tag = 'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'

/**
 * Converts a {@link ox#Block.Block} to an {@link ox#Block.Rpc}.
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Block } from 'ox'
 *
 * const block = Block.toRpc({
 *   // ...
 *   hash: '0xebc3644804e4040c0a74c5a5bbbc6b46a71a5d4010fe0c92ebb2fdf4a43ea5dd',
 *   number: 19868020n,
 *   size: 520n
 *   timestamp: 1662222222n,
 *   // ...
 * })
 * // @log: {
 * // @log:   // ...
 * // @log:   hash: '0xebc3644804e4040c0a74c5a5bbbc6b46a71a5d4010fe0c92ebb2fdf4a43ea5dd',
 * // @log:   number: '0xec6fc6',
 * // @log:   size: '0x208',
 * // @log:   timestamp: '0x63198f6f',
 * // @log:   // ...
 * // @log: }
 * ```
 *
 * @param block - The Block to convert.
 * @returns An RPC Block.
 */
export function toRpc<
  includeTransactions extends boolean = false,
  blockTag extends Tag = 'latest',
>(
  block: Block<includeTransactions, blockTag>,
  _options: toRpc.Options<includeTransactions, blockTag> = {},
): Rpc<boolean, blockTag> {
  const transactions = block.transactions.map((transaction) => {
    if (typeof transaction === 'string') return transaction
    return Transaction.toRpc(transaction as any) as any
  })
  return {
    baseFeePerGas:
      typeof block.baseFeePerGas === 'bigint'
        ? Hex.fromNumber(block.baseFeePerGas)
        : undefined,
    blobGasUsed:
      typeof block.blobGasUsed === 'bigint'
        ? Hex.fromNumber(block.blobGasUsed)
        : undefined,
    excessBlobGas:
      typeof block.excessBlobGas === 'bigint'
        ? Hex.fromNumber(block.excessBlobGas)
        : undefined,
    extraData: block.extraData,
    difficulty:
      typeof block.difficulty === 'bigint'
        ? Hex.fromNumber(block.difficulty)
        : undefined,
    gasLimit: Hex.fromNumber(block.gasLimit),
    gasUsed: Hex.fromNumber(block.gasUsed),
    hash: block.hash,
    logsBloom: block.logsBloom,
    miner: block.miner,
    mixHash: block.mixHash,
    nonce: block.nonce,
    number: (typeof block.number === 'bigint'
      ? Hex.fromNumber(block.number)
      : null) as never,
    parentBeaconBlockRoot: block.parentBeaconBlockRoot,
    parentHash: block.parentHash,
    receiptsRoot: block.receiptsRoot,
    sealFields: block.sealFields,
    sha3Uncles: block.sha3Uncles,
    size: Hex.fromNumber(block.size),
    stateRoot: block.stateRoot,
    timestamp: Hex.fromNumber(block.timestamp),
    totalDifficulty:
      typeof block.totalDifficulty === 'bigint'
        ? Hex.fromNumber(block.totalDifficulty)
        : undefined,
    transactions,
    transactionsRoot: block.transactionsRoot,
    uncles: block.uncles,
    withdrawals: block.withdrawals?.map(Withdrawal.toRpc),
    withdrawalsRoot: block.withdrawalsRoot,
  }
}

export declare namespace toRpc {
  type Options<
    includeTransactions extends boolean = false,
    blockTag extends Tag = 'latest',
  > = {
    blockTag?: blockTag | Tag | undefined
    includeTransactions?: includeTransactions | boolean | undefined
  }

  type ErrorType = Errors.GlobalErrorType
}

toRpc.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toRpc.ErrorType

/**
 * Converts a {@link ox#Block.Rpc} to an {@link ox#Block.Block}.
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Block } from 'ox'
 *
 * const block = Block.fromRpc({
 *   // ...
 *   hash: '0xebc3644804e4040c0a74c5a5bbbc6b46a71a5d4010fe0c92ebb2fdf4a43ea5dd',
 *   number: '0xec6fc6',
 *   size: '0x208',
 *   timestamp: '0x63198f6f',
 *   // ...
 * })
 * // @log: {
 * // @log:   // ...
 * // @log:   hash: '0xebc3644804e4040c0a74c5a5bbbc6b46a71a5d4010fe0c92ebb2fdf4a43ea5dd',
 * // @log:   number: 19868020n,
 * // @log:   size: 520n,
 * // @log:   timestamp: 1662222222n,
 * // @log:   // ...
 * // @log: }
 * ```
 *
 * @example
 * ### End-to-end
 *
 * Below is an end-to-end example of using `Block.fromRpc` to fetch a block from the network and convert it to an {@link ox#Block.Block}.
 *
 * ```ts twoslash
 * import 'ox/window'
 * import { Block } from 'ox'
 *
 * const block = await window.ethereum!
 *   .request({
 *     method: 'eth_getBlockByNumber',
 *     params: ['latest', false],
 *   })
 *   .then(Block.fromRpc) // [!code hl]
 * // @log: {
 * // @log:   // ...
 * // @log:   hash: '0xebc3644804e4040c0a74c5a5bbbc6b46a71a5d4010fe0c92ebb2fdf4a43ea5dd',
 * // @log:   number: 19868020n,
 * // @log:   size: 520n,
 * // @log:   timestamp: 1662222222n,
 * // @log:   // ...
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
 * @param block - The RPC block to convert.
 * @returns An instantiated {@link ox#Block.Block}.
 */
export function fromRpc<
  const block extends Rpc | null,
  includeTransactions extends boolean = false,
  blockTag extends Tag = 'latest',
>(
  block: block | Rpc | null,
  _options: fromRpc.Options<includeTransactions, blockTag> = {},
): block extends Rpc ? Block<includeTransactions, blockTag> : null {
  if (!block) return null as never

  const transactions = block.transactions.map((transaction) => {
    if (typeof transaction === 'string') return transaction
    return Transaction.fromRpc(transaction) as any
  })
  return {
    ...block,
    baseFeePerGas: block.baseFeePerGas
      ? BigInt(block.baseFeePerGas)
      : undefined,
    blobGasUsed: block.blobGasUsed ? BigInt(block.blobGasUsed) : undefined,
    difficulty: block.difficulty ? BigInt(block.difficulty) : undefined,
    excessBlobGas: block.excessBlobGas
      ? BigInt(block.excessBlobGas)
      : undefined,
    gasLimit: BigInt(block.gasLimit ?? 0n),
    gasUsed: BigInt(block.gasUsed ?? 0n),
    number: block.number ? BigInt(block.number) : null,
    size: BigInt(block.size ?? 0n),
    stateRoot: block.stateRoot,
    timestamp: BigInt(block.timestamp ?? 0n),
    totalDifficulty: BigInt(block.totalDifficulty ?? 0n),
    transactions,
    withdrawals: block.withdrawals?.map(Withdrawal.fromRpc),
  } as Block as never
}

export declare namespace fromRpc {
  type Options<
    includeTransactions extends boolean = false,
    blockTag extends Tag = 'latest',
  > = {
    blockTag?: blockTag | Tag | undefined
    includeTransactions?: includeTransactions | boolean | undefined
  }

  type ErrorType = Errors.GlobalErrorType
}

fromRpc.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromRpc.ErrorType
