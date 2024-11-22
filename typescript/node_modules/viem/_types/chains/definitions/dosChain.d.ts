export declare const dosChain: {
    blockExplorers: {
        readonly default: {
            readonly name: "DOS Chain Explorer";
            readonly url: "https://doscan.io";
            readonly apiUrl: "https://api.doscan.io";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 161908;
        };
    };
    id: 7979;
    name: "DOS Chain";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "DOS Chain";
        readonly symbol: "DOS";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://main.doschain.com"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=dosChain.d.ts.map