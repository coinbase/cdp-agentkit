import { BaseError } from '../../errors/base.js';
import type { Hex } from '../../types/misc.js';
export type GameNotFoundErrorType = GameNotFoundError & {
    name: 'GameNotFoundError';
};
export declare class GameNotFoundError extends BaseError {
    constructor();
}
export type ReceiptContainsNoWithdrawalsErrorType = ReceiptContainsNoWithdrawalsError & {
    name: 'ReceiptContainsNoWithdrawalsError';
};
export declare class ReceiptContainsNoWithdrawalsError extends BaseError {
    constructor({ hash }: {
        hash: Hex;
    });
}
//# sourceMappingURL=withdrawal.d.ts.map