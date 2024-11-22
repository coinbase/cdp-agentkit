export declare const haqqTestedge2: {
    blockExplorers: {
        readonly default: {
            readonly name: "HAQQ Explorer";
            readonly url: "https://explorer.testedge2.haqq.network";
            readonly apiUrl: "https://explorer.testedge2.haqq.network/api";
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
    id: 54211;
    name: "HAQQ Testedge 2";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Islamic Coin";
        readonly symbol: "ISLMT";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.eth.testedge2.haqq.network"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=haqqTestedge2.d.ts.map