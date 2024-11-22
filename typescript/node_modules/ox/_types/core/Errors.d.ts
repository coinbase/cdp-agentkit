export type GlobalErrorType<name extends string = 'Error'> = Error & {
    name: name;
};
/**
 * Base error class inherited by all errors thrown by ox.
 *
 * @example
 * ```ts
 * import { Errors } from 'ox'
 * throw new Errors.BaseError('An error occurred')
 * ```
 */
export declare class BaseError<cause extends Error | undefined = undefined> extends Error {
    details: string;
    docs?: string | undefined;
    docsPath?: string | undefined;
    shortMessage: string;
    cause: cause;
    name: string;
    version: string;
    constructor(shortMessage: string, options?: BaseError.Options<cause>);
    walk(): Error;
    walk(fn: (err: unknown) => boolean): Error | null;
}
export declare namespace BaseError {
    type Options<cause extends Error | undefined = Error | undefined> = {
        cause?: cause | undefined;
        details?: string | undefined;
        docsPath?: string | undefined;
        metaMessages?: (string | undefined)[] | undefined;
    };
}
//# sourceMappingURL=Errors.d.ts.map