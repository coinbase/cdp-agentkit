"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateGasL1ToL2 = estimateGasL1ToL2;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
async function estimateGasL1ToL2(client, parameters) {
    const { account: account_, ...request } = parameters;
    const account = account_ ? (0, parseAccount_js_1.parseAccount)(account_) : client.account;
    const formatters = client.chain?.formatters;
    const formatted = formatters?.transactionRequest?.format({
        ...request,
        from: account?.address,
    });
    const result = await client.request({
        method: 'zks_estimateGasL1ToL2',
        params: [formatted],
    });
    return result;
}
//# sourceMappingURL=estimateGasL1ToL2.js.map