"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readContract = readContract;
const decodeFunctionResult_js_1 = require("../../utils/abi/decodeFunctionResult.js");
const encodeFunctionData_js_1 = require("../../utils/abi/encodeFunctionData.js");
const getContractError_js_1 = require("../../utils/errors/getContractError.js");
const getAction_js_1 = require("../../utils/getAction.js");
const call_js_1 = require("./call.js");
async function readContract(client, parameters) {
    const { abi, address, args, functionName, ...rest } = parameters;
    const calldata = (0, encodeFunctionData_js_1.encodeFunctionData)({
        abi,
        args,
        functionName,
    });
    try {
        const { data } = await (0, getAction_js_1.getAction)(client, call_js_1.call, 'call')({
            ...rest,
            data: calldata,
            to: address,
        });
        return (0, decodeFunctionResult_js_1.decodeFunctionResult)({
            abi,
            args,
            functionName,
            data: data || '0x',
        });
    }
    catch (error) {
        throw (0, getContractError_js_1.getContractError)(error, {
            abi,
            address,
            args,
            docsPath: '/docs/contract/readContract',
            functionName,
        });
    }
}
//# sourceMappingURL=readContract.js.map