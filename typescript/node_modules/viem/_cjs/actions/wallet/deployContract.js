"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployContract = deployContract;
const encodeDeployData_js_1 = require("../../utils/abi/encodeDeployData.js");
const sendTransaction_js_1 = require("./sendTransaction.js");
function deployContract(walletClient, parameters) {
    const { abi, args, bytecode, ...request } = parameters;
    const calldata = (0, encodeDeployData_js_1.encodeDeployData)({ abi, args, bytecode });
    return (0, sendTransaction_js_1.sendTransaction)(walletClient, {
        ...request,
        data: calldata,
    });
}
//# sourceMappingURL=deployContract.js.map