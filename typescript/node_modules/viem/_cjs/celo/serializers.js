"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializers = void 0;
exports.serializeTransaction = serializeTransaction;
exports.assertTransactionCIP42 = assertTransactionCIP42;
exports.assertTransactionCIP64 = assertTransactionCIP64;
const number_js_1 = require("../constants/number.js");
const address_js_1 = require("../errors/address.js");
const base_js_1 = require("../errors/base.js");
const chain_js_1 = require("../errors/chain.js");
const node_js_1 = require("../errors/node.js");
const serializers_js_1 = require("../op-stack/serializers.js");
const isAddress_js_1 = require("../utils/address/isAddress.js");
const concat_js_1 = require("../utils/data/concat.js");
const toHex_js_1 = require("../utils/encoding/toHex.js");
const toRlp_js_1 = require("../utils/encoding/toRlp.js");
const serializeAccessList_js_1 = require("../utils/transaction/serializeAccessList.js");
const serializeTransaction_js_1 = require("../utils/transaction/serializeTransaction.js");
const utils_js_1 = require("./utils.js");
function serializeTransaction(transaction, signature) {
    if ((0, utils_js_1.isCIP64)(transaction))
        return serializeTransactionCIP64(transaction, signature);
    return (0, serializers_js_1.serializeTransaction)(transaction, signature);
}
exports.serializers = {
    transaction: serializeTransaction,
};
function serializeTransactionCIP64(transaction, signature) {
    assertTransactionCIP64(transaction);
    const { chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, feeCurrency, data, } = transaction;
    const serializedTransaction = [
        (0, toHex_js_1.toHex)(chainId),
        nonce ? (0, toHex_js_1.toHex)(nonce) : '0x',
        maxPriorityFeePerGas ? (0, toHex_js_1.toHex)(maxPriorityFeePerGas) : '0x',
        maxFeePerGas ? (0, toHex_js_1.toHex)(maxFeePerGas) : '0x',
        gas ? (0, toHex_js_1.toHex)(gas) : '0x',
        to ?? '0x',
        value ? (0, toHex_js_1.toHex)(value) : '0x',
        data ?? '0x',
        (0, serializeAccessList_js_1.serializeAccessList)(accessList),
        feeCurrency,
        ...(0, serializeTransaction_js_1.toYParitySignatureArray)(transaction, signature),
    ];
    return (0, concat_js_1.concatHex)([
        '0x7b',
        (0, toRlp_js_1.toRlp)(serializedTransaction),
    ]);
}
const MAX_MAX_FEE_PER_GAS = number_js_1.maxUint256;
function assertTransactionCIP42(transaction) {
    const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to, feeCurrency, gatewayFee, gatewayFeeRecipient, } = transaction;
    if (chainId <= 0)
        throw new chain_js_1.InvalidChainIdError({ chainId });
    if (to && !(0, isAddress_js_1.isAddress)(to))
        throw new address_js_1.InvalidAddressError({ address: to });
    if (gasPrice)
        throw new base_js_1.BaseError('`gasPrice` is not a valid CIP-42 Transaction attribute.');
    if ((0, utils_js_1.isPresent)(maxFeePerGas) && maxFeePerGas > MAX_MAX_FEE_PER_GAS)
        throw new node_js_1.FeeCapTooHighError({ maxFeePerGas });
    if ((0, utils_js_1.isPresent)(maxPriorityFeePerGas) &&
        (0, utils_js_1.isPresent)(maxFeePerGas) &&
        maxPriorityFeePerGas > maxFeePerGas)
        throw new node_js_1.TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
    if (((0, utils_js_1.isPresent)(gatewayFee) && (0, utils_js_1.isEmpty)(gatewayFeeRecipient)) ||
        ((0, utils_js_1.isPresent)(gatewayFeeRecipient) && (0, utils_js_1.isEmpty)(gatewayFee))) {
        throw new base_js_1.BaseError('`gatewayFee` and `gatewayFeeRecipient` must be provided together.');
    }
    if ((0, utils_js_1.isPresent)(feeCurrency) && !(0, isAddress_js_1.isAddress)(feeCurrency)) {
        throw new base_js_1.BaseError('`feeCurrency` MUST be a token address for CIP-42 transactions.');
    }
    if ((0, utils_js_1.isPresent)(gatewayFeeRecipient) && !(0, isAddress_js_1.isAddress)(gatewayFeeRecipient)) {
        throw new address_js_1.InvalidAddressError(gatewayFeeRecipient);
    }
    if ((0, utils_js_1.isEmpty)(feeCurrency) && (0, utils_js_1.isEmpty)(gatewayFeeRecipient)) {
        throw new base_js_1.BaseError('Either `feeCurrency` or `gatewayFeeRecipient` must be provided for CIP-42 transactions.');
    }
}
function assertTransactionCIP64(transaction) {
    const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to, feeCurrency, } = transaction;
    if (chainId <= 0)
        throw new chain_js_1.InvalidChainIdError({ chainId });
    if (to && !(0, isAddress_js_1.isAddress)(to))
        throw new address_js_1.InvalidAddressError({ address: to });
    if (gasPrice)
        throw new base_js_1.BaseError('`gasPrice` is not a valid CIP-64 Transaction attribute.');
    if ((0, utils_js_1.isPresent)(maxFeePerGas) && maxFeePerGas > MAX_MAX_FEE_PER_GAS)
        throw new node_js_1.FeeCapTooHighError({ maxFeePerGas });
    if ((0, utils_js_1.isPresent)(maxPriorityFeePerGas) &&
        (0, utils_js_1.isPresent)(maxFeePerGas) &&
        maxPriorityFeePerGas > maxFeePerGas)
        throw new node_js_1.TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
    if ((0, utils_js_1.isPresent)(feeCurrency) && !(0, isAddress_js_1.isAddress)(feeCurrency)) {
        throw new base_js_1.BaseError('`feeCurrency` MUST be a token address for CIP-64 transactions.');
    }
    if ((0, utils_js_1.isEmpty)(feeCurrency)) {
        throw new base_js_1.BaseError('`feeCurrency` must be provided for CIP-64 transactions.');
    }
}
//# sourceMappingURL=serializers.js.map