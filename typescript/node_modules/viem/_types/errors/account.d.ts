import { BaseError } from './base.js';
export type AccountNotFoundErrorType = AccountNotFoundError & {
    name: 'AccountNotFoundError';
};
export declare class AccountNotFoundError extends BaseError {
    constructor({ docsPath }?: {
        docsPath?: string | undefined;
    });
}
export type AccountTypeNotSupportedErrorType = AccountTypeNotSupportedError & {
    name: 'AccountTypeNotSupportedError';
};
export declare class AccountTypeNotSupportedError extends BaseError {
    constructor({ docsPath, metaMessages, type, }: {
        docsPath?: string | undefined;
        metaMessages?: string[] | undefined;
        type: string;
    });
}
//# sourceMappingURL=account.d.ts.map