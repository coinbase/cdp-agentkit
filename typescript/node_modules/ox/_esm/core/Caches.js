import { LruMap } from './internal/lru.js';
const caches = {
    checksum: /*#__PURE__*/ new LruMap(8192),
};
export const checksum = caches.checksum;
/**
 * Clears all global caches.
 *
 * @example
 * ```ts
 * import { Caches } from 'ox'
 * Caches.clear()
 * ```
 */
export function clear() {
    for (const cache of Object.values(caches))
        cache.clear();
}
//# sourceMappingURL=Caches.js.map