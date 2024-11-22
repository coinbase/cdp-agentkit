import type { ErrorType } from '../../errors/utils.js';
import type { Hex } from '../../types/misc.js';
import type { TransactionSerializable, TransactionSerialized } from '../../types/transaction.js';
import { type Keccak256ErrorType } from '../../utils/hash/keccak256.js';
import type { GetTransactionType } from '../../utils/transaction/getTransactionType.js';
import { type SerializeTransactionFn } from '../../utils/transaction/serializeTransaction.js';
import { type SignErrorType } from './sign.js';
export type SignTransactionParameters<serializer extends SerializeTransactionFn<TransactionSerializable> = SerializeTransactionFn<TransactionSerializable>, transaction extends Parameters<serializer>[0] = Parameters<serializer>[0]> = {
    privateKey: Hex;
    transaction: transaction;
    serializer?: serializer | undefined;
};
export type SignTransactionReturnType<serializer extends SerializeTransactionFn<TransactionSerializable> = SerializeTransactionFn<TransactionSerializable>, transaction extends Parameters<serializer>[0] = Parameters<serializer>[0]> = TransactionSerialized<GetTransactionType<transaction>>;
export type SignTransactionErrorType = Keccak256ErrorType | SignErrorType | ErrorType;
export declare function signTransaction<serializer extends SerializeTransactionFn<TransactionSerializable> = SerializeTransactionFn<TransactionSerializable>, transaction extends Parameters<serializer>[0] = Parameters<serializer>[0]>(parameters: SignTransactionParameters<serializer, transaction>): Promise<SignTransactionReturnType<serializer, transaction>>;
//# sourceMappingURL=signTransaction.d.ts.map