import type { ErrorType } from '../../errors/utils.js';
/** @internal */
export declare const promiseCache: Map<any, any>;
/** @internal */
export declare const responseCache: Map<any, any>;
export type GetCacheErrorType = ErrorType;
export declare function getCache<data>(cacheKey: string): {
    clear: () => void;
    promise: {
        clear: () => boolean;
        get: () => Promise<data> | undefined;
        set: (data: Promise<data>) => Map<string, Promise<data>>;
    };
    response: {
        clear: () => boolean;
        get: () => {
            created: Date;
            data: data;
        } | undefined;
        set: (data: {
            created: Date;
            data: data;
        }) => Map<string, {
            created: Date;
            data: data;
        }>;
    };
};
type WithCacheParameters = {
    /** The key to cache the data against. */
    cacheKey: string;
    /** The time that cached data will remain in memory. Default: Infinity (no expiry) */
    cacheTime?: number | undefined;
};
/**
 * @description Returns the result of a given promise, and caches the result for
 * subsequent invocations against a provided cache key.
 */
export declare function withCache<data>(fn: () => Promise<data>, { cacheKey, cacheTime }: WithCacheParameters): Promise<data>;
export {};
//# sourceMappingURL=withCache.d.ts.map