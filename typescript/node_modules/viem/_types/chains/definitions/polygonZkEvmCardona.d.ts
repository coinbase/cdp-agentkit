export declare const polygonZkEvmCardona: {
    blockExplorers: {
        readonly default: {
            readonly name: "PolygonScan";
            readonly url: "https://cardona-zkevm.polygonscan.com";
            readonly apiUrl: "https://cardona-zkevm.polygonscan.com/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 114091;
        };
    };
    id: 2442;
    name: "Polygon zkEVM Cardona";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.cardona.zkevm-rpc.com"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=polygonZkEvmCardona.d.ts.map