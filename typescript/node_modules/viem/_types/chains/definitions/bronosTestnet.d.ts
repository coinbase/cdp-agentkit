export declare const bronosTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "BronoScan";
            readonly url: "https://tbroscan.bronos.org";
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
    id: 1038;
    name: "Bronos Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Bronos Coin";
        readonly symbol: "tBRO";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://evm-testnet.bronos.org"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=bronosTestnet.d.ts.map