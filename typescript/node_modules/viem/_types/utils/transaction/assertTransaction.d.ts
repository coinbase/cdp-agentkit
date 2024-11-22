import { type InvalidAddressErrorType } from '../../errors/address.js';
import { type BaseErrorType } from '../../errors/base.js';
import { type EmptyBlobErrorType, type InvalidVersionedHashSizeErrorType, type InvalidVersionedHashVersionErrorType } from '../../errors/blob.js';
import { type InvalidChainIdErrorType } from '../../errors/chain.js';
import { type FeeCapTooHighErrorType, type TipAboveFeeCapErrorType } from '../../errors/node.js';
import type { ErrorType } from '../../errors/utils.js';
import type { TransactionSerializableEIP1559, TransactionSerializableEIP2930, TransactionSerializableEIP4844, TransactionSerializableEIP7702, TransactionSerializableLegacy } from '../../types/transaction.js';
import { type IsAddressErrorType } from '../address/isAddress.js';
export type AssertTransactionEIP7702ErrorType = AssertTransactionEIP1559ErrorType | InvalidAddressErrorType | InvalidChainIdErrorType | ErrorType;
export declare function assertTransactionEIP7702(transaction: TransactionSerializableEIP7702): void;
export type AssertTransactionEIP4844ErrorType = AssertTransactionEIP1559ErrorType | EmptyBlobErrorType | InvalidVersionedHashSizeErrorType | InvalidVersionedHashVersionErrorType | ErrorType;
export declare function assertTransactionEIP4844(transaction: TransactionSerializableEIP4844): void;
export type AssertTransactionEIP1559ErrorType = BaseErrorType | IsAddressErrorType | InvalidAddressErrorType | InvalidChainIdErrorType | FeeCapTooHighErrorType | TipAboveFeeCapErrorType | ErrorType;
export declare function assertTransactionEIP1559(transaction: TransactionSerializableEIP1559): void;
export type AssertTransactionEIP2930ErrorType = BaseErrorType | IsAddressErrorType | InvalidAddressErrorType | InvalidChainIdErrorType | FeeCapTooHighErrorType | ErrorType;
export declare function assertTransactionEIP2930(transaction: TransactionSerializableEIP2930): void;
export type AssertTransactionLegacyErrorType = BaseErrorType | IsAddressErrorType | InvalidAddressErrorType | InvalidChainIdErrorType | FeeCapTooHighErrorType | ErrorType;
export declare function assertTransactionLegacy(transaction: TransactionSerializableLegacy): void;
//# sourceMappingURL=assertTransaction.d.ts.map