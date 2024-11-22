export declare const oneWorld: {
    blockExplorers: {
        readonly default: {
            readonly name: "One World Explorer";
            readonly url: "https://mainnet.oneworldchain.org";
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
    id: 309075;
    name: "One World Chain Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "OWCT";
        readonly symbol: "OWCT";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://mainnet-rpc.oneworldchain.org"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=oneWorld.d.ts.map