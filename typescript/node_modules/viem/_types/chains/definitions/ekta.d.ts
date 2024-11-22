export declare const ekta: {
    blockExplorers: {
        readonly default: {
            readonly name: "Ektascan";
            readonly url: "https://ektascan.io";
            readonly apiUrl: "https://ektascan.io/api";
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
    id: 1994;
    name: "Ekta";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "EKTA";
        readonly symbol: "EKTA";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://main.ekta.io"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=ekta.d.ts.map