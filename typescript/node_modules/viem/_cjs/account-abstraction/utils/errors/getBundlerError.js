"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBundlerError = getBundlerError;
const bundler_js_1 = require("../../errors/bundler.js");
const bundlerErrors = [
    bundler_js_1.ExecutionRevertedError,
    bundler_js_1.InvalidFieldsError,
    bundler_js_1.PaymasterDepositTooLowError,
    bundler_js_1.PaymasterRateLimitError,
    bundler_js_1.PaymasterStakeTooLowError,
    bundler_js_1.SignatureCheckFailedError,
    bundler_js_1.UnsupportedSignatureAggregatorError,
    bundler_js_1.UserOperationOutOfTimeRangeError,
    bundler_js_1.UserOperationRejectedByEntryPointError,
    bundler_js_1.UserOperationRejectedByPaymasterError,
    bundler_js_1.UserOperationRejectedByOpCodeError,
];
function getBundlerError(err, args) {
    const message = (err.details || '').toLowerCase();
    if (bundler_js_1.AccountNotDeployedError.message.test(message))
        return new bundler_js_1.AccountNotDeployedError({
            cause: err,
        });
    if (bundler_js_1.FailedToSendToBeneficiaryError.message.test(message))
        return new bundler_js_1.FailedToSendToBeneficiaryError({
            cause: err,
        });
    if (bundler_js_1.GasValuesOverflowError.message.test(message))
        return new bundler_js_1.GasValuesOverflowError({
            cause: err,
        });
    if (bundler_js_1.HandleOpsOutOfGasError.message.test(message))
        return new bundler_js_1.HandleOpsOutOfGasError({
            cause: err,
        });
    if (bundler_js_1.InitCodeFailedError.message.test(message))
        return new bundler_js_1.InitCodeFailedError({
            cause: err,
            factory: args.factory,
            factoryData: args.factoryData,
            initCode: args.initCode,
        });
    if (bundler_js_1.InitCodeMustCreateSenderError.message.test(message))
        return new bundler_js_1.InitCodeMustCreateSenderError({
            cause: err,
            factory: args.factory,
            factoryData: args.factoryData,
            initCode: args.initCode,
        });
    if (bundler_js_1.InitCodeMustReturnSenderError.message.test(message))
        return new bundler_js_1.InitCodeMustReturnSenderError({
            cause: err,
            factory: args.factory,
            factoryData: args.factoryData,
            initCode: args.initCode,
            sender: args.sender,
        });
    if (bundler_js_1.InsufficientPrefundError.message.test(message))
        return new bundler_js_1.InsufficientPrefundError({
            cause: err,
        });
    if (bundler_js_1.InternalCallOnlyError.message.test(message))
        return new bundler_js_1.InternalCallOnlyError({
            cause: err,
        });
    if (bundler_js_1.InvalidAccountNonceError.message.test(message))
        return new bundler_js_1.InvalidAccountNonceError({
            cause: err,
            nonce: args.nonce,
        });
    if (bundler_js_1.InvalidAggregatorError.message.test(message))
        return new bundler_js_1.InvalidAggregatorError({
            cause: err,
        });
    if (bundler_js_1.InvalidBeneficiaryError.message.test(message))
        return new bundler_js_1.InvalidBeneficiaryError({
            cause: err,
        });
    if (bundler_js_1.InvalidPaymasterAndDataError.message.test(message))
        return new bundler_js_1.InvalidPaymasterAndDataError({
            cause: err,
        });
    if (bundler_js_1.PaymasterDepositTooLowError.message.test(message))
        return new bundler_js_1.PaymasterDepositTooLowError({
            cause: err,
        });
    if (bundler_js_1.PaymasterFunctionRevertedError.message.test(message))
        return new bundler_js_1.PaymasterFunctionRevertedError({
            cause: err,
        });
    if (bundler_js_1.PaymasterNotDeployedError.message.test(message))
        return new bundler_js_1.PaymasterNotDeployedError({
            cause: err,
        });
    if (bundler_js_1.PaymasterPostOpFunctionRevertedError.message.test(message))
        return new bundler_js_1.PaymasterPostOpFunctionRevertedError({
            cause: err,
        });
    if (bundler_js_1.SmartAccountFunctionRevertedError.message.test(message))
        return new bundler_js_1.SmartAccountFunctionRevertedError({
            cause: err,
        });
    if (bundler_js_1.SenderAlreadyConstructedError.message.test(message))
        return new bundler_js_1.SenderAlreadyConstructedError({
            cause: err,
            factory: args.factory,
            factoryData: args.factoryData,
            initCode: args.initCode,
        });
    if (bundler_js_1.UserOperationExpiredError.message.test(message))
        return new bundler_js_1.UserOperationExpiredError({
            cause: err,
        });
    if (bundler_js_1.UserOperationPaymasterExpiredError.message.test(message))
        return new bundler_js_1.UserOperationPaymasterExpiredError({
            cause: err,
        });
    if (bundler_js_1.UserOperationPaymasterSignatureError.message.test(message))
        return new bundler_js_1.UserOperationPaymasterSignatureError({
            cause: err,
        });
    if (bundler_js_1.UserOperationSignatureError.message.test(message))
        return new bundler_js_1.UserOperationSignatureError({
            cause: err,
        });
    if (bundler_js_1.VerificationGasLimitExceededError.message.test(message))
        return new bundler_js_1.VerificationGasLimitExceededError({
            cause: err,
        });
    if (bundler_js_1.VerificationGasLimitTooLowError.message.test(message))
        return new bundler_js_1.VerificationGasLimitTooLowError({
            cause: err,
        });
    const error = err.walk((e) => bundlerErrors.some((error) => error.code === e.code));
    if (error) {
        if (error.code === bundler_js_1.ExecutionRevertedError.code)
            return new bundler_js_1.ExecutionRevertedError({
                cause: err,
                message: error.details,
            });
        if (error.code === bundler_js_1.InvalidFieldsError.code)
            return new bundler_js_1.InvalidFieldsError({
                cause: err,
            });
        if (error.code === bundler_js_1.PaymasterDepositTooLowError.code)
            return new bundler_js_1.PaymasterDepositTooLowError({
                cause: err,
            });
        if (error.code === bundler_js_1.PaymasterRateLimitError.code)
            return new bundler_js_1.PaymasterRateLimitError({
                cause: err,
            });
        if (error.code === bundler_js_1.PaymasterStakeTooLowError.code)
            return new bundler_js_1.PaymasterStakeTooLowError({
                cause: err,
            });
        if (error.code === bundler_js_1.SignatureCheckFailedError.code)
            return new bundler_js_1.SignatureCheckFailedError({
                cause: err,
            });
        if (error.code === bundler_js_1.UnsupportedSignatureAggregatorError.code)
            return new bundler_js_1.UnsupportedSignatureAggregatorError({
                cause: err,
            });
        if (error.code === bundler_js_1.UserOperationOutOfTimeRangeError.code)
            return new bundler_js_1.UserOperationOutOfTimeRangeError({
                cause: err,
            });
        if (error.code === bundler_js_1.UserOperationRejectedByEntryPointError.code)
            return new bundler_js_1.UserOperationRejectedByEntryPointError({
                cause: err,
            });
        if (error.code === bundler_js_1.UserOperationRejectedByPaymasterError.code)
            return new bundler_js_1.UserOperationRejectedByPaymasterError({
                cause: err,
            });
        if (error.code === bundler_js_1.UserOperationRejectedByOpCodeError.code)
            return new bundler_js_1.UserOperationRejectedByOpCodeError({
                cause: err,
            });
    }
    return new bundler_js_1.UnknownBundlerError({
        cause: err,
    });
}
//# sourceMappingURL=getBundlerError.js.map