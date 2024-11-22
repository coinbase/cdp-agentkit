export declare const songbirdTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Coston Explorer";
            readonly url: "https://coston-explorer.flare.network";
            readonly apiUrl: "https://coston-explorer.flare.network/api";
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
    id: 16;
    name: "Songbird Testnet Coston";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Coston Flare";
        readonly symbol: "CFLR";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://coston-api.flare.network/ext/C/rpc"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=songbirdTestnet.d.ts.map