export declare const luksoTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "LUKSO Testnet Explorer";
            readonly url: "https://explorer.execution.testnet.lukso.network";
            readonly apiUrl: "https://api.explorer.execution.testnet.lukso.network/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 605348;
        };
    };
    id: 4201;
    name: "LUKSO Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "LUKSO Testnet";
        readonly symbol: "LYXt";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.testnet.lukso.network"];
            readonly webSocket: readonly ["wss://ws-rpc.testnet.lukso.network"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=luksoTestnet.d.ts.map