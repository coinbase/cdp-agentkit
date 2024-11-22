"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateContractTotalGas = estimateContractTotalGas;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const encodeFunctionData_js_1 = require("../../utils/abi/encodeFunctionData.js");
const getContractError_js_1 = require("../../utils/errors/getContractError.js");
const estimateTotalGas_js_1 = require("./estimateTotalGas.js");
async function estimateContractTotalGas(client, parameters) {
    const { abi, address, args, functionName, ...request } = parameters;
    const data = (0, encodeFunctionData_js_1.encodeFunctionData)({
        abi,
        args,
        functionName,
    });
    try {
        const gas = await (0, estimateTotalGas_js_1.estimateTotalGas)(client, {
            data,
            to: address,
            ...request,
        });
        return gas;
    }
    catch (error) {
        const account = request.account ? (0, parseAccount_js_1.parseAccount)(request.account) : undefined;
        throw (0, getContractError_js_1.getContractError)(error, {
            abi,
            address,
            args,
            docsPath: '/docs/chains/op-stack/estimateTotalGas',
            functionName,
            sender: account?.address,
        });
    }
}
//# sourceMappingURL=estimateContractTotalGas.js.map