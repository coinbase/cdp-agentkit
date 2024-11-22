export declare const moonbaseAlpha: {
    blockExplorers: {
        readonly default: {
            readonly name: "Moonscan";
            readonly url: "https://moonbase.moonscan.io";
            readonly apiUrl: "https://moonbase.moonscan.io/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 1850686;
        };
    };
    id: 1287;
    name: "Moonbase Alpha";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "DEV";
        readonly symbol: "DEV";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.api.moonbase.moonbeam.network"];
            readonly webSocket: readonly ["wss://wss.api.moonbase.moonbeam.network"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=moonbaseAlpha.d.ts.map