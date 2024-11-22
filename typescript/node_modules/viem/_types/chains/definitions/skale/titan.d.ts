export declare const skaleTitan: {
    blockExplorers: {
        readonly default: {
            readonly name: "SKALE Explorer";
            readonly url: "https://parallel-stormy-spica.explorer.mainnet.skalenodes.com";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 2076458;
        };
    };
    id: 1350216234;
    name: "SKALE | Titan Community Hub";
    nativeCurrency: {
        readonly name: "sFUEL";
        readonly symbol: "sFUEL";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://mainnet.skalenodes.com/v1/parallel-stormy-spica"];
            readonly webSocket: readonly ["wss://mainnet.skalenodes.com/v1/ws/parallel-stormy-spica"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../../index.js").ChainSerializers<undefined, import("../../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=titan.d.ts.map