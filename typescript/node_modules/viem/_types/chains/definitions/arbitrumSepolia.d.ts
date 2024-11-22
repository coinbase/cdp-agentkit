export declare const arbitrumSepolia: {
    blockExplorers: {
        readonly default: {
            readonly name: "Arbiscan";
            readonly url: "https://sepolia.arbiscan.io";
            readonly apiUrl: "https://api-sepolia.arbiscan.io/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 81930;
        };
    };
    id: 421614;
    name: "Arbitrum Sepolia";
    nativeCurrency: {
        readonly name: "Arbitrum Sepolia Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://sepolia-rollup.arbitrum.io/rpc"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=arbitrumSepolia.d.ts.map