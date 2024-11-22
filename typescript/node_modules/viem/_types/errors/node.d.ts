import { BaseError } from './base.js';
/**
 * geth:    https://github.com/ethereum/go-ethereum/blob/master/core/error.go
 *          https://github.com/ethereum/go-ethereum/blob/master/core/types/transaction.go#L34-L41
 *
 * erigon:  https://github.com/ledgerwatch/erigon/blob/master/core/error.go
 *          https://github.com/ledgerwatch/erigon/blob/master/core/types/transaction.go#L41-L46
 *
 * anvil:   https://github.com/foundry-rs/foundry/blob/master/anvil/src/eth/error.rs#L108
 */
export type ExecutionRevertedErrorType = ExecutionRevertedError & {
    code: 3;
    name: 'ExecutionRevertedError';
};
export declare class ExecutionRevertedError extends BaseError {
    static code: number;
    static nodeMessage: RegExp;
    constructor({ cause, message, }?: {
        cause?: BaseError | undefined;
        message?: string | undefined;
    });
}
export type FeeCapTooHighErrorType = FeeCapTooHighError & {
    name: 'FeeCapTooHighError';
};
export declare class FeeCapTooHighError extends BaseError {
    static nodeMessage: RegExp;
    constructor({ cause, maxFeePerGas, }?: {
        cause?: BaseError | undefined;
        maxFeePerGas?: bigint | undefined;
    });
}
export type FeeCapTooLowErrorType = FeeCapTooLowError & {
    name: 'FeeCapTooLowError';
};
export declare class FeeCapTooLowError extends BaseError {
    static nodeMessage: RegExp;
    constructor({ cause, maxFeePerGas, }?: {
        cause?: BaseError | undefined;
        maxFeePerGas?: bigint | undefined;
    });
}
export type NonceTooHighErrorType = NonceTooHighError & {
    name: 'NonceTooHighError';
};
export declare class NonceTooHighError extends BaseError {
    static nodeMessage: RegExp;
    constructor({ cause, nonce, }?: {
        cause?: BaseError | undefined;
        nonce?: number | undefined;
    });
}
export type NonceTooLowErrorType = NonceTooLowError & {
    name: 'NonceTooLowError';
};
export declare class NonceTooLowError extends BaseError {
    static nodeMessage: RegExp;
    constructor({ cause, nonce, }?: {
        cause?: BaseError | undefined;
        nonce?: number | undefined;
    });
}
export type NonceMaxValueErrorType = NonceMaxValueError & {
    name: 'NonceMaxValueError';
};
export declare class NonceMaxValueError extends BaseError {
    static nodeMessage: RegExp;
    constructor({ cause, nonce, }?: {
        cause?: BaseError | undefined;
        nonce?: number | undefined;
    });
}
export type InsufficientFundsErrorType = InsufficientFundsError & {
    name: 'InsufficientFundsError';
};
export declare class InsufficientFundsError extends BaseError {
    static nodeMessage: RegExp;
    constructor({ cause }?: {
        cause?: BaseError | undefined;
    });
}
export type IntrinsicGasTooHighErrorType = IntrinsicGasTooHighError & {
    name: 'IntrinsicGasTooHighError';
};
export declare class IntrinsicGasTooHighError extends BaseError {
    static nodeMessage: RegExp;
    constructor({ cause, gas, }?: {
        cause?: BaseError | undefined;
        gas?: bigint | undefined;
    });
}
export type IntrinsicGasTooLowErrorType = IntrinsicGasTooLowError & {
    name: 'IntrinsicGasTooLowError';
};
export declare class IntrinsicGasTooLowError extends BaseError {
    static nodeMessage: RegExp;
    constructor({ cause, gas, }?: {
        cause?: BaseError | undefined;
        gas?: bigint | undefined;
    });
}
export type TransactionTypeNotSupportedErrorType = TransactionTypeNotSupportedError & {
    name: 'TransactionTypeNotSupportedError';
};
export declare class TransactionTypeNotSupportedError extends BaseError {
    static nodeMessage: RegExp;
    constructor({ cause }: {
        cause?: BaseError | undefined;
    });
}
export type TipAboveFeeCapErrorType = TipAboveFeeCapError & {
    name: 'TipAboveFeeCapError';
};
export declare class TipAboveFeeCapError extends BaseError {
    static nodeMessage: RegExp;
    constructor({ cause, maxPriorityFeePerGas, maxFeePerGas, }?: {
        cause?: BaseError | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
    });
}
export type UnknownNodeErrorType = UnknownNodeError & {
    name: 'UnknownNodeError';
};
export declare class UnknownNodeError extends BaseError {
    constructor({ cause }: {
        cause?: BaseError | undefined;
    });
}
//# sourceMappingURL=node.d.ts.map