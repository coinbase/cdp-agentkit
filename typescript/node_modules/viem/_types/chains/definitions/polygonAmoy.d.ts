export declare const polygonAmoy: {
    blockExplorers: {
        readonly default: {
            readonly name: "PolygonScan";
            readonly url: "https://amoy.polygonscan.com";
            readonly apiUrl: "https://api-amoy.polygonscan.com/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 3127388;
        };
    };
    id: 80002;
    name: "Polygon Amoy";
    nativeCurrency: {
        readonly name: "POL";
        readonly symbol: "POL";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc-amoy.polygon.technology"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=polygonAmoy.d.ts.map