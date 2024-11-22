import type { Signature } from '../index.js';
import type { ZksyncTransactionSerializable } from './types/transaction.js';
export declare function serializeTransaction(transaction: ZksyncTransactionSerializable, signature?: Signature | undefined): `0x02${string}` | `0x01${string}` | `0x03${string}` | `0x04${string}` | import("../index.js").TransactionSerializedLegacy | `0x71${string}`;
export declare const serializers: {
    readonly transaction: typeof serializeTransaction;
};
//# sourceMappingURL=serializers.d.ts.map