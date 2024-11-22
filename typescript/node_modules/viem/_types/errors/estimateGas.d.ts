import type { Account } from '../accounts/types.js';
import type { EstimateGasParameters } from '../actions/public/estimateGas.js';
import type { Chain } from '../types/chain.js';
import { BaseError } from './base.js';
export type EstimateGasExecutionErrorType = EstimateGasExecutionError & {
    name: 'EstimateGasExecutionError';
};
export declare class EstimateGasExecutionError extends BaseError {
    cause: BaseError;
    constructor(cause: BaseError, { account, docsPath, chain, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, }: Omit<EstimateGasParameters<any>, 'account'> & {
        account?: Account | undefined;
        chain?: Chain | undefined;
        docsPath?: string | undefined;
    });
}
//# sourceMappingURL=estimateGas.d.ts.map