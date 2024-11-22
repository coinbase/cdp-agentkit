"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTransaction = signTransaction;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const account_js_1 = require("../../errors/account.js");
const assertCurrentChain_js_1 = require("../../utils/chain/assertCurrentChain.js");
const toHex_js_1 = require("../../utils/encoding/toHex.js");
const transactionRequest_js_1 = require("../../utils/formatters/transactionRequest.js");
const getAction_js_1 = require("../../utils/getAction.js");
const assertRequest_js_1 = require("../../utils/transaction/assertRequest.js");
const getChainId_js_1 = require("../public/getChainId.js");
async function signTransaction(client, parameters) {
    const { account: account_ = client.account, chain = client.chain, ...transaction } = parameters;
    if (!account_)
        throw new account_js_1.AccountNotFoundError({
            docsPath: '/docs/actions/wallet/signTransaction',
        });
    const account = (0, parseAccount_js_1.parseAccount)(account_);
    (0, assertRequest_js_1.assertRequest)({
        account,
        ...parameters,
    });
    const chainId = await (0, getAction_js_1.getAction)(client, getChainId_js_1.getChainId, 'getChainId')({});
    if (chain !== null)
        (0, assertCurrentChain_js_1.assertCurrentChain)({
            currentChainId: chainId,
            chain,
        });
    const formatters = chain?.formatters || client.chain?.formatters;
    const format = formatters?.transactionRequest?.format || transactionRequest_js_1.formatTransactionRequest;
    if (account.signTransaction)
        return account.signTransaction({
            ...transaction,
            chainId,
        }, { serializer: client.chain?.serializers?.transaction });
    return await client.request({
        method: 'eth_signTransaction',
        params: [
            {
                ...format(transaction),
                chainId: (0, toHex_js_1.numberToHex)(chainId),
                from: account.address,
            },
        ],
    }, { retryCount: 0 });
}
//# sourceMappingURL=signTransaction.js.map