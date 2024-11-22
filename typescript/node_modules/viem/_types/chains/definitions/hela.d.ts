export declare const hela: {
    blockExplorers: {
        readonly default: {
            readonly name: "Hela explorer";
            readonly url: "https://mainnet-blockexplorer.helachain.com";
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
    id: 8668;
    name: "Hela Mainnet";
    nativeCurrency: {
        readonly name: "HLUSD";
        readonly symbol: "HLUSD";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://mainnet-rpc.helachain.com"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=hela.d.ts.map