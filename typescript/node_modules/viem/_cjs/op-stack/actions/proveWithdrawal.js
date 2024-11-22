"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proveWithdrawal = proveWithdrawal;
const writeContract_js_1 = require("../../actions/wallet/writeContract.js");
const abis_js_1 = require("../abis.js");
const estimateProveWithdrawalGas_js_1 = require("./estimateProveWithdrawalGas.js");
async function proveWithdrawal(client, parameters) {
    const { account, chain = client.chain, gas, l2OutputIndex, maxFeePerGas, maxPriorityFeePerGas, nonce, outputRootProof, targetChain, withdrawalProof, withdrawal, } = parameters;
    const portalAddress = (() => {
        if (parameters.portalAddress)
            return parameters.portalAddress;
        if (chain)
            return targetChain.contracts.portal[chain.id].address;
        return Object.values(targetChain.contracts.portal)[0].address;
    })();
    const gas_ = typeof gas !== 'bigint' && gas !== null
        ? await (0, estimateProveWithdrawalGas_js_1.estimateProveWithdrawalGas)(client, parameters)
        : (gas ?? undefined);
    return (0, writeContract_js_1.writeContract)(client, {
        account: account,
        abi: abis_js_1.portalAbi,
        address: portalAddress,
        chain,
        functionName: 'proveWithdrawalTransaction',
        args: [withdrawal, l2OutputIndex, outputRootProof, withdrawalProof],
        gas: gas_,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
    });
}
//# sourceMappingURL=proveWithdrawal.js.map