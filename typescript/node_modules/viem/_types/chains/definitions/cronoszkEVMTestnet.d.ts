export declare const cronoszkEVMTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Cronos zkEVM Testnet Explorer";
            readonly url: "https://explorer.zkevm.cronos.org/testnet";
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
    id: 282;
    name: "Cronos zkEVM Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Cronos zkEVM Test Coin";
        readonly symbol: "zkTCRO";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://testnet.zkevm.cronos.org"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=cronoszkEVMTestnet.d.ts.map