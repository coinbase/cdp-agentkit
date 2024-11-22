export declare const skaleTitanTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "SKALE Explorer";
            readonly url: "https://aware-fake-trim-testnet.explorer.testnet.skalenodes.com";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 104072;
        };
    };
    id: 1020352220;
    name: "SKALE Titan Hub";
    nativeCurrency: {
        readonly name: "sFUEL";
        readonly symbol: "sFUEL";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://testnet.skalenodes.com/v1/aware-fake-trim-testnet"];
            readonly webSocket: readonly ["wss://testnet.skalenodes.com/v1/ws/aware-fake-trim-testnet"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../../index.js").ChainSerializers<undefined, import("../../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=titanTestnet.d.ts.map