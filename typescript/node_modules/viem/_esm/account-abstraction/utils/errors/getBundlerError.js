import { AccountNotDeployedError, ExecutionRevertedError, FailedToSendToBeneficiaryError, GasValuesOverflowError, HandleOpsOutOfGasError, InitCodeFailedError, InitCodeMustCreateSenderError, InitCodeMustReturnSenderError, InsufficientPrefundError, InternalCallOnlyError, InvalidAccountNonceError, InvalidAggregatorError, InvalidBeneficiaryError, InvalidFieldsError, InvalidPaymasterAndDataError, PaymasterDepositTooLowError, PaymasterFunctionRevertedError, PaymasterNotDeployedError, PaymasterPostOpFunctionRevertedError, PaymasterRateLimitError, PaymasterStakeTooLowError, SenderAlreadyConstructedError, SignatureCheckFailedError, SmartAccountFunctionRevertedError, UnknownBundlerError, UnsupportedSignatureAggregatorError, UserOperationExpiredError, UserOperationOutOfTimeRangeError, UserOperationPaymasterExpiredError, UserOperationPaymasterSignatureError, UserOperationRejectedByEntryPointError, UserOperationRejectedByOpCodeError, UserOperationRejectedByPaymasterError, UserOperationSignatureError, VerificationGasLimitExceededError, VerificationGasLimitTooLowError, } from '../../errors/bundler.js';
const bundlerErrors = [
    ExecutionRevertedError,
    InvalidFieldsError,
    PaymasterDepositTooLowError,
    PaymasterRateLimitError,
    PaymasterStakeTooLowError,
    SignatureCheckFailedError,
    UnsupportedSignatureAggregatorError,
    UserOperationOutOfTimeRangeError,
    UserOperationRejectedByEntryPointError,
    UserOperationRejectedByPaymasterError,
    UserOperationRejectedByOpCodeError,
];
export function getBundlerError(err, args) {
    const message = (err.details || '').toLowerCase();
    if (AccountNotDeployedError.message.test(message))
        return new AccountNotDeployedError({
            cause: err,
        });
    if (FailedToSendToBeneficiaryError.message.test(message))
        return new FailedToSendToBeneficiaryError({
            cause: err,
        });
    if (GasValuesOverflowError.message.test(message))
        return new GasValuesOverflowError({
            cause: err,
        });
    if (HandleOpsOutOfGasError.message.test(message))
        return new HandleOpsOutOfGasError({
            cause: err,
        });
    if (InitCodeFailedError.message.test(message))
        return new InitCodeFailedError({
            cause: err,
            factory: args.factory,
            factoryData: args.factoryData,
            initCode: args.initCode,
        });
    if (InitCodeMustCreateSenderError.message.test(message))
        return new InitCodeMustCreateSenderError({
            cause: err,
            factory: args.factory,
            factoryData: args.factoryData,
            initCode: args.initCode,
        });
    if (InitCodeMustReturnSenderError.message.test(message))
        return new InitCodeMustReturnSenderError({
            cause: err,
            factory: args.factory,
            factoryData: args.factoryData,
            initCode: args.initCode,
            sender: args.sender,
        });
    if (InsufficientPrefundError.message.test(message))
        return new InsufficientPrefundError({
            cause: err,
        });
    if (InternalCallOnlyError.message.test(message))
        return new InternalCallOnlyError({
            cause: err,
        });
    if (InvalidAccountNonceError.message.test(message))
        return new InvalidAccountNonceError({
            cause: err,
            nonce: args.nonce,
        });
    if (InvalidAggregatorError.message.test(message))
        return new InvalidAggregatorError({
            cause: err,
        });
    if (InvalidBeneficiaryError.message.test(message))
        return new InvalidBeneficiaryError({
            cause: err,
        });
    if (InvalidPaymasterAndDataError.message.test(message))
        return new InvalidPaymasterAndDataError({
            cause: err,
        });
    if (PaymasterDepositTooLowError.message.test(message))
        return new PaymasterDepositTooLowError({
            cause: err,
        });
    if (PaymasterFunctionRevertedError.message.test(message))
        return new PaymasterFunctionRevertedError({
            cause: err,
        });
    if (PaymasterNotDeployedError.message.test(message))
        return new PaymasterNotDeployedError({
            cause: err,
        });
    if (PaymasterPostOpFunctionRevertedError.message.test(message))
        return new PaymasterPostOpFunctionRevertedError({
            cause: err,
        });
    if (SmartAccountFunctionRevertedError.message.test(message))
        return new SmartAccountFunctionRevertedError({
            cause: err,
        });
    if (SenderAlreadyConstructedError.message.test(message))
        return new SenderAlreadyConstructedError({
            cause: err,
            factory: args.factory,
            factoryData: args.factoryData,
            initCode: args.initCode,
        });
    if (UserOperationExpiredError.message.test(message))
        return new UserOperationExpiredError({
            cause: err,
        });
    if (UserOperationPaymasterExpiredError.message.test(message))
        return new UserOperationPaymasterExpiredError({
            cause: err,
        });
    if (UserOperationPaymasterSignatureError.message.test(message))
        return new UserOperationPaymasterSignatureError({
            cause: err,
        });
    if (UserOperationSignatureError.message.test(message))
        return new UserOperationSignatureError({
            cause: err,
        });
    if (VerificationGasLimitExceededError.message.test(message))
        return new VerificationGasLimitExceededError({
            cause: err,
        });
    if (VerificationGasLimitTooLowError.message.test(message))
        return new VerificationGasLimitTooLowError({
            cause: err,
        });
    const error = err.walk((e) => bundlerErrors.some((error) => error.code === e.code));
    if (error) {
        if (error.code === ExecutionRevertedError.code)
            return new ExecutionRevertedError({
                cause: err,
                message: error.details,
            });
        if (error.code === InvalidFieldsError.code)
            return new InvalidFieldsError({
                cause: err,
            });
        if (error.code === PaymasterDepositTooLowError.code)
            return new PaymasterDepositTooLowError({
                cause: err,
            });
        if (error.code === PaymasterRateLimitError.code)
            return new PaymasterRateLimitError({
                cause: err,
            });
        if (error.code === PaymasterStakeTooLowError.code)
            return new PaymasterStakeTooLowError({
                cause: err,
            });
        if (error.code === SignatureCheckFailedError.code)
            return new SignatureCheckFailedError({
                cause: err,
            });
        if (error.code === UnsupportedSignatureAggregatorError.code)
            return new UnsupportedSignatureAggregatorError({
                cause: err,
            });
        if (error.code === UserOperationOutOfTimeRangeError.code)
            return new UserOperationOutOfTimeRangeError({
                cause: err,
            });
        if (error.code === UserOperationRejectedByEntryPointError.code)
            return new UserOperationRejectedByEntryPointError({
                cause: err,
            });
        if (error.code === UserOperationRejectedByPaymasterError.code)
            return new UserOperationRejectedByPaymasterError({
                cause: err,
            });
        if (error.code === UserOperationRejectedByOpCodeError.code)
            return new UserOperationRejectedByOpCodeError({
                cause: err,
            });
    }
    return new UnknownBundlerError({
        cause: err,
    });
}
//# sourceMappingURL=getBundlerError.js.map