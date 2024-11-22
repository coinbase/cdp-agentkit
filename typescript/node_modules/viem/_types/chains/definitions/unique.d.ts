export declare const unique: {
    blockExplorers: {
        readonly default: {
            readonly name: "Unique Subscan";
            readonly url: "https://unique.subscan.io/";
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
    id: 8880;
    name: "Unique Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "UNQ";
        readonly symbol: "UNQ";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.unique.network"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=unique.d.ts.map