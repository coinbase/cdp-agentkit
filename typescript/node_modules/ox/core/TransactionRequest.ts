import type * as AccessList from './AccessList.js'
import type * as Address from './Address.js'
import * as Authorization from './Authorization.js'
import type * as Errors from './Errors.js'
import * as Hex from './Hex.js'
import type { Compute } from './internal/types.js'

/** A Transaction Request that is generic to all transaction types, as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/4aca1d7a3e5aab24c8f6437131289ad386944eaa/src/schemas/transaction.yaml#L358-L423). */
export type TransactionRequest<
  bigintType = bigint,
  numberType = number,
  type extends string = string,
> = Compute<{
  /** EIP-2930 Access List. */
  accessList?: AccessList.AccessList | undefined
  /** EIP-7702 Authorization List. */
  authorizationList?:
    | Authorization.ListSigned<bigintType, numberType>
    | undefined
  /** Versioned hashes of blobs to be included in the transaction. */
  blobVersionedHashes?: readonly Hex.Hex[]
  /** Raw blob data. */
  blobs?: readonly Hex.Hex[] | undefined
  /** EIP-155 Chain ID. */
  chainId?: numberType | undefined
  /** Contract code or a hashed method call with encoded args */
  data?: Hex.Hex | undefined
  /** @alias `data` – added for TransactionEnvelope - Transaction compatibility. */
  input?: Hex.Hex | undefined
  /** Sender of the transaction. */
  from?: Address.Address | undefined
  /** Gas provided for transaction execution */
  gas?: bigintType | undefined
  /** Base fee per gas. */
  gasPrice?: bigintType | undefined
  /** Maximum total fee per gas sender is willing to pay for blob gas (in wei). */
  maxFeePerBlobGas?: bigintType | undefined
  /** Total fee per gas in wei (gasPrice/baseFeePerGas + maxPriorityFeePerGas). */
  maxFeePerGas?: bigintType | undefined
  /** Max priority fee per gas (in wei). */
  maxPriorityFeePerGas?: bigintType | undefined
  /** Unique number identifying this transaction */
  nonce?: bigintType | undefined
  /** Transaction recipient */
  to?: Address.Address | null | undefined
  /** Transaction type */
  type?: type | undefined
  /** Value in wei sent with this transaction */
  value?: bigintType | undefined
}>

/** RPC representation of a {@link ox#TransactionRequest.TransactionRequest}. */
export type Rpc = TransactionRequest<Hex.Hex, Hex.Hex, string>

/**
 * Converts a {@link ox#TransactionRequest.TransactionRequest} to a {@link ox#TransactionRequest.Rpc}.
 *
 * @example
 * ```ts twoslash
 * import { TransactionRequest, Value } from 'ox'
 *
 * const request = TransactionRequest.toRpc({
 *   to: '0x0000000000000000000000000000000000000000',
 *   value: Value.fromEther('0.01'),
 * })
 * ```
 *
 * @example
 * ### Using with a Provider
 *
 * You can use {@link ox#Provider.(from:function)} to instantiate an EIP-1193 Provider and
 * send a transaction to the Wallet using the `eth_sendTransaction` method.
 *
 * ```ts twoslash
 * import 'ox/window'
 * import { Provider, TransactionRequest, Value } from 'ox'
 *
 * const provider = Provider.from(window.ethereum!)
 *
 * const request = TransactionRequest.toRpc({
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: Value.fromEther('0.01'),
 * })
 *
 * const hash = await provider.request({ // [!code focus]
 *   method: 'eth_sendTransaction', // [!code focus]
 *   params: [request], // [!code focus]
 * }) // [!code focus]
 * ```
 *
 * @param request - The request to convert.
 * @returns An RPC request.
 */
export function toRpc(request: TransactionRequest): Rpc {
  const request_rpc: Rpc = {}

  if (typeof request.accessList !== 'undefined')
    request_rpc.accessList = request.accessList
  if (typeof request.authorizationList !== 'undefined')
    request_rpc.authorizationList = Authorization.toRpcList(
      request.authorizationList,
    )
  if (typeof request.blobVersionedHashes !== 'undefined')
    request_rpc.blobVersionedHashes = request.blobVersionedHashes
  if (typeof request.blobs !== 'undefined') request_rpc.blobs = request.blobs
  if (typeof request.chainId !== 'undefined')
    request_rpc.chainId = Hex.fromNumber(request.chainId)
  if (typeof request.data !== 'undefined') {
    request_rpc.data = request.data
    request_rpc.input = request.data
  } else if (typeof request.input !== 'undefined') {
    request_rpc.data = request.input
    request_rpc.input = request.input
  }
  if (typeof request.from !== 'undefined') request_rpc.from = request.from
  if (typeof request.gas !== 'undefined')
    request_rpc.gas = Hex.fromNumber(request.gas)
  if (typeof request.gasPrice !== 'undefined')
    request_rpc.gasPrice = Hex.fromNumber(request.gasPrice)
  if (typeof request.maxFeePerBlobGas !== 'undefined')
    request_rpc.maxFeePerBlobGas = Hex.fromNumber(request.maxFeePerBlobGas)
  if (typeof request.maxFeePerGas !== 'undefined')
    request_rpc.maxFeePerGas = Hex.fromNumber(request.maxFeePerGas)
  if (typeof request.maxPriorityFeePerGas !== 'undefined')
    request_rpc.maxPriorityFeePerGas = Hex.fromNumber(
      request.maxPriorityFeePerGas,
    )
  if (typeof request.maxPriorityFeePerGas !== 'undefined')
    request_rpc.maxPriorityFeePerGas = Hex.fromNumber(
      request.maxPriorityFeePerGas,
    )
  if (typeof request.nonce !== 'undefined')
    request_rpc.nonce = Hex.fromNumber(request.nonce)
  if (typeof request.to !== 'undefined') request_rpc.to = request.to
  if (typeof request.type !== 'undefined') request_rpc.type = request.type
  if (typeof request.value !== 'undefined')
    request_rpc.value = Hex.fromNumber(request.value)

  return request_rpc
}

export declare namespace toRpc {
  export type ErrorType =
    | Authorization.toRpcList.ErrorType
    | Hex.fromNumber.ErrorType
    | Errors.GlobalErrorType
}

toRpc.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toRpc.ErrorType
