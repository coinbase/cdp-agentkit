export declare const hashkeyTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "HashKey Chain Explorer";
            readonly url: "https://hashkeychain-testnet-explorer.alt.technology";
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
    id: 133;
    name: "HashKey Chain Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "HashKey EcoPoints";
        readonly symbol: "HSK";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://hashkeychain-testnet.alt.technology"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=hashkeyChainTestnet.d.ts.map