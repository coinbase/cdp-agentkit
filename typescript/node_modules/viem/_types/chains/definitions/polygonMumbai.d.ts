export declare const polygonMumbai: {
    blockExplorers: {
        readonly default: {
            readonly name: "PolygonScan";
            readonly url: "https://mumbai.polygonscan.com";
            readonly apiUrl: "https://api-testnet.polygonscan.com/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 25770160;
        };
    };
    id: 80001;
    name: "Polygon Mumbai";
    nativeCurrency: {
        readonly name: "MATIC";
        readonly symbol: "MATIC";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.ankr.com/polygon_mumbai"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=polygonMumbai.d.ts.map