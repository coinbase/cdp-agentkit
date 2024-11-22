import { BaseError } from './base.js';
export type SiweInvalidMessageFieldErrorType = SiweInvalidMessageFieldError & {
    name: 'SiweInvalidMessageFieldError';
};
export declare class SiweInvalidMessageFieldError extends BaseError {
    constructor(parameters: {
        docsPath?: string | undefined;
        field: string;
        metaMessages?: string[] | undefined;
    });
}
//# sourceMappingURL=siwe.d.ts.map