export function formatUserOperation(parameters) {
    const userOperation = { ...parameters };
    if (parameters.callGasLimit)
        userOperation.callGasLimit = BigInt(parameters.callGasLimit);
    if (parameters.maxFeePerGas)
        userOperation.maxFeePerGas = BigInt(parameters.maxFeePerGas);
    if (parameters.maxPriorityFeePerGas)
        userOperation.maxPriorityFeePerGas = BigInt(parameters.maxPriorityFeePerGas);
    if (parameters.nonce)
        userOperation.nonce = BigInt(parameters.nonce);
    if (parameters.paymasterPostOpGasLimit)
        userOperation.paymasterPostOpGasLimit = BigInt(parameters.paymasterPostOpGasLimit);
    if (parameters.paymasterVerificationGasLimit)
        userOperation.paymasterVerificationGasLimit = BigInt(parameters.paymasterVerificationGasLimit);
    if (parameters.preVerificationGas)
        userOperation.preVerificationGas = BigInt(parameters.preVerificationGas);
    if (parameters.verificationGasLimit)
        userOperation.verificationGasLimit = BigInt(parameters.verificationGasLimit);
    return userOperation;
}
//# sourceMappingURL=userOperation.js.map