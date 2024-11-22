import type { TypedData } from 'abitype';
import { BaseError } from './base.js';
export type InvalidDomainErrorType = InvalidDomainError & {
    name: 'InvalidDomainError';
};
export declare class InvalidDomainError extends BaseError {
    constructor({ domain }: {
        domain: unknown;
    });
}
export type InvalidPrimaryTypeErrorType = InvalidPrimaryTypeError & {
    name: 'InvalidPrimaryTypeError';
};
export declare class InvalidPrimaryTypeError extends BaseError {
    constructor({ primaryType, types, }: {
        primaryType: string;
        types: TypedData | Record<string, unknown>;
    });
}
export type InvalidStructTypeErrorType = InvalidStructTypeError & {
    name: 'InvalidStructTypeError';
};
export declare class InvalidStructTypeError extends BaseError {
    constructor({ type }: {
        type: string;
    });
}
//# sourceMappingURL=typedData.d.ts.map