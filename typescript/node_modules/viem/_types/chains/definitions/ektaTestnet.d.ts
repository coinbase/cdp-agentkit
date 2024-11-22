export declare const ektaTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Test Ektascan";
            readonly url: "https://test.ektascan.io";
            readonly apiUrl: "https://test.ektascan.io/api";
        };
    };
    contracts?: import("../index.js").Prettify<{
        [key: string]: import("../../index.js").ChainContract | {
            [sourceId: number]: import("../../index.js").ChainContract | undefined;
        } | undefined;
    } & {
        ensRegistry?: import("../../index.js").ChainContract | undefined;
        ensUniversalResolver?: import("../../index.js").ChainContract | undefined;
        multicall3?: import("../../index.js").ChainContract | undefined;
        universalSignatureVerifier?: import("../../index.js").ChainContract | undefined;
    }> | undefined;
    id: 1004;
    name: "Ekta Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "EKTA";
        readonly symbol: "EKTA";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://test.ekta.io:8545"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=ektaTestnet.d.ts.map