export declare const klaytn: {
    blockExplorers: {
        readonly default: {
            readonly name: "KlaytnScope";
            readonly url: "https://scope.klaytn.com";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 96002415;
        };
    };
    id: 8217;
    name: "Klaytn";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Klaytn";
        readonly symbol: "KLAY";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://public-en-cypress.klaytn.net"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=klaytn.d.ts.map