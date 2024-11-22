import { LruMap } from '../lru.js';
/** @internal */
export const promiseCache = /*#__PURE__*/ new LruMap(8192);
/** Deduplicates in-flight promises. */
export function withDedupe(fn, { enabled = true, id }) {
    if (!enabled || !id)
        return fn();
    if (promiseCache.get(id))
        return promiseCache.get(id);
    const promise = fn().finally(() => promiseCache.delete(id));
    promiseCache.set(id, promise);
    return promise;
}
//# sourceMappingURL=withDedupe.js.map