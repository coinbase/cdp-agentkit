export declare const ronin: {
    blockExplorers: {
        readonly default: {
            readonly name: "Ronin Explorer";
            readonly url: "https://app.roninchain.com";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 26023535;
        };
    };
    id: 2020;
    name: "Ronin";
    nativeCurrency: {
        readonly name: "RON";
        readonly symbol: "RON";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://api.roninchain.com/rpc"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=ronin.d.ts.map