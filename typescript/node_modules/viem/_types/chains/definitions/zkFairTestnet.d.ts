export declare const zkFairTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "zkFair Explorer";
            readonly url: "https://testnet-scan.zkfair.io";
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
    id: 43851;
    name: "ZKFair Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "USD Coin";
        readonly symbol: "USDC";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://testnet-rpc.zkfair.io"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "zkfair-testnet";
};
//# sourceMappingURL=zkFairTestnet.d.ts.map