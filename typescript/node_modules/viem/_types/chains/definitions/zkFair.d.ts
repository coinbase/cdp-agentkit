export declare const zkFair: {
    blockExplorers: {
        readonly default: {
            readonly name: "zkFair Explorer";
            readonly url: "https://scan.zkfair.io";
            readonly apiUrl: "https://scan.zkfair.io/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 6090959;
        };
    };
    id: 42766;
    name: "ZKFair Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "USD Coin";
        readonly symbol: "USDC";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.zkfair.io"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "zkfair-mainnet";
};
//# sourceMappingURL=zkFair.d.ts.map