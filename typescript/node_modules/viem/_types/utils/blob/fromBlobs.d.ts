import type { ErrorType } from '../../errors/utils.js';
import type { ByteArray, Hex } from '../../types/misc.js';
import { type CreateCursorErrorType } from '../cursor.js';
import { type HexToBytesErrorType } from '../encoding/toBytes.js';
import { type BytesToHexErrorType } from '../encoding/toHex.js';
type To = 'hex' | 'bytes';
export type FromBlobsParameters<blobs extends readonly Hex[] | readonly ByteArray[] = readonly Hex[] | readonly ByteArray[], to extends To | undefined = undefined> = {
    /** Blobs to transform to data. */
    blobs: blobs | readonly Hex[] | readonly ByteArray[];
    to?: to | To | undefined;
};
export type FromBlobsReturnType<to extends To> = (to extends 'bytes' ? ByteArray : never) | (to extends 'hex' ? Hex : never);
export type FromBlobsErrorType = BytesToHexErrorType | CreateCursorErrorType | HexToBytesErrorType | ErrorType;
export declare function fromBlobs<const blobs extends readonly Hex[] | readonly ByteArray[], to extends To = (blobs extends readonly Hex[] ? 'hex' : never) | (blobs extends readonly ByteArray[] ? 'bytes' : never)>(parameters: FromBlobsParameters<blobs, to>): FromBlobsReturnType<to>;
export {};
//# sourceMappingURL=fromBlobs.d.ts.map