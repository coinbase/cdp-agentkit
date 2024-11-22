export declare const assetChain: {
    blockExplorers: {
        readonly default: {
            readonly name: "Asset Chain Explorer";
            readonly url: "https://scan.assetchain.org";
            readonly apiUrl: "https://scan.assetchain.org/api";
        };
    };
    contracts: {};
    id: 42420;
    name: "AssetChain Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Real World Asset";
        readonly symbol: "RWA";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://mainnet-rpc.assetchain.org"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=assetChain.d.ts.map