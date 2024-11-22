export declare const oortMainnetDev: {
    blockExplorers: {
        readonly default: {
            readonly name: "OORT MainnetDev Explorer";
            readonly url: "https://dev-scan.oortech.com";
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
    id: 9700;
    name: "OORT MainnetDev";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "OORT";
        readonly symbol: "OORT";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://dev-rpc.oortech.com"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=oortmainnetDev.d.ts.map