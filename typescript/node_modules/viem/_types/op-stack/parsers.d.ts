import type { ErrorType } from '../errors/utils.js';
import type { GetSerializedTransactionType } from '../utils/transaction/getSerializedTransactionType.js';
import { type ParseTransactionErrorType as ParseTransactionErrorType_, type ParseTransactionReturnType as ParseTransactionReturnType_ } from '../utils/transaction/parseTransaction.js';
import type { OpStackTransactionSerialized, OpStackTransactionType, TransactionSerializableDeposit, TransactionSerializedDeposit } from './types/transaction.js';
export type ParseTransactionReturnType<serialized extends OpStackTransactionSerialized = OpStackTransactionSerialized, type extends OpStackTransactionType = GetSerializedTransactionType<serialized>> = serialized extends TransactionSerializedDeposit ? TransactionSerializableDeposit : ParseTransactionReturnType_<serialized, type>;
export type ParseTransactionErrorType = ParseTransactionErrorType_ | ErrorType;
export declare function parseTransaction<serialized extends OpStackTransactionSerialized>(serializedTransaction: serialized): ParseTransactionReturnType<serialized>;
//# sourceMappingURL=parsers.d.ts.map