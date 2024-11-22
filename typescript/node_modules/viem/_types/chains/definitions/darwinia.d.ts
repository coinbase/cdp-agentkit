export declare const darwinia: {
    blockExplorers: {
        readonly default: {
            readonly name: "Explorer";
            readonly url: "https://explorer.darwinia.network";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 69420;
        };
    };
    id: 46;
    name: "Darwinia Network";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "RING";
        readonly symbol: "RING";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.darwinia.network"];
            readonly webSocket: readonly ["wss://rpc.darwinia.network"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=darwinia.d.ts.map