export declare const mevTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Explorer";
            readonly url: "https://testnet.meversescan.io/";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 64371115;
        };
    };
    id: 4759;
    name: "MEVerse Chain Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "MEVerse";
        readonly symbol: "MEV";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.meversetestnet.io"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=mevTestnet.d.ts.map