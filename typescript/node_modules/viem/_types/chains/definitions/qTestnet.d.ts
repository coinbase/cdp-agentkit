export declare const qTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Q Testnet Explorer";
            readonly url: "https://explorer.qtestnet.org";
            readonly apiUrl: "https://explorer.qtestnet.org/api";
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
    id: 35443;
    name: "Q Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Q";
        readonly symbol: "Q";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.qtestnet.org"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=qTestnet.d.ts.map