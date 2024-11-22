export declare const ham: {
    blockExplorers: {
        readonly default: {
            readonly name: "Ham Chain Explorer";
            readonly url: "https://explorer.ham.fun";
            readonly apiUrl: "https://explorer.ham.fun/api/v2";
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
    id: 5112;
    name: "Ham";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Ham";
        readonly symbol: "ETH";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.ham.fun"];
            readonly webSocket: readonly ["wss://rpc.ham.fun"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=ham.d.ts.map