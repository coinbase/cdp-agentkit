"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCapabilities = getCapabilities;
const parseAccount_js_1 = require("../../../accounts/utils/parseAccount.js");
const account_js_1 = require("../../../errors/account.js");
async function getCapabilities(client, parameters = {}) {
    const account_raw = parameters?.account ?? client.account;
    if (!account_raw)
        throw new account_js_1.AccountNotFoundError();
    const account = (0, parseAccount_js_1.parseAccount)(account_raw);
    const capabilities_raw = await client.request({
        method: 'wallet_getCapabilities',
        params: [account.address],
    });
    const capabilities = {};
    for (const [key, value] of Object.entries(capabilities_raw))
        capabilities[Number(key)] = value;
    return capabilities;
}
//# sourceMappingURL=getCapabilities.js.map