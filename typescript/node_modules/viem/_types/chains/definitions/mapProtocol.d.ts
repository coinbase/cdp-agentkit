export declare const mapProtocol: {
    blockExplorers: {
        readonly default: {
            readonly name: "MAPO Scan";
            readonly url: "https://maposcan.io";
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
    id: 22776;
    name: "MAP Protocol";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "MAPO";
        readonly symbol: "MAPO";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.maplabs.io"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=mapProtocol.d.ts.map