export declare const defichainEvm: {
    blockExplorers: {
        readonly default: {
            readonly name: "DeFiScan";
            readonly url: "https://meta.defiscan.live";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 137852;
        };
    };
    id: 1130;
    name: "DeFiChain EVM Mainnet";
    nativeCurrency: {
        readonly name: "DeFiChain";
        readonly symbol: "DFI";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://eth.mainnet.ocean.jellyfishsdk.com"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "defichain-evm";
};
//# sourceMappingURL=defichainEvm.d.ts.map