"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBalances = getAllBalances;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const fromHex_js_1 = require("../../utils/encoding/fromHex.js");
async function getAllBalances(client, parameters) {
    const { account: account_ } = parameters;
    const account = account_ ? (0, parseAccount_js_1.parseAccount)(account_) : client.account;
    const balances = await client.request({
        method: 'zks_getAllAccountBalances',
        params: [account.address],
    });
    const convertedBalances = {};
    for (const token in balances)
        convertedBalances[token] = (0, fromHex_js_1.hexToBigInt)(balances[token]);
    return convertedBalances;
}
//# sourceMappingURL=getAllBalances.js.map