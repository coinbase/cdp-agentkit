export declare const etherlinkTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Etherlink Testnet";
            readonly url: "https://testnet-explorer.etherlink.com";
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
    id: 128123;
    name: "Etherlink Testnet";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Tez";
        readonly symbol: "XTZ";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://node.ghostnet.etherlink.com"];
        };
    };
    sourceId?: number | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=etherlinkTestnet.d.ts.map