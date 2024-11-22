export declare const dosChainTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "DOS Chain Testnet Explorer";
            readonly url: "https://test.doscan.io";
            readonly apiUrl: "https://api-test.doscan.io";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 69623;
        };
    };
    id: 3939;
    name: "DOS Chain Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "DOS Chain Testnet";
        readonly symbol: "DOS";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://test.doschain.com"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=dosChainTestnet.d.ts.map