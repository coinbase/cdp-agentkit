"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeErrorResult = encodeErrorResult;
const abi_js_1 = require("../../errors/abi.js");
const concat_js_1 = require("../data/concat.js");
const toFunctionSelector_js_1 = require("../hash/toFunctionSelector.js");
const encodeAbiParameters_js_1 = require("./encodeAbiParameters.js");
const formatAbiItem_js_1 = require("./formatAbiItem.js");
const getAbiItem_js_1 = require("./getAbiItem.js");
const docsPath = '/docs/contract/encodeErrorResult';
function encodeErrorResult(parameters) {
    const { abi, errorName, args } = parameters;
    let abiItem = abi[0];
    if (errorName) {
        const item = (0, getAbiItem_js_1.getAbiItem)({ abi, args, name: errorName });
        if (!item)
            throw new abi_js_1.AbiErrorNotFoundError(errorName, { docsPath });
        abiItem = item;
    }
    if (abiItem.type !== 'error')
        throw new abi_js_1.AbiErrorNotFoundError(undefined, { docsPath });
    const definition = (0, formatAbiItem_js_1.formatAbiItem)(abiItem);
    const signature = (0, toFunctionSelector_js_1.toFunctionSelector)(definition);
    let data = '0x';
    if (args && args.length > 0) {
        if (!abiItem.inputs)
            throw new abi_js_1.AbiErrorInputsNotFoundError(abiItem.name, { docsPath });
        data = (0, encodeAbiParameters_js_1.encodeAbiParameters)(abiItem.inputs, args);
    }
    return (0, concat_js_1.concatHex)([signature, data]);
}
//# sourceMappingURL=encodeErrorResult.js.map