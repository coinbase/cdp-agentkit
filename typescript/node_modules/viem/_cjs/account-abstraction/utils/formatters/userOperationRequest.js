"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUserOperationRequest = formatUserOperationRequest;
const toHex_js_1 = require("../../../utils/encoding/toHex.js");
function formatUserOperationRequest(request) {
    const rpcRequest = {};
    if (typeof request.callData !== 'undefined')
        rpcRequest.callData = request.callData;
    if (typeof request.callGasLimit !== 'undefined')
        rpcRequest.callGasLimit = (0, toHex_js_1.numberToHex)(request.callGasLimit);
    if (typeof request.factory !== 'undefined')
        rpcRequest.factory = request.factory;
    if (typeof request.factoryData !== 'undefined')
        rpcRequest.factoryData = request.factoryData;
    if (typeof request.initCode !== 'undefined')
        rpcRequest.initCode = request.initCode;
    if (typeof request.maxFeePerGas !== 'undefined')
        rpcRequest.maxFeePerGas = (0, toHex_js_1.numberToHex)(request.maxFeePerGas);
    if (typeof request.maxPriorityFeePerGas !== 'undefined')
        rpcRequest.maxPriorityFeePerGas = (0, toHex_js_1.numberToHex)(request.maxPriorityFeePerGas);
    if (typeof request.nonce !== 'undefined')
        rpcRequest.nonce = (0, toHex_js_1.numberToHex)(request.nonce);
    if (typeof request.paymaster !== 'undefined')
        rpcRequest.paymaster = request.paymaster;
    if (typeof request.paymasterAndData !== 'undefined')
        rpcRequest.paymasterAndData = request.paymasterAndData || '0x';
    if (typeof request.paymasterData !== 'undefined')
        rpcRequest.paymasterData = request.paymasterData;
    if (typeof request.paymasterPostOpGasLimit !== 'undefined')
        rpcRequest.paymasterPostOpGasLimit = (0, toHex_js_1.numberToHex)(request.paymasterPostOpGasLimit);
    if (typeof request.paymasterVerificationGasLimit !== 'undefined')
        rpcRequest.paymasterVerificationGasLimit = (0, toHex_js_1.numberToHex)(request.paymasterVerificationGasLimit);
    if (typeof request.preVerificationGas !== 'undefined')
        rpcRequest.preVerificationGas = (0, toHex_js_1.numberToHex)(request.preVerificationGas);
    if (typeof request.sender !== 'undefined')
        rpcRequest.sender = request.sender;
    if (typeof request.signature !== 'undefined')
        rpcRequest.signature = request.signature;
    if (typeof request.verificationGasLimit !== 'undefined')
        rpcRequest.verificationGasLimit = (0, toHex_js_1.numberToHex)(request.verificationGasLimit);
    return rpcRequest;
}
//# sourceMappingURL=userOperationRequest.js.map