import type { Hash } from '../types/misc.js';
import { BaseError } from './base.js';
export type BlobSizeTooLargeErrorType = BlobSizeTooLargeError & {
    name: 'BlobSizeTooLargeError';
};
export declare class BlobSizeTooLargeError extends BaseError {
    constructor({ maxSize, size }: {
        maxSize: number;
        size: number;
    });
}
export type EmptyBlobErrorType = EmptyBlobError & {
    name: 'EmptyBlobError';
};
export declare class EmptyBlobError extends BaseError {
    constructor();
}
export type InvalidVersionedHashSizeErrorType = InvalidVersionedHashSizeError & {
    name: 'InvalidVersionedHashSizeError';
};
export declare class InvalidVersionedHashSizeError extends BaseError {
    constructor({ hash, size, }: {
        hash: Hash;
        size: number;
    });
}
export type InvalidVersionedHashVersionErrorType = InvalidVersionedHashVersionError & {
    name: 'InvalidVersionedHashVersionError';
};
export declare class InvalidVersionedHashVersionError extends BaseError {
    constructor({ hash, version, }: {
        hash: Hash;
        version: number;
    });
}
//# sourceMappingURL=blob.d.ts.map