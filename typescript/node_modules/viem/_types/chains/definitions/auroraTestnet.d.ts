export declare const auroraTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Aurorascan";
            readonly url: "https://testnet.aurorascan.dev";
            readonly apiUrl: "https://testnet.aurorascan.dev/api";
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
    id: 1313161555;
    name: "Aurora Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Ether";
        readonly symbol: "ETH";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://testnet.aurora.dev"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=auroraTestnet.d.ts.map