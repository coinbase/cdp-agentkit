export declare const artelaTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Artela";
            readonly url: "https://betanet-scan.artela.network";
            readonly apiUrl: "https://betanet-scan.artela.network/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xd07c8635f76e8745Ee7092fbb6e8fbc5FeF09DD7";
            readonly blockCreated: 7001871;
        };
    };
    id: 11822;
    name: "Artela Testnet";
    nativeCurrency: {
        readonly name: "ART";
        readonly symbol: "ART";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://betanet-rpc1.artela.network"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=artelaTestnet.d.ts.map