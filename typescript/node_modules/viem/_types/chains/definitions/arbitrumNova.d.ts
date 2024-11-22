export declare const arbitrumNova: {
    blockExplorers: {
        readonly default: {
            readonly name: "Arbiscan";
            readonly url: "https://nova.arbiscan.io";
            readonly apiUrl: "https://api-nova.arbiscan.io/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 1746963;
        };
    };
    id: 42170;
    name: "Arbitrum Nova";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://nova.arbitrum.io/rpc"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=arbitrumNova.d.ts.map