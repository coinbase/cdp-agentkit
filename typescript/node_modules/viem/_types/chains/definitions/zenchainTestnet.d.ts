export declare const zenchainTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Zentrace";
            readonly url: "https://zentrace.io";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 230019;
        };
    };
    id: 8408;
    name: "Zenchain Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "ZCX";
        readonly symbol: "ZCX";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://zenchain-testnet.api.onfinality.io/public"];
            readonly webSocket: readonly ["wss://zenchain-testnet.api.onfinality.io/public-ws"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=zenchainTestnet.d.ts.map