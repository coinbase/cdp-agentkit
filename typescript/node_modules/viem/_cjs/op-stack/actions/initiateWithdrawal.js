"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initiateWithdrawal = initiateWithdrawal;
const writeContract_js_1 = require("../../actions/wallet/writeContract.js");
const abis_js_1 = require("../abis.js");
const contracts_js_1 = require("../contracts.js");
const estimateInitiateWithdrawalGas_js_1 = require("./estimateInitiateWithdrawalGas.js");
async function initiateWithdrawal(client, parameters) {
    const { account, chain = client.chain, gas, maxFeePerGas, maxPriorityFeePerGas, nonce, request: { data = '0x', gas: l1Gas, to, value }, } = parameters;
    const gas_ = typeof gas !== 'number' && gas !== null
        ? await (0, estimateInitiateWithdrawalGas_js_1.estimateInitiateWithdrawalGas)(client, parameters)
        : undefined;
    return (0, writeContract_js_1.writeContract)(client, {
        account: account,
        abi: abis_js_1.l2ToL1MessagePasserAbi,
        address: contracts_js_1.contracts.l2ToL1MessagePasser.address,
        chain,
        functionName: 'initiateWithdrawal',
        args: [to, l1Gas, data],
        gas: gas_,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        value,
    });
}
//# sourceMappingURL=initiateWithdrawal.js.map