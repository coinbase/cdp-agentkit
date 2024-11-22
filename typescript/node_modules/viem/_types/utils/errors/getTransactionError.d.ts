import type { Account } from '../../accounts/types.js';
import type { SendTransactionParameters } from '../../actions/wallet/sendTransaction.js';
import { type TransactionExecutionErrorType } from '../../errors/transaction.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Chain } from '../../types/chain.js';
import { type GetNodeErrorReturnType } from './getNodeError.js';
export type GetTransactionErrorParameters = Omit<SendTransactionParameters, 'account' | 'chain'> & {
    account: Account | null;
    chain?: Chain | undefined;
    docsPath?: string | undefined;
};
export type GetTransactionErrorReturnType<cause = ErrorType> = Omit<TransactionExecutionErrorType, 'cause'> & {
    cause: cause | GetNodeErrorReturnType;
};
export declare function getTransactionError<err extends ErrorType<string>>(err: err, { docsPath, ...args }: GetTransactionErrorParameters): GetTransactionErrorReturnType<err>;
//# sourceMappingURL=getTransactionError.d.ts.map