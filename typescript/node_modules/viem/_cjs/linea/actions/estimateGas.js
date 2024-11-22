"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateGas = estimateGas;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const account_js_1 = require("../../errors/account.js");
const toHex_js_1 = require("../../utils/encoding/toHex.js");
const getCallError_js_1 = require("../../utils/errors/getCallError.js");
const extract_js_1 = require("../../utils/formatters/extract.js");
const transactionRequest_js_1 = require("../../utils/formatters/transactionRequest.js");
const assertRequest_js_1 = require("../../utils/transaction/assertRequest.js");
async function estimateGas(client, args) {
    const { account: account_ = client.account } = args;
    if (!account_)
        throw new account_js_1.AccountNotFoundError();
    const account = (0, parseAccount_js_1.parseAccount)(account_);
    try {
        const { accessList, blockNumber, blockTag, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, ...rest } = args;
        const blockNumberHex = blockNumber ? (0, toHex_js_1.numberToHex)(blockNumber) : undefined;
        const block = blockNumberHex || blockTag;
        (0, assertRequest_js_1.assertRequest)(args);
        const chainFormat = client.chain?.formatters?.transactionRequest?.format;
        const format = chainFormat || transactionRequest_js_1.formatTransactionRequest;
        const request = format({
            ...(0, extract_js_1.extract)(rest, { format: chainFormat }),
            from: account?.address,
            accessList,
            data,
            gas,
            gasPrice,
            maxFeePerGas,
            maxPriorityFeePerGas,
            nonce,
            to,
            value,
        });
        const { baseFeePerGas, gasLimit, priorityFeePerGas } = await client.request({
            method: 'linea_estimateGas',
            params: block ? [request, block] : [request],
        });
        return {
            baseFeePerGas: BigInt(baseFeePerGas),
            gasLimit: BigInt(gasLimit),
            priorityFeePerGas: BigInt(priorityFeePerGas),
        };
    }
    catch (err) {
        throw (0, getCallError_js_1.getCallError)(err, {
            ...args,
            account,
            chain: client.chain,
        });
    }
}
//# sourceMappingURL=estimateGas.js.map