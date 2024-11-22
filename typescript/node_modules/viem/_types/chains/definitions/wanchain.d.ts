export declare const wanchain: {
    blockExplorers: {
        readonly default: {
            readonly name: "WanScan";
            readonly url: "https://wanscan.org";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcDF6A1566e78EB4594c86Fe73Fcdc82429e97fbB";
            readonly blockCreated: 25312390;
        };
    };
    id: 888;
    name: "Wanchain";
    nativeCurrency: {
        readonly name: "WANCHAIN";
        readonly symbol: "WAN";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://gwan-ssl.wandevs.org:56891", "https://gwan2-ssl.wandevs.org"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=wanchain.d.ts.map