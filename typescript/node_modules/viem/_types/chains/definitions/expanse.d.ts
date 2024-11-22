export declare const expanse: {
    blockExplorers: {
        readonly default: {
            readonly name: "Expanse Explorer";
            readonly url: "https://explorer.expanse.tech";
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
    id: 2;
    name: "Expanse Network";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "EXP";
        readonly symbol: "EXP";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://node.expanse.tech"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=expanse.d.ts.map