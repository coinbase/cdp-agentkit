export declare const bearNetworkChainTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "BrnkTestScan";
            readonly url: "https://brnktest-scan.bearnetwork.net";
            readonly apiUrl: "https://brnktest-scan.bearnetwork.net/api";
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
    id: 751230;
    name: "Bear Network Chain Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "tBRNKC";
        readonly symbol: "tBRNKC";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://brnkc-test.bearnetwork.net"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=bearNetworkChainTestnet.d.ts.map