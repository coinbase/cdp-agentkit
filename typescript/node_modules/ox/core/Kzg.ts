import type * as Bytes from './Bytes.js'
import type * as Errors from './Errors.js'

/** @see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-4844.md#parameters */
export const versionedHashVersion = 1

/** Root type for a KZG interface. */
export type Kzg = {
  /**
   * Convert a blob to a KZG commitment.
   */
  blobToKzgCommitment(blob: Bytes.Bytes): Bytes.Bytes
  /**
   * Given a blob, return the KZG proof that is used to verify it against the
   * commitment.
   */
  computeBlobKzgProof(blob: Bytes.Bytes, commitment: Bytes.Bytes): Bytes.Bytes
}

/**
 * Defines a KZG interface.
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import * as cKzg from 'c-kzg'
 * import { Kzg } from 'ox'
 * import { Paths } from 'ox/trusted-setups'
 *
 * cKzg.loadTrustedSetup(Paths.mainnet)
 *
 * const kzg = Kzg.from(cKzg)
 * ```
 *
 * @param value - The KZG object to convert.
 * @returns The KZG interface object.
 */
export function from(value: Kzg): Kzg {
  const { blobToKzgCommitment, computeBlobKzgProof } = value
  return {
    blobToKzgCommitment,
    computeBlobKzgProof,
  }
}

export declare namespace from {
  type ErrorType = Errors.GlobalErrorType
}

/* v8 ignore next */
from.parseError = (error: unknown) => error as from.ErrorType
