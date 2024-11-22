export declare const berachainTestnetbArtio: {
    blockExplorers: {
        readonly default: {
            readonly name: "Berachain bArtio Beratrail";
            readonly url: "https://bartio.beratrail.io";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 109269;
        };
    };
    id: 80084;
    name: "Berachain bArtio";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "BERA Token";
        readonly symbol: "BERA";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://bartio.rpc.berachain.com"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=berachainTestnetbArtio.d.ts.map