export declare const polygonZkEvm: {
    blockExplorers: {
        readonly default: {
            readonly name: "PolygonScan";
            readonly url: "https://zkevm.polygonscan.com";
            readonly apiUrl: "https://api-zkevm.polygonscan.com/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 57746;
        };
    };
    id: 1101;
    name: "Polygon zkEVM";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://zkevm-rpc.com"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=polygonZkEvm.d.ts.map