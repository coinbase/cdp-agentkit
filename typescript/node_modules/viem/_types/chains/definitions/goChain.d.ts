export declare const goChain: {
    blockExplorers: {
        readonly default: {
            readonly name: "GoChain Explorer";
            readonly url: "https://explorer.gochain.io";
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
    id: 60;
    name: "GoChain";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "GO";
        readonly symbol: "GO";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.gochain.io"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=goChain.d.ts.map