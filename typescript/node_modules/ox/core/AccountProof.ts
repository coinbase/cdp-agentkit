import type { Address, Hex } from '../index.js'

/** An Account Proof as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/state.yaml). */
export type AccountProof<bigintType = bigint, numberType = number> = {
  /** The address of the account. */
  address: Address.Address
  /** The balance of the account. */
  balance: bigintType
  /** The code hash of the account. */
  codeHash: Hex.Hex
  /** The nonce of the account. */
  nonce: numberType
  /** The storage hash of the account. */
  storageHash: Hex.Hex
  /** The account proofs. */
  accountProof: readonly Hex.Hex[]
  /** The storage proofs. */
  storageProof: readonly StorageProof<bigintType>[]
}

/** An RPC Account Proof as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/state.yaml). */
export type Rpc = AccountProof<Hex.Hex, Hex.Hex>

/** A Storage Proof as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/state.yaml). */
export type StorageProof<bigintType = bigint> = {
  /** The key of the storage. */
  key: Hex.Hex
  /** The proofs of the storage. */
  proof: readonly Hex.Hex[]
  /** The value of the storage. */
  value: bigintType
}

/** An RPC Storage Proof as defined in the [Execution API specification](https://github.com/ethereum/execution-apis/blob/main/src/schemas/state.yaml). */
export type StorageProofRpc = StorageProof<Hex.Hex>
