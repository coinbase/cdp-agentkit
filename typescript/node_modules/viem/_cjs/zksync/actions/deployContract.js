"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployContract = deployContract;
const address_js_1 = require("../constants/address.js");
const encodeDeployData_js_1 = require("../utils/abi/encodeDeployData.js");
const sendEip712Transaction_js_1 = require("./sendEip712Transaction.js");
function deployContract(walletClient, parameters) {
    const { abi, args, bytecode, deploymentType, salt, ...request } = parameters;
    const data = (0, encodeDeployData_js_1.encodeDeployData)({
        abi,
        args,
        bytecode,
        deploymentType,
        salt,
    });
    request.factoryDeps = request.factoryDeps || [];
    if (!request.factoryDeps.includes(bytecode))
        request.factoryDeps.push(bytecode);
    return (0, sendEip712Transaction_js_1.sendEip712Transaction)(walletClient, {
        ...request,
        data,
        to: address_js_1.contractDeployerAddress,
    });
}
//# sourceMappingURL=deployContract.js.map