export declare const kcc: {
    blockExplorers: {
        readonly default: {
            readonly name: "KCC Explorer";
            readonly url: "https://explorer.kcc.io";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 11760430;
        };
    };
    id: 321;
    name: "KCC Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "KCS";
        readonly symbol: "KCS";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://kcc-rpc.com"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "KCC Mainnet";
};
//# sourceMappingURL=kcc.d.ts.map