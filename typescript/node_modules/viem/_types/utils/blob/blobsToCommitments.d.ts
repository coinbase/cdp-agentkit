import type { ErrorType } from '../../errors/utils.js';
import type { Kzg } from '../../types/kzg.js';
import type { ByteArray, Hex } from '../../types/misc.js';
import { type HexToBytesErrorType } from '../encoding/toBytes.js';
import { type BytesToHexErrorType } from '../encoding/toHex.js';
type To = 'hex' | 'bytes';
export type BlobsToCommitmentsParameters<blobs extends readonly ByteArray[] | readonly Hex[] = readonly ByteArray[] | readonly Hex[], to extends To | undefined = undefined> = {
    /** Blobs to transform into commitments. */
    blobs: blobs | readonly ByteArray[] | readonly Hex[];
    /** KZG implementation. */
    kzg: Pick<Kzg, 'blobToKzgCommitment'>;
    /** Return type. */
    to?: to | To | undefined;
};
export type BlobsToCommitmentsReturnType<to extends To> = (to extends 'bytes' ? readonly ByteArray[] : never) | (to extends 'hex' ? readonly Hex[] : never);
export type BlobsToCommitmentsErrorType = HexToBytesErrorType | BytesToHexErrorType | ErrorType;
/**
 * Compute commitments from a list of blobs.
 *
 * @example
 * ```ts
 * import { blobsToCommitments, toBlobs } from 'viem'
 * import { kzg } from './kzg'
 *
 * const blobs = toBlobs({ data: '0x1234' })
 * const commitments = blobsToCommitments({ blobs, kzg })
 * ```
 */
export declare function blobsToCommitments<const blobs extends readonly ByteArray[] | readonly Hex[], to extends To = (blobs extends readonly Hex[] ? 'hex' : never) | (blobs extends readonly ByteArray[] ? 'bytes' : never)>(parameters: BlobsToCommitmentsParameters<blobs, to>): BlobsToCommitmentsReturnType<to>;
export {};
//# sourceMappingURL=blobsToCommitments.d.ts.map