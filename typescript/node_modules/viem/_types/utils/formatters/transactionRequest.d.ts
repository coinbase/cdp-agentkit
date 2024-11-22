import type { ErrorType } from '../../errors/utils.js';
import type { Chain, ExtractChainFormatterParameters } from '../../types/chain.js';
import type { RpcTransactionRequest } from '../../types/rpc.js';
import type { TransactionRequest } from '../../types/transaction.js';
import type { ExactPartial } from '../../types/utils.js';
import { type DefineFormatterErrorType } from './formatter.js';
export type FormattedTransactionRequest<chain extends Chain | undefined = Chain | undefined> = ExtractChainFormatterParameters<chain, 'transactionRequest', TransactionRequest>;
export declare const rpcTransactionType: {
    readonly legacy: "0x0";
    readonly eip2930: "0x1";
    readonly eip1559: "0x2";
    readonly eip4844: "0x3";
    readonly eip7702: "0x4";
};
export type FormatTransactionRequestErrorType = ErrorType;
export declare function formatTransactionRequest(request: ExactPartial<TransactionRequest>): RpcTransactionRequest;
export type DefineTransactionRequestErrorType = DefineFormatterErrorType | ErrorType;
export declare const defineTransactionRequest: <parametersOverride, returnTypeOverride, exclude extends ("type" | "gasPrice" | "maxFeePerBlobGas" | "maxFeePerGas" | "maxPriorityFeePerGas" | "to" | "data" | "from" | "gas" | "nonce" | "value" | "blobs" | "accessList" | "authorizationList" | "blobVersionedHashes" | "kzg" | "sidecars" | keyof parametersOverride)[] = []>({ exclude, format: overrides, }: {
    exclude?: exclude | undefined;
    format: (_: parametersOverride) => returnTypeOverride;
}) => {
    exclude: exclude | undefined;
    format: (args: parametersOverride) => { [K in keyof returnTypeOverride]: returnTypeOverride[K]; } & { [_key in exclude[number]]: never; };
    type: "transactionRequest";
};
//# sourceMappingURL=transactionRequest.d.ts.map