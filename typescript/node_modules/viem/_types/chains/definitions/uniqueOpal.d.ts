export declare const uniqueOpal: {
    blockExplorers: {
        readonly default: {
            readonly name: "Opal Subscan";
            readonly url: "https://opal.subscan.io/";
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
    id: 8882;
    name: "Opal Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "OPL";
        readonly symbol: "OPL";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc-opal.unique.network"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=uniqueOpal.d.ts.map