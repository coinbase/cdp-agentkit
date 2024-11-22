export declare const eon: {
    blockExplorers: {
        readonly default: {
            readonly name: "EON Explorer";
            readonly url: "https://eon-explorer.horizenlabs.io";
        };
    };
    contracts: {};
    id: 7332;
    name: "Horizen EON";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "ZEN";
        readonly symbol: "ZEN";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://eon-rpc.horizenlabs.io/ethv1"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=eon.d.ts.map