export declare const crab: {
    blockExplorers: {
        readonly default: {
            readonly name: "Blockscout";
            readonly url: "https://crab-scan.darwinia.network";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 3032593;
        };
    };
    id: 44;
    name: "Crab Network";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Crab Network Native Token";
        readonly symbol: "CRAB";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://crab-rpc.darwinia.network"];
            readonly webSocket: readonly ["wss://crab-rpc.darwinia.network"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=crab.d.ts.map