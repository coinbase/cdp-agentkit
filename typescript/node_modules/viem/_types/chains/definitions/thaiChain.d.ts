export declare const thaiChain: {
    blockExplorers: {
        readonly default: {
            readonly name: "Blockscout";
            readonly url: "https://exp.thaichain.org";
            readonly apiUrl: "https://exp.thaichain.org/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0x0DaD6130e832c21719C5CE3bae93454E16A84826";
            readonly blockCreated: 4806386;
        };
    };
    id: 7;
    name: "ThaiChain";
    nativeCurrency: {
        readonly name: "TCH";
        readonly symbol: "TCH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.thaichain.org"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=thaiChain.d.ts.map