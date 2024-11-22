import type { ErrorType } from '../errors/utils.js';
import type { Signature } from '../types/misc.js';
import { type SerializeTransactionErrorType as SerializeTransactionErrorType_ } from '../utils/transaction/serializeTransaction.js';
import type { OpStackTransactionSerializable, TransactionSerializableDeposit, TransactionSerializedDeposit } from './types/transaction.js';
export type SerializeTransactionReturnType = ReturnType<typeof serializeTransaction>;
export type SerializeTransactionErrorType = SerializeTransactionErrorType_ | ErrorType;
export declare function serializeTransaction(transaction: OpStackTransactionSerializable, signature?: Signature): `0x02${string}` | `0x01${string}` | `0x03${string}` | `0x04${string}` | import("../types/transaction.js").TransactionSerializedLegacy | `0x7e${string}`;
export declare const serializers: {
    readonly transaction: typeof serializeTransaction;
};
export type SerializeTransactionDepositReturnType = TransactionSerializedDeposit;
export declare function assertTransactionDeposit(transaction: TransactionSerializableDeposit): void;
//# sourceMappingURL=serializers.d.ts.map