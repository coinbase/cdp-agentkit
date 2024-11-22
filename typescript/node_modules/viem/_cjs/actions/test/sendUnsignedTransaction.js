"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendUnsignedTransaction = sendUnsignedTransaction;
const extract_js_1 = require("../../utils/formatters/extract.js");
const transactionRequest_js_1 = require("../../utils/formatters/transactionRequest.js");
async function sendUnsignedTransaction(client, args) {
    const { accessList, data, from, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, ...rest } = args;
    const chainFormat = client.chain?.formatters?.transactionRequest?.format;
    const format = chainFormat || transactionRequest_js_1.formatTransactionRequest;
    const request = format({
        ...(0, extract_js_1.extract)(rest, { format: chainFormat }),
        accessList,
        data,
        from,
        gas,
        gasPrice,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        to,
        value,
    });
    const hash = await client.request({
        method: 'eth_sendUnsignedTransaction',
        params: [request],
    });
    return hash;
}
//# sourceMappingURL=sendUnsignedTransaction.js.map