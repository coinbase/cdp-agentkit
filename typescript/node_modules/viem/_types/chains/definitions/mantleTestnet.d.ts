export declare const mantleTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Mantle Testnet Explorer";
            readonly url: "https://explorer.testnet.mantle.xyz";
            readonly apiUrl: "https://explorer.testnet.mantle.xyz/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 561333;
        };
    };
    id: 5001;
    name: "Mantle Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "MNT";
        readonly symbol: "MNT";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.testnet.mantle.xyz"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=mantleTestnet.d.ts.map