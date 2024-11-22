import { InvalidSerializedTransactionError } from '../errors/transaction.js';
import { isHex } from '../utils/data/isHex.js';
import { sliceHex } from '../utils/data/slice.js';
import { hexToBigInt, hexToBool } from '../utils/encoding/fromHex.js';
import { parseTransaction as parseTransaction_, toTransactionArray, } from '../utils/transaction/parseTransaction.js';
import { assertTransactionDeposit } from './serializers.js';
export function parseTransaction(serializedTransaction) {
    const serializedType = sliceHex(serializedTransaction, 0, 1);
    if (serializedType === '0x7e')
        return parseTransactionDeposit(serializedTransaction);
    return parseTransaction_(serializedTransaction);
}
function parseTransactionDeposit(serializedTransaction) {
    const transactionArray = toTransactionArray(serializedTransaction);
    const [sourceHash, from, to, mint, value, gas, isSystemTx, data] = transactionArray;
    if (transactionArray.length !== 8 || !isHex(sourceHash) || !isHex(from))
        throw new InvalidSerializedTransactionError({
            attributes: {
                sourceHash,
                from,
                gas,
                to,
                mint,
                value,
                isSystemTx,
                data,
            },
            serializedTransaction,
            type: 'deposit',
        });
    const transaction = {
        sourceHash,
        from,
        type: 'deposit',
    };
    if (isHex(gas) && gas !== '0x')
        transaction.gas = hexToBigInt(gas);
    if (isHex(to) && to !== '0x')
        transaction.to = to;
    if (isHex(mint) && mint !== '0x')
        transaction.mint = hexToBigInt(mint);
    if (isHex(value) && value !== '0x')
        transaction.value = hexToBigInt(value);
    if (isHex(isSystemTx) && isSystemTx !== '0x')
        transaction.isSystemTx = hexToBool(isSystemTx);
    if (isHex(data) && data !== '0x')
        transaction.data = data;
    assertTransactionDeposit(transaction);
    return transaction;
}
//# sourceMappingURL=parsers.js.map