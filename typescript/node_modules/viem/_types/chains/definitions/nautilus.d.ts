export declare const nautilus: {
    blockExplorers: {
        readonly default: {
            readonly name: "NautScan";
            readonly url: "https://nautscan.com";
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
    id: 22222;
    name: "Nautilus Mainnet";
    nativeCurrency: {
        readonly name: "ZBC";
        readonly symbol: "ZBC";
        readonly decimals: 9;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://api.nautilus.nautchain.xyz"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=nautilus.d.ts.map