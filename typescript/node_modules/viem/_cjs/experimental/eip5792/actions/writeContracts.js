"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeContracts = writeContracts;
const encodeFunctionData_js_1 = require("../../../utils/abi/encodeFunctionData.js");
const getAction_js_1 = require("../../../utils/getAction.js");
const sendCalls_js_1 = require("./sendCalls.js");
async function writeContracts(client, parameters) {
    const contracts = parameters.contracts;
    const calls = contracts.map((contract) => {
        const { address, abi, functionName, args, value } = contract;
        return {
            data: (0, encodeFunctionData_js_1.encodeFunctionData)({
                abi,
                functionName,
                args,
            }),
            to: address,
            value,
        };
    });
    return (0, getAction_js_1.getAction)(client, sendCalls_js_1.sendCalls, 'sendCalls')({ ...parameters, calls });
}
//# sourceMappingURL=writeContracts.js.map