import { BaseError } from './base.js';
export type InvalidAddressErrorType = InvalidAddressError & {
    name: 'InvalidAddressError';
};
export declare class InvalidAddressError extends BaseError {
    constructor({ address }: {
        address: string;
    });
}
//# sourceMappingURL=address.d.ts.map