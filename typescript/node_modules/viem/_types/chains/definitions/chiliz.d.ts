export declare const chiliz: {
    blockExplorers: {
        readonly default: {
            readonly name: "Chiliz Explorer";
            readonly url: "https://scan.chiliz.com";
            readonly apiUrl: "https://scan.chiliz.com/api";
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
    id: 88888;
    name: "Chiliz Chain";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "CHZ";
        readonly symbol: "CHZ";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.ankr.com/chiliz", "https://chiliz-rpc.publicnode.com"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "chiliz-chain";
};
//# sourceMappingURL=chiliz.d.ts.map