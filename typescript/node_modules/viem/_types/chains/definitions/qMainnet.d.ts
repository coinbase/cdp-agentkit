export declare const qMainnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Q Mainnet Explorer";
            readonly url: "https://explorer.q.org";
            readonly apiUrl: "https://explorer.q.org/api";
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
    id: 35441;
    name: "Q Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Q";
        readonly symbol: "Q";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.q.org"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=qMainnet.d.ts.map