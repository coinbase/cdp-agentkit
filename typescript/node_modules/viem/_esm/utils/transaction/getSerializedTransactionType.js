import { InvalidSerializedTransactionTypeError, } from '../../errors/transaction.js';
import { sliceHex } from '../data/slice.js';
import { hexToNumber } from '../encoding/fromHex.js';
export function getSerializedTransactionType(serializedTransaction) {
    const serializedType = sliceHex(serializedTransaction, 0, 1);
    if (serializedType === '0x04')
        return 'eip7702';
    if (serializedType === '0x03')
        return 'eip4844';
    if (serializedType === '0x02')
        return 'eip1559';
    if (serializedType === '0x01')
        return 'eip2930';
    if (serializedType !== '0x' && hexToNumber(serializedType) >= 0xc0)
        return 'legacy';
    throw new InvalidSerializedTransactionTypeError({ serializedType });
}
//# sourceMappingURL=getSerializedTransactionType.js.map