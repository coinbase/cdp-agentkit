"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstimateGasExecutionError = void 0;
const formatEther_js_1 = require("../utils/unit/formatEther.js");
const formatGwei_js_1 = require("../utils/unit/formatGwei.js");
const base_js_1 = require("./base.js");
const transaction_js_1 = require("./transaction.js");
class EstimateGasExecutionError extends base_js_1.BaseError {
    constructor(cause, { account, docsPath, chain, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, }) {
        const prettyArgs = (0, transaction_js_1.prettyPrint)({
            from: account?.address,
            to,
            value: typeof value !== 'undefined' &&
                `${(0, formatEther_js_1.formatEther)(value)} ${chain?.nativeCurrency?.symbol || 'ETH'}`,
            data,
            gas,
            gasPrice: typeof gasPrice !== 'undefined' && `${(0, formatGwei_js_1.formatGwei)(gasPrice)} gwei`,
            maxFeePerGas: typeof maxFeePerGas !== 'undefined' &&
                `${(0, formatGwei_js_1.formatGwei)(maxFeePerGas)} gwei`,
            maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== 'undefined' &&
                `${(0, formatGwei_js_1.formatGwei)(maxPriorityFeePerGas)} gwei`,
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
exports.EstimateGasExecutionError = EstimateGasExecutionError;
//# sourceMappingURL=estimateGas.js.map