"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeFunctionResult = decodeFunctionResult;
const abi_js_1 = require("../../errors/abi.js");
const decodeAbiParameters_js_1 = require("./decodeAbiParameters.js");
const getAbiItem_js_1 = require("./getAbiItem.js");
const docsPath = '/docs/contract/decodeFunctionResult';
function decodeFunctionResult(parameters) {
    const { abi, args, functionName, data } = parameters;
    let abiItem = abi[0];
    if (functionName) {
        const item = (0, getAbiItem_js_1.getAbiItem)({ abi, args, name: functionName });
        if (!item)
            throw new abi_js_1.AbiFunctionNotFoundError(functionName, { docsPath });
        abiItem = item;
    }
    if (abiItem.type !== 'function')
        throw new abi_js_1.AbiFunctionNotFoundError(undefined, { docsPath });
    if (!abiItem.outputs)
        throw new abi_js_1.AbiFunctionOutputsNotFoundError(abiItem.name, { docsPath });
    const values = (0, decodeAbiParameters_js_1.decodeAbiParameters)(abiItem.outputs, data);
    if (values && values.length > 1)
        return values;
    if (values && values.length === 1)
        return values[0];
    return undefined;
}
//# sourceMappingURL=decodeFunctionResult.js.map