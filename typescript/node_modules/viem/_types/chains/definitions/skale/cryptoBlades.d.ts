export declare const skaleCryptoBlades: {
    blockExplorers: {
        readonly default: {
            readonly name: "SKALE Explorer";
            readonly url: "https://affectionate-immediate-pollux.explorer.mainnet.skalenodes.com";
        };
    };
    contracts: {};
    id: 1026062157;
    name: "SKALE | CryptoBlades";
    nativeCurrency: {
        readonly name: "sFUEL";
        readonly symbol: "sFUEL";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://mainnet.skalenodes.com/v1/affectionate-immediate-pollux"];
            readonly webSocket: readonly ["wss://mainnet.skalenodes.com/v1/ws/affectionate-immediate-pollux"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../../index.js").ChainSerializers<undefined, import("../../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=cryptoBlades.d.ts.map