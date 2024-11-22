export declare const guruNetwork: {
    blockExplorers: {
        readonly default: {
            readonly name: "Guruscan";
            readonly url: "https://scan.gurunetwork.ai";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 271691;
        };
    };
    id: 260;
    name: "Guru Network Mainnet";
    nativeCurrency: {
        readonly name: "GURU Token";
        readonly symbol: "GURU";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.gurunetwork.ai/archive/260"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=guruNetwork.d.ts.map