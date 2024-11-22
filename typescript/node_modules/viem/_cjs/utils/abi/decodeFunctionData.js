"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeFunctionData = decodeFunctionData;
const abi_js_1 = require("../../errors/abi.js");
const slice_js_1 = require("../data/slice.js");
const toFunctionSelector_js_1 = require("../hash/toFunctionSelector.js");
const decodeAbiParameters_js_1 = require("./decodeAbiParameters.js");
const formatAbiItem_js_1 = require("./formatAbiItem.js");
function decodeFunctionData(parameters) {
    const { abi, data } = parameters;
    const signature = (0, slice_js_1.slice)(data, 0, 4);
    const description = abi.find((x) => x.type === 'function' &&
        signature === (0, toFunctionSelector_js_1.toFunctionSelector)((0, formatAbiItem_js_1.formatAbiItem)(x)));
    if (!description)
        throw new abi_js_1.AbiFunctionSignatureNotFoundError(signature, {
            docsPath: '/docs/contract/decodeFunctionData',
        });
    return {
        functionName: description.name,
        args: ('inputs' in description &&
            description.inputs &&
            description.inputs.length > 0
            ? (0, decodeAbiParameters_js_1.decodeAbiParameters)(description.inputs, (0, slice_js_1.slice)(data, 4))
            : undefined),
    };
}
//# sourceMappingURL=decodeFunctionData.js.map