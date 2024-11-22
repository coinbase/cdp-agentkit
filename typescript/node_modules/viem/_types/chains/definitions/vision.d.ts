export declare const vision: {
    blockExplorers: {
        readonly default: {
            readonly name: "Vision Scan";
            readonly url: "https://visionscan.org";
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
    id: 888888;
    name: "Vision";
    nativeCurrency: {
        readonly name: "VISION";
        readonly symbol: "VS";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://infragrid.v.network/ethereum/compatible"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=vision.d.ts.map