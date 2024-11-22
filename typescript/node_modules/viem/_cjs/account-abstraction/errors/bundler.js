"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationGasLimitTooLowError = exports.VerificationGasLimitExceededError = exports.UnknownBundlerError = exports.UserOperationOutOfTimeRangeError = exports.UserOperationRejectedByOpCodeError = exports.UserOperationRejectedByPaymasterError = exports.UserOperationRejectedByEntryPointError = exports.UserOperationPaymasterSignatureError = exports.UserOperationSignatureError = exports.UserOperationPaymasterExpiredError = exports.UserOperationExpiredError = exports.UnsupportedSignatureAggregatorError = exports.SmartAccountFunctionRevertedError = exports.SignatureCheckFailedError = exports.SenderAlreadyConstructedError = exports.PaymasterPostOpFunctionRevertedError = exports.PaymasterStakeTooLowError = exports.PaymasterRateLimitError = exports.PaymasterNotDeployedError = exports.PaymasterFunctionRevertedError = exports.PaymasterDepositTooLowError = exports.InvalidPaymasterAndDataError = exports.InvalidFieldsError = exports.InvalidBeneficiaryError = exports.InvalidAccountNonceError = exports.InvalidAggregatorError = exports.InternalCallOnlyError = exports.InsufficientPrefundError = exports.InitCodeMustReturnSenderError = exports.InitCodeMustCreateSenderError = exports.InitCodeFailedError = exports.HandleOpsOutOfGasError = exports.GasValuesOverflowError = exports.FailedToSendToBeneficiaryError = exports.ExecutionRevertedError = exports.AccountNotDeployedError = void 0;
const base_js_1 = require("../../errors/base.js");
class AccountNotDeployedError extends base_js_1.BaseError {
    constructor({ cause, }) {
        super('Smart Account is not deployed.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- No `factory`/`factoryData` or `initCode` properties are provided for Smart Account deployment.',
                '- An incorrect `sender` address is provided.',
            ],
            name: 'AccountNotDeployedError',
        });
    }
}
exports.AccountNotDeployedError = AccountNotDeployedError;
Object.defineProperty(AccountNotDeployedError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa20/
});
class ExecutionRevertedError extends base_js_1.BaseError {
    constructor({ cause, message, } = {}) {
        const reason = message
            ?.replace('execution reverted: ', '')
            ?.replace('execution reverted', '');
        super(`Execution reverted ${reason ? `with reason: ${reason}` : 'for an unknown reason'}.`, {
            cause,
            name: 'ExecutionRevertedError',
        });
    }
}
exports.ExecutionRevertedError = ExecutionRevertedError;
Object.defineProperty(ExecutionRevertedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32521
});
Object.defineProperty(ExecutionRevertedError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /execution reverted/
});
class FailedToSendToBeneficiaryError extends base_js_1.BaseError {
    constructor({ cause, }) {
        super('Failed to send funds to beneficiary.', {
            cause,
            name: 'FailedToSendToBeneficiaryError',
        });
    }
}
exports.FailedToSendToBeneficiaryError = FailedToSendToBeneficiaryError;
Object.defineProperty(FailedToSendToBeneficiaryError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa91/
});
class GasValuesOverflowError extends base_js_1.BaseError {
    constructor({ cause, }) {
        super('Gas value overflowed.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- one of the gas values exceeded 2**120 (uint120)',
            ].filter(Boolean),
            name: 'GasValuesOverflowError',
        });
    }
}
exports.GasValuesOverflowError = GasValuesOverflowError;
Object.defineProperty(GasValuesOverflowError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa94/
});
class HandleOpsOutOfGasError extends base_js_1.BaseError {
    constructor({ cause, }) {
        super('The `handleOps` function was called by the Bundler with a gas limit too low.', {
            cause,
            name: 'HandleOpsOutOfGasError',
        });
    }
}
exports.HandleOpsOutOfGasError = HandleOpsOutOfGasError;
Object.defineProperty(HandleOpsOutOfGasError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa95/
});
class InitCodeFailedError extends base_js_1.BaseError {
    constructor({ cause, factory, factoryData, initCode, }) {
        super('Failed to simulate deployment for Smart Account.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- Invalid `factory`/`factoryData` or `initCode` properties are present',
                '- Smart Account deployment execution ran out of gas (low `verificationGasLimit` value)',
                '- Smart Account deployment execution reverted with an error\n',
                factory && `factory: ${factory}`,
                factoryData && `factoryData: ${factoryData}`,
                initCode && `initCode: ${initCode}`,
            ].filter(Boolean),
            name: 'InitCodeFailedError',
        });
    }
}
exports.InitCodeFailedError = InitCodeFailedError;
Object.defineProperty(InitCodeFailedError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa13/
});
class InitCodeMustCreateSenderError extends base_js_1.BaseError {
    constructor({ cause, factory, factoryData, initCode, }) {
        super('Smart Account initialization implementation did not create an account.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- `factory`/`factoryData` or `initCode` properties are invalid',
                '- Smart Account initialization implementation is incorrect\n',
                factory && `factory: ${factory}`,
                factoryData && `factoryData: ${factoryData}`,
                initCode && `initCode: ${initCode}`,
            ].filter(Boolean),
            name: 'InitCodeMustCreateSenderError',
        });
    }
}
exports.InitCodeMustCreateSenderError = InitCodeMustCreateSenderError;
Object.defineProperty(InitCodeMustCreateSenderError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa15/
});
class InitCodeMustReturnSenderError extends base_js_1.BaseError {
    constructor({ cause, factory, factoryData, initCode, sender, }) {
        super('Smart Account initialization implementation does not return the expected sender.', {
            cause,
            metaMessages: [
                'This could arise when:',
                'Smart Account initialization implementation does not return a sender address\n',
                factory && `factory: ${factory}`,
                factoryData && `factoryData: ${factoryData}`,
                initCode && `initCode: ${initCode}`,
                sender && `sender: ${sender}`,
            ].filter(Boolean),
            name: 'InitCodeMustReturnSenderError',
        });
    }
}
exports.InitCodeMustReturnSenderError = InitCodeMustReturnSenderError;
Object.defineProperty(InitCodeMustReturnSenderError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa14/
});
class InsufficientPrefundError extends base_js_1.BaseError {
    constructor({ cause, }) {
        super('Smart Account does not have sufficient funds to execute the User Operation.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- the Smart Account does not have sufficient funds to cover the required prefund, or',
                '- a Paymaster was not provided',
            ].filter(Boolean),
            name: 'InsufficientPrefundError',
        });
    }
}
exports.InsufficientPrefundError = InsufficientPrefundError;
Object.defineProperty(InsufficientPrefundError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa21/
});
class InternalCallOnlyError extends base_js_1.BaseError {
    constructor({ cause, }) {
        super('Bundler attempted to call an invalid function on the EntryPoint.', {
            cause,
            name: 'InternalCallOnlyError',
        });
    }
}
exports.InternalCallOnlyError = InternalCallOnlyError;
Object.defineProperty(InternalCallOnlyError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa92/
});
class InvalidAggregatorError extends base_js_1.BaseError {
    constructor({ cause, }) {
        super('Bundler used an invalid aggregator for handling aggregated User Operations.', {
            cause,
            name: 'InvalidAggregatorError',
        });
    }
}
exports.InvalidAggregatorError = InvalidAggregatorError;
Object.defineProperty(InvalidAggregatorError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa96/
});
class InvalidAccountNonceError extends base_js_1.BaseError {
    constructor({ cause, nonce, }) {
        super('Invalid Smart Account nonce used for User Operation.', {
            cause,
            metaMessages: [nonce && `nonce: ${nonce}`].filter(Boolean),
            name: 'InvalidAccountNonceError',
        });
    }
}
exports.InvalidAccountNonceError = InvalidAccountNonceError;
Object.defineProperty(InvalidAccountNonceError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa25/
});
class InvalidBeneficiaryError extends base_js_1.BaseError {
    constructor({ cause, }) {
        super('Bundler has not set a beneficiary address.', {
            cause,
            name: 'InvalidBeneficiaryError',
        });
    }
}
exports.InvalidBeneficiaryError = InvalidBeneficiaryError;
Object.defineProperty(InvalidBeneficiaryError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa90/
});
class InvalidFieldsError extends base_js_1.BaseError {
    constructor({ cause, }) {
        super('Invalid fields set on User Operation.', {
            cause,
            name: 'InvalidFieldsError',
        });
    }
}
exports.InvalidFieldsError = InvalidFieldsError;
Object.defineProperty(InvalidFieldsError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32602
});
class InvalidPaymasterAndDataError extends base_js_1.BaseError {
    constructor({ cause, paymasterAndData, }) {
        super('Paymaster properties provided are invalid.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- the `paymasterAndData` property is of an incorrect length\n',
                paymasterAndData && `paymasterAndData: ${paymasterAndData}`,
            ].filter(Boolean),
            name: 'InvalidPaymasterAndDataError',
        });
    }
}
exports.InvalidPaymasterAndDataError = InvalidPaymasterAndDataError;
Object.defineProperty(InvalidPaymasterAndDataError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa93/
});
class PaymasterDepositTooLowError extends base_js_1.BaseError {
    constructor({ cause, }) {
        super('Paymaster deposit for the User Operation is too low.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- the Paymaster has deposited less than the expected amount via the `deposit` function',
            ].filter(Boolean),
            name: 'PaymasterDepositTooLowError',
        });
    }
}
exports.PaymasterDepositTooLowError = PaymasterDepositTooLowError;
Object.defineProperty(PaymasterDepositTooLowError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32508
});
Object.defineProperty(PaymasterDepositTooLowError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa31/
});
class PaymasterFunctionRevertedError extends base_js_1.BaseError {
    constructor({ cause, }) {
        super('The `validatePaymasterUserOp` function on the Paymaster reverted.', {
            cause,
            name: 'PaymasterFunctionRevertedError',
        });
    }
}
exports.PaymasterFunctionRevertedError = PaymasterFunctionRevertedError;
Object.defineProperty(PaymasterFunctionRevertedError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa33/
});
class PaymasterNotDeployedError extends base_js_1.BaseError {
    constructor({ cause, }) {
        super('The Paymaster contract has not been deployed.', {
            cause,
            name: 'PaymasterNotDeployedError',
        });
    }
}
exports.PaymasterNotDeployedError = PaymasterNotDeployedError;
Object.defineProperty(PaymasterNotDeployedError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa30/
});
class PaymasterRateLimitError extends base_js_1.BaseError {
    constructor({ cause }) {
        super('UserOperation rejected because paymaster (or signature aggregator) is throttled/banned.', {
            cause,
            name: 'PaymasterRateLimitError',
        });
    }
}
exports.PaymasterRateLimitError = PaymasterRateLimitError;
Object.defineProperty(PaymasterRateLimitError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32504
});
class PaymasterStakeTooLowError extends base_js_1.BaseError {
    constructor({ cause }) {
        super('UserOperation rejected because paymaster (or signature aggregator) is throttled/banned.', {
            cause,
            name: 'PaymasterStakeTooLowError',
        });
    }
}
exports.PaymasterStakeTooLowError = PaymasterStakeTooLowError;
Object.defineProperty(PaymasterStakeTooLowError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32505
});
class PaymasterPostOpFunctionRevertedError extends base_js_1.BaseError {
    constructor({ cause, }) {
        super('Paymaster `postOp` function reverted.', {
            cause,
            name: 'PaymasterPostOpFunctionRevertedError',
        });
    }
}
exports.PaymasterPostOpFunctionRevertedError = PaymasterPostOpFunctionRevertedError;
Object.defineProperty(PaymasterPostOpFunctionRevertedError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa50/
});
class SenderAlreadyConstructedError extends base_js_1.BaseError {
    constructor({ cause, factory, factoryData, initCode, }) {
        super('Smart Account has already been deployed.', {
            cause,
            metaMessages: [
                'Remove the following properties and try again:',
                factory && '`factory`',
                factoryData && '`factoryData`',
                initCode && '`initCode`',
            ].filter(Boolean),
            name: 'SenderAlreadyConstructedError',
        });
    }
}
exports.SenderAlreadyConstructedError = SenderAlreadyConstructedError;
Object.defineProperty(SenderAlreadyConstructedError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa10/
});
class SignatureCheckFailedError extends base_js_1.BaseError {
    constructor({ cause }) {
        super('UserOperation rejected because account signature check failed (or paymaster signature, if the paymaster uses its data as signature).', {
            cause,
            name: 'SignatureCheckFailedError',
        });
    }
}
exports.SignatureCheckFailedError = SignatureCheckFailedError;
Object.defineProperty(SignatureCheckFailedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32507
});
class SmartAccountFunctionRevertedError extends base_js_1.BaseError {
    constructor({ cause, }) {
        super('The `validateUserOp` function on the Smart Account reverted.', {
            cause,
            name: 'SmartAccountFunctionRevertedError',
        });
    }
}
exports.SmartAccountFunctionRevertedError = SmartAccountFunctionRevertedError;
Object.defineProperty(SmartAccountFunctionRevertedError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa23/
});
class UnsupportedSignatureAggregatorError extends base_js_1.BaseError {
    constructor({ cause }) {
        super('UserOperation rejected because account specified unsupported signature aggregator.', {
            cause,
            name: 'UnsupportedSignatureAggregatorError',
        });
    }
}
exports.UnsupportedSignatureAggregatorError = UnsupportedSignatureAggregatorError;
Object.defineProperty(UnsupportedSignatureAggregatorError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32506
});
class UserOperationExpiredError extends base_js_1.BaseError {
    constructor({ cause, }) {
        super('User Operation expired.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- the `validAfter` or `validUntil` values returned from `validateUserOp` on the Smart Account are not satisfied',
            ].filter(Boolean),
            name: 'UserOperationExpiredError',
        });
    }
}
exports.UserOperationExpiredError = UserOperationExpiredError;
Object.defineProperty(UserOperationExpiredError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa22/
});
class UserOperationPaymasterExpiredError extends base_js_1.BaseError {
    constructor({ cause, }) {
        super('Paymaster for User Operation expired.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- the `validAfter` or `validUntil` values returned from `validatePaymasterUserOp` on the Paymaster are not satisfied',
            ].filter(Boolean),
            name: 'UserOperationPaymasterExpiredError',
        });
    }
}
exports.UserOperationPaymasterExpiredError = UserOperationPaymasterExpiredError;
Object.defineProperty(UserOperationPaymasterExpiredError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa32/
});
class UserOperationSignatureError extends base_js_1.BaseError {
    constructor({ cause, }) {
        super('Signature provided for the User Operation is invalid.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- the `signature` for the User Operation is incorrectly computed, and unable to be verified by the Smart Account',
            ].filter(Boolean),
            name: 'UserOperationSignatureError',
        });
    }
}
exports.UserOperationSignatureError = UserOperationSignatureError;
Object.defineProperty(UserOperationSignatureError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa24/
});
class UserOperationPaymasterSignatureError extends base_js_1.BaseError {
    constructor({ cause, }) {
        super('Signature provided for the User Operation is invalid.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- the `signature` for the User Operation is incorrectly computed, and unable to be verified by the Paymaster',
            ].filter(Boolean),
            name: 'UserOperationPaymasterSignatureError',
        });
    }
}
exports.UserOperationPaymasterSignatureError = UserOperationPaymasterSignatureError;
Object.defineProperty(UserOperationPaymasterSignatureError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa34/
});
class UserOperationRejectedByEntryPointError extends base_js_1.BaseError {
    constructor({ cause }) {
        super("User Operation rejected by EntryPoint's `simulateValidation` during account creation or validation.", {
            cause,
            name: 'UserOperationRejectedByEntryPointError',
        });
    }
}
exports.UserOperationRejectedByEntryPointError = UserOperationRejectedByEntryPointError;
Object.defineProperty(UserOperationRejectedByEntryPointError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32500
});
class UserOperationRejectedByPaymasterError extends base_js_1.BaseError {
    constructor({ cause }) {
        super("User Operation rejected by Paymaster's `validatePaymasterUserOp`.", {
            cause,
            name: 'UserOperationRejectedByPaymasterError',
        });
    }
}
exports.UserOperationRejectedByPaymasterError = UserOperationRejectedByPaymasterError;
Object.defineProperty(UserOperationRejectedByPaymasterError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32501
});
class UserOperationRejectedByOpCodeError extends base_js_1.BaseError {
    constructor({ cause }) {
        super('User Operation rejected with op code validation error.', {
            cause,
            name: 'UserOperationRejectedByOpCodeError',
        });
    }
}
exports.UserOperationRejectedByOpCodeError = UserOperationRejectedByOpCodeError;
Object.defineProperty(UserOperationRejectedByOpCodeError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32502
});
class UserOperationOutOfTimeRangeError extends base_js_1.BaseError {
    constructor({ cause }) {
        super('UserOperation out of time-range: either wallet or paymaster returned a time-range, and it is already expired (or will expire soon).', {
            cause,
            name: 'UserOperationOutOfTimeRangeError',
        });
    }
}
exports.UserOperationOutOfTimeRangeError = UserOperationOutOfTimeRangeError;
Object.defineProperty(UserOperationOutOfTimeRangeError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32503
});
class UnknownBundlerError extends base_js_1.BaseError {
    constructor({ cause }) {
        super(`An error occurred while executing user operation: ${cause?.shortMessage}`, {
            cause,
            name: 'UnknownBundlerError',
        });
    }
}
exports.UnknownBundlerError = UnknownBundlerError;
class VerificationGasLimitExceededError extends base_js_1.BaseError {
    constructor({ cause, }) {
        super('User Operation verification gas limit exceeded.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- the gas used for verification exceeded the `verificationGasLimit`',
            ].filter(Boolean),
            name: 'VerificationGasLimitExceededError',
        });
    }
}
exports.VerificationGasLimitExceededError = VerificationGasLimitExceededError;
Object.defineProperty(VerificationGasLimitExceededError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa40/
});
class VerificationGasLimitTooLowError extends base_js_1.BaseError {
    constructor({ cause, }) {
        super('User Operation verification gas limit is too low.', {
            cause,
            metaMessages: [
                'This could arise when:',
                '- the `verificationGasLimit` is too low to verify the User Operation',
            ].filter(Boolean),
            name: 'VerificationGasLimitTooLowError',
        });
    }
}
exports.VerificationGasLimitTooLowError = VerificationGasLimitTooLowError;
Object.defineProperty(VerificationGasLimitTooLowError, "message", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /aa41/
});
//# sourceMappingURL=bundler.js.map