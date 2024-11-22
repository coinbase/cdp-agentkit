import type * as AccessList from './AccessList.js'
import type * as Address from './Address.js'
import * as Authorization from './Authorization.js'
import type * as Errors from './Errors.js'
import * as Hex from './Hex.js'
import * as Signature from './Signature.js'
import type { Compute, UnionCompute } from './internal/types.js'
import type { OneOf } from './internal/types.js'

/**
 * A Transaction as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/transaction.yaml).
 */
export type Transaction<
  pending extends boolean = false,
  bigintType = bigint,
  numberType = number,
> = UnionCompute<
  OneOf<
    | Legacy<pending, bigintType, numberType>
    | Eip1559<pending, bigintType, numberType>
    | Eip2930<pending, bigintType, numberType>
    | Eip4844<pending, bigintType, numberType>
    | Eip7702<pending, bigintType, numberType>
    | (Base & { type: Hex.Hex })
  >
>

/**
 * An RPC Transaction as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/transaction.yaml).
 */
export type Rpc<pending extends boolean = false> = UnionCompute<
  OneOf<
    | LegacyRpc<pending>
    | Eip1559Rpc<pending>
    | Eip2930Rpc<pending>
    | Eip4844Rpc<pending>
    | Eip7702Rpc<pending>
    | (BaseRpc & { type: Hex.Hex })
  >
>

/** Base properties of a Transaction as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/transaction.yaml). */
export type Base<
  type extends string = string,
  pending extends boolean = false,
  bigintType = bigint,
  numberType = number,
> = Compute<{
  /** Hash of the block that contains this transaction, or `null` if pending. */
  blockHash: pending extends true ? null : Hex.Hex
  /** Number of block containing this transaction or `null` if pending */
  blockNumber: pending extends true ? null : bigintType
  /** Chain ID that this transaction is valid on. */
  chainId: numberType
  /** @alias `input` Added for TransactionEnvelope - Transaction compatibility. */
  data?: Hex.Hex | undefined
  /** Sender of this transaction */
  from: Address.Address
  /** Hash of this transaction */
  hash: Hex.Hex
  /** Contract code or a hashed method call with encoded args */
  input: Hex.Hex
  /** Gas provided for transaction execution */
  gas: bigintType
  /** Unique number identifying this transaction */
  nonce: bigintType
  /** Transaction recipient. `null` if the transaction is a contract creation. */
  to: Address.Address | null
  /** Index of this transaction in the block or `null` if pending */
  transactionIndex: pending extends true ? null : numberType
  /** Transaction type */
  type: type
  /** Value in wei sent with this transaction */
  value: bigintType
  /** ECDSA signature r. */
  r: bigintType
  /** ECDSA signature s. */
  s: bigintType
  /** ECDSA signature yParity. */
  yParity: numberType
  /** @deprecated ECDSA signature v (for backwards compatibility). */
  v?: numberType | undefined
}>

/** Base properties of an RPC Transaction as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/transaction.yaml). */
export type BaseRpc<
  type extends string = string,
  pending extends boolean = false,
> = Base<type, pending, Hex.Hex, Hex.Hex>

/** An [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) Transaction as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/transaction.yaml). */
export type Eip1559<
  pending extends boolean = false,
  bigintType = bigint,
  numberType = number,
  type extends string = 'eip1559',
> = Compute<
  Base<type, pending, bigintType, numberType> & {
    /** EIP-2930 Access List. */
    accessList: AccessList.AccessList
    /** Effective gas price paid by the sender in wei. */
    gasPrice?: bigintType | undefined
    /** Total fee per gas in wei (gasPrice/baseFeePerGas + maxPriorityFeePerGas). */
    maxFeePerGas: bigintType
    /** Max priority fee per gas (in wei). */
    maxPriorityFeePerGas: bigintType
  }
>

/** An [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) RPC Transaction as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/transaction.yaml). */
export type Eip1559Rpc<pending extends boolean = false> = Compute<
  Eip1559<pending, Hex.Hex, Hex.Hex, ToRpcType['eip1559']>
>

/** An [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) Transaction as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/transaction.yaml). */
export type Eip2930<
  pending extends boolean = false,
  bigintType = bigint,
  numberType = number,
  type extends string = 'eip2930',
> = Compute<
  Base<type, pending, bigintType, numberType> & {
    /** EIP-2930 Access List. */
    accessList: AccessList.AccessList
    /** The gas price willing to be paid by the sender (in wei). */
    gasPrice: bigintType
  }
