export declare const immutableZkEvmTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Immutable Testnet Explorer";
            readonly url: "https://explorer.testnet.immutable.com/";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0x2CC787Ed364600B0222361C4188308Fa8E68bA60";
            readonly blockCreated: 5977391;
        };
    };
    id: 13473;
    name: "Immutable zkEVM Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Immutable Coin";
        readonly symbol: "IMX";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.testnet.immutable.com"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=immutableZkEvmTestnet.d.ts.map