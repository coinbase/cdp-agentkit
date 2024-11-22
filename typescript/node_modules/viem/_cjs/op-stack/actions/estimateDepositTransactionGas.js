"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateDepositTransactionGas = estimateDepositTransactionGas;
const estimateContractGas_js_1 = require("../../actions/public/estimateContractGas.js");
const address_js_1 = require("../../constants/address.js");
const abis_js_1 = require("../abis.js");
async function estimateDepositTransactionGas(client, parameters) {
    const { account, chain = client.chain, gas, maxFeePerGas, maxPriorityFeePerGas, nonce, request: { data = '0x', gas: l2Gas, isCreation = false, mint, to = '0x', value, }, targetChain, } = parameters;
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
        functionName: 'depositTransaction',
        args: [
            isCreation ? address_js_1.zeroAddress : to,
            value ?? mint ?? 0n,
            l2Gas,
            isCreation,
            data,
        ],
        gas,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        value: mint,
        chain,
    };
    return (0, estimateContractGas_js_1.estimateContractGas)(client, params);
}
//# sourceMappingURL=estimateDepositTransactionGas.js.map