>

/** An RPC [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) Transaction as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/transaction.yaml). */
export type Eip2930Rpc<pending extends boolean = false> = Compute<
  Eip2930<pending, Hex.Hex, Hex.Hex, ToRpcType['eip2930']>
>

/** An [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) Transaction as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/transaction.yaml). */
export type Eip4844<
  pending extends boolean = false,
  bigintType = bigint,
  numberType = number,
  type extends string = 'eip4844',
> = Compute<
  Base<type, pending, bigintType, numberType> & {
    /** EIP-2930 Access List. */
    accessList: AccessList.AccessList
    /** List of versioned blob hashes associated with the transaction's blobs. */
    blobVersionedHashes: readonly Hex.Hex[]
    /** Total fee per blob gas in wei. */
    maxFeePerBlobGas: bigintType
    /** Total fee per gas in wei (gasPrice/baseFeePerGas + maxPriorityFeePerGas). */
    maxFeePerGas: bigintType
    /** Max priority fee per gas (in wei). */
    maxPriorityFeePerGas: bigintType
  }
>

/** An RPC [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) Transaction as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/transaction.yaml). */
export type Eip4844Rpc<pending extends boolean = false> = Compute<
  Eip4844<pending, Hex.Hex, Hex.Hex, ToRpcType['eip4844']>
>

/** An [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) Transaction as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/transaction.yaml). */
export type Eip7702<
  pending extends boolean = false,
  bigintType = bigint,
  numberType = number,
  type extends string = 'eip7702',
> = Compute<
  Base<type, pending, bigintType, numberType> & {
    /** EIP-2930 Access List. */
    accessList: AccessList.AccessList
    /** EIP-7702 Authorization list for the transaction. */
    authorizationList: Authorization.ListSigned<bigintType, numberType>
    /** Total fee per gas in wei (gasPrice/baseFeePerGas + maxPriorityFeePerGas). */
    maxFeePerGas: bigintType
    /** Max priority fee per gas (in wei). */
    maxPriorityFeePerGas: bigintType
  }
>

/** An RPC [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) Transaction as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/transaction.yaml). */
export type Eip7702Rpc<pending extends boolean = false> = Compute<
  Eip7702<pending, Hex.Hex, Hex.Hex, ToRpcType['eip7702']>
>

/** An legacy Transaction as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/transaction.yaml). */
export type Legacy<
  pending extends boolean = false,
  bigintType = bigint,
  numberType = number,
  type extends string = 'legacy',
> = Compute<
  Omit<
    Base<type, pending, bigintType, numberType>,
    'chainId' | 'v' | 'yParity'
  > & {
    chainId?: numberType | undefined
    /** The gas price willing to be paid by the sender (in wei). */
    gasPrice: bigintType
    /** ECDSA signature v. */
    v: numberType
    /** ECDSA signature yParity. */
    yParity?: numberType | undefined
  }
>

/** A legacy RPC Transaction as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/transaction.yaml). */
export type LegacyRpc<pending extends boolean = false> = Compute<
  Legacy<pending, Hex.Hex, Hex.Hex, ToRpcType['legacy']>
>

/** Type to RPC Type mapping. */
export const toRpcType = {
  legacy: '0x0',
  eip2930: '0x1',
  eip1559: '0x2',
  eip4844: '0x3',
  eip7702: '0x4',
} as const

/** Type to RPC Type mapping. */
export type ToRpcType = typeof toRpcType & {
  [type: string]: `0x${string}`
}

/** RPC Type to Type mapping. */
export const fromRpcType = {
  '0x0': 'legacy',
  '0x1': 'eip2930',
  '0x2': 'eip1559',
  '0x3': 'eip4844',
  '0x4': 'eip7702',
} as const

/** RPC Type to Type mapping. */

export type FromRpcType = typeof fromRpcType & {
  [type: `0x${string}`]: string
}

