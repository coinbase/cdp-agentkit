"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateContractL1Gas = estimateContractL1Gas;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const encodeFunctionData_js_1 = require("../../utils/abi/encodeFunctionData.js");
const getContractError_js_1 = require("../../utils/errors/getContractError.js");
const estimateL1Gas_js_1 = require("./estimateL1Gas.js");
async function estimateContractL1Gas(client, parameters) {
    const { abi, address, args, functionName, ...request } = parameters;
    const data = (0, encodeFunctionData_js_1.encodeFunctionData)({
        abi,
        args,
        functionName,
    });
    try {
        const gas = await (0, estimateL1Gas_js_1.estimateL1Gas)(client, {
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
            docsPath: '/docs/chains/op-stack/estimateContractL1Gas',
            functionName,
            sender: account?.address,
        });
    }
}
//# sourceMappingURL=estimateContractL1Gas.js.map