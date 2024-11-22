"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymasterData = getPaymasterData;
const fromHex_js_1 = require("../../../utils/encoding/fromHex.js");
const toHex_js_1 = require("../../../utils/encoding/toHex.js");
const userOperationRequest_js_1 = require("../../utils/formatters/userOperationRequest.js");
async function getPaymasterData(client, parameters) {
    const { chainId, entryPointAddress, context, ...userOperation } = parameters;
    const request = (0, userOperationRequest_js_1.formatUserOperationRequest)(userOperation);
    const { paymasterPostOpGasLimit, paymasterVerificationGasLimit, ...rest } = await client.request({
        method: 'pm_getPaymasterData',
        params: [
            {
                ...request,
                callGasLimit: request.callGasLimit ?? '0x0',
                verificationGasLimit: request.verificationGasLimit ?? '0x0',
                preVerificationGas: request.preVerificationGas ?? '0x0',
            },
            entryPointAddress,
            (0, toHex_js_1.numberToHex)(chainId),
            context,
        ],
    });
    return {
        ...rest,
        ...(paymasterPostOpGasLimit && {
            paymasterPostOpGasLimit: (0, fromHex_js_1.hexToBigInt)(paymasterPostOpGasLimit),
        }),
        ...(paymasterVerificationGasLimit && {
            paymasterVerificationGasLimit: (0, fromHex_js_1.hexToBigInt)(paymasterVerificationGasLimit),
        }),
    };
}
//# sourceMappingURL=getPaymasterData.js.map