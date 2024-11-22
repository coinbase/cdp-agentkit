"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signEip712Transaction = signEip712Transaction;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const getChainId_js_1 = require("../../actions/public/getChainId.js");
const signTypedData_js_1 = require("../../actions/wallet/signTypedData.js");
const account_js_1 = require("../../errors/account.js");
const base_js_1 = require("../../errors/base.js");
const assertCurrentChain_js_1 = require("../../utils/chain/assertCurrentChain.js");
const getAction_js_1 = require("../../utils/getAction.js");
const assertEip712Request_js_1 = require("../utils/assertEip712Request.js");
async function signEip712Transaction(client, args) {
    const { account: account_ = client.account, chain = client.chain, ...transaction } = args;
    if (!account_)
        throw new account_js_1.AccountNotFoundError({
            docsPath: '/docs/actions/wallet/signTransaction',
        });
    const account = (0, parseAccount_js_1.parseAccount)(account_);
    (0, assertEip712Request_js_1.assertEip712Request)({
        account,
        chain,
        ...args,
    });
    if (!chain?.custom?.getEip712Domain)
        throw new base_js_1.BaseError('`getEip712Domain` not found on chain.');
    if (!chain?.serializers?.transaction)
        throw new base_js_1.BaseError('transaction serializer not found on chain.');
    const chainId = await (0, getAction_js_1.getAction)(client, getChainId_js_1.getChainId, 'getChainId')({});
    if (chain !== null)
        (0, assertCurrentChain_js_1.assertCurrentChain)({
            currentChainId: chainId,
            chain: chain,
        });
    const eip712Domain = chain?.custom.getEip712Domain({
        ...transaction,
        chainId,
        from: account.address,
        type: 'eip712',
    });
    const customSignature = await (0, signTypedData_js_1.signTypedData)(client, {
        ...eip712Domain,
        account,
    });
    return chain?.serializers?.transaction({
        chainId,
        ...transaction,
        customSignature,
        type: 'eip712',
    }, { r: '0x0', s: '0x0', v: 0n });
}
//# sourceMappingURL=signEip712Transaction.js.map