import { BaseError } from './base.js';
export class Eip712DomainNotFoundError extends BaseError {
    constructor({ address }) {
        super(`No EIP-712 domain found on contract "${address}".`, {
            metaMessages: [
                'Ensure that:',
                `- The contract is deployed at the address "${address}".`,
                '- `eip712Domain()` function exists on the contract.',
                '- `eip712Domain()` function matches signature to ERC-5267 specification.',
            ],
            name: 'Eip712DomainNotFoundError',
        });
    }
}
//# sourceMappingURL=eip712.js.map