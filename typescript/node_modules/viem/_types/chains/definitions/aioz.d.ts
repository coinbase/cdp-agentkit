export declare const aioz: {
    blockExplorers: {
        readonly default: {
            readonly name: "AIOZ Explorer";
            readonly url: "https://explorer.aioz.network";
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
    id: 168;
    name: "AIOZ Network";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "AIOZ";
        readonly symbol: "AIOZ";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://eth-dataseed.aioz.network"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=aioz.d.ts.map