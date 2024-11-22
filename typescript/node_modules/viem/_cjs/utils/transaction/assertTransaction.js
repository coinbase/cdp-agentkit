"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertTransactionEIP7702 = assertTransactionEIP7702;
exports.assertTransactionEIP4844 = assertTransactionEIP4844;
exports.assertTransactionEIP1559 = assertTransactionEIP1559;
exports.assertTransactionEIP2930 = assertTransactionEIP2930;
exports.assertTransactionLegacy = assertTransactionLegacy;
const kzg_js_1 = require("../../constants/kzg.js");
const number_js_1 = require("../../constants/number.js");
const address_js_1 = require("../../errors/address.js");
const base_js_1 = require("../../errors/base.js");
const blob_js_1 = require("../../errors/blob.js");
const chain_js_1 = require("../../errors/chain.js");
const node_js_1 = require("../../errors/node.js");
const isAddress_js_1 = require("../address/isAddress.js");
const size_js_1 = require("../data/size.js");
const slice_js_1 = require("../data/slice.js");
const fromHex_js_1 = require("../encoding/fromHex.js");
function assertTransactionEIP7702(transaction) {
    const { authorizationList } = transaction;
    if (authorizationList) {
        for (const authorization of authorizationList) {
            const { contractAddress, chainId } = authorization;
            if (!(0, isAddress_js_1.isAddress)(contractAddress))
                throw new address_js_1.InvalidAddressError({ address: contractAddress });
            if (chainId < 0)
                throw new chain_js_1.InvalidChainIdError({ chainId });
        }
    }
    assertTransactionEIP1559(transaction);
}
function assertTransactionEIP4844(transaction) {
    const { blobVersionedHashes } = transaction;
    if (blobVersionedHashes) {
        if (blobVersionedHashes.length === 0)
            throw new blob_js_1.EmptyBlobError();
        for (const hash of blobVersionedHashes) {
            const size_ = (0, size_js_1.size)(hash);
            const version = (0, fromHex_js_1.hexToNumber)((0, slice_js_1.slice)(hash, 0, 1));
            if (size_ !== 32)
                throw new blob_js_1.InvalidVersionedHashSizeError({ hash, size: size_ });
            if (version !== kzg_js_1.versionedHashVersionKzg)
                throw new blob_js_1.InvalidVersionedHashVersionError({
                    hash,
                    version,
                });
        }
    }
    assertTransactionEIP1559(transaction);
}
function assertTransactionEIP1559(transaction) {
    const { chainId, maxPriorityFeePerGas, maxFeePerGas, to } = transaction;
    if (chainId <= 0)
        throw new chain_js_1.InvalidChainIdError({ chainId });
    if (to && !(0, isAddress_js_1.isAddress)(to))
        throw new address_js_1.InvalidAddressError({ address: to });
    if (maxFeePerGas && maxFeePerGas > number_js_1.maxUint256)
        throw new node_js_1.FeeCapTooHighError({ maxFeePerGas });
    if (maxPriorityFeePerGas &&
        maxFeePerGas &&
        maxPriorityFeePerGas > maxFeePerGas)
        throw new node_js_1.TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
}
function assertTransactionEIP2930(transaction) {
    const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to } = transaction;
    if (chainId <= 0)
        throw new chain_js_1.InvalidChainIdError({ chainId });
    if (to && !(0, isAddress_js_1.isAddress)(to))
        throw new address_js_1.InvalidAddressError({ address: to });
    if (maxPriorityFeePerGas || maxFeePerGas)
        throw new base_js_1.BaseError('`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid EIP-2930 Transaction attribute.');
    if (gasPrice && gasPrice > number_js_1.maxUint256)
        throw new node_js_1.FeeCapTooHighError({ maxFeePerGas: gasPrice });
}
function assertTransactionLegacy(transaction) {
    const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to } = transaction;
    if (to && !(0, isAddress_js_1.isAddress)(to))
        throw new address_js_1.InvalidAddressError({ address: to });
    if (typeof chainId !== 'undefined' && chainId <= 0)
        throw new chain_js_1.InvalidChainIdError({ chainId });
    if (maxPriorityFeePerGas || maxFeePerGas)
        throw new base_js_1.BaseError('`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid Legacy Transaction attribute.');
    if (gasPrice && gasPrice > number_js_1.maxUint256)
        throw new node_js_1.FeeCapTooHighError({ maxFeePerGas: gasPrice });
}
//# sourceMappingURL=assertTransaction.js.map