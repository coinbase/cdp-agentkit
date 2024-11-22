export declare const berachainTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Berachain";
            readonly url: "https://artio.beratrail.io";
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
    id: 80085;
    name: "Berachain Artio";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "BERA Token";
        readonly symbol: "BERA";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://artio.rpc.berachain.com"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=berachainTestnet.d.ts.map