export declare const cronos: {
    blockExplorers: {
        readonly default: {
            readonly name: "Cronos Explorer";
            readonly url: "https://explorer.cronos.org";
            readonly apiUrl: "https://explorer-api.cronos.org/mainnet/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 1963112;
        };
    };
    id: 25;
    name: "Cronos Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Cronos";
        readonly symbol: "CRO";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://evm.cronos.org"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=cronos.d.ts.map