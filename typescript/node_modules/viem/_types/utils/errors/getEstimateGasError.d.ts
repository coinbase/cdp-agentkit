import type { Account } from '../../accounts/types.js';
import type { EstimateGasParameters } from '../../actions/public/estimateGas.js';
import { type EstimateGasExecutionErrorType } from '../../errors/estimateGas.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Chain } from '../../types/chain.js';
import { type GetNodeErrorReturnType } from './getNodeError.js';
export type GetEstimateGasErrorReturnType<cause = ErrorType> = Omit<EstimateGasExecutionErrorType, 'cause'> & {
    cause: cause | GetNodeErrorReturnType;
};
export declare function getEstimateGasError<err extends ErrorType<string>>(err: err, { docsPath, ...args }: Omit<EstimateGasParameters, 'account'> & {
    account?: Account | undefined;
    chain?: Chain | undefined;
    docsPath?: string | undefined;
}): GetEstimateGasErrorReturnType<err>;
//# sourceMappingURL=getEstimateGasError.d.ts.map