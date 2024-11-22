export declare const klaytnBaobab: {
    blockExplorers: {
        readonly default: {
            readonly name: "KlaytnScope";
            readonly url: "https://baobab.klaytnscope.com";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 123390593;
        };
    };
    id: 1001;
    name: "Klaytn Baobab Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Baobab Klaytn";
        readonly symbol: "KLAY";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://public-en-baobab.klaytn.net"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "klaytn-baobab";
};
//# sourceMappingURL=klaytnBaobab.d.ts.map