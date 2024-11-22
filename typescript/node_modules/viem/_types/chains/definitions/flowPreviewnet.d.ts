export declare const flowPreviewnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Previewnet Explorer";
            readonly url: "https://previewnet.flowdiver.io";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 6205;
        };
    };
    id: 646;
    name: "FlowEVM Previewnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Flow";
        readonly symbol: "FLOW";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://previewnet.evm.nodes.onflow.org"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=flowPreviewnet.d.ts.map