import { formatEther } from '../utils/unit/formatEther.js';
import { formatGwei } from '../utils/unit/formatGwei.js';
import { BaseError } from './base.js';
import { prettyPrint } from './transaction.js';
export class EstimateGasExecutionError extends BaseError {
    constructor(cause, { account, docsPath, chain, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, }) {
        const prettyArgs = prettyPrint({
            from: account?.address,
            to,
            value: typeof value !== 'undefined' &&
                `${formatEther(value)} ${chain?.nativeCurrency?.symbol || 'ETH'}`,
            data,
            gas,
            gasPrice: typeof gasPrice !== 'undefined' && `${formatGwei(gasPrice)} gwei`,
            maxFeePerGas: typeof maxFeePerGas !== 'undefined' &&
                `${formatGwei(maxFeePerGas)} gwei`,
            maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== 'undefined' &&
                `${formatGwei(maxPriorityFeePerGas)} gwei`,
            nonce,
        });
        super(cause.shortMessage, {
            cause,
            docsPath,
            metaMessages: [
                ...(cause.metaMessages ? [...cause.metaMessages, ' '] : []),
                'Estimate Gas Arguments:',
                prettyArgs,
            ].filter(Boolean),
            name: 'EstimateGasExecutionError',
        });
        Object.defineProperty(this, "cause", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.cause = cause;
    }
}
//# sourceMappingURL=estimateGas.js.map