import type { Address } from 'abitype';
import { BaseError } from './base.js';
export type Eip712DomainNotFoundErrorType = Eip712DomainNotFoundError & {
    name: 'Eip712DomainNotFoundError';
};
export declare class Eip712DomainNotFoundError extends BaseError {
    constructor({ address }: {
        address: Address;
    });
}
//# sourceMappingURL=eip712.d.ts.map