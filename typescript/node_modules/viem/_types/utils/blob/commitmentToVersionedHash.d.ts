import type { ErrorType } from '../../errors/utils.js';
import type { ByteArray, Hex } from '../../types/misc.js';
import { type BytesToHexErrorType } from '../encoding/toHex.js';
import { type Sha256ErrorType } from '../hash/sha256.js';
type To = 'hex' | 'bytes';
export type CommitmentToVersionedHashParameters<commitment extends Uint8Array | Hex = Uint8Array | Hex, to extends To | undefined = undefined> = {
    /** Commitment from blob. */
    commitment: commitment | Uint8Array | Hex;
    /** Return type. */
    to?: to | To | undefined;
    /** Version to tag onto the hash. */
    version?: number | undefined;
};
export type CommitmentToVersionedHashReturnType<to extends To> = (to extends 'bytes' ? ByteArray : never) | (to extends 'hex' ? Hex : never);
export type CommitmentToVersionedHashErrorType = Sha256ErrorType | BytesToHexErrorType | ErrorType;
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
export declare function commitmentToVersionedHash<const commitment extends Hex | ByteArray, to extends To = (commitment extends Hex ? 'hex' : never) | (commitment extends ByteArray ? 'bytes' : never)>(parameters: CommitmentToVersionedHashParameters<commitment, to>): CommitmentToVersionedHashReturnType<to>;
export {};
//# sourceMappingURL=commitmentToVersionedHash.d.ts.map