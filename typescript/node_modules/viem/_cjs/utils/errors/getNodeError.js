"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containsNodeError = containsNodeError;
exports.getNodeError = getNodeError;
const base_js_1 = require("../../errors/base.js");
const node_js_1 = require("../../errors/node.js");
const request_js_1 = require("../../errors/request.js");
const rpc_js_1 = require("../../errors/rpc.js");
function containsNodeError(err) {
    return (err instanceof rpc_js_1.TransactionRejectedRpcError ||
        err instanceof rpc_js_1.InvalidInputRpcError ||
        (err instanceof request_js_1.RpcRequestError && err.code === node_js_1.ExecutionRevertedError.code));
}
function getNodeError(err, args) {
    const message = (err.details || '').toLowerCase();
    const executionRevertedError = err instanceof base_js_1.BaseError
        ? err.walk((e) => e?.code ===
            node_js_1.ExecutionRevertedError.code)
        : err;
    if (executionRevertedError instanceof base_js_1.BaseError)
        return new node_js_1.ExecutionRevertedError({
            cause: err,
            message: executionRevertedError.details,
        });
    if (node_js_1.ExecutionRevertedError.nodeMessage.test(message))
        return new node_js_1.ExecutionRevertedError({
            cause: err,
            message: err.details,
        });
    if (node_js_1.FeeCapTooHighError.nodeMessage.test(message))
        return new node_js_1.FeeCapTooHighError({
            cause: err,
            maxFeePerGas: args?.maxFeePerGas,
        });
    if (node_js_1.FeeCapTooLowError.nodeMessage.test(message))
        return new node_js_1.FeeCapTooLowError({
            cause: err,
            maxFeePerGas: args?.maxFeePerGas,
        });
    if (node_js_1.NonceTooHighError.nodeMessage.test(message))
        return new node_js_1.NonceTooHighError({ cause: err, nonce: args?.nonce });
    if (node_js_1.NonceTooLowError.nodeMessage.test(message))
        return new node_js_1.NonceTooLowError({ cause: err, nonce: args?.nonce });
    if (node_js_1.NonceMaxValueError.nodeMessage.test(message))
        return new node_js_1.NonceMaxValueError({ cause: err, nonce: args?.nonce });
    if (node_js_1.InsufficientFundsError.nodeMessage.test(message))
        return new node_js_1.InsufficientFundsError({ cause: err });
    if (node_js_1.IntrinsicGasTooHighError.nodeMessage.test(message))
        return new node_js_1.IntrinsicGasTooHighError({ cause: err, gas: args?.gas });
    if (node_js_1.IntrinsicGasTooLowError.nodeMessage.test(message))
        return new node_js_1.IntrinsicGasTooLowError({ cause: err, gas: args?.gas });
    if (node_js_1.TransactionTypeNotSupportedError.nodeMessage.test(message))
        return new node_js_1.TransactionTypeNotSupportedError({ cause: err });
    if (node_js_1.TipAboveFeeCapError.nodeMessage.test(message))
        return new node_js_1.TipAboveFeeCapError({
            cause: err,
            maxFeePerGas: args?.maxFeePerGas,
            maxPriorityFeePerGas: args?.maxPriorityFeePerGas,
        });
    return new node_js_1.UnknownNodeError({
        cause: err,
    });
}
//# sourceMappingURL=getNodeError.js.map