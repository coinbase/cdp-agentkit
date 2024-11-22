export declare const excelonMainnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Excelon explorer";
            readonly url: "https://explorer.excelon.io";
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
    id: 22052002;
    name: "Excelon Mainnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Excelon";
        readonly symbol: "xlon";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://edgewallet1.xlon.org"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
    readonly network: "XLON";
};
//# sourceMappingURL=excelonMainnet.d.ts.map