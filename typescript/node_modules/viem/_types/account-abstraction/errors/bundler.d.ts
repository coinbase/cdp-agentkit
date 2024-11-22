import type { Address } from 'abitype';
import { BaseError } from '../../errors/base.js';
import type { Hex } from '../../types/misc.js';
export type AccountNotDeployedErrorType = AccountNotDeployedError & {
    name: 'AccountNotDeployedError';
};
export declare class AccountNotDeployedError extends BaseError {
    static message: RegExp;
    constructor({ cause, }: {
        cause?: BaseError | undefined;
    });
}
export type ExecutionRevertedErrorType = ExecutionRevertedError & {
    code: -32521;
    name: 'ExecutionRevertedError';
};
export declare class ExecutionRevertedError extends BaseError {
    static code: number;
    static message: RegExp;
    constructor({ cause, message, }?: {
        cause?: BaseError | undefined;
        message?: string | undefined;
    });
}
export type FailedToSendToBeneficiaryErrorType = FailedToSendToBeneficiaryError & {
    name: 'FailedToSendToBeneficiaryError';
};
export declare class FailedToSendToBeneficiaryError extends BaseError {
    static message: RegExp;
    constructor({ cause, }: {
        cause?: BaseError | undefined;
    });
}
export type GasValuesOverflowErrorType = GasValuesOverflowError & {
    name: 'GasValuesOverflowError';
};
export declare class GasValuesOverflowError extends BaseError {
    static message: RegExp;
    constructor({ cause, }: {
        cause?: BaseError | undefined;
    });
}
export type HandleOpsOutOfGasErrorType = HandleOpsOutOfGasError & {
    name: 'HandleOpsOutOfGasError';
};
export declare class HandleOpsOutOfGasError extends BaseError {
    static message: RegExp;
    constructor({ cause, }: {
        cause?: BaseError | undefined;
    });
}
export type InitCodeFailedErrorType = InitCodeFailedError & {
    name: 'InitCodeFailedError';
};
export declare class InitCodeFailedError extends BaseError {
    static message: RegExp;
    constructor({ cause, factory, factoryData, initCode, }: {
        cause?: BaseError | undefined;
        factory?: Address | undefined;
        factoryData?: Hex | undefined;
        initCode?: Hex | undefined;
    });
}
export type InitCodeMustCreateSenderErrorType = InitCodeMustCreateSenderError & {
    name: 'InitCodeMustCreateSenderError';
};
export declare class InitCodeMustCreateSenderError extends BaseError {
    static message: RegExp;
    constructor({ cause, factory, factoryData, initCode, }: {
        cause?: BaseError | undefined;
        factory?: Address | undefined;
        factoryData?: Hex | undefined;
        initCode?: Hex | undefined;
    });
}
export type InitCodeMustReturnSenderErrorType = InitCodeMustReturnSenderError & {
    name: 'InitCodeMustReturnSenderError';
};
export declare class InitCodeMustReturnSenderError extends BaseError {
    static message: RegExp;
    constructor({ cause, factory, factoryData, initCode, sender, }: {
        cause?: BaseError | undefined;
        factory?: Address | undefined;
        factoryData?: Hex | undefined;
        initCode?: Hex | undefined;
        sender?: Address | undefined;
    });
}
export type InsufficientPrefundErrorType = InsufficientPrefundError & {
    name: 'InsufficientPrefundError';
};
export declare class InsufficientPrefundError extends BaseError {
    static message: RegExp;
    constructor({ cause, }: {
        cause?: BaseError | undefined;
    });
}
export type InternalCallOnlyErrorType = InternalCallOnlyError & {
    name: 'InternalCallOnlyError';
};
export declare class InternalCallOnlyError extends BaseError {
    static message: RegExp;
    constructor({ cause, }: {
        cause?: BaseError | undefined;
    });
}
export type InvalidAggregatorErrorType = InvalidAggregatorError & {
    name: 'InvalidAggregatorError';
};
export declare class InvalidAggregatorError extends BaseError {
    static message: RegExp;
    constructor({ cause, }: {
        cause?: BaseError | undefined;
    });
}
export type InvalidAccountNonceErrorType = InvalidAccountNonceError & {
    name: 'InvalidAccountNonceError';
};
export declare class InvalidAccountNonceError extends BaseError {
    static message: RegExp;
    constructor({ cause, nonce, }: {
        cause?: BaseError | undefined;
        nonce?: bigint | undefined;
    });
}
export type InvalidBeneficiaryErrorType = InvalidBeneficiaryError & {
    name: 'InvalidBeneficiaryError';
};
export declare class InvalidBeneficiaryError extends BaseError {
    static message: RegExp;
    constructor({ cause, }: {
        cause?: BaseError | undefined;
    });
}
export type InvalidFieldsErrorType = InvalidFieldsError & {
    name: 'InvalidFieldsError';
};
export declare class InvalidFieldsError extends BaseError {
    static code: number;
    constructor({ cause, }: {
        cause?: BaseError | undefined;
    });
}
export type InvalidPaymasterAndDataErrorType = InvalidPaymasterAndDataError & {
    name: 'InvalidPaymasterAndDataError';
};
export declare class InvalidPaymasterAndDataError extends BaseError {
    static message: RegExp;
    constructor({ cause, paymasterAndData, }: {
        cause?: BaseError | undefined;
        paymasterAndData?: Hex | undefined;
    });
}
export type PaymasterDepositTooLowErrorType = PaymasterDepositTooLowError & {
    code: -32508;
    name: 'PaymasterDepositTooLowError';
};
export declare class PaymasterDepositTooLowError extends BaseError {
    static code: number;
    static message: RegExp;
    constructor({ cause, }: {
        cause?: BaseError | undefined;
    });
}
export type PaymasterFunctionRevertedErrorType = PaymasterFunctionRevertedError & {
    name: 'PaymasterFunctionRevertedError';
};
export declare class PaymasterFunctionRevertedError extends BaseError {
    static message: RegExp;
    constructor({ cause, }: {
        cause?: BaseError | undefined;
    });
}
export type PaymasterNotDeployedErrorType = PaymasterNotDeployedError & {
    name: 'PaymasterNotDeployedError';
};
export declare class PaymasterNotDeployedError extends BaseError {
    static message: RegExp;
    constructor({ cause, }: {
        cause?: BaseError | undefined;
    });
}
export type PaymasterRateLimitErrorType = PaymasterRateLimitError & {
    code: -32504;
    name: 'PaymasterRateLimitError';
};
export declare class PaymasterRateLimitError extends BaseError {
    static code: number;
    constructor({ cause }: {
        cause?: BaseError | undefined;
    });
}
export type PaymasterStakeTooLowErrorType = PaymasterStakeTooLowError & {
    code: -32505;
    name: 'PaymasterStakeTooLowError';
};
export declare class PaymasterStakeTooLowError extends BaseError {
    static code: number;
    constructor({ cause }: {
        cause?: BaseError | undefined;
    });
}
export type PaymasterPostOpFunctionRevertedErrorType = PaymasterPostOpFunctionRevertedError & {
    name: 'PaymasterPostOpFunctionRevertedError';
};
export declare class PaymasterPostOpFunctionRevertedError extends BaseError {
    static message: RegExp;
    constructor({ cause, }: {
        cause?: BaseError | undefined;
    });
}
export type SenderAlreadyConstructedErrorType = SenderAlreadyConstructedError & {
    name: 'SenderAlreadyConstructedError';
};
export declare class SenderAlreadyConstructedError extends BaseError {
    static message: RegExp;
    constructor({ cause, factory, factoryData, initCode, }: {
        cause?: BaseError | undefined;
        factory?: Address | undefined;
        factoryData?: Hex | undefined;
        initCode?: Hex | undefined;
    });
}
export type SignatureCheckFailedErrorType = SignatureCheckFailedError & {
    code: -32507;
    name: 'SignatureCheckFailedError';
};
export declare class SignatureCheckFailedError extends BaseError {
    static code: number;
    constructor({ cause }: {
        cause?: BaseError | undefined;
    });
}
export type SmartAccountFunctionRevertedErrorType = SmartAccountFunctionRevertedError & {
    name: 'SmartAccountFunctionRevertedError';
};
export declare class SmartAccountFunctionRevertedError extends BaseError {
    static message: RegExp;
    constructor({ cause, }: {
        cause?: BaseError | undefined;
    });
}
export type UnsupportedSignatureAggregatorErrorType = UnsupportedSignatureAggregatorError & {
    code: -32506;
    name: 'UnsupportedSignatureAggregatorError';
};
export declare class UnsupportedSignatureAggregatorError extends BaseError {
    static code: number;
    constructor({ cause }: {
        cause?: BaseError | undefined;
    });
}
export type UserOperationExpiredErrorType = UserOperationExpiredError & {
    name: 'UserOperationExpiredError';
};
export declare class UserOperationExpiredError extends BaseError {
    static message: RegExp;
    constructor({ cause, }: {
        cause?: BaseError | undefined;
    });
}
export type UserOperationPaymasterExpiredErrorType = UserOperationPaymasterExpiredError & {
    name: 'UserOperationPaymasterExpiredError';
};
export declare class UserOperationPaymasterExpiredError extends BaseError {
    static message: RegExp;
    constructor({ cause, }: {
        cause?: BaseError | undefined;
    });
}
export type UserOperationSignatureErrorType = UserOperationSignatureError & {
    name: 'UserOperationSignatureError';
};
export declare class UserOperationSignatureError extends BaseError {
    static message: RegExp;
    constructor({ cause, }: {
        cause?: BaseError | undefined;
    });
}
export type UserOperationPaymasterSignatureErrorType = UserOperationPaymasterSignatureError & {
    name: 'UserOperationPaymasterSignatureError';
};
export declare class UserOperationPaymasterSignatureError extends BaseError {
    static message: RegExp;
    constructor({ cause, }: {
        cause?: BaseError | undefined;
    });
}
export type UserOperationRejectedByEntryPointErrorType = UserOperationRejectedByEntryPointError & {
    code: -32500;
    name: 'UserOperationRejectedByEntryPointError';
};
export declare class UserOperationRejectedByEntryPointError extends BaseError {
    static code: number;
    constructor({ cause }: {
        cause?: BaseError | undefined;
    });
}
export type UserOperationRejectedByPaymasterErrorType = UserOperationRejectedByPaymasterError & {
    code: -32501;
    name: 'UserOperationRejectedByPaymasterError';
};
export declare class UserOperationRejectedByPaymasterError extends BaseError {
    static code: number;
    constructor({ cause }: {
        cause?: BaseError | undefined;
    });
}
export type UserOperationRejectedByOpCodeErrorType = UserOperationRejectedByOpCodeError & {
    code: -32502;
    name: 'UserOperationRejectedByOpCodeError';
};
export declare class UserOperationRejectedByOpCodeError extends BaseError {
    static code: number;
    constructor({ cause }: {
        cause?: BaseError | undefined;
    });
}
export type UserOperationOutOfTimeRangeErrorType = UserOperationOutOfTimeRangeError & {
    code: -32503;
    name: 'UserOperationOutOfTimeRangeError';
};
export declare class UserOperationOutOfTimeRangeError extends BaseError {
    static code: number;
    constructor({ cause }: {
        cause?: BaseError | undefined;
    });
}
export type UnknownBundlerErrorType = UnknownBundlerError & {
    name: 'UnknownBundlerError';
};
export declare class UnknownBundlerError extends BaseError {
    constructor({ cause }: {
        cause?: BaseError | undefined;
    });
}
export type VerificationGasLimitExceededErrorType = VerificationGasLimitExceededError & {
    name: 'VerificationGasLimitExceededError';
};
export declare class VerificationGasLimitExceededError extends BaseError {
    static message: RegExp;
    constructor({ cause, }: {
        cause?: BaseError | undefined;
    });
}
export type VerificationGasLimitTooLowErrorType = VerificationGasLimitTooLowError & {
    name: 'VerificationGasLimitTooLowError';
};
export declare class VerificationGasLimitTooLowError extends BaseError {
    static message: RegExp;
    constructor({ cause, }: {
        cause?: BaseError | undefined;
    });
}
//# sourceMappingURL=bundler.d.ts.map