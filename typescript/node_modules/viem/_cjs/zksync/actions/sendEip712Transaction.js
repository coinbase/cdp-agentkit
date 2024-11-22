"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEip712Transaction = sendEip712Transaction;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const getChainId_js_1 = require("../../actions/public/getChainId.js");
const prepareTransactionRequest_js_1 = require("../../actions/wallet/prepareTransactionRequest.js");
const sendRawTransaction_js_1 = require("../../actions/wallet/sendRawTransaction.js");
const account_js_1 = require("../../errors/account.js");
const assertCurrentChain_js_1 = require("../../utils/chain/assertCurrentChain.js");
const getTransactionError_js_1 = require("../../utils/errors/getTransactionError.js");
const getAction_js_1 = require("../../utils/getAction.js");
const assertEip712Request_js_1 = require("../utils/assertEip712Request.js");
const signTransaction_js_1 = require("./signTransaction.js");
async function sendEip712Transaction(client, parameters) {
    const { chain = client.chain } = parameters;
    if (!parameters.account)
        throw new account_js_1.AccountNotFoundError({
            docsPath: '/docs/actions/wallet/sendTransaction',
        });
    const account = (0, parseAccount_js_1.parseAccount)(parameters.account);
    try {
        (0, assertEip712Request_js_1.assertEip712Request)(parameters);
        const request = await (0, prepareTransactionRequest_js_1.prepareTransactionRequest)(client, {
            ...parameters,
            nonceManager: account.nonceManager,
            parameters: ['gas', 'nonce', 'fees'],
        });
        let chainId;
        if (chain !== null) {
            chainId = await (0, getAction_js_1.getAction)(client, getChainId_js_1.getChainId, 'getChainId')({});
            (0, assertCurrentChain_js_1.assertCurrentChain)({
                currentChainId: chainId,
                chain,
            });
        }
        const serializedTransaction = await (0, signTransaction_js_1.signTransaction)(client, {
            ...request,
            chainId,
        });
        return await (0, getAction_js_1.getAction)(client, sendRawTransaction_js_1.sendRawTransaction, 'sendRawTransaction')({
            serializedTransaction,
        });
    }
    catch (err) {
        throw (0, getTransactionError_js_1.getTransactionError)(err, {
            ...parameters,
            account,
            chain: chain,
        });
    }
}
//# sourceMappingURL=sendEip712Transaction.js.map