export declare const immutableZkEvm: {
    blockExplorers: {
        readonly default: {
            readonly name: "Immutable Explorer";
            readonly url: "https://explorer.immutable.com";
            readonly apiUrl: "https://explorer.immutable.com/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0x236bdA4589e44e6850f5aC6a74BfCa398a86c6c0";
            readonly blockCreated: 4335972;
        };
    };
    id: 13371;
    name: "Immutable zkEVM";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Immutable Coin";
        readonly symbol: "IMX";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.immutable.com"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=immutableZkEvm.d.ts.map