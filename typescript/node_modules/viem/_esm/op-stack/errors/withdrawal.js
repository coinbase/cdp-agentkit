import { BaseError } from '../../errors/base.js';
export class GameNotFoundError extends BaseError {
    constructor() {
        super('Dispute game not found.', { name: 'GameNotFoundError' });
    }
}
export class ReceiptContainsNoWithdrawalsError extends BaseError {
    constructor({ hash }) {
        super(`The provided transaction receipt with hash "${hash}" contains no withdrawals.`, { name: 'ReceiptContainsNoWithdrawalsError' });
    }
}
//# sourceMappingURL=withdrawal.js.map