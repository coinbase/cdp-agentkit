import { BaseError } from './base.js';
export class AccountNotFoundError extends BaseError {
    constructor({ docsPath } = {}) {
        super([
            'Could not find an Account to execute with this Action.',
            'Please provide an Account with the `account` argument on the Action, or by supplying an `account` to the Client.',
        ].join('\n'), {
            docsPath,
            docsSlug: 'account',
            name: 'AccountNotFoundError',
        });
    }
}
export class AccountTypeNotSupportedError extends BaseError {
    constructor({ docsPath, metaMessages, type, }) {
        super(`Account type "${type}" is not supported.`, {
            docsPath,
            metaMessages,
            name: 'AccountTypeNotSupportedError',
        });
    }
}
//# sourceMappingURL=account.js.map