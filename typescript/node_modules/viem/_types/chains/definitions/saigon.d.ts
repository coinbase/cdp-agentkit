export declare const saigon: {
    blockExplorers: {
        readonly default: {
            readonly name: "Saigon Explorer";
            readonly url: "https://saigon-app.roninchain.com";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 18736871;
        };
    };
    id: 2021;
    name: "Saigon Testnet";
    nativeCurrency: {
        readonly name: "RON";
        readonly symbol: "RON";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://saigon-testnet.roninchain.com/rpc"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=saigon.d.ts.map