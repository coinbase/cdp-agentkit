export declare const fusion: {
    blockExplorers: {
        readonly default: {
            readonly name: "FSNscan";
            readonly url: "https://fsnscan.com";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 10441605;
        };
    };
    id: 32659;
    name: "Fusion Mainnet";
    nativeCurrency: {
        readonly name: "Fusion";
        readonly symbol: "FSN";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://mainnet.fusionnetwork.io"];
            readonly webSocket: readonly ["wss://mainnet.fusionnetwork.io"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=fusion.d.ts.map