/**
 * Converts an {@link ox#Transaction.Rpc} to an {@link ox#Transaction.Transaction}.
 *
 * @example
 * ```ts twoslash
 * import { Transaction } from 'ox'
 *
 * const transaction = Transaction.fromRpc({
 *   hash: '0x353fdfc38a2f26115daadee9f5b8392ce62b84f410957967e2ed56b35338cdd0',
 *   nonce: '0x357',
 *   blockHash:
 *     '0xc350d807505fb835650f0013632c5515592987ba169bbc6626d9fc54d91f0f0b',
 *   blockNumber: '0x12f296f',
 *   transactionIndex: '0x2',
 *   from: '0x814e5e0e31016b9a7f138c76b7e7b2bb5c1ab6a6',
 *   to: '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
 *   value: '0x9b6e64a8ec60000',
 *   gas: '0x43f5d',
 *   maxFeePerGas: '0x2ca6ae494',
 *   maxPriorityFeePerGas: '0x41cc3c0',
 *   input:
 *     '0x3593564c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000006643504700000000000000000000000000000000000000000000000000000000000000040b080604000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002800000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000009b6e64a8ec600000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000009b6e64a8ec60000000000000000000000000000000000000000000000000000019124bb5ae978c000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000c56c7a0eaa804f854b536a5f3d5f49d2ec4b12b80000000000000000000000000000000000000000000000000000000000000060000000000000000000000000c56c7a0eaa804f854b536a5f3d5f49d2ec4b12b8000000000000000000000000000000fee13a103a10d593b9ae06b3e05f2e7e1c00000000000000000000000000000000000000000000000000000000000000190000000000000000000000000000000000000000000000000000000000000060000000000000000000000000c56c7a0eaa804f854b536a5f3d5f49d2ec4b12b800000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000190240001b9872b',
 *   r: '0x635dc2033e60185bb36709c29c75d64ea51dfbd91c32ef4be198e4ceb169fb4d',
 *   s: '0x50c2667ac4c771072746acfdcf1f1483336dcca8bd2df47cd83175dbe60f0540',
 *   yParity: '0x0',
 *   chainId: '0x1',
 *   accessList: [],
 *   type: '0x2',
 * })
 * ```
 *
 * @param transaction - The RPC transaction to convert.
 * @returns An instantiated {@link ox#Transaction.Transaction}.
 */
export function fromRpc<
  const transaction extends Rpc | null,
  pending extends boolean = false,
>(
  transaction: transaction | Rpc<pending> | null,
  _options: fromRpc.Options<pending> = {},
): transaction extends Rpc<pending> ? Transaction<pending> : null {
  if (!transaction) return null as never

  const signature = Signature.extract(transaction)

  const transaction_ = {
    ...transaction,
    ...signature,
  } as unknown as Transaction<boolean>

  transaction_.blockNumber = transaction.blockNumber
    ? BigInt(transaction.blockNumber)
    : null
  transaction_.data = transaction.input
  transaction_.gas = BigInt(transaction.gas ?? 0n)
  transaction_.nonce = BigInt(transaction.nonce ?? 0n)
  transaction_.transactionIndex = transaction.transactionIndex
    ? Number(transaction.transactionIndex)
    : null
  transaction_.value = BigInt(transaction.value ?? 0n)

  if (transaction.authorizationList)
    transaction_.authorizationList = Authorization.fromRpcList(
      transaction.authorizationList,
    )
  if (transaction.chainId) transaction_.chainId = Number(transaction.chainId)
  if (transaction.gasPrice) transaction_.gasPrice = BigInt(transaction.gasPrice)
  if (transaction.maxFeePerBlobGas)
    transaction_.maxFeePerBlobGas = BigInt(transaction.maxFeePerBlobGas)
  if (transaction.maxFeePerGas)
    transaction_.maxFeePerGas = BigInt(transaction.maxFeePerGas)
  if (transaction.maxPriorityFeePerGas)
    transaction_.maxPriorityFeePerGas = BigInt(transaction.maxPriorityFeePerGas)
  if (transaction.type)
    transaction_.type =
      (fromRpcType as any)[transaction.type] ?? transaction.type
  if (signature) transaction_.v = Signature.yParityToV(signature.yParity)

  return transaction_ as never
}

export declare namespace fromRpc {
  type Options<pending extends boolean = false> = {
    pending?: pending | boolean | undefined
  }

  type ErrorType = Signature.extract.ErrorType | Errors.GlobalErrorType
}

fromRpc.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromRpc.ErrorType

