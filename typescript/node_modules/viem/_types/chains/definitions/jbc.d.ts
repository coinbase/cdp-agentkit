export declare const jbc: {
    blockExplorers: {
        readonly default: {
            readonly name: "Blockscout";
            readonly url: "https://exp-l1.jibchain.net";
            readonly apiUrl: "https://exp-l1.jibchain.net/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xc0C8C486D1466C57Efe13C2bf000d4c56F47CBdC";
            readonly blockCreated: 2299048;
        };
    };
    id: 8899;
    name: "JIBCHAIN L1";
    nativeCurrency: {
        readonly name: "JBC";
        readonly symbol: "JBC";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc-l1.jibchain.net"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "jbc";
};
//# sourceMappingURL=jbc.d.ts.map