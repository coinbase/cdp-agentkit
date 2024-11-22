import type { GetSerializedTransactionType } from '../utils/transaction/getSerializedTransactionType.js';
import { type ParseTransactionReturnType as ParseTransactionReturnType_ } from '../utils/transaction/parseTransaction.js';
import type { CeloTransactionSerialized, CeloTransactionType, TransactionSerializableCIP42, TransactionSerializedCIP42 } from './types.js';
export type ParseTransactionReturnType<serialized extends CeloTransactionSerialized = CeloTransactionSerialized, type extends CeloTransactionType = GetSerializedTransactionType<serialized>> = serialized extends TransactionSerializedCIP42 ? TransactionSerializableCIP42 : ParseTransactionReturnType_<serialized, type>;
export declare function parseTransaction<serialized extends CeloTransactionSerialized>(serializedTransaction: serialized): ParseTransactionReturnType<serialized>;
//# sourceMappingURL=parsers.d.ts.map