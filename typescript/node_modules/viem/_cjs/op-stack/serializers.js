"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializers = void 0;
exports.serializeTransaction = serializeTransaction;
exports.assertTransactionDeposit = assertTransactionDeposit;
const address_js_1 = require("../errors/address.js");
const isAddress_js_1 = require("../utils/address/isAddress.js");
const concat_js_1 = require("../utils/data/concat.js");
const toHex_js_1 = require("../utils/encoding/toHex.js");
const toRlp_js_1 = require("../utils/encoding/toRlp.js");
const serializeTransaction_js_1 = require("../utils/transaction/serializeTransaction.js");
function serializeTransaction(transaction, signature) {
    if (isDeposit(transaction))
        return serializeTransactionDeposit(transaction);
    return (0, serializeTransaction_js_1.serializeTransaction)(transaction, signature);
}
exports.serializers = {
    transaction: serializeTransaction,
};
function serializeTransactionDeposit(transaction) {
    assertTransactionDeposit(transaction);
    const { sourceHash, data, from, gas, isSystemTx, mint, to, value } = transaction;
    const serializedTransaction = [
        sourceHash,
        from,
        to ?? '0x',
        mint ? (0, toHex_js_1.toHex)(mint) : '0x',
        value ? (0, toHex_js_1.toHex)(value) : '0x',
        gas ? (0, toHex_js_1.toHex)(gas) : '0x',
        isSystemTx ? '0x1' : '0x',
        data ?? '0x',
    ];
    return (0, concat_js_1.concatHex)([
        '0x7e',
        (0, toRlp_js_1.toRlp)(serializedTransaction),
    ]);
}
function isDeposit(transaction) {
    if (transaction.type === 'deposit')
        return true;
    if (typeof transaction.sourceHash !== 'undefined')
        return true;
    return false;
}
function assertTransactionDeposit(transaction) {
    const { from, to } = transaction;
    if (from && !(0, isAddress_js_1.isAddress)(from))
        throw new address_js_1.InvalidAddressError({ address: from });
    if (to && !(0, isAddress_js_1.isAddress)(to))
        throw new address_js_1.InvalidAddressError({ address: to });
}
//# sourceMappingURL=serializers.js.map