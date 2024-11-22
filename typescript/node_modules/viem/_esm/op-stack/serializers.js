import { InvalidAddressError } from '../errors/address.js';
import { isAddress } from '../utils/address/isAddress.js';
import { concatHex } from '../utils/data/concat.js';
import { toHex } from '../utils/encoding/toHex.js';
import { toRlp } from '../utils/encoding/toRlp.js';
import { serializeTransaction as serializeTransaction_, } from '../utils/transaction/serializeTransaction.js';
export function serializeTransaction(transaction, signature) {
    if (isDeposit(transaction))
        return serializeTransactionDeposit(transaction);
    return serializeTransaction_(transaction, signature);
}
export const serializers = {
    transaction: serializeTransaction,
};
function serializeTransactionDeposit(transaction) {
    assertTransactionDeposit(transaction);
    const { sourceHash, data, from, gas, isSystemTx, mint, to, value } = transaction;
    const serializedTransaction = [
        sourceHash,
        from,
        to ?? '0x',
        mint ? toHex(mint) : '0x',
        value ? toHex(value) : '0x',
        gas ? toHex(gas) : '0x',
        isSystemTx ? '0x1' : '0x',
        data ?? '0x',
    ];
    return concatHex([
        '0x7e',
        toRlp(serializedTransaction),
    ]);
}
function isDeposit(transaction) {
    if (transaction.type === 'deposit')
        return true;
    if (typeof transaction.sourceHash !== 'undefined')
        return true;
    return false;
}
export function assertTransactionDeposit(transaction) {
    const { from, to } = transaction;
    if (from && !isAddress(from))
        throw new InvalidAddressError({ address: from });
    if (to && !isAddress(to))
        throw new InvalidAddressError({ address: to });
}
//# sourceMappingURL=serializers.js.map