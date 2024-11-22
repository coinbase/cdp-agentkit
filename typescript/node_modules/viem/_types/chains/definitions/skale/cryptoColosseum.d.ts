export declare const skaleCryptoColosseum: {
    blockExplorers: {
        readonly default: {
            readonly name: "SKALE Explorer";
            readonly url: "https://haunting-devoted-deneb.explorer.mainnet.skalenodes.com";
        };
    };
    contracts: {};
    id: 1032942172;
    name: "SKALE | Crypto Colosseum";
    nativeCurrency: {
        readonly name: "sFUEL";
        readonly symbol: "sFUEL";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://mainnet.skalenodes.com/v1/haunting-devoted-deneb"];
            readonly webSocket: readonly ["wss://mainnet.skalenodes.com/v1/ws/haunting-devoted-deneb"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../../index.js").ChainSerializers<undefined, import("../../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=cryptoColosseum.d.ts.map