/**
 * @internal
 *
 * Map with a LRU (Least recently used) policy.
 * @see https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU
 */
export declare class LruMap<value = unknown> extends Map<string, value> {
    maxSize: number;
    constructor(size: number);
    get(key: string): value | undefined;
    set(key: string, value: value): this;
}
//# sourceMappingURL=lru.d.ts.map