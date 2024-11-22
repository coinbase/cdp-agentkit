import { BaseError } from '../../errors/base.js';
export type InvalidEip712TransactionErrorType = InvalidEip712TransactionError & {
    name: 'InvalidEip712TransactionError';
};
export declare class InvalidEip712TransactionError extends BaseError {
    constructor();
}
//# sourceMappingURL=transaction.d.ts.map