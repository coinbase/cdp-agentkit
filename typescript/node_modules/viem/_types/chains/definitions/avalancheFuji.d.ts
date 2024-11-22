export declare const avalancheFuji: {
    blockExplorers: {
        readonly default: {
            readonly name: "SnowTrace";
            readonly url: "https://testnet.snowtrace.io";
            readonly apiUrl: "https://api-testnet.snowtrace.io";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 7096959;
        };
    };
    id: 43113;
    name: "Avalanche Fuji";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Avalanche Fuji";
        readonly symbol: "AVAX";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://api.avax-test.network/ext/bc/C/rpc"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=avalancheFuji.d.ts.map