import { formatGwei } from '../utils/unit/formatGwei.js';
import { BaseError } from './base.js';
export class BaseFeeScalarError extends BaseError {
    constructor() {
        super('`baseFeeMultiplier` must be greater than 1.', {
            name: 'BaseFeeScalarError',
        });
    }
}
export class Eip1559FeesNotSupportedError extends BaseError {
    constructor() {
        super('Chain does not support EIP-1559 fees.', {
            name: 'Eip1559FeesNotSupportedError',
        });
    }
}
export class MaxFeePerGasTooLowError extends BaseError {
    constructor({ maxPriorityFeePerGas }) {
        super(`\`maxFeePerGas\` cannot be less than the \`maxPriorityFeePerGas\` (${formatGwei(maxPriorityFeePerGas)} gwei).`, { name: 'MaxFeePerGasTooLowError' });
    }
}
//# sourceMappingURL=fee.js.map