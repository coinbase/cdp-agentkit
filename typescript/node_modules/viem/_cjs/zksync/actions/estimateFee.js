"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateFee = estimateFee;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const fromHex_js_1 = require("../../utils/encoding/fromHex.js");
async function estimateFee(client, parameters) {
    const { account: account_, ...request } = parameters;
    const account = account_ ? (0, parseAccount_js_1.parseAccount)(account_) : client.account;
    const formatters = client.chain?.formatters;
    const formatted = formatters?.transactionRequest?.format({
        ...request,
        from: account?.address,
    });
    const result = await client.request({
        method: 'zks_estimateFee',
        params: [formatted],
    });
    return {
        gasLimit: (0, fromHex_js_1.hexToBigInt)(result.gas_limit),
        gasPerPubdataLimit: (0, fromHex_js_1.hexToBigInt)(result.gas_per_pubdata_limit),
        maxPriorityFeePerGas: (0, fromHex_js_1.hexToBigInt)(result.max_priority_fee_per_gas),
        maxFeePerGas: (0, fromHex_js_1.hexToBigInt)(result.max_fee_per_gas),
    };
}
//# sourceMappingURL=estimateFee.js.map