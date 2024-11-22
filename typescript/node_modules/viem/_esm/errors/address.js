import { BaseError } from './base.js';
export class InvalidAddressError extends BaseError {
    constructor({ address }) {
        super(`Address "${address}" is invalid.`, {
            metaMessages: [
                '- Address must be a hex value of 20 bytes (40 hex characters).',
                '- Address must match its checksum counterpart.',
            ],
            name: 'InvalidAddressError',
        });
    }
}
//# sourceMappingURL=address.js.map