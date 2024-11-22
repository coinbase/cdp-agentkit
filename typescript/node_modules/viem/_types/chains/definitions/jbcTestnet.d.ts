export declare const jbcTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Blockscout";
            readonly url: "https://exp.testnet.jibchain.net";
            readonly apiUrl: "https://exp.testnet.jibchain.net/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xa1a858ad9041B4741e620355a3F96B3c78e70ecE";
            readonly blockCreated: 32848;
        };
    };
    id: 88991;
    name: "Jibchain Testnet";
    nativeCurrency: {
        readonly name: "tJBC";
        readonly symbol: "tJBC";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.testnet.jibchain.net"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=jbcTestnet.d.ts.map