import type * as AccountProof from '../../AccountProof.js'
import type * as Address from '../../Address.js'
import type * as Block from '../../Block.js'
import type * as Fee from '../../Fee.js'
import type * as Filter from '../../Filter.js'
import type * as Hex from '../../Hex.js'
import type * as Log from '../../Log.js'
import type * as RpcSchema from '../../RpcSchema.js'
import type * as Transaction from '../../Transaction.js'
import type * as TransactionReceipt from '../../TransactionReceipt.js'
import type * as TransactionRequest from '../../TransactionRequest.js'

/**
 * Union of all JSON-RPC Methods for the `eth_` namespace.
 *
 * @example
 * ```ts twoslash
 * import { RpcSchema } from 'ox'
 *
 * type Schema = RpcSchema.Eth
 * //   ^?
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
 */
export type Eth = RpcSchema.From<
  /**
   * Returns a list of addresses owned by this client
   *
   * @example
   * ```
   * request({ method: 'eth_accounts' })
   * // => ['0x0fB69...']
   * ```
   */
  | {
      Request: {
        method: 'eth_accounts'
        params?: undefined
      }
      ReturnType: readonly Address.Address[]
    }
  /**
   * Returns the base fee per blob gas in wei.
   *
   * @example
   * ```
   * request({ method: 'eth_blobBaseFee' })
   * // '0x09184e72a000'
   * ```
   */
  | {
      Request: {
        method: 'eth_blobBaseFee'
        params?: undefined
      }
      ReturnType: Hex.Hex
    }
  /**
   * Returns the number of the most recent block seen by this client
   *
   * @example
   * ```
   * request({ method: 'eth_blockNumber' })
   * // '0x1b4'
   * ```
   */
  | {
      Request: {
        method: 'eth_blockNumber'
        params?: undefined
      }
      ReturnType: Hex.Hex
    }
  /**
   * Executes a new message call immediately without submitting a transaction to the network
   *
   * ```
   * request({ method: 'eth_call', params: [{ to: '0x...', data: '0x...' }] })
   * // '0x...'
   * ```
   */
  | {
      Request: {
        method: 'eth_call'
        params:
          | [transaction: TransactionRequest.Rpc]
          | [
              transaction: TransactionRequest.Rpc,
              block: Block.Number<Hex.Hex> | Block.Tag | Block.Hash,
            ]
          | [
              transaction: TransactionRequest.Rpc,
              block: Block.Number<Hex.Hex> | Block.Tag | Block.Hash,
              // TODO: add type
              stateOverride: unknown,
            ]
      }
      ReturnType: Hex.Hex
    }
  /**
   * Returns the chain ID associated with the current network
   *
   * @example
   * ```
   * request({ method: 'eth_chainId' })
   * // => '0x1'
   * ```
   */
  | {
      Request: {
        method: 'eth_chainId'
        params?: undefined
      }
      ReturnType: Hex.Hex
    }
  /**
   * Returns the client coinbase address.
   *
   * @example
   * ```
   * request({ method: 'eth_coinbase' })
   * // '0x...'
   * ```
   */
  | {
      Request: {
        method: 'eth_coinbase'
        params?: undefined
      }
      ReturnType: Address.Address
    }
  /**
   * Estimates the gas necessary to complete a transaction without submitting it to the network
   *
   * @example
   * ```
   * request({
   *  method: 'eth_estimateGas',
   *  params: [{ from: '0x...', to: '0x...', value: '0x...' }]
   * })
   * // '0x5208'
   * ```
   */
  | {
      Request: {
        method: 'eth_estimateGas'
        params:
          | [transaction: TransactionRequest.Rpc]
          | [
              transaction: TransactionRequest.Rpc,
              block: Block.Number<Hex.Hex> | Block.Tag | Block.Hash,
            ]
          | [
              transaction: TransactionRequest.Rpc,
              block: Block.Number<Hex.Hex> | Block.Tag | Block.Hash,
              // TODO: add type
              stateOverride: unknown,
            ]
      }
      ReturnType: Hex.Hex
    }
  /**
   * Returns a collection of historical gas information
   *
   * ```
   * request({
   *  method: 'eth_feeHistory',
   *  params: ['4', 'latest', ['25', '75']]
   * })
   * // {
   * //   oldestBlock: '0x1',
   * //   baseFeePerGas: ['0x1', '0x2', '0x3', '0x4'],
   * //   gasUsedRatio: ['0x1', '0x2', '0x3', '0x4'],
   * //   reward: [['0x1', '0x2'], ['0x3', '0x4'], ['0x5', '0x6'], ['0x7', '0x8']]
   * // }
   * ```
   * */
  | {
      Request: {
        method: 'eth_feeHistory'
        params: [
          /** Number of blocks in the requested range. Between 1 and 1024 blocks can be requested in a single query. Less than requested may be returned if not all blocks are available. */
          blockCount: Hex.Hex,
          /** Highest number block of the requested range. */
          newestBlock: Block.Number<Hex.Hex> | Block.Tag,
          /** A monotonically increasing list of percentile values to sample from each block's effective priority fees per gas in ascending order, weighted by gas used. */
          rewardPercentiles: number[] | undefined,
        ]
      }
      ReturnType: Fee.FeeHistoryRpc
    }
  /**
   * Returns the current price of gas expressed in wei
   *
   * ```
   * request({ method: 'eth_gasPrice' })
   * // '0x09184e72a000'
   * ```
   */
  | {
      Request: {
        method: 'eth_gasPrice'
        params?: undefined
      }
      ReturnType: Hex.Hex
    }
  /**
   * Returns the balance of an address in wei
   *
   * @example
   * ```
   * request({ method: 'eth_getBalance', params: ['0x...', 'latest'] })
   * // => '0x12a05...'
   * ```
   */
  | {
      Request: {
        method: 'eth_getBalance'
        params: [
          address: Address.Address,
          block: Block.Number<Hex.Hex> | Block.Tag | Block.Hash,
        ]
      }
      ReturnType: Hex.Hex
    }
  /**
   * Returns information about a block specified by hash
   *
   * ```
   * request({ method: 'eth_getBlockByHash', params: ['0x...', true] })
   * // {
   * //   number: '0x1b4',
   * //   hash: '0x...',
   * //   parentHash: '0x...',
   * //   ...
   * // }
   * ```
   */
  | {
      Request: {
        method: 'eth_getBlockByHash'
        params: [
          /** hash of a block */
          hash: Hex.Hex,
          /** true will pull full transaction objects, false will pull transaction hashes */
          includeTransactionObjects: boolean,
        ]
      }
      ReturnType: Block.Rpc | null
    }
  /**
   * Returns information about a block specified by number
   *
   * @example
   * ```
   * request({ method: 'eth_getBlockByNumber', params: ['0x1b4', true] })
   * // {
   * //   number: '0x1b4',
   * //   hash: '0x...',
   * //   parentHash: '0x...',
   * //   ...
   * // }
   * ```
   */
  | {
      Request: {
        method: 'eth_getBlockByNumber'
        params: [
          /** block number, or one of "latest", "safe", "finalized", "earliest" or "pending" */
          block: Block.Number<Hex.Hex> | Block.Tag,
          /** true will pull full transaction objects, false will pull transaction hashes */
          includeTransactionObjects: boolean,
        ]
      }
      ReturnType: Block.Rpc | null
    }
  /**
   * Returns the number of transactions in a block specified by block hash
   *
   * ```
   * request({ method: 'eth_getBlockTransactionCountByHash', params: ['0x...'] })
   * // '0x1'
   * ```
   */
  | {
      Request: {
        method: 'eth_getBlockTransactionCountByHash'
        params: [hash: Hex.Hex]
      }
      ReturnType: Hex.Hex
    }
  /**
   * Returns the number of transactions in a block specified by block number
   *
   * ```
   * request({ method: 'eth_getBlockTransactionCountByNumber', params: ['0x1b4'] })
   * // '0x1'
   * ```
   */
  | {
      Request: {
        method: 'eth_getBlockTransactionCountByNumber'
        params: [block: Block.Number<Hex.Hex> | Block.Tag]
      }
      ReturnType: Hex.Hex
    }
  /**
   * Returns the contract code stored at a given address
   *
   * @example
   * ```
   * request({ method: 'eth_getCode', params: ['0x...', 'latest'] })
   * // '0x...'
   * ```
   */
  | {
      Request: {
        method: 'eth_getCode'
        params: [
          address: Address.Address,
          block: Block.Number<Hex.Hex> | Block.Tag | Block.Hash,
        ]
      }
      ReturnType: Hex.Hex
    }
  /**
   * Returns a list of all logs based on filter ID since the last log retrieval
   *
   * @example
   * ```
   * request({ method: 'eth_getFilterChanges', params: ['0x...'] })
   * // => [{ ... }| { ... }]
   * ```
   */
  | {
      Request: {
        method: 'eth_getFilterChanges'
        params: [filterId: Hex.Hex]
      }
      ReturnType: readonly Log.Rpc[] | readonly Hex.Hex[]
    }
  /**
   * Returns a list of all logs based on filter ID
   *
   * @example
   * ```
   * request({ method: 'eth_getFilterLogs', params: ['0x...'] })
   * // => [{ ... }| { ... }]
   * ```
   */
  | {
      Request: {
        method: 'eth_getFilterLogs'
        params: [filterId: Hex.Hex]
      }
      ReturnType: readonly Log.Rpc[]
    }
  /**
   * Returns a list of all logs based on a filter object
   *
   * @example
   * ```
   * request({ method: 'eth_getLogs', params: [{ fromBlock: '0x...', toBlock: '0x...', address: '0x...', topics: ['0x...'] }] })
   * // => [{ ... }| { ... }]
   * ```
   */
  | {
      Request: {
        method: 'eth_getLogs'
        params: [filter: Filter.Rpc]
      }
      ReturnType: readonly Log.Rpc[]
    }
  /**
   * Returns the account and storage values of the specified account including the Merkle-proof.
   *
   * @example
   * ```
   * request({ method: 'eth_getProof', params: ['0x...', ['0x...'], 'latest'] })
   * // {
   * //   ...
   * // }
   * ```
   */
  | {
      Request: {
        method: 'eth_getProof'
        params: [
          /** Address of the account. */
          address: Address.Address,
          /** An array of storage-keys that should be proofed and included. */
          storageKeys: Hex.Hex[],
          /** Block identifier to pull the proof from. */
          block: Block.Number<Hex.Hex> | Block.Tag | Block.Hash,
        ]
      }
      ReturnType: AccountProof.Rpc
    }
  /**
   * Returns the value from a storage position at an address
   *
   * @example
   * ```
   * request({ method: 'eth_getStorageAt', params: ['0x...', '0x...', 'latest'] })
   * // '0x...'
   * ```
   */
  | {
      Request: {
        method: 'eth_getStorageAt'
        params: [
          address: Address.Address,
          index: Hex.Hex,
          block: Block.Number<Hex.Hex> | Block.Tag | Block.Hash,
        ]
      }
      ReturnType: Hex.Hex
    }
  /**
   * Returns information about a transaction specified by block hash and transaction index
   *
   * @example
   * ```
   * request({ method: 'eth_getTransactionByBlockHashAndIndex', params: ['0x...', '0x...'] })
   * // { ... }
   * ```
   */
  | {
      Request: {
        method: 'eth_getTransactionByBlockHashAndIndex'
        params: [hash: Hex.Hex, index: Hex.Hex]
      }
      ReturnType: Transaction.Rpc | null
    }
  /**
   * Returns information about a transaction specified by block number and transaction index
   *
   * @example
   * ```
   * request({ method: 'eth_getTransactionByBlockNumberAndIndex', params: ['0x...', '0x...'] })
   * // { ... }
   * ```
   */
  | {
      Request: {
        method: 'eth_getTransactionByBlockNumberAndIndex'
        params: [block: Block.Number<Hex.Hex> | Block.Tag, index: Hex.Hex]
      }
      ReturnType: Transaction.Rpc | null
    }
  /**
   * Returns information about a transaction specified by hash
   *
   * @example
   * ```
   * request({ method: 'eth_getTransactionByHash', params: ['0x...'] })
   * // { ... }
   * ```
   */
  | {
      Request: {
        method: 'eth_getTransactionByHash'
        params: [hash: Hex.Hex]
      }
      ReturnType: Transaction.Rpc | null
    }
  /**
   * Returns the number of transactions sent from an address
   *
   * @example
   * ```
   * request({ method: 'eth_getTransactionCount', params: ['0x...', 'latest'] })
   * // '0x1'
   * ```
   */
  | {
      Request: {
        method: 'eth_getTransactionCount'
        params: [
          address: Address.Address,
          block: Block.Number<Hex.Hex> | Block.Tag | Block.Hash,
        ]
      }
      ReturnType: Hex.Hex
    }
  /**
   * Returns the receipt of a transaction specified by hash
   *
   * @example
   * ```
   * request({ method: 'eth_getTransactionReceipt', params: ['0x...'] })
   * // { ... }
   * ```
   */
  | {
      Request: {
        method: 'eth_getTransactionReceipt'
        params: [hash: Hex.Hex]
      }
      ReturnType: TransactionReceipt.Rpc | null
    }
  /**
   * Returns the number of uncles in a block specified by block hash
   *
   * @example
   * ```
   * request({ method: 'eth_getUncleCountByBlockHash', params: ['0x...'] })
   * // => '0x1'
   * ```
   */
  | {
      Request: {
        method: 'eth_getUncleCountByBlockHash'
        params: [hash: Hex.Hex]
      }
      ReturnType: Hex.Hex
    }
  /**
   * Returns the number of uncles in a block specified by block number
   *
   * @example
   * ```
   * request({ method: 'eth_getUncleCountByBlockNumber', params: ['0x...'] })
   * // '0x1'
   * ```
   */
  | {
      Request: {
        method: 'eth_getUncleCountByBlockNumber'
        params: [block: Block.Number<Hex.Hex> | Block.Tag]
      }
      ReturnType: Hex.Hex
    }
  /**
   * Returns the current maxPriorityFeePerGas in wei.
   *
   * @example
   * ```
   * request({ method: 'eth_maxPriorityFeePerGas' })
   * // => '0x5f5e100'
   * ```
   */
  | {
      Request: {
        method: 'eth_maxPriorityFeePerGas'
        params?: undefined
      }
      ReturnType: Hex.Hex
    }
  /**
   * Creates a filter to listen for new blocks that can be used with `eth_getFilterChanges`
   *
   * @example
   * ```
   * request({ method: 'eth_newBlockFilter' })
   * // => '0x1'
   * ```
   */
  | {
      Request: {
        method: 'eth_newBlockFilter'
        params?: undefined
      }
      ReturnType: Hex.Hex
    }
  /**
   * Creates a filter to listen for specific state changes that can then be used with `eth_getFilterChanges`
   *
   * @example
   * ```
   * request({ method: 'eth_newFilter', params: [{ fromBlock: '0x...', toBlock: '0x...', address: '0x...', topics: ['0x...'] }] })
   * // => '0x1'
   * ```
   */
  | {
      Request: {
        method: 'eth_newFilter'
        params: [filter: Filter.Rpc]
      }
      ReturnType: Hex.Hex
    }
  /**
   * Creates a filter to listen for new pending transactions that can be used with `eth_getFilterChanges`
   *
   * @example
   * ```
   * request({ method: 'eth_newPendingTransactionFilter' })
   * // '0x1'
   * ```
   */
  | {
      Request: {
        method: 'eth_newPendingTransactionFilter'
        params?: undefined
      }
      ReturnType: Hex.Hex
    }
  /**
   * Returns the current Ethereum protocol version
   *
   * @example
   * ```
   * request({ method: 'eth_protocolVersion' })
   * // '54'
   * ```
   */
  | {
      Request: {
        method: 'eth_protocolVersion'
        params?: undefined
      }
      ReturnType: string
    }
  /**
   * Requests that the user provides an Ethereum address to be identified by. Typically causes a browser extension popup to appear.
   *
   * @example
   * ```
   * request({ method: 'eth_requestAccounts' })
   * // => ['0x...', '0x...']
   * ```
   */
  | {
      Request: {
        method: 'eth_requestAccounts'
        params?: undefined
      }
      ReturnType: readonly Address.Address[]
    }
  /**
   * Sends a **signed** transaction to the network
   *
   * @example
   * ```
   * request({ method: 'eth_sendRawTransaction', params: ['0x...'] })
   * // => '0x...'
   * ```
   */
  | {
      Request: {
        method: 'eth_sendRawTransaction'
        params: [serializedTransaction: Hex.Hex]
      }
      ReturnType: Hex.Hex
    }
  /**
   * Creates, signs, and sends a new transaction to the network
   *
   * @example
   * ```
   * request({ method: 'eth_sendTransaction', params: [{ from: '0x...', to: '0x...', value: '0x...' }] })
   * // '0x...'
   * ```
   */
  | {
      Request: {
        method: 'eth_sendTransaction'
        params: [transaction: TransactionRequest.Rpc]
      }
      ReturnType: Hex.Hex
    }
  /**
   * Signs a transaction that can be submitted to the network at a later time using with `eth_sendRawTransaction`
   *
   * @example
   * ```
   * request({ method: 'eth_signTransaction', params: [{ from: '0x...', to: '0x...', value: '0x...' }] })
   * // '0x...'
   * ```
   */
  | {
      Request: {
        method: 'eth_signTransaction'
        params: [request: TransactionRequest.Rpc]
      }
      ReturnType: Hex.Hex
    }
  /**
   * Calculates an Ethereum-specific signature in the form of `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`
   *
   * @example
   * ```
   * request({ method: 'eth_signTypedData_v4', params: [{ from: '0x...', data: [{ type: 'string', name: 'message', value: 'hello world' }] }] })
   * // '0x...'
   * ```
   */
  | {
      Request: {
        method: 'eth_signTypedData_v4'
        params: [
          /** Address to use for signing */
          address: Address.Address,
          /** Message to sign containing type information, a domain separator, and data */
          message: string,
        ]
      }
      ReturnType: Hex.Hex
    }
  /**
   * Destroys a filter based on filter ID
   *
   * @example
   * ```
   * request({ method: 'eth_uninstallFilter', params: ['0x1'] })
   * // true
   * ```
   */
  | {
      Request: {
        method: 'eth_uninstallFilter'
        params: [filterId: Hex.Hex]
      }
      ReturnType: boolean
    }
>
