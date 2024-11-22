import type { CeloTransactionRequest, CeloTransactionSerializable, TransactionSerializableCIP64 } from './types.js';
export declare function isEmpty(value: string | undefined | number | BigInt): value is undefined;
export declare function isPresent(value: string | undefined | number | BigInt): value is string | number | BigInt;
/** @internal */
export declare function isEIP1559(transaction: CeloTransactionSerializable | CeloTransactionRequest): boolean;
export declare function isCIP64(transaction: CeloTransactionSerializable | CeloTransactionRequest): transaction is TransactionSerializableCIP64;
//# sourceMappingURL=utils.d.ts.map