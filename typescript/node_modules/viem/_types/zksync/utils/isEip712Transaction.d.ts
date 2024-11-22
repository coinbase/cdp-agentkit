import type { ExactPartial, OneOf } from '../../types/utils.js';
import type { ZksyncTransactionRequest, ZksyncTransactionSerializable } from '../types/transaction.js';
export declare function isEIP712Transaction(transaction: ExactPartial<OneOf<ZksyncTransactionRequest | ZksyncTransactionSerializable>>): boolean;
//# sourceMappingURL=isEip712Transaction.d.ts.map