type ErrorConfig = {
    getDocsUrl?: ((args: BaseErrorParameters) => string | undefined) | undefined;
    version?: string | undefined;
};
export declare function setErrorConfig(config: ErrorConfig): void;
type BaseErrorParameters = {
    cause?: BaseError | Error | undefined;
    details?: string | undefined;
    docsBaseUrl?: string | undefined;
    docsPath?: string | undefined;
    docsSlug?: string | undefined;
    metaMessages?: string[] | undefined;
    name?: string | undefined;
};
export type BaseErrorType = BaseError & {
    name: 'BaseError';
};
export declare class BaseError extends Error {
    details: string;
    docsPath?: string | undefined;
    metaMessages?: string[] | undefined;
    shortMessage: string;
    version: string;
    name: string;
    constructor(shortMessage: string, args?: BaseErrorParameters);
    walk(): Error;
    walk(fn: (err: unknown) => boolean): Error | null;
}
export {};
//# sourceMappingURL=base.d.ts.map