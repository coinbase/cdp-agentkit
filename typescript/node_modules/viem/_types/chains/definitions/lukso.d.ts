export declare const lukso: {
    blockExplorers: {
        readonly default: {
            readonly name: "LUKSO Mainnet Explorer";
            readonly url: "https://explorer.execution.mainnet.lukso.network";
            readonly apiUrl: "https://api.explorer.execution.mainnet.lukso.network/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 468183;
        };
    };
    id: 42;
    name: "LUKSO";
    nativeCurrency: {
        readonly name: "LUKSO";
        readonly symbol: "LYX";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.mainnet.lukso.network"];
            readonly webSocket: readonly ["wss://ws-rpc.mainnet.lukso.network"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "lukso";
};
//# sourceMappingURL=lukso.d.ts.map