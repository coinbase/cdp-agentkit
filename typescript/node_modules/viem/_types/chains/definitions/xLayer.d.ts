export declare const xLayer: {
    blockExplorers: {
        readonly default: {
            readonly name: "OKLink";
            readonly url: "https://www.oklink.com/xlayer";
            readonly apiUrl: "https://www.oklink.com/api/v5/explorer/xlayer/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 47416;
        };
    };
    id: 196;
    name: "X Layer Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "OKB";
        readonly symbol: "OKB";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.xlayer.tech"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=xLayer.d.ts.map