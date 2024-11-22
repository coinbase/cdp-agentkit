import type { Signature } from '../types/misc.js';
import type { CeloTransactionSerializable, TransactionSerializableCIP42, TransactionSerializableCIP64, TransactionSerializedCIP64 } from './types.js';
export declare function serializeTransaction(transaction: CeloTransactionSerializable, signature?: Signature | undefined): `0x02${string}` | `0x01${string}` | `0x03${string}` | `0x04${string}` | import("../index.js").TransactionSerializedLegacy | `0x7e${string}` | `0x7b${string}`;
export declare const serializers: {
    readonly transaction: typeof serializeTransaction;
};
export type SerializeTransactionCIP64ReturnType = TransactionSerializedCIP64;
export declare function assertTransactionCIP42(transaction: TransactionSerializableCIP42): void;
export declare function assertTransactionCIP64(transaction: TransactionSerializableCIP64): void;
//# sourceMappingURL=serializers.d.ts.map