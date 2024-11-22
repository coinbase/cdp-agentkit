"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountTypeNotSupportedError = exports.AccountNotFoundError = void 0;
const base_js_1 = require("./base.js");
class AccountNotFoundError extends base_js_1.BaseError {
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
exports.AccountNotFoundError = AccountNotFoundError;
class AccountTypeNotSupportedError extends base_js_1.BaseError {
    constructor({ docsPath, metaMessages, type, }) {
        super(`Account type "${type}" is not supported.`, {
            docsPath,
            metaMessages,
            name: 'AccountTypeNotSupportedError',
        });
    }
}
exports.AccountTypeNotSupportedError = AccountTypeNotSupportedError;
//# sourceMappingURL=account.js.map