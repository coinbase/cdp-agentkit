"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signMessage = signMessage;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const account_js_1 = require("../../errors/account.js");
const toHex_js_1 = require("../../utils/encoding/toHex.js");
async function signMessage(client, { account: account_ = client.account, message, }) {
    if (!account_)
        throw new account_js_1.AccountNotFoundError({
            docsPath: '/docs/actions/wallet/signMessage',
        });
    const account = (0, parseAccount_js_1.parseAccount)(account_);
    if (account.signMessage)
        return account.signMessage({ message });
    const message_ = (() => {
        if (typeof message === 'string')
            return (0, toHex_js_1.stringToHex)(message);
        if (message.raw instanceof Uint8Array)
            return (0, toHex_js_1.toHex)(message.raw);
        return message.raw;
    })();
    return client.request({
        method: 'personal_sign',
        params: [message_, account.address],
    }, { retryCount: 0 });
}
//# sourceMappingURL=signMessage.js.map