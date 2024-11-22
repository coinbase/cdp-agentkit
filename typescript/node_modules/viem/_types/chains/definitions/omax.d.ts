export declare const omax: {
    blockExplorers: {
        readonly default: {
            readonly name: "Omax Explorer";
            readonly url: "https://omaxscan.com";
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
    id: 311;
    name: "Omax Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "OMAX";
        readonly symbol: "OMAX";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://mainapi.omaxray.com"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=omax.d.ts.map