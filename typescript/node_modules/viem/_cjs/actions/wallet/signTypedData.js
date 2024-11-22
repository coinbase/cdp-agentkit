"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTypedData = signTypedData;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const account_js_1 = require("../../errors/account.js");
const typedData_js_1 = require("../../utils/typedData.js");
async function signTypedData(client, parameters) {
    const { account: account_ = client.account, domain, message, primaryType, } = parameters;
    if (!account_)
        throw new account_js_1.AccountNotFoundError({
            docsPath: '/docs/actions/wallet/signTypedData',
        });
    const account = (0, parseAccount_js_1.parseAccount)(account_);
    const types = {
        EIP712Domain: (0, typedData_js_1.getTypesForEIP712Domain)({ domain }),
        ...parameters.types,
    };
    (0, typedData_js_1.validateTypedData)({ domain, message, primaryType, types });
    if (account.signTypedData)
        return account.signTypedData({ domain, message, primaryType, types });
    const typedData = (0, typedData_js_1.serializeTypedData)({ domain, message, primaryType, types });
    return client.request({
        method: 'eth_signTypedData_v4',
        params: [account.address, typedData],
    }, { retryCount: 0 });
}
//# sourceMappingURL=signTypedData.js.map