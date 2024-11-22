export declare const polygonZkEvmTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "PolygonScan";
            readonly url: "https://testnet-zkevm.polygonscan.com";
            readonly apiUrl: "https://testnet-zkevm.polygonscan.com/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 525686;
        };
    };
    id: 1442;
    name: "Polygon zkEVM Testnet";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.public.zkevm-test.net"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=polygonZkEvmTestnet.d.ts.map