export declare const enuls: {
    blockExplorers: {
        readonly default: {
            readonly name: "ENULS Explorer";
            readonly url: "https://evmscan.nuls.io";
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
    id: 119;
    name: "ENULS Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "NULS";
        readonly symbol: "NULS";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://evmapi2.nuls.io"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=enuls.d.ts.map