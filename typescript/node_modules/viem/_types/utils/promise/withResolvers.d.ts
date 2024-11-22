/** @internal */
export type PromiseWithResolvers<type> = {
    promise: Promise<type>;
    resolve: (value: type | PromiseLike<type>) => void;
    reject: (reason?: unknown) => void;
};
/** @internal */
export declare function withResolvers<type>(): PromiseWithResolvers<type>;
//# sourceMappingURL=withResolvers.d.ts.map