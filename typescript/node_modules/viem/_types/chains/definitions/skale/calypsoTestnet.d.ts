export declare const skaleCalypsoTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "SKALE Explorer";
            readonly url: "https://giant-half-dual-testnet.explorer.testnet.skalenodes.com";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 103220;
        };
    };
    id: 974399131;
    name: "SKALE Calypso Testnet";
    nativeCurrency: {
        readonly name: "sFUEL";
        readonly symbol: "sFUEL";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://testnet.skalenodes.com/v1/giant-half-dual-testnet"];
            readonly webSocket: readonly ["wss://testnet.skalenodes.com/v1/ws/giant-half-dual-testnet"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../../index.js").ChainSerializers<undefined, import("../../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=calypsoTestnet.d.ts.map