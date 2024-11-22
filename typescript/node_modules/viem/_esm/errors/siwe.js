import { BaseError } from './base.js';
export class SiweInvalidMessageFieldError extends BaseError {
    constructor(parameters) {
        const { docsPath, field, metaMessages } = parameters;
        super(`Invalid Sign-In with Ethereum message field "${field}".`, {
            docsPath,
            metaMessages,
            name: 'SiweInvalidMessageFieldError',
        });
    }
}
//# sourceMappingURL=siwe.js.map