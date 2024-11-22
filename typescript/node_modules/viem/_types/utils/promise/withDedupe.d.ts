import { LruMap } from '../lru.js';
/** @internal */
export declare const promiseCache: LruMap<Promise<any>>;
type WithDedupeOptions = {
    enabled?: boolean | undefined;
    id?: string | undefined;
};
/** Deduplicates in-flight promises. */
export declare function withDedupe<data>(fn: () => Promise<data>, { enabled, id }: WithDedupeOptions): Promise<data>;
export {};
//# sourceMappingURL=withDedupe.d.ts.map