export declare const shimmer: {
    blockExplorers: {
        readonly default: {
            readonly name: "Shimmer Network Explorer";
            readonly url: "https://explorer.evm.shimmer.network";
            readonly apiUrl: "https://explorer.evm.shimmer.network/api";
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
    id: 148;
    name: "Shimmer";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Shimmer";
        readonly symbol: "SMR";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://json-rpc.evm.shimmer.network"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "shimmer";
};
//# sourceMappingURL=shimmer.d.ts.map