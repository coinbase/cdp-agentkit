import { keccak256 } from '../hash/keccak256.js';
import { parseTransaction } from '../transaction/parseTransaction.js';
import { serializeTransaction, } from '../transaction/serializeTransaction.js';
import { recoverAddress, } from './recoverAddress.js';
export async function recoverTransactionAddress(parameters) {
    const { serializedTransaction, signature: signature_ } = parameters;
    const transaction = parseTransaction(serializedTransaction);
    const signature = signature_ ?? {
        r: transaction.r,
        s: transaction.s,
        v: transaction.v,
        yParity: transaction.yParity,
    };
    const serialized = serializeTransaction({
        ...transaction,
        r: undefined,
        s: undefined,
        v: undefined,
        yParity: undefined,
        sidecars: undefined,
    });
    return await recoverAddress({
        hash: keccak256(serialized),
        signature,
    });
}
//# sourceMappingURL=recoverTransactionAddress.js.map