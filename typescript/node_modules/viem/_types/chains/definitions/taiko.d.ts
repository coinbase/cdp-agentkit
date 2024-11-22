export declare const taiko: {
    blockExplorers: {
        readonly default: {
            readonly name: "Taikoscan";
            readonly url: "https://taikoscan.io";
            readonly apiUrl: "https://api.taikoscan.io/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcb2436774C3e191c85056d248EF4260ce5f27A9D";
        };
    };
    id: 167000;
    name: "Taiko Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Ether";
        readonly symbol: "ETH";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.mainnet.taiko.xyz"];
            readonly webSocket: readonly ["wss://ws.mainnet.taiko.xyz"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=taiko.d.ts.map