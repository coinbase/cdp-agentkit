export declare const xai: {
    blockExplorers: {
        readonly default: {
            readonly name: "Blockscout";
            readonly url: "https://explorer.xai-chain.net";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 222549;
        };
    };
    id: 660279;
    name: "Xai Mainnet";
    nativeCurrency: {
        readonly name: "Xai";
        readonly symbol: "XAI";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://xai-chain.net/rpc"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=xai.d.ts.map