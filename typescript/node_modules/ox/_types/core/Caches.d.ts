import { LruMap } from './internal/lru.js';
export declare const checksum: LruMap<`0x${string}`>;
/**
 * Clears all global caches.
 *
 * @example
 * ```ts
 * import { Caches } from 'ox'
 * Caches.clear()
 * ```
 */
export declare function clear(): void;
//# sourceMappingURL=Caches.d.ts.map