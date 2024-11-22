import type { ErrorType } from '../../errors/utils.js';
export type WithTimeoutErrorType = ErrorType;
export declare function withTimeout<data>(fn: ({ signal, }: {
    signal: AbortController['signal'] | null;
}) => Promise<data>, { errorInstance, timeout, signal, }: {
    errorInstance?: Error | undefined;
    timeout: number;
    signal?: boolean | undefined;
}): Promise<data>;
//# sourceMappingURL=withTimeout.d.ts.map