export declare const assetChainTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Asset Chain Testnet Explorer";
            readonly url: "https://scan-testnet.assetchain.org";
            readonly apiUrl: "https://scan-testnet.assetchain.org/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0x989F832D35988cb5e3eB001Fa2Fe789469EC31Ea";
            readonly blockCreated: 17177;
        };
    };
    id: 42421;
    name: "AssetChain Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Real World Asset";
        readonly symbol: "RWA";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://enugu-rpc.assetchain.org"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=assetChainTestnet.d.ts.map