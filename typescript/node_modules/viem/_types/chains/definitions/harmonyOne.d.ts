export declare const harmonyOne: {
    blockExplorers: {
        readonly default: {
            readonly name: "Harmony Explorer";
            readonly url: "https://explorer.harmony.one";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 24185753;
        };
    };
    id: 1666600000;
    name: "Harmony One";
    nativeCurrency: {
        readonly name: "Harmony";
        readonly symbol: "ONE";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.ankr.com/harmony"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=harmonyOne.d.ts.map