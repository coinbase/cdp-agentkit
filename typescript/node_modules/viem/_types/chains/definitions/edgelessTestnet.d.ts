export declare const edgelessTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Edgeless Testnet Explorer";
            readonly url: "https://testnet.explorer.edgeless.network";
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
    id: 202;
    name: "Edgeless Testnet";
    nativeCurrency: {
        readonly name: "Edgeless Wrapped ETH";
        readonly symbol: "EwETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://edgeless-testnet.rpc.caldera.xyz/http"];
            readonly webSocket: readonly ["wss://edgeless-testnet.rpc.caldera.xyz/ws"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=edgelessTestnet.d.ts.map