import { InvalidLegacyVError, } from '../../errors/transaction.js';
import { blobsToCommitments, } from '../blob/blobsToCommitments.js';
import { blobsToProofs, } from '../blob/blobsToProofs.js';
import { commitmentsToVersionedHashes, } from '../blob/commitmentsToVersionedHashes.js';
import { toBlobSidecars, } from '../blob/toBlobSidecars.js';
import { concatHex } from '../data/concat.js';
import { trim } from '../data/trim.js';
import { bytesToHex, toHex } from '../encoding/toHex.js';
import { toRlp } from '../encoding/toRlp.js';
import { serializeAuthorizationList, } from '../../experimental/eip7702/utils/serializeAuthorizationList.js';
import { assertTransactionEIP1559, assertTransactionEIP2930, assertTransactionEIP4844, assertTransactionEIP7702, assertTransactionLegacy, } from './assertTransaction.js';
import { getTransactionType, } from './getTransactionType.js';
import { serializeAccessList, } from './serializeAccessList.js';
export function serializeTransaction(transaction, signature) {
    const type = getTransactionType(transaction);
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
    assertTransactionEIP7702(transaction);
    const serializedAccessList = serializeAccessList(accessList);
    const serializedAuthorizationList = serializeAuthorizationList(authorizationList);
    return concatHex([
        '0x04',
        toRlp([
            toHex(chainId),
            nonce ? toHex(nonce) : '0x',
            maxPriorityFeePerGas ? toHex(maxPriorityFeePerGas) : '0x',
            maxFeePerGas ? toHex(maxFeePerGas) : '0x',
            gas ? toHex(gas) : '0x',
            to ?? '0x',
            value ? toHex(value) : '0x',
            data ?? '0x',
            serializedAccessList,
            serializedAuthorizationList,
            ...toYParitySignatureArray(transaction, signature),
        ]),
    ]);
}
function serializeTransactionEIP4844(transaction, signature) {
    const { chainId, gas, nonce, to, value, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, accessList, data, } = transaction;
    assertTransactionEIP4844(transaction);
    let blobVersionedHashes = transaction.blobVersionedHashes;
    let sidecars = transaction.sidecars;
    // If `blobs` are passed, we will need to compute the KZG commitments & proofs.
    if (transaction.blobs &&
        (typeof blobVersionedHashes === 'undefined' ||
            typeof sidecars === 'undefined')) {
        const blobs = (typeof transaction.blobs[0] === 'string'
            ? transaction.blobs
            : transaction.blobs.map((x) => bytesToHex(x)));
        const kzg = transaction.kzg;
        const commitments = blobsToCommitments({
            blobs,
            kzg,
        });
        if (typeof blobVersionedHashes === 'undefined')
            blobVersionedHashes = commitmentsToVersionedHashes({
                commitments,
            });
        if (typeof sidecars === 'undefined') {
            const proofs = blobsToProofs({ blobs, commitments, kzg });
            sidecars = toBlobSidecars({ blobs, commitments, proofs });
        }
    }
    const serializedAccessList = serializeAccessList(accessList);
    const serializedTransaction = [
        toHex(chainId),
        nonce ? toHex(nonce) : '0x',
        maxPriorityFeePerGas ? toHex(maxPriorityFeePerGas) : '0x',
        maxFeePerGas ? toHex(maxFeePerGas) : '0x',
        gas ? toHex(gas) : '0x',
        to ?? '0x',
        value ? toHex(value) : '0x',
        data ?? '0x',
        serializedAccessList,
        maxFeePerBlobGas ? toHex(maxFeePerBlobGas) : '0x',
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
    return concatHex([
        '0x03',
        sidecars
            ? // If sidecars are enabled, envelope turns into a "wrapper":
                toRlp([serializedTransaction, blobs, commitments, proofs])
            : // If sidecars are disabled, standard envelope is used:
                toRlp(serializedTransaction),
    ]);
}
function serializeTransactionEIP1559(transaction, signature) {
    const { chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data, } = transaction;
    assertTransactionEIP1559(transaction);
    const serializedAccessList = serializeAccessList(accessList);
    const serializedTransaction = [
        toHex(chainId),
        nonce ? toHex(nonce) : '0x',
        maxPriorityFeePerGas ? toHex(maxPriorityFeePerGas) : '0x',
        maxFeePerGas ? toHex(maxFeePerGas) : '0x',
        gas ? toHex(gas) : '0x',
        to ?? '0x',
        value ? toHex(value) : '0x',
        data ?? '0x',
        serializedAccessList,
        ...toYParitySignatureArray(transaction, signature),
    ];
    return concatHex([
        '0x02',
        toRlp(serializedTransaction),
    ]);
}
function serializeTransactionEIP2930(transaction, signature) {
    const { chainId, gas, data, nonce, to, value, accessList, gasPrice } = transaction;
    assertTransactionEIP2930(transaction);
    const serializedAccessList = serializeAccessList(accessList);
    const serializedTransaction = [
        toHex(chainId),
        nonce ? toHex(nonce) : '0x',
        gasPrice ? toHex(gasPrice) : '0x',
        gas ? toHex(gas) : '0x',
        to ?? '0x',
        value ? toHex(value) : '0x',
        data ?? '0x',
        serializedAccessList,
        ...toYParitySignatureArray(transaction, signature),
    ];
    return concatHex([
        '0x01',
        toRlp(serializedTransaction),
    ]);
}
function serializeTransactionLegacy(transaction, signature) {
    const { chainId = 0, gas, data, nonce, to, value, gasPrice } = transaction;
    assertTransactionLegacy(transaction);
    let serializedTransaction = [
        nonce ? toHex(nonce) : '0x',
        gasPrice ? toHex(gasPrice) : '0x',
        gas ? toHex(gas) : '0x',
        to ?? '0x',
        value ? toHex(value) : '0x',
        data ?? '0x',
    ];
    if (signature) {
        const v = (() => {
            // EIP-155 (inferred chainId)
            if (signature.v >= 35n) {
                const inferredChainId = (signature.v - 35n) / 2n;
                if (inferredChainId > 0)
                    return signature.v;
                return 27n + (signature.v === 35n ? 0n : 1n);
            }
            // EIP-155 (explicit chainId)
            if (chainId > 0)
                return BigInt(chainId * 2) + BigInt(35n + signature.v - 27n);
            // Pre-EIP-155 (no chainId)
            const v = 27n + (signature.v === 27n ? 0n : 1n);
            if (signature.v !== v)
                throw new InvalidLegacyVError({ v: signature.v });
            return v;
        })();
        const r = trim(signature.r);
        const s = trim(signature.s);
        serializedTransaction = [
            ...serializedTransaction,
            toHex(v),
            r === '0x00' ? '0x' : r,
            s === '0x00' ? '0x' : s,
        ];
    }
    else if (chainId > 0) {
        serializedTransaction = [
            ...serializedTransaction,
            toHex(chainId),
            '0x',
            '0x',
        ];
    }
    return toRlp(serializedTransaction);
}
export function toYParitySignatureArray(transaction, signature_) {
    const signature = signature_ ?? transaction;
    const { v, yParity } = signature;
    if (typeof signature.r === 'undefined')
        return [];
    if (typeof signature.s === 'undefined')
        return [];
    if (typeof v === 'undefined' && typeof yParity === 'undefined')
        return [];
    const r = trim(signature.r);
    const s = trim(signature.s);
    const yParity_ = (() => {
        if (typeof yParity === 'number')
            return yParity ? toHex(1) : '0x';
        if (v === 0n)
            return '0x';
        if (v === 1n)
            return toHex(1);
        return v === 27n ? '0x' : toHex(1);
    })();
    return [yParity_, r === '0x00' ? '0x' : r, s === '0x00' ? '0x' : s];
}
//# sourceMappingURL=serializeTransaction.js.map