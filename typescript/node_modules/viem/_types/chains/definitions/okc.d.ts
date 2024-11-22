export declare const okc: {
    blockExplorers: {
        readonly default: {
            readonly name: "oklink";
            readonly url: "https://www.oklink.com/okc";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 10364792;
        };
    };
    id: 66;
    name: "OKC";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "OKT";
        readonly symbol: "OKT";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://exchainrpc.okex.org"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=okc.d.ts.map