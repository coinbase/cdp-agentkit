import { BaseError } from '../../errors/base.js';
import type { Hash } from '../../types/misc.js';
import type { UserOperation } from '../types/userOperation.js';
export type UserOperationExecutionErrorType = UserOperationExecutionError & {
    name: 'UserOperationExecutionError';
};
export declare class UserOperationExecutionError extends BaseError {
    cause: BaseError;
    constructor(cause: BaseError, { callData, callGasLimit, docsPath, factory, factoryData, initCode, maxFeePerGas, maxPriorityFeePerGas, nonce, paymaster, paymasterAndData, paymasterData, paymasterPostOpGasLimit, paymasterVerificationGasLimit, preVerificationGas, sender, signature, verificationGasLimit, }: UserOperation & {
        docsPath?: string | undefined;
    });
}
export type UserOperationReceiptNotFoundErrorType = UserOperationReceiptNotFoundError & {
    name: 'UserOperationReceiptNotFoundError';
};
export declare class UserOperationReceiptNotFoundError extends BaseError {
    constructor({ hash }: {
        hash: Hash;
    });
}
export type UserOperationNotFoundErrorType = UserOperationNotFoundError & {
    name: 'UserOperationNotFoundError';
};
export declare class UserOperationNotFoundError extends BaseError {
    constructor({ hash }: {
        hash: Hash;
    });
}
export type WaitForUserOperationReceiptTimeoutErrorType = WaitForUserOperationReceiptTimeoutError & {
    name: 'WaitForUserOperationReceiptTimeoutError';
};
export declare class WaitForUserOperationReceiptTimeoutError extends BaseError {
    constructor({ hash }: {
        hash: Hash;
    });
}
//# sourceMappingURL=userOperation.d.ts.map