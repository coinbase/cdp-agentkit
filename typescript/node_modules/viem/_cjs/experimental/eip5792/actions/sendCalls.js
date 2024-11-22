"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCalls = sendCalls;
const parseAccount_js_1 = require("../../../accounts/utils/parseAccount.js");
const account_js_1 = require("../../../errors/account.js");
const chain_js_1 = require("../../../errors/chain.js");
const encodeFunctionData_js_1 = require("../../../utils/abi/encodeFunctionData.js");
const toHex_js_1 = require("../../../utils/encoding/toHex.js");
const getTransactionError_js_1 = require("../../../utils/errors/getTransactionError.js");
async function sendCalls(client, parameters) {
    const { account: account_ = client.account, capabilities, chain = client.chain, version = '1.0', } = parameters;
    if (!account_)
        throw new account_js_1.AccountNotFoundError({
            docsPath: '/experimental/eip5792/sendCalls',
        });
    const account = (0, parseAccount_js_1.parseAccount)(account_);
    const calls = parameters.calls.map((call_) => {
        const call = call_;
        const chainId = call.chain?.id ?? call.chainId ?? chain?.id;
        if (!chainId)
            throw new chain_js_1.ChainNotFoundError();
        const data = call.abi
            ? (0, encodeFunctionData_js_1.encodeFunctionData)({
                abi: call.abi,
                functionName: call.functionName,
                args: call.args,
            })
            : call.data;
        return {
            chainId: (0, toHex_js_1.numberToHex)(chainId),
            data,
            to: call.to,
            value: call.value ? (0, toHex_js_1.numberToHex)(call.value) : undefined,
        };
    });
    try {
        return await client.request({
            method: 'wallet_sendCalls',
            params: [
                {
                    calls,
                    capabilities,
                    chainId: (0, toHex_js_1.numberToHex)(chain.id),
                    from: account.address,
                    version,
                },
            ],
        }, { retryCount: 0 });
    }
    catch (err) {
        throw (0, getTransactionError_js_1.getTransactionError)(err, {
            ...parameters,
            account,
            chain: parameters.chain,
        });
    }
}
//# sourceMappingURL=sendCalls.js.map