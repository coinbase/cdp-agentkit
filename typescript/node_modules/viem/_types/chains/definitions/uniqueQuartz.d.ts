export declare const uniqueQuartz: {
    blockExplorers: {
        readonly default: {
            readonly name: "Quartz Subscan";
            readonly url: "https://quartz.subscan.io/";
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
    id: 8881;
    name: "Quartz Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "QTZ";
        readonly symbol: "QTZ";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc-quartz.unique.network"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=uniqueQuartz.d.ts.map