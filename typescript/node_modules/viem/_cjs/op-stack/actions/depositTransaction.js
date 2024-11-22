"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.depositTransaction = depositTransaction;
const writeContract_js_1 = require("../../actions/wallet/writeContract.js");
const address_js_1 = require("../../constants/address.js");
const abis_js_1 = require("../abis.js");
const estimateDepositTransactionGas_js_1 = require("./estimateDepositTransactionGas.js");
async function depositTransaction(client, parameters) {
    const { account, chain = client.chain, gas, maxFeePerGas, maxPriorityFeePerGas, nonce, request: { data = '0x', gas: l2Gas, isCreation = false, mint, to = '0x', value, }, targetChain, } = parameters;
    const portalAddress = (() => {
        if (parameters.portalAddress)
            return parameters.portalAddress;
        if (chain)
            return targetChain.contracts.portal[chain.id].address;
        return Object.values(targetChain.contracts.portal)[0].address;
    })();
    const gas_ = typeof gas !== 'number' && gas !== null
        ? await (0, estimateDepositTransactionGas_js_1.estimateDepositTransactionGas)(client, parameters)
        : undefined;
    return (0, writeContract_js_1.writeContract)(client, {
        account: account,
        abi: abis_js_1.portalAbi,
        address: portalAddress,
        chain,
        functionName: 'depositTransaction',
        args: [
            isCreation ? address_js_1.zeroAddress : to,
            value ?? mint ?? 0n,
            l2Gas,
            isCreation,
            data,
        ],
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        value: mint,
        gas: gas_,
    });
}
//# sourceMappingURL=depositTransaction.js.map