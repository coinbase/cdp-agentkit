import type { ErrorType } from '../../errors/utils.js';
import type { BlockTag } from '../../types/block.js';
import type { Chain } from '../../types/chain.js';
import type { ExtractChainFormatterExclude, ExtractChainFormatterReturnType } from '../../types/chain.js';
import type { RpcTransaction } from '../../types/rpc.js';
import type { Transaction } from '../../types/transaction.js';
import type { ExactPartial, UnionLooseOmit } from '../../types/utils.js';
import { type DefineFormatterErrorType } from './formatter.js';
type TransactionPendingDependencies = 'blockHash' | 'blockNumber' | 'transactionIndex';
export type FormattedTransaction<chain extends Chain | undefined = undefined, blockTag extends BlockTag = BlockTag, _FormatterReturnType = ExtractChainFormatterReturnType<chain, 'transaction', Transaction>, _ExcludedPendingDependencies extends string = TransactionPendingDependencies & ExtractChainFormatterExclude<chain, 'transaction'>> = UnionLooseOmit<_FormatterReturnType, TransactionPendingDependencies> & {
    [_K in _ExcludedPendingDependencies]: never;
} & Pick<Transaction<bigint, number, blockTag extends 'pending' ? true : false>, TransactionPendingDependencies>;
export declare const transactionType: {
    readonly '0x0': "legacy";
    readonly '0x1': "eip2930";
    readonly '0x2': "eip1559";
    readonly '0x3': "eip4844";
    readonly '0x4': "eip7702";
};
export type FormatTransactionErrorType = ErrorType;
export declare function formatTransaction(transaction: ExactPartial<RpcTransaction>): Transaction;
export type DefineTransactionErrorType = DefineFormatterErrorType | ErrorType;
export declare const defineTransaction: <parametersOverride, returnTypeOverride, exclude extends ("type" | "r" | "s" | "v" | "yParity" | "gasPrice" | "maxFeePerBlobGas" | "maxFeePerGas" | "maxPriorityFeePerGas" | "to" | "from" | "gas" | "nonce" | "value" | "blockHash" | "blockNumber" | "hash" | "input" | "transactionIndex" | "accessList" | "authorizationList" | "blobVersionedHashes" | "chainId" | keyof parametersOverride)[] = []>({ exclude, format: overrides, }: {
    exclude?: exclude | undefined;
    format: (_: parametersOverride) => returnTypeOverride;
}) => {
    exclude: exclude | undefined;
    format: (args: parametersOverride) => { [K in keyof returnTypeOverride]: returnTypeOverride[K]; } & { [_key in exclude[number]]: never; };
    type: "transaction";
};
export {};
//# sourceMappingURL=transaction.d.ts.map