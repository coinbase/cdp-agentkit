export declare const cronosTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Cronos Explorer";
            readonly url: "https://cronos.org/explorer/testnet3";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 10191251;
        };
    };
    id: 338;
    name: "Cronos Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "CRO";
        readonly symbol: "tCRO";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://evm-t3.cronos.org"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=cronosTestnet.d.ts.map