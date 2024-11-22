import { InvalidAddressError, } from '../../errors/address.js';
import { InvalidLegacyVError, InvalidSerializedTransactionError, } from '../../errors/transaction.js';
import { isAddress } from '../address/isAddress.js';
import { toBlobSidecars } from '../blob/toBlobSidecars.js';
import { isHex } from '../data/isHex.js';
import { padHex } from '../data/pad.js';
import { trim } from '../data/trim.js';
import { hexToBigInt, hexToNumber, } from '../encoding/fromHex.js';
import { fromRlp } from '../encoding/fromRlp.js';
import { isHash } from '../hash/isHash.js';
import { assertTransactionEIP1559, assertTransactionEIP2930, assertTransactionEIP4844, assertTransactionEIP7702, assertTransactionLegacy, } from './assertTransaction.js';
import { getSerializedTransactionType, } from './getSerializedTransactionType.js';
export function parseTransaction(serializedTransaction) {
    const type = getSerializedTransactionType(serializedTransaction);
    if (type === 'eip1559')
        return parseTransactionEIP1559(serializedTransaction);
    if (type === 'eip2930')
        return parseTransactionEIP2930(serializedTransaction);
    if (type === 'eip4844')
        return parseTransactionEIP4844(serializedTransaction);
    if (type === 'eip7702')
        return parseTransactionEIP7702(serializedTransaction);
    return parseTransactionLegacy(serializedTransaction);
}
function parseTransactionEIP7702(serializedTransaction) {
    const transactionArray = toTransactionArray(serializedTransaction);
    const [chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gas, to, value, data, accessList, authorizationList, v, r, s,] = transactionArray;
    if (transactionArray.length !== 10 && transactionArray.length !== 13)
        throw new InvalidSerializedTransactionError({
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
                authorizationList,
                ...(transactionArray.length > 9
                    ? {
                        v,
                        r,
                        s,
                    }
                    : {}),
            },
            serializedTransaction,
            type: 'eip7702',
        });
    const transaction = {
        chainId: hexToNumber(chainId),
        type: 'eip7702',
    };
    if (isHex(to) && to !== '0x')
        transaction.to = to;
    if (isHex(gas) && gas !== '0x')
        transaction.gas = hexToBigInt(gas);
    if (isHex(data) && data !== '0x')
        transaction.data = data;
    if (isHex(nonce) && nonce !== '0x')
        transaction.nonce = hexToNumber(nonce);
    if (isHex(value) && value !== '0x')
        transaction.value = hexToBigInt(value);
    if (isHex(maxFeePerGas) && maxFeePerGas !== '0x')
        transaction.maxFeePerGas = hexToBigInt(maxFeePerGas);
    if (isHex(maxPriorityFeePerGas) && maxPriorityFeePerGas !== '0x')
        transaction.maxPriorityFeePerGas = hexToBigInt(maxPriorityFeePerGas);
    if (accessList.length !== 0 && accessList !== '0x')
        transaction.accessList = parseAccessList(accessList);
    if (authorizationList.length !== 0 && authorizationList !== '0x')
        transaction.authorizationList = parseAuthorizationList(authorizationList);
    assertTransactionEIP7702(transaction);
    const signature = transactionArray.length === 13
        ? parseEIP155Signature(transactionArray)
        : undefined;
    return { ...signature, ...transaction };
}
function parseTransactionEIP4844(serializedTransaction) {
    const transactionOrWrapperArray = toTransactionArray(serializedTransaction);
    const hasNetworkWrapper = transactionOrWrapperArray.length === 4;
    const transactionArray = hasNetworkWrapper
        ? transactionOrWrapperArray[0]
        : transactionOrWrapperArray;
    const wrapperArray = hasNetworkWrapper
        ? transactionOrWrapperArray.slice(1)
        : [];
    const [chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gas, to, value, data, accessList, maxFeePerBlobGas, blobVersionedHashes, v, r, s,] = transactionArray;
    const [blobs, commitments, proofs] = wrapperArray;
    if (!(transactionArray.length === 11 || transactionArray.length === 14))
        throw new InvalidSerializedTransactionError({
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
                ...(transactionArray.length > 9
                    ? {
                        v,
                        r,
                        s,
                    }
                    : {}),
            },
            serializedTransaction,
            type: 'eip4844',
        });
    const transaction = {
        blobVersionedHashes: blobVersionedHashes,
        chainId: hexToNumber(chainId),
        type: 'eip4844',
    };
    if (isHex(to) && to !== '0x')
        transaction.to = to;
    if (isHex(gas) && gas !== '0x')
        transaction.gas = hexToBigInt(gas);
    if (isHex(data) && data !== '0x')
        transaction.data = data;
    if (isHex(nonce) && nonce !== '0x')
        transaction.nonce = hexToNumber(nonce);
    if (isHex(value) && value !== '0x')
        transaction.value = hexToBigInt(value);
    if (isHex(maxFeePerBlobGas) && maxFeePerBlobGas !== '0x')
        transaction.maxFeePerBlobGas = hexToBigInt(maxFeePerBlobGas);
    if (isHex(maxFeePerGas) && maxFeePerGas !== '0x')
        transaction.maxFeePerGas = hexToBigInt(maxFeePerGas);
    if (isHex(maxPriorityFeePerGas) && maxPriorityFeePerGas !== '0x')
        transaction.maxPriorityFeePerGas = hexToBigInt(maxPriorityFeePerGas);
    if (accessList.length !== 0 && accessList !== '0x')
        transaction.accessList = parseAccessList(accessList);
    if (blobs && commitments && proofs)
        transaction.sidecars = toBlobSidecars({
            blobs: blobs,
            commitments: commitments,
            proofs: proofs,
        });
    assertTransactionEIP4844(transaction);
    const signature = transactionArray.length === 14
        ? parseEIP155Signature(transactionArray)
        : undefined;
    return { ...signature, ...transaction };
}
function parseTransactionEIP1559(serializedTransaction) {
    const transactionArray = toTransactionArray(serializedTransaction);
    const [chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gas, to, value, data, accessList, v, r, s,] = transactionArray;
    if (!(transactionArray.length === 9 || transactionArray.length === 12))
        throw new InvalidSerializedTransactionError({
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
                ...(transactionArray.length > 9
                    ? {
                        v,
                        r,
                        s,
                    }
                    : {}),
            },
            serializedTransaction,
            type: 'eip1559',
        });
    const transaction = {
        chainId: hexToNumber(chainId),
        type: 'eip1559',
    };
    if (isHex(to) && to !== '0x')
        transaction.to = to;
    if (isHex(gas) && gas !== '0x')
        transaction.gas = hexToBigInt(gas);
    if (isHex(data) && data !== '0x')
        transaction.data = data;
    if (isHex(nonce) && nonce !== '0x')
        transaction.nonce = hexToNumber(nonce);
    if (isHex(value) && value !== '0x')
        transaction.value = hexToBigInt(value);
    if (isHex(maxFeePerGas) && maxFeePerGas !== '0x')
        transaction.maxFeePerGas = hexToBigInt(maxFeePerGas);
    if (isHex(maxPriorityFeePerGas) && maxPriorityFeePerGas !== '0x')
        transaction.maxPriorityFeePerGas = hexToBigInt(maxPriorityFeePerGas);
    if (accessList.length !== 0 && accessList !== '0x')
        transaction.accessList = parseAccessList(accessList);
    assertTransactionEIP1559(transaction);
    const signature = transactionArray.length === 12
        ? parseEIP155Signature(transactionArray)
        : undefined;
    return { ...signature, ...transaction };
}
function parseTransactionEIP2930(serializedTransaction) {
    const transactionArray = toTransactionArray(serializedTransaction);
    const [chainId, nonce, gasPrice, gas, to, value, data, accessList, v, r, s] = transactionArray;
    if (!(transactionArray.length === 8 || transactionArray.length === 11))
        throw new InvalidSerializedTransactionError({
            attributes: {
                chainId,
                nonce,
                gasPrice,
                gas,
                to,
                value,
                data,
                accessList,
                ...(transactionArray.length > 8
                    ? {
                        v,
                        r,
                        s,
                    }
                    : {}),
            },
            serializedTransaction,
            type: 'eip2930',
        });
    const transaction = {
        chainId: hexToNumber(chainId),
        type: 'eip2930',
    };
    if (isHex(to) && to !== '0x')
        transaction.to = to;
    if (isHex(gas) && gas !== '0x')
        transaction.gas = hexToBigInt(gas);
    if (isHex(data) && data !== '0x')
        transaction.data = data;
    if (isHex(nonce) && nonce !== '0x')
        transaction.nonce = hexToNumber(nonce);
    if (isHex(value) && value !== '0x')
        transaction.value = hexToBigInt(value);
    if (isHex(gasPrice) && gasPrice !== '0x')
        transaction.gasPrice = hexToBigInt(gasPrice);
    if (accessList.length !== 0 && accessList !== '0x')
        transaction.accessList = parseAccessList(accessList);
    assertTransactionEIP2930(transaction);
    const signature = transactionArray.length === 11
        ? parseEIP155Signature(transactionArray)
        : undefined;
    return { ...signature, ...transaction };
}
function parseTransactionLegacy(serializedTransaction) {
    const transactionArray = fromRlp(serializedTransaction, 'hex');
    const [nonce, gasPrice, gas, to, value, data, chainIdOrV_, r, s] = transactionArray;
    if (!(transactionArray.length === 6 || transactionArray.length === 9))
        throw new InvalidSerializedTransactionError({
            attributes: {
                nonce,
                gasPrice,
                gas,
                to,
                value,
                data,
                ...(transactionArray.length > 6
                    ? {
                        v: chainIdOrV_,
                        r,
                        s,
                    }
                    : {}),
            },
            serializedTransaction,
            type: 'legacy',
        });
    const transaction = {
        type: 'legacy',
    };
    if (isHex(to) && to !== '0x')
        transaction.to = to;
    if (isHex(gas) && gas !== '0x')
        transaction.gas = hexToBigInt(gas);
    if (isHex(data) && data !== '0x')
        transaction.data = data;
    if (isHex(nonce) && nonce !== '0x')
        transaction.nonce = hexToNumber(nonce);
    if (isHex(value) && value !== '0x')
        transaction.value = hexToBigInt(value);
    if (isHex(gasPrice) && gasPrice !== '0x')
        transaction.gasPrice = hexToBigInt(gasPrice);
    assertTransactionLegacy(transaction);
    if (transactionArray.length === 6)
        return transaction;
    const chainIdOrV = isHex(chainIdOrV_) && chainIdOrV_ !== '0x'
        ? hexToBigInt(chainIdOrV_)
        : 0n;
    if (s === '0x' && r === '0x') {
        if (chainIdOrV > 0)
            transaction.chainId = Number(chainIdOrV);
        return transaction;
    }
    const v = chainIdOrV;
    const chainId = Number((v - 35n) / 2n);
    if (chainId > 0)
        transaction.chainId = chainId;
    else if (v !== 27n && v !== 28n)
        throw new InvalidLegacyVError({ v });
    transaction.v = v;
    transaction.s = s;
    transaction.r = r;
    transaction.yParity = v % 2n === 0n ? 1 : 0;
    return transaction;
}
export function toTransactionArray(serializedTransaction) {
    return fromRlp(`0x${serializedTransaction.slice(4)}`, 'hex');
}
export function parseAccessList(accessList_) {
    const accessList = [];
    for (let i = 0; i < accessList_.length; i++) {
        const [address, storageKeys] = accessList_[i];
        if (!isAddress(address, { strict: false }))
            throw new InvalidAddressError({ address });
        accessList.push({
            address: address,
            storageKeys: storageKeys.map((key) => (isHash(key) ? key : trim(key))),
        });
    }
    return accessList;
}
function parseAuthorizationList(serializedAuthorizationList) {
    const authorizationList = [];
    for (let i = 0; i < serializedAuthorizationList.length; i++) {
        const [chainId, contractAddress, nonce, yParity, r, s] = serializedAuthorizationList[i];
        authorizationList.push({
            chainId: hexToNumber(chainId),
            contractAddress,
            nonce: hexToNumber(nonce),
            ...parseEIP155Signature([yParity, r, s]),
        });
    }
    return authorizationList;
}
function parseEIP155Signature(transactionArray) {
    const signature = transactionArray.slice(-3);
    const v = signature[0] === '0x' || hexToBigInt(signature[0]) === 0n ? 27n : 28n;
    return {
        r: padHex(signature[1], { size: 32 }),
        s: padHex(signature[2], { size: 32 }),
        v,
        yParity: v === 27n ? 0 : 1,
    };
}
//# sourceMappingURL=parseTransaction.js.map