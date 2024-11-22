export declare const plinga: {
    blockExplorers: {
        readonly default: {
            readonly name: "Plgscan";
            readonly url: "https://www.plgscan.com";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0x0989576160f2e7092908BB9479631b901060b6e4";
            readonly blockCreated: 204489;
        };
    };
    id: 242;
    name: "Plinga";
    nativeCurrency: {
        readonly name: "Plinga";
        readonly symbol: "PLINGA";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpcurl.mainnet.plgchain.com"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=plinga.d.ts.map