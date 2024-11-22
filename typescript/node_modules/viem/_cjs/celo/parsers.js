"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTransaction = parseTransaction;
const transaction_js_1 = require("../errors/transaction.js");
const isHex_js_1 = require("../utils/data/isHex.js");
const slice_js_1 = require("../utils/data/slice.js");
const fromHex_js_1 = require("../utils/encoding/fromHex.js");
const parseTransaction_js_1 = require("../utils/transaction/parseTransaction.js");
const serializers_js_1 = require("./serializers.js");
const parsers_js_1 = require("../op-stack/parsers.js");
function parseTransaction(serializedTransaction) {
    const serializedType = (0, slice_js_1.sliceHex)(serializedTransaction, 0, 1);
    if (serializedType === '0x7c')
        return parseTransactionCIP42(serializedTransaction);
    if (serializedType === '0x7b')
        return parseTransactionCIP64(serializedTransaction);
    return (0, parsers_js_1.parseTransaction)(serializedTransaction);
}
function parseTransactionCIP42(serializedTransaction) {
    const transactionArray = (0, parseTransaction_js_1.toTransactionArray)(serializedTransaction);
    const [chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gas, feeCurrency, gatewayFeeRecipient, gatewayFee, to, value, data, accessList, v, r, s,] = transactionArray;
    if (transactionArray.length !== 15 && transactionArray.length !== 12) {
        throw new transaction_js_1.InvalidSerializedTransactionError({
            attributes: {
                chainId,
                nonce,
                maxPriorityFeePerGas,
                maxFeePerGas,
                gas,
                feeCurrency,
                to,
                gatewayFeeRecipient,
                gatewayFee,
                value,
                data,
                accessList,
                ...(transactionArray.length > 12
                    ? {
                        v,
                        r,
                        s,
                    }
                    : {}),
            },
            serializedTransaction,
            type: 'cip42',
        });
    }
    const transaction = {
        chainId: (0, fromHex_js_1.hexToNumber)(chainId),
        type: 'cip42',
    };
    if ((0, isHex_js_1.isHex)(to) && to !== '0x')
        transaction.to = to;
    if ((0, isHex_js_1.isHex)(gas) && gas !== '0x')
        transaction.gas = (0, fromHex_js_1.hexToBigInt)(gas);
    if ((0, isHex_js_1.isHex)(data) && data !== '0x')
        transaction.data = data;
    if ((0, isHex_js_1.isHex)(nonce) && nonce !== '0x')
        transaction.nonce = (0, fromHex_js_1.hexToNumber)(nonce);
    if ((0, isHex_js_1.isHex)(value) && value !== '0x')
        transaction.value = (0, fromHex_js_1.hexToBigInt)(value);
    if ((0, isHex_js_1.isHex)(feeCurrency) && feeCurrency !== '0x')
        transaction.feeCurrency = feeCurrency;
    if ((0, isHex_js_1.isHex)(gatewayFeeRecipient) && gatewayFeeRecipient !== '0x')
        transaction.gatewayFeeRecipient = gatewayFeeRecipient;
    if ((0, isHex_js_1.isHex)(gatewayFee) && gatewayFee !== '0x')
        transaction.gatewayFee = (0, fromHex_js_1.hexToBigInt)(gatewayFee);
    if ((0, isHex_js_1.isHex)(maxFeePerGas) && maxFeePerGas !== '0x')
        transaction.maxFeePerGas = (0, fromHex_js_1.hexToBigInt)(maxFeePerGas);
    if ((0, isHex_js_1.isHex)(maxPriorityFeePerGas) && maxPriorityFeePerGas !== '0x')
        transaction.maxPriorityFeePerGas = (0, fromHex_js_1.hexToBigInt)(maxPriorityFeePerGas);
    if (accessList.length !== 0 && accessList !== '0x')
        transaction.accessList = (0, parseTransaction_js_1.parseAccessList)(accessList);
    (0, serializers_js_1.assertTransactionCIP42)(transaction);
    return transaction;
}
function parseTransactionCIP64(serializedTransaction) {
    const transactionArray = (0, parseTransaction_js_1.toTransactionArray)(serializedTransaction);
    const [chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gas, to, value, data, accessList, feeCurrency, v, r, s,] = transactionArray;
    if (transactionArray.length !== 13 && transactionArray.length !== 10) {
        throw new transaction_js_1.InvalidSerializedTransactionError({
            attributes: {
                chainId,
                nonce,
                maxPriorityFeePerGas,
                maxFeePerGas,
                gas,
                to,
                value,
                data,
                accessList,
                feeCurrency,
                ...(transactionArray.length > 10
                    ? {
                        v,
                        r,
                        s,
                    }
                    : {}),
            },
            serializedTransaction,
            type: 'cip64',
        });
    }
    const transaction = {
        chainId: (0, fromHex_js_1.hexToNumber)(chainId),
        type: 'cip64',
    };
    if ((0, isHex_js_1.isHex)(to) && to !== '0x')
        transaction.to = to;
    if ((0, isHex_js_1.isHex)(gas) && gas !== '0x')
        transaction.gas = (0, fromHex_js_1.hexToBigInt)(gas);
    if ((0, isHex_js_1.isHex)(data) && data !== '0x')
        transaction.data = data;
    if ((0, isHex_js_1.isHex)(nonce) && nonce !== '0x')
        transaction.nonce = (0, fromHex_js_1.hexToNumber)(nonce);
    if ((0, isHex_js_1.isHex)(value) && value !== '0x')
        transaction.value = (0, fromHex_js_1.hexToBigInt)(value);
    if ((0, isHex_js_1.isHex)(feeCurrency) && feeCurrency !== '0x')
        transaction.feeCurrency = feeCurrency;
    if ((0, isHex_js_1.isHex)(maxFeePerGas) && maxFeePerGas !== '0x')
        transaction.maxFeePerGas = (0, fromHex_js_1.hexToBigInt)(maxFeePerGas);
    if ((0, isHex_js_1.isHex)(maxPriorityFeePerGas) && maxPriorityFeePerGas !== '0x')
        transaction.maxPriorityFeePerGas = (0, fromHex_js_1.hexToBigInt)(maxPriorityFeePerGas);
    if (accessList.length !== 0 && accessList !== '0x')
        transaction.accessList = (0, parseTransaction_js_1.parseAccessList)(accessList);
    (0, serializers_js_1.assertTransactionCIP64)(transaction);
    return transaction;
}
//# sourceMappingURL=parsers.js.map