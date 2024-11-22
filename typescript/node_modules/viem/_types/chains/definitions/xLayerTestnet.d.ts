export declare const xLayerTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "OKLink";
            readonly url: "https://www.oklink.com/xlayer-test";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 624344;
        };
    };
    id: 195;
    name: "X1 Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "OKB";
        readonly symbol: "OKB";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://xlayertestrpc.okx.com"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
export { xLayerTestnet as x1Testnet };
//# sourceMappingURL=xLayerTestnet.d.ts.map