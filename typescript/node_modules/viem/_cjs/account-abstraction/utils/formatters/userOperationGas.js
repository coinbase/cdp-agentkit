"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUserOperationGas = formatUserOperationGas;
function formatUserOperationGas(parameters) {
    const gas = {};
    if (parameters.callGasLimit)
        gas.callGasLimit = BigInt(parameters.callGasLimit);
    if (parameters.preVerificationGas)
        gas.preVerificationGas = BigInt(parameters.preVerificationGas);
    if (parameters.verificationGasLimit)
        gas.verificationGasLimit = BigInt(parameters.verificationGasLimit);
    if (parameters.paymasterPostOpGasLimit)
        gas.paymasterPostOpGasLimit = BigInt(parameters.paymasterPostOpGasLimit);
    if (parameters.paymasterVerificationGasLimit)
        gas.paymasterVerificationGasLimit = BigInt(parameters.paymasterVerificationGasLimit);
    return gas;
}
//# sourceMappingURL=userOperationGas.js.map