export declare const taikoJolnir: {
    blockExplorers: {
        readonly default: {
            readonly name: "blockscout";
            readonly url: "https://explorer.jolnir.taiko.xyz";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 732706;
        };
    };
    id: 167007;
    name: "Taiko Jolnir (Alpha-5 Testnet)";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.jolnir.taiko.xyz"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=taikoJolnir.d.ts.map