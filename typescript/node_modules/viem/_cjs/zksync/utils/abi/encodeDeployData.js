"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeDeployData = encodeDeployData;
const bytes_js_1 = require("../../../constants/bytes.js");
const abi_js_1 = require("../../../errors/abi.js");
const encodeAbiParameters_js_1 = require("../../../utils/abi/encodeAbiParameters.js");
const encodeFunctionData_js_1 = require("../../../utils/abi/encodeFunctionData.js");
const toHex_js_1 = require("../../../utils/encoding/toHex.js");
const abis_js_1 = require("../../constants/abis.js");
const contract_js_1 = require("../../constants/contract.js");
const hashBytecode_js_1 = require("../hashBytecode.js");
const docsPath = '/docs/contract/encodeDeployData';
function encodeDeployData(parameters) {
    const { abi, args, bytecode, deploymentType, salt } = parameters;
    if (!args || args.length === 0) {
        const { functionName, argsContractDeployer } = getDeploymentDetails(deploymentType, salt ?? bytes_js_1.zeroHash, (0, toHex_js_1.toHex)((0, hashBytecode_js_1.hashBytecode)(bytecode)), '0x');
        return (0, encodeFunctionData_js_1.encodeFunctionData)({
            abi: abis_js_1.contractDeployerAbi,
            functionName,
            args: argsContractDeployer,
        });
    }
    const description = abi.find((x) => 'type' in x && x.type === 'constructor');
    if (!description)
        throw new abi_js_1.AbiConstructorNotFoundError({ docsPath });
    if (!('inputs' in description))
        throw new abi_js_1.AbiConstructorParamsNotFoundError({ docsPath });
    if (!description.inputs || description.inputs.length === 0)
        throw new abi_js_1.AbiConstructorParamsNotFoundError({ docsPath });
    const data = (0, encodeAbiParameters_js_1.encodeAbiParameters)(description.inputs, args);
    const { functionName, argsContractDeployer } = getDeploymentDetails(deploymentType, salt ?? bytes_js_1.zeroHash, (0, toHex_js_1.toHex)((0, hashBytecode_js_1.hashBytecode)(bytecode)), data);
    return (0, encodeFunctionData_js_1.encodeFunctionData)({
        abi: abis_js_1.contractDeployerAbi,
        functionName,
        args: argsContractDeployer,
    });
}
function getDeploymentDetails(deploymentType, salt, bytecodeHash, data) {
    const contractDeploymentArgs = [salt, bytecodeHash, data];
    const deploymentOptions = {
        create: {
            functionName: 'create',
            argsContractDeployer: contractDeploymentArgs,
        },
        create2: {
            functionName: 'create2',
            argsContractDeployer: contractDeploymentArgs,
        },
        createAccount: {
            functionName: 'createAccount',
            argsContractDeployer: [
                ...contractDeploymentArgs,
                contract_js_1.accountAbstractionVersion1,
            ],
        },
        create2Account: {
            functionName: 'create2Account',
            argsContractDeployer: [
                ...contractDeploymentArgs,
                contract_js_1.accountAbstractionVersion1,
            ],
        },
    };
    const deploymentKey = deploymentType || 'create';
    return deploymentOptions[deploymentKey];
}
//# sourceMappingURL=encodeDeployData.js.map