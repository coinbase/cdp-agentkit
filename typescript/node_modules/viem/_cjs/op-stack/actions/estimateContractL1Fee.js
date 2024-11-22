"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateContractL1Fee = estimateContractL1Fee;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const encodeFunctionData_js_1 = require("../../utils/abi/encodeFunctionData.js");
const getContractError_js_1 = require("../../utils/errors/getContractError.js");
const estimateL1Fee_js_1 = require("./estimateL1Fee.js");
async function estimateContractL1Fee(client, parameters) {
    const { abi, address, args, functionName, ...request } = parameters;
    const data = (0, encodeFunctionData_js_1.encodeFunctionData)({
        abi,
        args,
        functionName,
    });
    try {
        const fee = await (0, estimateL1Fee_js_1.estimateL1Fee)(client, {
            data,
            to: address,
            ...request,
        });
        return fee;
    }
    catch (error) {
        const account = request.account ? (0, parseAccount_js_1.parseAccount)(request.account) : undefined;
        throw (0, getContractError_js_1.getContractError)(error, {
            abi,
            address,
            args,
            docsPath: '/docs/chains/op-stack/estimateContractL1Fee',
            functionName,
            sender: account?.address,
        });
    }
}
//# sourceMappingURL=estimateContractL1Fee.js.map