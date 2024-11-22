import type { Account } from '../accounts/types.js';
import type { SendTransactionParameters } from '../actions/wallet/sendTransaction.js';
import type { BlockTag } from '../types/block.js';
import type { Chain } from '../types/chain.js';
import type { Hash, Hex } from '../types/misc.js';
import type { TransactionType } from '../types/transaction.js';
import { BaseError } from './base.js';
export declare function prettyPrint(args: Record<string, bigint | number | string | undefined | false | unknown>): string;
export type FeeConflictErrorType = FeeConflictError & {
    name: 'FeeConflictError';
};
export declare class FeeConflictError extends BaseError {
    constructor();
}
export type InvalidLegacyVErrorType = InvalidLegacyVError & {
    name: 'InvalidLegacyVError';
};
export declare class InvalidLegacyVError extends BaseError {
    constructor({ v }: {
        v: bigint;
    });
}
export type InvalidSerializableTransactionErrorType = InvalidSerializableTransactionError & {
    name: 'InvalidSerializableTransactionError';
};
export declare class InvalidSerializableTransactionError extends BaseError {
    constructor({ transaction }: {
        transaction: Record<string, unknown>;
    });
}
export type InvalidSerializedTransactionTypeErrorType = InvalidSerializedTransactionTypeError & {
    name: 'InvalidSerializedTransactionTypeError';
};
export declare class InvalidSerializedTransactionTypeError extends BaseError {
    serializedType: Hex;
    constructor({ serializedType }: {
        serializedType: Hex;
    });
}
export type InvalidSerializedTransactionErrorType = InvalidSerializedTransactionError & {
    name: 'InvalidSerializedTransactionError';
};
export declare class InvalidSerializedTransactionError extends BaseError {
    serializedTransaction: Hex;
    type: TransactionType;
    constructor({ attributes, serializedTransaction, type, }: {
        attributes: Record<string, unknown>;
        serializedTransaction: Hex;
        type: TransactionType;
    });
}
export type InvalidStorageKeySizeErrorType = InvalidStorageKeySizeError & {
    name: 'InvalidStorageKeySizeError';
};
export declare class InvalidStorageKeySizeError extends BaseError {
    constructor({ storageKey }: {
        storageKey: Hex;
    });
}
export type TransactionExecutionErrorType = TransactionExecutionError & {
    name: 'TransactionExecutionError';
};
export declare class TransactionExecutionError extends BaseError {
    cause: BaseError;
    constructor(cause: BaseError, { account, docsPath, chain, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, }: Omit<SendTransactionParameters, 'account' | 'chain'> & {
        account: Account | null;
        chain?: Chain | undefined;
        docsPath?: string | undefined;
    });
}
export type TransactionNotFoundErrorType = TransactionNotFoundError & {
    name: 'TransactionNotFoundError';
};
export declare class TransactionNotFoundError extends BaseError {
    constructor({ blockHash, blockNumber, blockTag, hash, index, }: {
        blockHash?: Hash | undefined;
        blockNumber?: bigint | undefined;
        blockTag?: BlockTag | undefined;
        hash?: Hash | undefined;
        index?: number | undefined;
    });
}
export type TransactionReceiptNotFoundErrorType = TransactionReceiptNotFoundError & {
    name: 'TransactionReceiptNotFoundError';
};
export declare class TransactionReceiptNotFoundError extends BaseError {
    constructor({ hash }: {
        hash: Hash;
    });
}
export type WaitForTransactionReceiptTimeoutErrorType = WaitForTransactionReceiptTimeoutError & {
    name: 'WaitForTransactionReceiptTimeoutError';
};
export declare class WaitForTransactionReceiptTimeoutError extends BaseError {
    constructor({ hash }: {
        hash: Hash;
    });
}
//# sourceMappingURL=transaction.d.ts.map