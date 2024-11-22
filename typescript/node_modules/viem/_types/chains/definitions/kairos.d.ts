export declare const kairos: {
    blockExplorers: {
        readonly default: {
            readonly name: "KaiaScan";
            readonly url: "https://kairos.kaiascan.io";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 123390593;
        };
    };
    id: 1001;
    name: "Kairos Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Kairos KAIA";
        readonly symbol: "KAIA";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://public-en-kairos.node.kaia.io"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "kairos";
};
//# sourceMappingURL=kairos.d.ts.map