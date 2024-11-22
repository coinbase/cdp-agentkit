import { BaseError } from './base.js';
export type NegativeOffsetErrorType = NegativeOffsetError & {
    name: 'NegativeOffsetError';
};
export declare class NegativeOffsetError extends BaseError {
    constructor({ offset }: {
        offset: number;
    });
}
export type PositionOutOfBoundsErrorType = PositionOutOfBoundsError & {
    name: 'PositionOutOfBoundsError';
};
export declare class PositionOutOfBoundsError extends BaseError {
    constructor({ length, position }: {
        length: number;
        position: number;
    });
}
export type RecursiveReadLimitExceededErrorType = RecursiveReadLimitExceededError & {
    name: 'RecursiveReadLimitExceededError';
};
export declare class RecursiveReadLimitExceededError extends BaseError {
    constructor({ count, limit }: {
        count: number;
        limit: number;
    });
}
//# sourceMappingURL=cursor.d.ts.map