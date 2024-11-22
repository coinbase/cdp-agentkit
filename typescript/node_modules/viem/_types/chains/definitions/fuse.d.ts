export declare const fuse: {
    blockExplorers: {
        readonly default: {
            readonly name: "Fuse Explorer";
            readonly url: "https://explorer.fuse.io";
            readonly apiUrl: "https://explorer.fuse.io/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 16146628;
        };
    };
    id: 122;
    name: "Fuse";
    nativeCurrency: {
        readonly name: "Fuse";
        readonly symbol: "FUSE";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.fuse.io"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=fuse.d.ts.map