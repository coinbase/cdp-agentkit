export declare const flowTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Flow Diver";
            readonly url: "https://testnet.flowdiver.io";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 137518;
        };
    };
    id: 545;
    name: "FlowEVM Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Flow";
        readonly symbol: "FLOW";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://testnet.evm.nodes.onflow.org"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=flowTestnet.d.ts.map