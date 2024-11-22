"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeErrorResult = decodeErrorResult;
const solidity_js_1 = require("../../constants/solidity.js");
const abi_js_1 = require("../../errors/abi.js");
const slice_js_1 = require("../data/slice.js");
const toFunctionSelector_js_1 = require("../hash/toFunctionSelector.js");
const decodeAbiParameters_js_1 = require("./decodeAbiParameters.js");
const formatAbiItem_js_1 = require("./formatAbiItem.js");
function decodeErrorResult(parameters) {
    const { abi, data } = parameters;
    const signature = (0, slice_js_1.slice)(data, 0, 4);
    if (signature === '0x')
        throw new abi_js_1.AbiDecodingZeroDataError();
    const abi_ = [...(abi || []), solidity_js_1.solidityError, solidity_js_1.solidityPanic];
    const abiItem = abi_.find((x) => x.type === 'error' && signature === (0, toFunctionSelector_js_1.toFunctionSelector)((0, formatAbiItem_js_1.formatAbiItem)(x)));
    if (!abiItem)
        throw new abi_js_1.AbiErrorSignatureNotFoundError(signature, {
            docsPath: '/docs/contract/decodeErrorResult',
        });
    return {
        abiItem,
        args: 'inputs' in abiItem && abiItem.inputs && abiItem.inputs.length > 0
            ? (0, decodeAbiParameters_js_1.decodeAbiParameters)(abiItem.inputs, (0, slice_js_1.slice)(data, 4))
            : undefined,
        errorName: abiItem.name,
    };
}
//# sourceMappingURL=decodeErrorResult.js.map