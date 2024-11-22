export declare const bscTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "BscScan";
            readonly url: "https://testnet.bscscan.com";
            readonly apiUrl: "https://api-testnet.bscscan.com/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 17422483;
        };
    };
    id: 97;
    name: "Binance Smart Chain Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "BNB";
        readonly symbol: "tBNB";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://data-seed-prebsc-1-s1.bnbchain.org:8545"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=bscTestnet.d.ts.map