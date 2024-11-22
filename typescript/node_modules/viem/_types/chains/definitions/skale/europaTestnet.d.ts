export declare const skaleEuropaTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "SKALE Explorer";
            readonly url: "https://juicy-low-small-testnet.explorer.testnet.skalenodes.com";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 110858;
        };
    };
    id: 1444673419;
    name: "SKALE Europa Testnet";
    nativeCurrency: {
        readonly name: "sFUEL";
        readonly symbol: "sFUEL";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://testnet.skalenodes.com/v1/juicy-low-small-testnet"];
            readonly webSocket: readonly ["wss://testnet.skalenodes.com/v1/ws/juicy-low-small-testnet"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../../index.js").ChainSerializers<undefined, import("../../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=europaTestnet.d.ts.map