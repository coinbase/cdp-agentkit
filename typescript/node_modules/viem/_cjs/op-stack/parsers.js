"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTransaction = parseTransaction;
const transaction_js_1 = require("../errors/transaction.js");
const isHex_js_1 = require("../utils/data/isHex.js");
const slice_js_1 = require("../utils/data/slice.js");
const fromHex_js_1 = require("../utils/encoding/fromHex.js");
const parseTransaction_js_1 = require("../utils/transaction/parseTransaction.js");
const serializers_js_1 = require("./serializers.js");
function parseTransaction(serializedTransaction) {
    const serializedType = (0, slice_js_1.sliceHex)(serializedTransaction, 0, 1);
    if (serializedType === '0x7e')
        return parseTransactionDeposit(serializedTransaction);
    return (0, parseTransaction_js_1.parseTransaction)(serializedTransaction);
}
function parseTransactionDeposit(serializedTransaction) {
    const transactionArray = (0, parseTransaction_js_1.toTransactionArray)(serializedTransaction);
    const [sourceHash, from, to, mint, value, gas, isSystemTx, data] = transactionArray;
    if (transactionArray.length !== 8 || !(0, isHex_js_1.isHex)(sourceHash) || !(0, isHex_js_1.isHex)(from))
        throw new transaction_js_1.InvalidSerializedTransactionError({
            attributes: {
                sourceHash,
                from,
                gas,
                to,
                mint,
                value,
                isSystemTx,
                data,
            },
            serializedTransaction,
            type: 'deposit',
        });
    const transaction = {
        sourceHash,
        from,
        type: 'deposit',
    };
    if ((0, isHex_js_1.isHex)(gas) && gas !== '0x')
        transaction.gas = (0, fromHex_js_1.hexToBigInt)(gas);
    if ((0, isHex_js_1.isHex)(to) && to !== '0x')
        transaction.to = to;
    if ((0, isHex_js_1.isHex)(mint) && mint !== '0x')
        transaction.mint = (0, fromHex_js_1.hexToBigInt)(mint);
    if ((0, isHex_js_1.isHex)(value) && value !== '0x')
        transaction.value = (0, fromHex_js_1.hexToBigInt)(value);
    if ((0, isHex_js_1.isHex)(isSystemTx) && isSystemTx !== '0x')
        transaction.isSystemTx = (0, fromHex_js_1.hexToBool)(isSystemTx);
    if ((0, isHex_js_1.isHex)(data) && data !== '0x')
        transaction.data = data;
    (0, serializers_js_1.assertTransactionDeposit)(transaction);
    return transaction;
}
//# sourceMappingURL=parsers.js.map