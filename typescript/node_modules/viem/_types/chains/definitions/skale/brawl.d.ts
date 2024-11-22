export declare const skaleBlockBrawlers: {
    blockExplorers: {
        readonly default: {
            readonly name: "SKALE Explorer";
            readonly url: "https://frayed-decent-antares.explorer.mainnet.skalenodes.com";
        };
    };
    contracts: {};
    id: 391845894;
    name: "SKALE | Block Brawlers";
    nativeCurrency: {
        readonly name: "BRAWL";
        readonly symbol: "BRAWL";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://mainnet.skalenodes.com/v1/frayed-decent-antares"];
            readonly webSocket: readonly ["wss://mainnet.skalenodes.com/v1/ws/frayed-decent-antares"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../../index.js").ChainSerializers<undefined, import("../../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=brawl.d.ts.map