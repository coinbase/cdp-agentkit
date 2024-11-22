export declare const phoenix: {
    blockExplorers: {
        readonly default: {
            readonly name: "Phoenixplorer";
            readonly url: "https://phoenixplorer.com";
            readonly apiUrl: "https://phoenixplorer.com/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0x498cF757a575cFF2c2Ed9f532f56Efa797f86442";
            readonly blockCreated: 5620192;
        };
    };
    id: 13381;
    name: "Phoenix Blockchain";
    nativeCurrency: {
        readonly name: "Phoenix";
        readonly symbol: "PHX";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.phoenixplorer.com"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=phoenix.d.ts.map