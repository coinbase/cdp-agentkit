"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeTransaction = serializeTransaction;
exports.toYParitySignatureArray = toYParitySignatureArray;
const transaction_js_1 = require("../../errors/transaction.js");
const blobsToCommitments_js_1 = require("../blob/blobsToCommitments.js");
const blobsToProofs_js_1 = require("../blob/blobsToProofs.js");
const commitmentsToVersionedHashes_js_1 = require("../blob/commitmentsToVersionedHashes.js");
const toBlobSidecars_js_1 = require("../blob/toBlobSidecars.js");
const concat_js_1 = require("../data/concat.js");
const trim_js_1 = require("../data/trim.js");
const toHex_js_1 = require("../encoding/toHex.js");
const toRlp_js_1 = require("../encoding/toRlp.js");
const serializeAuthorizationList_js_1 = require("../../experimental/eip7702/utils/serializeAuthorizationList.js");
const assertTransaction_js_1 = require("./assertTransaction.js");
const getTransactionType_js_1 = require("./getTransactionType.js");
const serializeAccessList_js_1 = require("./serializeAccessList.js");
function serializeTransaction(transaction, signature) {
    const type = (0, getTransactionType_js_1.getTransactionType)(transaction);
    if (type === 'eip1559')
        return serializeTransactionEIP1559(transaction, signature);
    if (type === 'eip2930')
        return serializeTransactionEIP2930(transaction, signature);
    if (type === 'eip4844')
        return serializeTransactionEIP4844(transaction, signature);
    if (type === 'eip7702')
        return serializeTransactionEIP7702(transaction, signature);
    return serializeTransactionLegacy(transaction, signature);
}
function serializeTransactionEIP7702(transaction, signature) {
    const { authorizationList, chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data, } = transaction;
    (0, assertTransaction_js_1.assertTransactionEIP7702)(transaction);
    const serializedAccessList = (0, serializeAccessList_js_1.serializeAccessList)(accessList);
    const serializedAuthorizationList = (0, serializeAuthorizationList_js_1.serializeAuthorizationList)(authorizationList);
    return (0, concat_js_1.concatHex)([
        '0x04',
        (0, toRlp_js_1.toRlp)([
            (0, toHex_js_1.toHex)(chainId),
            nonce ? (0, toHex_js_1.toHex)(nonce) : '0x',
            maxPriorityFeePerGas ? (0, toHex_js_1.toHex)(maxPriorityFeePerGas) : '0x',
            maxFeePerGas ? (0, toHex_js_1.toHex)(maxFeePerGas) : '0x',
            gas ? (0, toHex_js_1.toHex)(gas) : '0x',
            to ?? '0x',
            value ? (0, toHex_js_1.toHex)(value) : '0x',
            data ?? '0x',
            serializedAccessList,
            serializedAuthorizationList,
            ...toYParitySignatureArray(transaction, signature),
        ]),
    ]);
}
function serializeTransactionEIP4844(transaction, signature) {
    const { chainId, gas, nonce, to, value, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, accessList, data, } = transaction;
    (0, assertTransaction_js_1.assertTransactionEIP4844)(transaction);
    let blobVersionedHashes = transaction.blobVersionedHashes;
    let sidecars = transaction.sidecars;
    if (transaction.blobs &&
        (typeof blobVersionedHashes === 'undefined' ||
            typeof sidecars === 'undefined')) {
        const blobs = (typeof transaction.blobs[0] === 'string'
            ? transaction.blobs
            : transaction.blobs.map((x) => (0, toHex_js_1.bytesToHex)(x)));
        const kzg = transaction.kzg;
        const commitments = (0, blobsToCommitments_js_1.blobsToCommitments)({
            blobs,
            kzg,
        });
        if (typeof blobVersionedHashes === 'undefined')
            blobVersionedHashes = (0, commitmentsToVersionedHashes_js_1.commitmentsToVersionedHashes)({
                commitments,
            });
        if (typeof sidecars === 'undefined') {
            const proofs = (0, blobsToProofs_js_1.blobsToProofs)({ blobs, commitments, kzg });
            sidecars = (0, toBlobSidecars_js_1.toBlobSidecars)({ blobs, commitments, proofs });
        }
    }
    const serializedAccessList = (0, serializeAccessList_js_1.serializeAccessList)(accessList);
    const serializedTransaction = [
        (0, toHex_js_1.toHex)(chainId),
        nonce ? (0, toHex_js_1.toHex)(nonce) : '0x',
        maxPriorityFeePerGas ? (0, toHex_js_1.toHex)(maxPriorityFeePerGas) : '0x',
        maxFeePerGas ? (0, toHex_js_1.toHex)(maxFeePerGas) : '0x',
        gas ? (0, toHex_js_1.toHex)(gas) : '0x',
        to ?? '0x',
        value ? (0, toHex_js_1.toHex)(value) : '0x',
        data ?? '0x',
        serializedAccessList,
        maxFeePerBlobGas ? (0, toHex_js_1.toHex)(maxFeePerBlobGas) : '0x',
        blobVersionedHashes ?? [],
        ...toYParitySignatureArray(transaction, signature),
    ];
    const blobs = [];
    const commitments = [];
    const proofs = [];
    if (sidecars)
        for (let i = 0; i < sidecars.length; i++) {
            const { blob, commitment, proof } = sidecars[i];
            blobs.push(blob);
            commitments.push(commitment);
            proofs.push(proof);
        }
    return (0, concat_js_1.concatHex)([
        '0x03',
        sidecars
            ?
                (0, toRlp_js_1.toRlp)([serializedTransaction, blobs, commitments, proofs])
            :
                (0, toRlp_js_1.toRlp)(serializedTransaction),
    ]);
}
function serializeTransactionEIP1559(transaction, signature) {
    const { chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data, } = transaction;
    (0, assertTransaction_js_1.assertTransactionEIP1559)(transaction);
    const serializedAccessList = (0, serializeAccessList_js_1.serializeAccessList)(accessList);
    const serializedTransaction = [
        (0, toHex_js_1.toHex)(chainId),
        nonce ? (0, toHex_js_1.toHex)(nonce) : '0x',
        maxPriorityFeePerGas ? (0, toHex_js_1.toHex)(maxPriorityFeePerGas) : '0x',
        maxFeePerGas ? (0, toHex_js_1.toHex)(maxFeePerGas) : '0x',
        gas ? (0, toHex_js_1.toHex)(gas) : '0x',
        to ?? '0x',
        value ? (0, toHex_js_1.toHex)(value) : '0x',
        data ?? '0x',
        serializedAccessList,
        ...toYParitySignatureArray(transaction, signature),
    ];
    return (0, concat_js_1.concatHex)([
        '0x02',
        (0, toRlp_js_1.toRlp)(serializedTransaction),
    ]);
}
function serializeTransactionEIP2930(transaction, signature) {
    const { chainId, gas, data, nonce, to, value, accessList, gasPrice } = transaction;
    (0, assertTransaction_js_1.assertTransactionEIP2930)(transaction);
    const serializedAccessList = (0, serializeAccessList_js_1.serializeAccessList)(accessList);
    const serializedTransaction = [
        (0, toHex_js_1.toHex)(chainId),
        nonce ? (0, toHex_js_1.toHex)(nonce) : '0x',
        gasPrice ? (0, toHex_js_1.toHex)(gasPrice) : '0x',
        gas ? (0, toHex_js_1.toHex)(gas) : '0x',
        to ?? '0x',
        value ? (0, toHex_js_1.toHex)(value) : '0x',
        data ?? '0x',
        serializedAccessList,
        ...toYParitySignatureArray(transaction, signature),
    ];
    return (0, concat_js_1.concatHex)([
        '0x01',
        (0, toRlp_js_1.toRlp)(serializedTransaction),
    ]);
}
function serializeTransactionLegacy(transaction, signature) {
    const { chainId = 0, gas, data, nonce, to, value, gasPrice } = transaction;
    (0, assertTransaction_js_1.assertTransactionLegacy)(transaction);
    let serializedTransaction = [
        nonce ? (0, toHex_js_1.toHex)(nonce) : '0x',
        gasPrice ? (0, toHex_js_1.toHex)(gasPrice) : '0x',
        gas ? (0, toHex_js_1.toHex)(gas) : '0x',
        to ?? '0x',
        value ? (0, toHex_js_1.toHex)(value) : '0x',
        data ?? '0x',
    ];
    if (signature) {
        const v = (() => {
            if (signature.v >= 35n) {
                const inferredChainId = (signature.v - 35n) / 2n;
                if (inferredChainId > 0)
                    return signature.v;
                return 27n + (signature.v === 35n ? 0n : 1n);
            }
            if (chainId > 0)
                return BigInt(chainId * 2) + BigInt(35n + signature.v - 27n);
            const v = 27n + (signature.v === 27n ? 0n : 1n);
            if (signature.v !== v)
                throw new transaction_js_1.InvalidLegacyVError({ v: signature.v });
            return v;
        })();
        const r = (0, trim_js_1.trim)(signature.r);
        const s = (0, trim_js_1.trim)(signature.s);
        serializedTransaction = [
            ...serializedTransaction,
            (0, toHex_js_1.toHex)(v),
            r === '0x00' ? '0x' : r,
            s === '0x00' ? '0x' : s,
        ];
    }
    else if (chainId > 0) {
        serializedTransaction = [
            ...serializedTransaction,
            (0, toHex_js_1.toHex)(chainId),
            '0x',
            '0x',
        ];
    }
    return (0, toRlp_js_1.toRlp)(serializedTransaction);
}
function toYParitySignatureArray(transaction, signature_) {
    const signature = signature_ ?? transaction;
    const { v, yParity } = signature;
    if (typeof signature.r === 'undefined')
        return [];
    if (typeof signature.s === 'undefined')
        return [];
    if (typeof v === 'undefined' && typeof yParity === 'undefined')
        return [];
    const r = (0, trim_js_1.trim)(signature.r);
    const s = (0, trim_js_1.trim)(signature.s);
    const yParity_ = (() => {
        if (typeof yParity === 'number')
            return yParity ? (0, toHex_js_1.toHex)(1) : '0x';
        if (v === 0n)
            return '0x';
        if (v === 1n)
            return (0, toHex_js_1.toHex)(1);
        return v === 27n ? '0x' : (0, toHex_js_1.toHex)(1);
    })();
    return [yParity_, r === '0x00' ? '0x' : r, s === '0x00' ? '0x' : s];
}
//# sourceMappingURL=serializeTransaction.js.map