export declare const scrollSepolia: {
    blockExplorers: {
        readonly default: {
            readonly name: "Scrollscan";
            readonly url: "https://sepolia.scrollscan.com";
            readonly apiUrl: "https://api-sepolia.scrollscan.com/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 9473;
        };
    };
    id: 534351;
    name: "Scroll Sepolia";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://sepolia-rpc.scroll.io"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=scrollSepolia.d.ts.map