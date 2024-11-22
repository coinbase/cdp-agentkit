export declare const telos: {
    blockExplorers: {
        readonly default: {
            readonly name: "Teloscan";
            readonly url: "https://www.teloscan.io/";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 246530709;
        };
    };
    id: 40;
    name: "Telos";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Telos";
        readonly symbol: "TLOS";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://mainnet.telos.net/evm"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=telos.d.ts.map