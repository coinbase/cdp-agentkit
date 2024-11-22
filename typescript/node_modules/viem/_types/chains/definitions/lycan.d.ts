export declare const lycan: {
    blockExplorers: {
        readonly default: {
            readonly name: "Lycan Explorer";
            readonly url: "https://explorer.lycanchain.com";
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
    id: 721;
    name: "Lycan";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Lycan";
        readonly symbol: "LYC";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.lycanchain.com", "https://us-east.lycanchain.com", "https://us-west.lycanchain.com", "https://eu-north.lycanchain.com", "https://eu-west.lycanchain.com", "https://asia-southeast.lycanchain.com"];
            readonly webSocket: readonly ["wss://rpc.lycanchain.com", "wss://us-east.lycanchain.com", "wss://us-west.lycanchain.com", "wss://eu-north.lycanchain.com", "wss://eu-west.lycanchain.com", "wss://asia-southeast.lycanchain.com"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=lycan.d.ts.map