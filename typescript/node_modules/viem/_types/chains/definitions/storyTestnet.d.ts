export declare const storyTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Story Testnet Explorer";
            readonly url: "https://testnet.storyscan.xyz";
        };
    };
    contracts?: import("../index.js").Prettify<{
        [key: string]: import("../../index.js").ChainContract | {
            [sourceId: number]: import("../../index.js").ChainContract | undefined;
        } | undefined;
    } & {
        ensRegistry?: import("../../index.js").ChainContract | undefined;
        ensUniversalResolver?: import("../../index.js").ChainContract | undefined;
        multicall3?: import("../../index.js").ChainContract | undefined;
        universalSignatureVerifier?: import("../../index.js").ChainContract | undefined;
    }> | undefined;
    id: 1513;
    name: "Story Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "IP";
        readonly symbol: "IP";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://testnet.storyrpc.io"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=storyTestnet.d.ts.map