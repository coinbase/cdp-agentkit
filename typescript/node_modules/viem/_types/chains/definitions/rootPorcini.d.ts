export declare const rootPorcini: {
    blockExplorers: {
        readonly default: {
            readonly name: "Rootscan";
            readonly url: "https://porcini.rootscan.io";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xc9C2E2429AeC354916c476B30d729deDdC94988d";
            readonly blockCreated: 10555692;
        };
    };
    id: 7672;
    name: "The Root Network - Porcini";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "XRP";
        readonly symbol: "XRP";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://porcini.rootnet.app/archive"];
            readonly webSocket: readonly ["wss://porcini.rootnet.app/archive/ws"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=rootPorcini.d.ts.map