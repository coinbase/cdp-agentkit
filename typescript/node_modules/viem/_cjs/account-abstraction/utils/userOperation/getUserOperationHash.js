"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserOperationHash = getUserOperationHash;
const encodeAbiParameters_js_1 = require("../../../utils/abi/encodeAbiParameters.js");
const concat_js_1 = require("../../../utils/data/concat.js");
const pad_js_1 = require("../../../utils/data/pad.js");
const toHex_js_1 = require("../../../utils/encoding/toHex.js");
const keccak256_js_1 = require("../../../utils/hash/keccak256.js");
function getUserOperationHash(parameters) {
    const { chainId, entryPointAddress, entryPointVersion } = parameters;
    const userOperation = parameters.userOperation;
    const { callData, callGasLimit, initCode, maxFeePerGas, maxPriorityFeePerGas, nonce, paymasterAndData, preVerificationGas, sender, verificationGasLimit, } = userOperation;
    const packedUserOp = (() => {
        if (entryPointVersion === '0.6') {
            return (0, encodeAbiParameters_js_1.encodeAbiParameters)([
                { type: 'address' },
                { type: 'uint256' },
                { type: 'bytes32' },
                { type: 'bytes32' },
                { type: 'uint256' },
                { type: 'uint256' },
                { type: 'uint256' },
                { type: 'uint256' },
                { type: 'uint256' },
                { type: 'bytes32' },
            ], [
                sender,
                nonce,
                (0, keccak256_js_1.keccak256)(initCode ?? '0x'),
                (0, keccak256_js_1.keccak256)(callData ?? '0x'),
                callGasLimit,
                verificationGasLimit,
                preVerificationGas,
                maxFeePerGas,
                maxPriorityFeePerGas,
                (0, keccak256_js_1.keccak256)(paymasterAndData ?? '0x'),
            ]);
        }
        if (entryPointVersion === '0.7') {
            const accountGasLimits = (0, concat_js_1.concat)([
                (0, pad_js_1.pad)((0, toHex_js_1.numberToHex)(userOperation.verificationGasLimit), { size: 16 }),
                (0, pad_js_1.pad)((0, toHex_js_1.numberToHex)(userOperation.callGasLimit), { size: 16 }),
            ]);
            const callData_hashed = (0, keccak256_js_1.keccak256)(callData);
            const gasFees = (0, concat_js_1.concat)([
                (0, pad_js_1.pad)((0, toHex_js_1.numberToHex)(userOperation.maxPriorityFeePerGas), { size: 16 }),
                (0, pad_js_1.pad)((0, toHex_js_1.numberToHex)(userOperation.maxFeePerGas), { size: 16 }),
            ]);
            const initCode_hashed = (0, keccak256_js_1.keccak256)(userOperation.factory && userOperation.factoryData
                ? (0, concat_js_1.concat)([userOperation.factory, userOperation.factoryData])
                : '0x');
            const paymasterAndData_hashed = (0, keccak256_js_1.keccak256)(userOperation.paymaster
                ? (0, concat_js_1.concat)([
                    userOperation.paymaster,
                    (0, pad_js_1.pad)((0, toHex_js_1.numberToHex)(userOperation.paymasterVerificationGasLimit || 0), {
                        size: 16,
                    }),
                    (0, pad_js_1.pad)((0, toHex_js_1.numberToHex)(userOperation.paymasterPostOpGasLimit || 0), {
                        size: 16,
                    }),
                    userOperation.paymasterData || '0x',
                ])
                : '0x');
            return (0, encodeAbiParameters_js_1.encodeAbiParameters)([
                { type: 'address' },
                { type: 'uint256' },
                { type: 'bytes32' },
                { type: 'bytes32' },
                { type: 'bytes32' },
                { type: 'uint256' },
                { type: 'bytes32' },
                { type: 'bytes32' },
            ], [
                sender,
                nonce,
                initCode_hashed,
                callData_hashed,
                accountGasLimits,
                preVerificationGas,
                gasFees,
                paymasterAndData_hashed,
            ]);
        }
        throw new Error(`entryPointVersion "${entryPointVersion}" not supported.`);
    })();
    return (0, keccak256_js_1.keccak256)((0, encodeAbiParameters_js_1.encodeAbiParameters)([{ type: 'bytes32' }, { type: 'address' }, { type: 'uint256' }], [(0, keccak256_js_1.keccak256)(packedUserOp), entryPointAddress, BigInt(chainId)]));
}
//# sourceMappingURL=getUserOperationHash.js.map