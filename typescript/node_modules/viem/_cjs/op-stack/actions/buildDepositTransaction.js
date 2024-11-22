"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDepositTransaction = buildDepositTransaction;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const prepareTransactionRequest_js_1 = require("../../actions/wallet/prepareTransactionRequest.js");
async function buildDepositTransaction(client, args) {
    const { account: account_, chain = client.chain, gas, data, isCreation, mint, to, value, } = args;
    const account = account_ ? (0, parseAccount_js_1.parseAccount)(account_) : undefined;
    const request = await (0, prepareTransactionRequest_js_1.prepareTransactionRequest)(client, {
        account: mint ? undefined : account,
        chain,
        gas,
        data,
        parameters: ['gas'],
        to,
        value,
    });
    return {
        account,
        request: {
            data: request.data,
            gas: request.gas,
            mint,
            isCreation,
            to: request.to,
            value: request.value,
        },
        targetChain: chain,
    };
}
//# sourceMappingURL=buildDepositTransaction.js.map