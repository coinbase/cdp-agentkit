export declare const kavaTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Kava EVM Testnet Explorer";
            readonly url: "https://testnet.kavascan.com/";
            readonly apiUrl: "https://testnet.kavascan.com/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xDf1D724A7166261eEB015418fe8c7679BBEa7fd6";
            readonly blockCreated: 7242179;
        };
    };
    id: 2221;
    name: "Kava EVM Testnet";
    nativeCurrency: {
        readonly name: "Kava";
        readonly symbol: "KAVA";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://evm.testnet.kava.io"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "kava-testnet";
};
//# sourceMappingURL=kavaTestnet.d.ts.map