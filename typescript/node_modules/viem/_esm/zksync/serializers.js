import { concatHex } from '../utils/data/concat.js';
import { toHex } from '../utils/encoding/toHex.js';
import { toRlp } from '../utils/encoding/toRlp.js';
import { serializeTransaction as serializeTransaction_ } from '../utils/transaction/serializeTransaction.js';
import { gasPerPubdataDefault } from './constants/number.js';
import { assertEip712Transaction } from './utils/assertEip712Transaction.js';
import { isEIP712Transaction } from './utils/isEip712Transaction.js';
export function serializeTransaction(transaction, signature) {
    if (isEIP712Transaction(transaction))
        return serializeTransactionEIP712(transaction);
    return serializeTransaction_(transaction, signature);
}
export const serializers = {
    transaction: serializeTransaction,
};
function serializeTransactionEIP712(transaction) {
    const { chainId, gas, nonce, to, from, value, maxFeePerGas, maxPriorityFeePerGas, customSignature, factoryDeps, paymaster, paymasterInput, gasPerPubdata, data, } = transaction;
    assertEip712Transaction(transaction);
    const serializedTransaction = [
        nonce ? toHex(nonce) : '0x',
        maxPriorityFeePerGas ? toHex(maxPriorityFeePerGas) : '0x',
        maxFeePerGas ? toHex(maxFeePerGas) : '0x',
        gas ? toHex(gas) : '0x',
        to ?? '0x',
        value ? toHex(value) : '0x',
        data ?? '0x0',
        toHex(chainId),
        toHex(''),
        toHex(''),
        toHex(chainId),
        from ?? '0x',
        gasPerPubdata ? toHex(gasPerPubdata) : toHex(gasPerPubdataDefault),
        factoryDeps ?? [],
        customSignature ?? '0x', // EIP712 signature
        paymaster && paymasterInput ? [paymaster, paymasterInput] : [],
    ];
    return concatHex([
        '0x71',
        toRlp(serializedTransaction),
    ]);
}
//# sourceMappingURL=serializers.js.map