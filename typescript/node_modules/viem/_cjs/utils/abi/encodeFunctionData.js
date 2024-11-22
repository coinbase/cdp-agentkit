"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeFunctionData = encodeFunctionData;
const concat_js_1 = require("../data/concat.js");
const encodeAbiParameters_js_1 = require("./encodeAbiParameters.js");
const prepareEncodeFunctionData_js_1 = require("./prepareEncodeFunctionData.js");
function encodeFunctionData(parameters) {
    const { args } = parameters;
    const { abi, functionName } = (() => {
        if (parameters.abi.length === 1 &&
            parameters.functionName?.startsWith('0x'))
            return parameters;
        return (0, prepareEncodeFunctionData_js_1.prepareEncodeFunctionData)(parameters);
    })();
    const abiItem = abi[0];
    const signature = functionName;
    const data = 'inputs' in abiItem && abiItem.inputs
        ? (0, encodeAbiParameters_js_1.encodeAbiParameters)(abiItem.inputs, args ?? [])
        : undefined;
    return (0, concat_js_1.concatHex)([signature, data ?? '0x']);
}
//# sourceMappingURL=encodeFunctionData.js.map