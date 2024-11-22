import type { Address } from 'abitype';
import type { ErrorType } from '../../errors/utils.js';
import type { ByteArray, Hex, Signature } from '../../types/misc.js';
import type { TransactionSerialized } from '../../types/transaction.js';
import { type Keccak256ErrorType } from '../hash/keccak256.js';
import { type SerializeTransactionErrorType } from '../transaction/serializeTransaction.js';
import { type RecoverAddressErrorType } from './recoverAddress.js';
import type { SerializeSignatureErrorType } from './serializeSignature.js';
export type RecoverTransactionAddressParameters = {
    serializedTransaction: TransactionSerialized;
    signature?: Hex | ByteArray | Signature;
};
export type RecoverTransactionAddressReturnType = Address;
export type RecoverTransactionAddressErrorType = SerializeTransactionErrorType | RecoverAddressErrorType | Keccak256ErrorType | SerializeSignatureErrorType | ErrorType;
export declare function recoverTransactionAddress(parameters: RecoverTransactionAddressParameters): Promise<RecoverTransactionAddressReturnType>;
//# sourceMappingURL=recoverTransactionAddress.d.ts.map