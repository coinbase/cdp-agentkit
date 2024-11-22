import type { ErrorType } from '../../errors/utils.js';
import type { Chain, ExtractChainFormatterReturnType } from '../../types/chain.js';
import type { RpcTransactionReceipt } from '../../types/rpc.js';
import type { TransactionReceipt } from '../../types/transaction.js';
import type { ExactPartial } from '../../types/utils.js';
import { type DefineFormatterErrorType } from './formatter.js';
export type FormattedTransactionReceipt<chain extends Chain | undefined = undefined> = ExtractChainFormatterReturnType<chain, 'transactionReceipt', TransactionReceipt>;
export declare const receiptStatuses: {
    readonly '0x0': "reverted";
    readonly '0x1': "success";
};
export type FormatTransactionReceiptErrorType = ErrorType;
export declare function formatTransactionReceipt(transactionReceipt: ExactPartial<RpcTransactionReceipt>): TransactionReceipt;
export type DefineTransactionReceiptErrorType = DefineFormatterErrorType | ErrorType;
export declare const defineTransactionReceipt: <parametersOverride, returnTypeOverride, exclude extends (keyof RpcTransactionReceipt | keyof parametersOverride)[] = []>({ exclude, format: overrides, }: {
    exclude?: exclude | undefined;
    format: (_: parametersOverride) => returnTypeOverride;
}) => {
    exclude: exclude | undefined;
    format: (args: parametersOverride) => { [K in keyof returnTypeOverride]: returnTypeOverride[K]; } & { [_key in exclude[number]]: never; };
    type: "transactionReceipt";
};
//# sourceMappingURL=transactionReceipt.d.ts.map