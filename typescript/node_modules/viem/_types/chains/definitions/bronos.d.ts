export declare const bronos: {
    blockExplorers: {
        readonly default: {
            readonly name: "BronoScan";
            readonly url: "https://broscan.bronos.org";
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
    id: 1039;
    name: "Bronos";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "BRO";
        readonly symbol: "BRO";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://evm.bronos.org"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=bronos.d.ts.map