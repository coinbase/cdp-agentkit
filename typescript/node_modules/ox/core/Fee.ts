import type * as Hex from './Hex.js'
import type { Compute, OneOf } from './internal/types.js'

export type FeeHistory<bigintType = bigint> = Compute<{
  /**
   * An array of block base fees per gas (in wei). This includes the next block after
   * the newest of the returned range, because this value can be derived from the newest block.
   * Zeroes are returned for pre-EIP-1559 blocks. */
  baseFeePerGas: bigintType[]
  /** An array of block gas used ratios. These are calculated as the ratio of gasUsed and gasLimit. */
  gasUsedRatio: number[]
  /** Lowest number block of the returned range. */
  oldestBlock: bigintType
  /** An array of effective priority fees (in wei) per gas data points from a single block. All zeroes are returned if the block is empty. */
  reward?: bigintType[][] | undefined
}>

export type FeeHistoryRpc = FeeHistory<Hex.Hex>

export type FeeValuesLegacy<bigintType = bigint> = {
  /** Base fee per gas. */
  gasPrice: bigintType
}

export type FeeValuesLegacyRpc = FeeValuesLegacy<Hex.Hex>

export type FeeValuesEip1559<bigintType = bigint> = {
  /** Total fee per gas in wei (gasPrice/baseFeePerGas + maxPriorityFeePerGas). */
  maxFeePerGas: bigintType
  /** Max priority fee per gas (in wei). */
  maxPriorityFeePerGas: bigintType
}

export type FeeValuesEip1559Rpc = FeeValuesEip1559<Hex.Hex>

export type FeeValuesEip4844<bigintType = bigint> = {
  /** Maximum total fee per gas sender is willing to pay for blob gas (in wei). */
  maxFeePerBlobGas: bigintType
  /** Total fee per gas in wei (gasPrice/baseFeePerGas + maxPriorityFeePerGas). */
  maxFeePerGas: bigintType
  /** Max priority fee per gas (in wei). */
  maxPriorityFeePerGas: bigintType
}

export type FeeValuesEip4844Rpc = FeeValuesEip4844<Hex.Hex>

export type FeeValues<bigintType = bigint> = OneOf<
  | FeeValuesLegacy<bigintType>
  | FeeValuesEip1559<bigintType>
  | FeeValuesEip4844<bigintType>
>

export type FeeValuesRpc = OneOf<
  FeeValuesLegacyRpc | FeeValuesEip1559Rpc | FeeValuesEip4844Rpc
>

export type FeeValuesType = 'legacy' | 'eip1559' | 'eip4844'
