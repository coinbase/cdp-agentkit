import { type BlobSizeTooLargeErrorType, type EmptyBlobErrorType } from '../../errors/blob.js';
import type { ErrorType } from '../../errors/utils.js';
import type { ByteArray, Hex } from '../../types/misc.js';
import { type CreateCursorErrorType } from '../cursor.js';
import { type SizeErrorType } from '../data/size.js';
import { type HexToBytesErrorType } from '../encoding/toBytes.js';
import { type BytesToHexErrorType } from '../encoding/toHex.js';
type To = 'hex' | 'bytes';
export type ToBlobsParameters<data extends Hex | ByteArray = Hex | ByteArray, to extends To | undefined = undefined> = {
    /** Data to transform to a blob. */
    data: data | Hex | ByteArray;
    /** Return type. */
    to?: to | To | undefined;
};
export type ToBlobsReturnType<to extends To> = (to extends 'bytes' ? readonly ByteArray[] : never) | (to extends 'hex' ? readonly Hex[] : never);
export type ToBlobsErrorType = BlobSizeTooLargeErrorType | BytesToHexErrorType | CreateCursorErrorType | EmptyBlobErrorType | HexToBytesErrorType | SizeErrorType | ErrorType;
/**
 * Transforms arbitrary data to blobs.
 *
 * @example
 * ```ts
 * import { toBlobs, stringToHex } from 'viem'
 *
 * const blobs = toBlobs({ data: stringToHex('hello world') })
 * ```
 */
export declare function toBlobs<const data extends Hex | ByteArray, to extends To = (data extends Hex ? 'hex' : never) | (data extends ByteArray ? 'bytes' : never)>(parameters: ToBlobsParameters<data, to>): ToBlobsReturnType<to>;
export {};
//# sourceMappingURL=toBlobs.d.ts.map