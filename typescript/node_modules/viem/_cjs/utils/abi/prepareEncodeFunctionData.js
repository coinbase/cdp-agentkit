"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareEncodeFunctionData = prepareEncodeFunctionData;
const abi_js_1 = require("../../errors/abi.js");
const toFunctionSelector_js_1 = require("../hash/toFunctionSelector.js");
const formatAbiItem_js_1 = require("./formatAbiItem.js");
const getAbiItem_js_1 = require("./getAbiItem.js");
const docsPath = '/docs/contract/encodeFunctionData';
function prepareEncodeFunctionData(parameters) {
    const { abi, args, functionName } = parameters;
    let abiItem = abi[0];
    if (functionName) {
        const item = (0, getAbiItem_js_1.getAbiItem)({
            abi,
            args,
            name: functionName,
        });
        if (!item)
            throw new abi_js_1.AbiFunctionNotFoundError(functionName, { docsPath });
        abiItem = item;
    }
    if (abiItem.type !== 'function')
        throw new abi_js_1.AbiFunctionNotFoundError(undefined, { docsPath });
    return {
        abi: [abiItem],
        functionName: (0, toFunctionSelector_js_1.toFunctionSelector)((0, formatAbiItem_js_1.formatAbiItem)(abiItem)),
    };
}
//# sourceMappingURL=prepareEncodeFunctionData.js.map