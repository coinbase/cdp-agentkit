"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializers = void 0;
exports.serializeTransaction = serializeTransaction;
const concat_js_1 = require("../utils/data/concat.js");
const toHex_js_1 = require("../utils/encoding/toHex.js");
const toRlp_js_1 = require("../utils/encoding/toRlp.js");
const serializeTransaction_js_1 = require("../utils/transaction/serializeTransaction.js");
const number_js_1 = require("./constants/number.js");
const assertEip712Transaction_js_1 = require("./utils/assertEip712Transaction.js");
const isEip712Transaction_js_1 = require("./utils/isEip712Transaction.js");
function serializeTransaction(transaction, signature) {
    if ((0, isEip712Transaction_js_1.isEIP712Transaction)(transaction))
        return serializeTransactionEIP712(transaction);
    return (0, serializeTransaction_js_1.serializeTransaction)(transaction, signature);
}
exports.serializers = {
    transaction: serializeTransaction,
};
function serializeTransactionEIP712(transaction) {
    const { chainId, gas, nonce, to, from, value, maxFeePerGas, maxPriorityFeePerGas, customSignature, factoryDeps, paymaster, paymasterInput, gasPerPubdata, data, } = transaction;
    (0, assertEip712Transaction_js_1.assertEip712Transaction)(transaction);
    const serializedTransaction = [
        nonce ? (0, toHex_js_1.toHex)(nonce) : '0x',
        maxPriorityFeePerGas ? (0, toHex_js_1.toHex)(maxPriorityFeePerGas) : '0x',
        maxFeePerGas ? (0, toHex_js_1.toHex)(maxFeePerGas) : '0x',
        gas ? (0, toHex_js_1.toHex)(gas) : '0x',
        to ?? '0x',
        value ? (0, toHex_js_1.toHex)(value) : '0x',
        data ?? '0x0',
        (0, toHex_js_1.toHex)(chainId),
        (0, toHex_js_1.toHex)(''),
        (0, toHex_js_1.toHex)(''),
        (0, toHex_js_1.toHex)(chainId),
        from ?? '0x',
        gasPerPubdata ? (0, toHex_js_1.toHex)(gasPerPubdata) : (0, toHex_js_1.toHex)(number_js_1.gasPerPubdataDefault),
        factoryDeps ?? [],
        customSignature ?? '0x',
        paymaster && paymasterInput ? [paymaster, paymasterInput] : [],
    ];
    return (0, concat_js_1.concatHex)([
        '0x71',
        (0, toRlp_js_1.toRlp)(serializedTransaction),
    ]);
}
//# sourceMappingURL=serializers.js.map