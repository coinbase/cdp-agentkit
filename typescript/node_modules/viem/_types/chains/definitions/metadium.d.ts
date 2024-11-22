export declare const metadium: {
    blockExplorers: {
        readonly default: {
            readonly name: "Metadium Explorer";
            readonly url: "https://explorer.metadium.com";
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
    id: 11;
    name: "Metadium Network";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "META";
        readonly symbol: "META";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://api.metadium.com/prod"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=metadium.d.ts.map