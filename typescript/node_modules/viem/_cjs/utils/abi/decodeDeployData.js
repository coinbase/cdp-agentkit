"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeDeployData = decodeDeployData;
const abi_js_1 = require("../../errors/abi.js");
const decodeAbiParameters_js_1 = require("./decodeAbiParameters.js");
const docsPath = '/docs/contract/decodeDeployData';
function decodeDeployData(parameters) {
    const { abi, bytecode, data } = parameters;
    if (data === bytecode)
        return { bytecode };
    const description = abi.find((x) => 'type' in x && x.type === 'constructor');
    if (!description)
        throw new abi_js_1.AbiConstructorNotFoundError({ docsPath });
    if (!('inputs' in description))
        throw new abi_js_1.AbiConstructorParamsNotFoundError({ docsPath });
    if (!description.inputs || description.inputs.length === 0)
        throw new abi_js_1.AbiConstructorParamsNotFoundError({ docsPath });
    const args = (0, decodeAbiParameters_js_1.decodeAbiParameters)(description.inputs, `0x${data.replace(bytecode, '')}`);
    return { args, bytecode };
}
//# sourceMappingURL=decodeDeployData.js.map