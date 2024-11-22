export declare const bounceBit: {
    blockExplorers: {
        readonly default: {
            readonly name: "BB Scan";
            readonly url: "https://bbscan.io";
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
    id: 6001;
    name: "BounceBit Mainnet";
    nativeCurrency: {
        readonly name: "BounceBit";
        readonly symbol: "BB";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://fullnode-mainnet.bouncebitapi.com"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=bounceBit.d.ts.map