import type { ChainEstimateFeesPerGasFn } from '../types/chain.js';
export declare const chainConfig: {
    readonly fees: {
        readonly estimateFeesPerGas: typeof estimateFeesPerGas;
        readonly maxPriorityFeePerGas: ({ block, client, request }: import("../types/chain.js").ChainFeesFnParameters<import("../types/chain.js").ChainFormatters | undefined>) => Promise<bigint | null>;
    };
};
declare function estimateFeesPerGas({ client, multiply, request, type, }: Parameters<ChainEstimateFeesPerGasFn>[0]): ReturnType<ChainEstimateFeesPerGasFn>;
export {};
//# sourceMappingURL=chainConfig.d.ts.map