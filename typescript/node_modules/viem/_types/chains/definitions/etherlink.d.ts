export declare const etherlink: {
    blockExplorers: {
        readonly default: {
            readonly name: "Etherlink";
            readonly url: "https://explorer.etherlink.com";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 33899;
        };
    };
    id: 42793;
    name: "Etherlink";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Tez";
        readonly symbol: "XTZ";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://node.mainnet.etherlink.com"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=etherlink.d.ts.map