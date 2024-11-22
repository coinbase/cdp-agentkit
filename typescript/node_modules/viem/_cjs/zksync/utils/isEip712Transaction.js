"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEIP712Transaction = isEIP712Transaction;
function isEIP712Transaction(transaction) {
    if (transaction.type === 'eip712')
        return true;
    if (('customSignature' in transaction && transaction.customSignature) ||
        ('paymaster' in transaction && transaction.paymaster) ||
        ('paymasterInput' in transaction && transaction.paymasterInput) ||
        ('gasPerPubdata' in transaction &&
            typeof transaction.gasPerPubdata === 'bigint') ||
        ('factoryDeps' in transaction && transaction.factoryDeps))
        return true;
    return false;
}
//# sourceMappingURL=isEip712Transaction.js.map