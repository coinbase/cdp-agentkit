"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateContract = simulateContract;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const decodeFunctionResult_js_1 = require("../../utils/abi/decodeFunctionResult.js");
const encodeFunctionData_js_1 = require("../../utils/abi/encodeFunctionData.js");
const getContractError_js_1 = require("../../utils/errors/getContractError.js");
const getAction_js_1 = require("../../utils/getAction.js");
const call_js_1 = require("./call.js");
async function simulateContract(client, parameters) {
    const { abi, address, args, dataSuffix, functionName, ...callRequest } = parameters;
    const account = callRequest.account
        ? (0, parseAccount_js_1.parseAccount)(callRequest.account)
        : client.account;
    const calldata = (0, encodeFunctionData_js_1.encodeFunctionData)({ abi, args, functionName });
    try {
        const { data } = await (0, getAction_js_1.getAction)(client, call_js_1.call, 'call')({
            batch: false,
            data: `${calldata}${dataSuffix ? dataSuffix.replace('0x', '') : ''}`,
            to: address,
            ...callRequest,
            account,
        });
        const result = (0, decodeFunctionResult_js_1.decodeFunctionResult)({
            abi,
            args,
            functionName,
            data: data || '0x',
        });
        const minimizedAbi = abi.filter((abiItem) => 'name' in abiItem && abiItem.name === parameters.functionName);
        return {
            result,
            request: {
                abi: minimizedAbi,
                address,
                args,
                dataSuffix,
                functionName,
                ...callRequest,
                account,
            },
        };
    }
    catch (error) {
        throw (0, getContractError_js_1.getContractError)(error, {
            abi,
            address,
            args,
            docsPath: '/docs/contract/simulateContract',
            functionName,
            sender: account?.address,
        });
    }
}
//# sourceMappingURL=simulateContract.js.map