/**
 * Defines a KZG interface.
 *
 * @example
 * ```ts
 * import * as cKzg from 'c-kzg'
 * import { defineKzg } from 'viem'
 * import { mainnetTrustedSetupPath } from 'viem/node'
 *
 * cKzg.loadTrustedSetup(mainnetTrustedSetupPath)
 *
 * const kzg = defineKzg(cKzg)
 * ```
 */
export function defineKzg({ blobToKzgCommitment, computeBlobKzgProof, }) {
    return {
        blobToKzgCommitment,
        computeBlobKzgProof,
    };
}
//# sourceMappingURL=defineKzg.js.map