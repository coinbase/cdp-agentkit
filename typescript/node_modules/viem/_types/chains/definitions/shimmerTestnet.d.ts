export declare const shimmerTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Shimmer Network Explorer";
            readonly url: "https://explorer.evm.testnet.shimmer.network";
            readonly apiUrl: "https://explorer.evm.testnet.shimmer.network/api";
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
    id: 1073;
    name: "Shimmer Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Shimmer";
        readonly symbol: "SMR";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://json-rpc.evm.testnet.shimmer.network"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "shimmer-testnet";
};
//# sourceMappingURL=shimmerTestnet.d.ts.map