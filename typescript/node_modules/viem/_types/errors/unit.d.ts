import { BaseError } from './base.js';
export type InvalidDecimalNumberErrorType = InvalidDecimalNumberError & {
    name: 'InvalidDecimalNumberError';
};
export declare class InvalidDecimalNumberError extends BaseError {
    constructor({ value }: {
        value: string;
    });
}
//# sourceMappingURL=unit.d.ts.map