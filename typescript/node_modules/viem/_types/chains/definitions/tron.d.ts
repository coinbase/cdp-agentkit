export declare const tron: {
    blockExplorers: {
        readonly default: {
            readonly name: "Tronscan";
            readonly url: "https://tronscan.org";
            readonly apiUrl: "https://apilist.tronscanapi.com/api";
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
    id: 728126428;
    name: "Tron";
    nativeCurrency: {
        readonly name: "TRON";
        readonly symbol: "TRX";
        readonly decimals: 6;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://api.trongrid.io/jsonrpc"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=tron.d.ts.map