/**
 * Converts an {@link ox#Transaction.Transaction} to an {@link ox#Transaction.Rpc}.
 *
 * @example
 * ```ts twoslash
 * import { Transaction } from 'ox'
 *
 * const transaction = Transaction.toRpc({
 *   accessList: [],
 *   blockHash:
 *     '0xc350d807505fb835650f0013632c5515592987ba169bbc6626d9fc54d91f0f0b',
 *   blockNumber: 19868015n,
 *   chainId: 1,
 *   from: '0x814e5e0e31016b9a7f138c76b7e7b2bb5c1ab6a6',
 *   gas: 278365n,
 *   hash: '0x353fdfc38a2f26115daadee9f5b8392ce62b84f410957967e2ed56b35338cdd0',
 *   input:
 *     '0x3593564c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000006643504700000000000000000000000000000000000000000000000000000000000000040b080604000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002800000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000009b6e64a8ec600000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000009b6e64a8ec60000000000000000000000000000000000000000000000000000019124bb5ae978c000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000c56c7a0eaa804f854b536a5f3d5f49d2ec4b12b80000000000000000000000000000000000000000000000000000000000000060000000000000000000000000c56c7a0eaa804f854b536a5f3d5f49d2ec4b12b8000000000000000000000000000000fee13a103a10d593b9ae06b3e05f2e7e1c00000000000000000000000000000000000000000000000000000000000000190000000000000000000000000000000000000000000000000000000000000060000000000000000000000000c56c7a0eaa804f854b536a5f3d5f49d2ec4b12b800000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000190240001b9872b',
 *   maxFeePerGas: 11985937556n,
 *   maxPriorityFeePerGas: 68993984n,
 *   nonce: 855n,
 *   r: 44944627813007772897391531230081695102703289123332187696115181104739239197517n,
 *   s: 36528503505192438307355164441104001310566505351980369085208178712678799181120n,
 *   to: '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
 *   transactionIndex: 2,
 *   type: 'eip1559',
 *   v: 27,
 *   value: 700000000000000000n,
 *   yParity: 0,
 * })
 * ```
 *
 * @param transaction - The transaction to convert.
 * @returns An RPC-formatted transaction.
 */
export function toRpc<pending extends boolean = false>(
  transaction: Transaction<pending>,
  _options?: toRpc.Options<pending>,
): Rpc<pending> {
  const rpc = {} as Rpc<boolean>

  rpc.blockHash = transaction.blockHash
  rpc.blockNumber =
    typeof transaction.blockNumber === 'bigint'
      ? Hex.fromNumber(transaction.blockNumber)
      : null
  rpc.from = transaction.from
  rpc.gas = Hex.fromNumber(transaction.gas ?? 0n)
  rpc.hash = transaction.hash
  rpc.input = transaction.input
  rpc.nonce = Hex.fromNumber(transaction.nonce ?? 0n)
  rpc.to = transaction.to
  rpc.transactionIndex = transaction.transactionIndex
    ? Hex.fromNumber(transaction.transactionIndex)
    : null
  rpc.type = (toRpcType as any)[transaction.type] ?? transaction.type
  rpc.value = Hex.fromNumber(transaction.value ?? 0n)

  if (transaction.accessList) rpc.accessList = transaction.accessList
  if (transaction.authorizationList)
    rpc.authorizationList = Authorization.toRpcList(
      transaction.authorizationList,
    )
  if (transaction.blobVersionedHashes)
    rpc.blobVersionedHashes = transaction.blobVersionedHashes
  if (transaction.chainId) rpc.chainId = Hex.fromNumber(transaction.chainId)
  if (typeof transaction.gasPrice === 'bigint')
    rpc.gasPrice = Hex.fromNumber(transaction.gasPrice)
  if (typeof transaction.maxFeePerBlobGas === 'bigint')
    rpc.maxFeePerBlobGas = Hex.fromNumber(transaction.maxFeePerBlobGas)
  if (typeof transaction.maxFeePerGas === 'bigint')
    rpc.maxFeePerGas = Hex.fromNumber(transaction.maxFeePerGas)
  if (typeof transaction.maxPriorityFeePerGas === 'bigint')
    rpc.maxPriorityFeePerGas = Hex.fromNumber(transaction.maxPriorityFeePerGas)
  if (typeof transaction.r === 'bigint')
    rpc.r = Hex.fromNumber(transaction.r, { size: 32 })
  if (typeof transaction.s === 'bigint')
    rpc.s = Hex.fromNumber(transaction.s, { size: 32 })
  if (typeof transaction.v === 'number')
    rpc.v = Hex.fromNumber(transaction.v, { size: 1 })
  if (typeof transaction.yParity === 'number')
    rpc.yParity = transaction.yParity === 0 ? '0x0' : '0x1'

  return rpc as Rpc<pending>
}

export declare namespace toRpc {
  type Options<pending extends boolean = false> = {
    pending?: pending | boolean | undefined
  }

  type ErrorType = Signature.extract.ErrorType | Errors.GlobalErrorType
}

toRpc.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toRpc.ErrorType
