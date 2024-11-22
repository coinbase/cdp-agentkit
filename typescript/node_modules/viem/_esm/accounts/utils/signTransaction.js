import { keccak256, } from '../../utils/hash/keccak256.js';
import { serializeTransaction, } from '../../utils/transaction/serializeTransaction.js';
import { sign } from './sign.js';
export async function signTransaction(parameters) {
    const { privateKey, transaction, serializer = serializeTransaction, } = parameters;
    const signableTransaction = (() => {
        // For EIP-4844 Transactions, we want to sign the transaction payload body (tx_payload_body) without the sidecars (ie. without the network wrapper).
        // See: https://github.com/ethereum/EIPs/blob/e00f4daa66bd56e2dbd5f1d36d09fd613811a48b/EIPS/eip-4844.md#networking
        if (transaction.type === 'eip4844')
            return {
                ...transaction,
                sidecars: false,
            };
        return transaction;
    })();
    const signature = await sign({
        hash: keccak256(serializer(signableTransaction)),
        privateKey,
    });
    return serializer(transaction, signature);
}
//# sourceMappingURL=signTransaction.js.map