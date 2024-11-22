import { type InvalidSerializedTransactionTypeErrorType } from '../../errors/transaction.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Hex } from '../../index.js';
import type { TransactionSerialized, TransactionSerializedEIP1559, TransactionSerializedEIP2930, TransactionSerializedEIP4844, TransactionSerializedEIP7702, TransactionSerializedGeneric, TransactionSerializedLegacy, TransactionType } from '../../types/transaction.js';
import type { IsNarrowable, IsNever } from '../../types/utils.js';
import { type SliceHexErrorType } from '../data/slice.js';
import { type HexToNumberErrorType } from '../encoding/fromHex.js';
export type GetSerializedTransactionType<serializedTransaction extends TransactionSerializedGeneric = TransactionSerialized, result = (serializedTransaction extends TransactionSerializedEIP1559 ? 'eip1559' : never) | (serializedTransaction extends TransactionSerializedEIP2930 ? 'eip2930' : never) | (serializedTransaction extends TransactionSerializedEIP4844 ? 'eip4844' : never) | (serializedTransaction extends TransactionSerializedEIP7702 ? 'eip7702' : never) | (serializedTransaction extends TransactionSerializedLegacy ? 'legacy' : never)> = IsNarrowable<serializedTransaction, Hex> extends true ? IsNever<result> extends false ? result : 'legacy' : TransactionType;
export type GetSerializedTransactionTypeErrorType = HexToNumberErrorType | InvalidSerializedTransactionTypeErrorType | SliceHexErrorType | ErrorType;
export declare function getSerializedTransactionType<const serializedTransaction extends TransactionSerializedGeneric>(serializedTransaction: serializedTransaction): GetSerializedTransactionType<serializedTransaction>;
//# sourceMappingURL=getSerializedTransactionType.d.ts.map