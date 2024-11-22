export declare const degen: {
    blockExplorers: {
        readonly default: {
            readonly name: "Degen Chain Explorer";
            readonly url: "https://explorer.degen.tips";
            readonly apiUrl: "https://explorer.degen.tips/api/v2";
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
    id: 666666666;
    name: "Degen";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Degen";
        readonly symbol: "DEGEN";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.degen.tips"];
            readonly webSocket: readonly ["wss://rpc.degen.tips"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=degen.d.ts.map