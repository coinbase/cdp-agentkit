import { bytesToHex } from '../encoding/toHex.js';
import { sha256 } from '../hash/sha256.js';
/**
 * Transform a commitment to it's versioned hash.
 *
 * @example
 * ```ts
 * import {
 *   blobsToCommitments,
 *   commitmentToVersionedHash,
 *   toBlobs
 * } from 'viem'
 * import { kzg } from './kzg'
 *
 * const blobs = toBlobs({ data: '0x1234' })
 * const [commitment] = blobsToCommitments({ blobs, kzg })
 * const versionedHash = commitmentToVersionedHash({ commitment })
 * ```
 */
export function commitmentToVersionedHash(parameters) {
    const { commitment, version = 1 } = parameters;
    const to = parameters.to ?? (typeof commitment === 'string' ? 'hex' : 'bytes');
    const versionedHash = sha256(commitment, 'bytes');
    versionedHash.set([version], 0);
    return (to === 'bytes' ? versionedHash : bytesToHex(versionedHash));
}
//# sourceMappingURL=commitmentToVersionedHash.js.map