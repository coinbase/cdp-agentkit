export declare const iSunCoin: {
    blockExplorers: {
        readonly default: {
            readonly name: "iSunCoin Explorer";
            readonly url: "https://baifa.io/app/chains/8017";
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
    id: 8017;
    name: "iSunCoin Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "ISC";
        readonly symbol: "ISC";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://mainnet.isuncoin.com"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=iSunCoin.d.ts.map