import { BaseError } from '../../errors/base.js';
import { ExecutionRevertedError, FeeCapTooHighError, FeeCapTooLowError, InsufficientFundsError, IntrinsicGasTooHighError, IntrinsicGasTooLowError, NonceMaxValueError, NonceTooHighError, NonceTooLowError, TipAboveFeeCapError, TransactionTypeNotSupportedError, UnknownNodeError, } from '../../errors/node.js';
import { RpcRequestError } from '../../errors/request.js';
import { InvalidInputRpcError, TransactionRejectedRpcError, } from '../../errors/rpc.js';
export function containsNodeError(err) {
    return (err instanceof TransactionRejectedRpcError ||
        err instanceof InvalidInputRpcError ||
        (err instanceof RpcRequestError && err.code === ExecutionRevertedError.code));
}
export function getNodeError(err, args) {
    const message = (err.details || '').toLowerCase();
    const executionRevertedError = err instanceof BaseError
        ? err.walk((e) => e?.code ===
            ExecutionRevertedError.code)
        : err;
    if (executionRevertedError instanceof BaseError)
        return new ExecutionRevertedError({
            cause: err,
            message: executionRevertedError.details,
        });
    if (ExecutionRevertedError.nodeMessage.test(message))
        return new ExecutionRevertedError({
            cause: err,
            message: err.details,
        });
    if (FeeCapTooHighError.nodeMessage.test(message))
        return new FeeCapTooHighError({
            cause: err,
            maxFeePerGas: args?.maxFeePerGas,
        });
    if (FeeCapTooLowError.nodeMessage.test(message))
        return new FeeCapTooLowError({
            cause: err,
            maxFeePerGas: args?.maxFeePerGas,
        });
    if (NonceTooHighError.nodeMessage.test(message))
        return new NonceTooHighError({ cause: err, nonce: args?.nonce });
    if (NonceTooLowError.nodeMessage.test(message))
        return new NonceTooLowError({ cause: err, nonce: args?.nonce });
    if (NonceMaxValueError.nodeMessage.test(message))
        return new NonceMaxValueError({ cause: err, nonce: args?.nonce });
    if (InsufficientFundsError.nodeMessage.test(message))
        return new InsufficientFundsError({ cause: err });
    if (IntrinsicGasTooHighError.nodeMessage.test(message))
        return new IntrinsicGasTooHighError({ cause: err, gas: args?.gas });
    if (IntrinsicGasTooLowError.nodeMessage.test(message))
        return new IntrinsicGasTooLowError({ cause: err, gas: args?.gas });
    if (TransactionTypeNotSupportedError.nodeMessage.test(message))
        return new TransactionTypeNotSupportedError({ cause: err });
    if (TipAboveFeeCapError.nodeMessage.test(message))
        return new TipAboveFeeCapError({
            cause: err,
            maxFeePerGas: args?.maxFeePerGas,
            maxPriorityFeePerGas: args?.maxPriorityFeePerGas,
        });
    return new UnknownNodeError({
        cause: err,
    });
}
//# sourceMappingURL=getNodeError.js.map