"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPackedUserOperation = toPackedUserOperation;
const concat_js_1 = require("../../../utils/data/concat.js");
const pad_js_1 = require("../../../utils/data/pad.js");
const index_js_1 = require("../../../utils/index.js");
function toPackedUserOperation(userOperation) {
    const { callGasLimit, callData, factory, factoryData, maxPriorityFeePerGas, maxFeePerGas, paymaster, paymasterData, paymasterPostOpGasLimit, paymasterVerificationGasLimit, sender, signature = '0x', verificationGasLimit, } = userOperation;
    const accountGasLimits = (0, concat_js_1.concat)([
        (0, pad_js_1.pad)((0, index_js_1.numberToHex)(verificationGasLimit || 0n), { size: 16 }),
        (0, pad_js_1.pad)((0, index_js_1.numberToHex)(callGasLimit || 0n), { size: 16 }),
    ]);
    const initCode = factory && factoryData ? (0, concat_js_1.concat)([factory, factoryData]) : '0x';
    const gasFees = (0, concat_js_1.concat)([
        (0, pad_js_1.pad)((0, index_js_1.numberToHex)(maxPriorityFeePerGas || 0n), { size: 16 }),
        (0, pad_js_1.pad)((0, index_js_1.numberToHex)(maxFeePerGas || 0n), { size: 16 }),
    ]);
    const nonce = userOperation.nonce ?? 0n;
    const paymasterAndData = paymaster
        ? (0, concat_js_1.concat)([
            paymaster,
            (0, pad_js_1.pad)((0, index_js_1.numberToHex)(paymasterVerificationGasLimit || 0n), {
                size: 16,
            }),
            (0, pad_js_1.pad)((0, index_js_1.numberToHex)(paymasterPostOpGasLimit || 0n), {
                size: 16,
            }),
            paymasterData || '0x',
        ])
        : '0x';
    const preVerificationGas = userOperation.preVerificationGas ?? 0n;
    return {
        accountGasLimits,
        callData,
        initCode,
        gasFees,
        nonce,
        paymasterAndData,
        preVerificationGas,
        sender,
        signature,
    };
}
//# sourceMappingURL=toPackedUserOperation.js.map