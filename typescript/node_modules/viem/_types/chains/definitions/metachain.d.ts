export declare const metachain: {
    blockExplorers: {
        readonly default: {
            readonly name: "MetaExplorer";
            readonly url: "https://explorer.metatime.com";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0x0000000000000000000000000000000000003001";
            readonly blockCreated: 0;
        };
    };
    id: 571;
    name: "MetaChain Mainnet";
    nativeCurrency: {
        readonly name: "Metatime Coin";
        readonly symbol: "MTC";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.metatime.com"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=metachain.d.ts.map