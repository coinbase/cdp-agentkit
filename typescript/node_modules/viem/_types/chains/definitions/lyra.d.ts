export declare const lyra: {
    blockExplorers: {
        readonly default: {
            readonly name: "Lyra Explorer";
            readonly url: "https://explorer.lyra.finance";
            readonly apiUrl: "https://explorer.lyra.finance/api/v2";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 1935198;
        };
    };
    id: 957;
    name: "Lyra Chain";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.lyra.finance"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=lyra.d.ts.map