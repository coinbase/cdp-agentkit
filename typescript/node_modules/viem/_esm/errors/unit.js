import { BaseError } from './base.js';
export class InvalidDecimalNumberError extends BaseError {
    constructor({ value }) {
        super(`Number \`${value}\` is not a valid decimal number.`, {
            name: 'InvalidDecimalNumberError',
        });
    }
}
//# sourceMappingURL=unit.js.map