export declare const gobi: {
    blockExplorers: {
        readonly default: {
            readonly name: "Gobi Explorer";
            readonly url: "https://gobi-explorer.horizen.io";
        };
    };
    contracts: {};
    id: 1663;
    name: "Horizen Gobi Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Test ZEN";
        readonly symbol: "tZEN";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://gobi-testnet.horizenlabs.io/ethv1"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=gobi.d.ts.map