export declare const skaleExorde: {
    blockExplorers: {
        readonly default: {
            readonly name: "SKALE Explorer";
            readonly url: "https://light-vast-diphda.explorer.mainnet.skalenodes.com";
        };
    };
    contracts: {};
    id: 2139927552;
    name: "SKALE | Exorde";
    nativeCurrency: {
        readonly name: "sFUEL";
        readonly symbol: "sFUEL";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://mainnet.skalenodes.com/v1/light-vast-diphda"];
            readonly webSocket: readonly ["wss://mainnet.skalenodes.com/v1/ws/light-vast-diphda"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../../index.js").ChainSerializers<undefined, import("../../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=exorde.d.ts.map