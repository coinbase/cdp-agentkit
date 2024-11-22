export declare const astar: {
    blockExplorers: {
        readonly default: {
            readonly name: "Astar Subscan";
            readonly url: "https://astar.subscan.io";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 761794;
        };
    };
    id: 592;
    name: "Astar";
    nativeCurrency: {
        readonly name: "Astar";
        readonly symbol: "ASTR";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://astar.api.onfinality.io/public"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "astar-mainnet";
};
//# sourceMappingURL=astar.d.ts.map