import type { SendTransactionParameters } from '../../actions/wallet/sendTransaction.js';
import { BaseError } from '../../errors/base.js';
import { type ExecutionRevertedErrorType, type FeeCapTooHighErrorType, type FeeCapTooLowErrorType, type InsufficientFundsErrorType, type IntrinsicGasTooHighErrorType, type IntrinsicGasTooLowErrorType, type NonceMaxValueErrorType, type NonceTooHighErrorType, type NonceTooLowErrorType, type TipAboveFeeCapErrorType, type TransactionTypeNotSupportedErrorType, type UnknownNodeErrorType } from '../../errors/node.js';
import type { ExactPartial } from '../../types/utils.js';
export declare function containsNodeError(err: BaseError): boolean;
export type GetNodeErrorParameters = ExactPartial<SendTransactionParameters<any>>;
export type GetNodeErrorReturnType = ExecutionRevertedErrorType | FeeCapTooHighErrorType | FeeCapTooLowErrorType | NonceTooHighErrorType | NonceTooLowErrorType | NonceMaxValueErrorType | InsufficientFundsErrorType | IntrinsicGasTooHighErrorType | IntrinsicGasTooLowErrorType | TransactionTypeNotSupportedErrorType | TipAboveFeeCapErrorType | UnknownNodeErrorType;
export declare function getNodeError(err: BaseError, args: GetNodeErrorParameters): GetNodeErrorReturnType;
//# sourceMappingURL=getNodeError.d.ts.map