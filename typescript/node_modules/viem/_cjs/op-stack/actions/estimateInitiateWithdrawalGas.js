"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateInitiateWithdrawalGas = estimateInitiateWithdrawalGas;
const estimateContractGas_js_1 = require("../../actions/public/estimateContractGas.js");
const abis_js_1 = require("../abis.js");
const contracts_js_1 = require("../contracts.js");
async function estimateInitiateWithdrawalGas(client, parameters) {
    const { account, chain = client.chain, gas, maxFeePerGas, maxPriorityFeePerGas, nonce, request: { data = '0x', gas: l1Gas, to, value }, } = parameters;
    const params = {
        account,
        abi: abis_js_1.l2ToL1MessagePasserAbi,
        address: contracts_js_1.contracts.l2ToL1MessagePasser.address,
        functionName: 'initiateWithdrawal',
        args: [to, l1Gas, data],
        gas,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        value,
        chain,
    };
    return (0, estimateContractGas_js_1.estimateContractGas)(client, params);
}
//# sourceMappingURL=estimateInitiateWithdrawalGas.js.map