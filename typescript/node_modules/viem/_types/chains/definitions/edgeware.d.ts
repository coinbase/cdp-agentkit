export declare const edgeware: {
    blockExplorers: {
        readonly default: {
            readonly name: "Edgscan by Bharathcoorg";
            readonly url: "https://edgscan.live";
            readonly apiUrl: "https://edgscan.live/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 18117872;
        };
    };
    id: 2021;
    name: "Edgeware EdgeEVM Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Edgeware";
        readonly symbol: "EDG";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://edgeware-evm.jelliedowl.net"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=edgeware.d.ts.map