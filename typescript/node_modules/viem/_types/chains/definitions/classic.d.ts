export declare const classic: {
    blockExplorers: {
        readonly default: {
            readonly name: "Blockscout";
            readonly url: "https://blockscout.com/etc/mainnet";
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
    id: 61;
    name: "Ethereum Classic";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "ETC";
        readonly symbol: "ETC";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://etc.rivet.link"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=classic.d.ts.map