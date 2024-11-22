"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitForUserOperationReceiptTimeoutError = exports.UserOperationNotFoundError = exports.UserOperationReceiptNotFoundError = exports.UserOperationExecutionError = void 0;
const base_js_1 = require("../../errors/base.js");
const transaction_js_1 = require("../../errors/transaction.js");
const index_js_1 = require("../../utils/index.js");
class UserOperationExecutionError extends base_js_1.BaseError {
    constructor(cause, { callData, callGasLimit, docsPath, factory, factoryData, initCode, maxFeePerGas, maxPriorityFeePerGas, nonce, paymaster, paymasterAndData, paymasterData, paymasterPostOpGasLimit, paymasterVerificationGasLimit, preVerificationGas, sender, signature, verificationGasLimit, }) {
        const prettyArgs = (0, transaction_js_1.prettyPrint)({
            callData,
            callGasLimit,
            factory,
            factoryData,
            initCode,
            maxFeePerGas: typeof maxFeePerGas !== 'undefined' &&
                `${(0, index_js_1.formatGwei)(maxFeePerGas)} gwei`,
            maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== 'undefined' &&
                `${(0, index_js_1.formatGwei)(maxPriorityFeePerGas)} gwei`,
            nonce,
            paymaster,
            paymasterAndData,
            paymasterData,
            paymasterPostOpGasLimit,
            paymasterVerificationGasLimit,
            preVerificationGas,
            sender,
            signature,
            verificationGasLimit,
        });
        super(cause.shortMessage, {
            cause,
            docsPath,
            metaMessages: [
                ...(cause.metaMessages ? [...cause.metaMessages, ' '] : []),
                'Request Arguments:',
                prettyArgs,
            ].filter(Boolean),
            name: 'UserOperationExecutionError',
        });
        Object.defineProperty(this, "cause", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.cause = cause;
    }
}
exports.UserOperationExecutionError = UserOperationExecutionError;
class UserOperationReceiptNotFoundError extends base_js_1.BaseError {
    constructor({ hash }) {
        super(`User Operation receipt with hash "${hash}" could not be found. The User Operation may not have been processed yet.`, { name: 'UserOperationReceiptNotFoundError' });
    }
}
exports.UserOperationReceiptNotFoundError = UserOperationReceiptNotFoundError;
class UserOperationNotFoundError extends base_js_1.BaseError {
    constructor({ hash }) {
        super(`User Operation with hash "${hash}" could not be found.`, {
            name: 'UserOperationNotFoundError',
        });
    }
}
exports.UserOperationNotFoundError = UserOperationNotFoundError;
class WaitForUserOperationReceiptTimeoutError extends base_js_1.BaseError {
    constructor({ hash }) {
        super(`Timed out while waiting for User Operation with hash "${hash}" to be confirmed.`, { name: 'WaitForUserOperationReceiptTimeoutError' });
    }
}
exports.WaitForUserOperationReceiptTimeoutError = WaitForUserOperationReceiptTimeoutError;
//# sourceMappingURL=userOperation.js.map