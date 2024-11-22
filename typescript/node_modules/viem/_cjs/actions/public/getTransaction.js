"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransaction = getTransaction;
const transaction_js_1 = require("../../errors/transaction.js");
const toHex_js_1 = require("../../utils/encoding/toHex.js");
const transaction_js_2 = require("../../utils/formatters/transaction.js");
async function getTransaction(client, { blockHash, blockNumber, blockTag: blockTag_, hash, index, }) {
    const blockTag = blockTag_ || 'latest';
    const blockNumberHex = blockNumber !== undefined ? (0, toHex_js_1.numberToHex)(blockNumber) : undefined;
    let transaction = null;
    if (hash) {
        transaction = await client.request({
            method: 'eth_getTransactionByHash',
            params: [hash],
        }, { dedupe: true });
    }
    else if (blockHash) {
        transaction = await client.request({
            method: 'eth_getTransactionByBlockHashAndIndex',
            params: [blockHash, (0, toHex_js_1.numberToHex)(index)],
        }, { dedupe: true });
    }
    else if (blockNumberHex || blockTag) {
        transaction = await client.request({
            method: 'eth_getTransactionByBlockNumberAndIndex',
            params: [blockNumberHex || blockTag, (0, toHex_js_1.numberToHex)(index)],
        }, { dedupe: Boolean(blockNumberHex) });
    }
    if (!transaction)
        throw new transaction_js_1.TransactionNotFoundError({
            blockHash,
            blockNumber,
            blockTag,
            hash,
            index,
        });
    const format = client.chain?.formatters?.transaction?.format || transaction_js_2.formatTransaction;
    return format(transaction);
}
//# sourceMappingURL=getTransaction.js.map