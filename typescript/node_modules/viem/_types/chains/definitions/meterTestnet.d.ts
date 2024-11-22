export declare const meterTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "MeterTestnetScan";
            readonly url: "https://scan-warringstakes.meter.io";
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
    id: 83;
    name: "Meter Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "MTR";
        readonly symbol: "MTR";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpctest.meter.io"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=meterTestnet.d.ts.map