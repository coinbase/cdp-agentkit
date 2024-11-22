export declare const acria: {
    blockExplorers: {
        readonly default: {
            readonly name: "Acria Explorer";
            readonly url: "https://explorer.acria.ai";
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
    id: 47;
    name: "Acria IntelliChain";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "ACRIA";
        readonly symbol: "ACRIA";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://aic.acria.ai"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=acria.d.ts.map