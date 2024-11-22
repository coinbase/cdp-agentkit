"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateFinalizeWithdrawalGas = estimateFinalizeWithdrawalGas;
const estimateContractGas_js_1 = require("../../actions/public/estimateContractGas.js");
const abis_js_1 = require("../abis.js");
async function estimateFinalizeWithdrawalGas(client, parameters) {
    const { account, chain = client.chain, gas, maxFeePerGas, maxPriorityFeePerGas, nonce, targetChain, withdrawal, } = parameters;
    const portalAddress = (() => {
        if (parameters.portalAddress)
            return parameters.portalAddress;
        if (chain)
            return targetChain.contracts.portal[chain.id].address;
        return Object.values(targetChain.contracts.portal)[0].address;
    })();
    const params = {
        account,
        abi: abis_js_1.portalAbi,
        address: portalAddress,
        functionName: 'finalizeWithdrawalTransaction',
        args: [withdrawal],
        gas,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        chain,
    };
    return (0, estimateContractGas_js_1.estimateContractGas)(client, params);
}
//# sourceMappingURL=estimateFinalizeWithdrawalGas.js.map