"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateContractGas = estimateContractGas;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const encodeFunctionData_js_1 = require("../../utils/abi/encodeFunctionData.js");
const getContractError_js_1 = require("../../utils/errors/getContractError.js");
const getAction_js_1 = require("../../utils/getAction.js");
const estimateGas_js_1 = require("./estimateGas.js");
async function estimateContractGas(client, parameters) {
    const { abi, address, args, functionName, ...request } = parameters;
    const data = (0, encodeFunctionData_js_1.encodeFunctionData)({
        abi,
        args,
        functionName,
    });
    try {
        const gas = await (0, getAction_js_1.getAction)(client, estimateGas_js_1.estimateGas, 'estimateGas')({
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
            docsPath: '/docs/contract/estimateContractGas',
            functionName,
            sender: account?.address,
        });
    }
}
//# sourceMappingURL=estimateContractGas.js.map